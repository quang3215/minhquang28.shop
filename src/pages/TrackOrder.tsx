import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useTranslation } from 'react-i18next';
import { toast } from '../components/common/Toast';

interface OrderItem {
  id: string;
  title: string;
  price: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: string; // pending, processing, completed, cancelled
  createdAt: any;
}

const TrackOrder = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { t } = useTranslation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      // Create a query against the collection.
      const q = query(
        collection(db, 'orders'),
        where('customerInfo.phone', '==', phone.trim())
      );
      
      const querySnapshot = await getDocs(q);
      const data: Order[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Order);
      });
      
      // Sort in JS because Firestore requires a composite index if combining where(==) and orderBy()
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setOrders(data);
    } catch (error) {
      console.error("Error searching orders:", error);
      toast.error(t('track_order.error_occurred') || "Đã xảy ra lỗi khi tìm kiếm đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'pending':
        return { text: t('track_order.status_pending'), color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
      case 'processing':
        return { text: t('track_order.status_processing'), color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'completed':
        return { text: t('track_order.status_completed'), color: 'bg-green-100 text-green-700 border-green-200' };
      case 'cancelled':
        return { text: t('track_order.status_cancelled'), color: 'bg-red-100 text-red-700 border-red-200' };
      default:
        return { text: 'Không xác định', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-brand-50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-brand-950 mb-4">{t('track_order.title')}</h1>
          <p className="text-brand-500 max-w-xl mx-auto">
            {t('track_order.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} className="bg-white p-8 md:p-10 rounded-3xl border border-brand-100 shadow-xl mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input 
              type="tel" 
              placeholder={t('track_order.search_placeholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 input-field"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary py-3 px-8 md:w-auto w-full disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? t('track_order.searching') : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  {t('track_order.search_button')}
                </>
              )}
            </button>
          </form>
        </ScrollReveal>

        {hasSearched && !loading && (
          <ScrollReveal>
            {orders.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-3xl border border-brand-100 shadow-sm">
                <div className="w-20 h-20 bg-brand-50 text-brand-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-2">{t('track_order.not_found_title')}</h3>
                <p className="text-brand-500">{t('track_order.not_found_desc')} <strong className="text-brand-900">{phone}</strong></p>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-brand-950 mb-4 px-2">{t('track_order.found', { count: orders.length })}</h2>
                {orders.map((order) => {
                  const statusInfo = getStatusDisplay(order.status);
                  return (
                    <div key={order.id} className="bg-white p-6 md:p-8 rounded-3xl border border-brand-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm font-medium text-brand-500">
                            {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString('vi-VN') : 'Mới đây'}
                          </span>
                          <span className="text-xs font-mono bg-brand-50 text-brand-400 px-2 py-1 rounded-md">ID: #{order.id.slice(-6).toUpperCase()}</span>
                        </div>
                        <ul className="space-y-3">
                          {(order.items || []).map((item) => (
                            <li key={item.id || item.title} className="text-sm font-medium text-brand-950 flex items-center justify-between">
                              <div className="w-2 h-2 rounded-full bg-brand-300"></div>
                              <span className="font-bold text-brand-950">{item.title}</span>
                              <span className="text-sm text-brand-500">({item.price})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="w-full md:w-auto md:border-l border-t md:border-t-0 border-brand-100 pt-4 md:pt-0 md:pl-8 flex flex-col items-start md:items-end gap-3">
                        <div className="text-sm font-medium text-brand-500">{t('track_order.status_label')}</div>
                        <div className={`px-4 py-2 rounded-xl font-bold text-sm border ${statusInfo.color}`}>
                          {statusInfo.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
