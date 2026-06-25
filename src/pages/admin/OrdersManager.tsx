import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from '../../components/common/Toast';

interface OrderItem {
  id: string;
  title: string;
  price: string;
}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    note: string;
  };
  items: OrderItem[];
  status: string; // pending, completed, cancelled
  createdAt: any;
}

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Order[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handleDelete = (orderId: string) => {
    setOrderToDelete(orderId);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await deleteDoc(doc(db, 'orders', orderToDelete));
      toast.success("Xóa đơn hàng thành công!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Lỗi khi xóa đơn hàng!");
    } finally {
      setOrderToDelete(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-brand-500">Đang tải danh sách đơn hàng...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-950 mb-2">Quản Lý Đơn Hàng</h1>
        <p className="text-brand-500">Xem và xử lý các yêu cầu mua Source Code từ khách hàng.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-100 p-12 text-center text-brand-500">
          Chưa có đơn hàng nào.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-50/50 border-b border-brand-100 text-brand-900 text-sm">
                  <th className="p-4 font-bold">Thời gian</th>
                  <th className="p-4 font-bold">Khách hàng</th>
                  <th className="p-4 font-bold">Sản phẩm</th>
                  <th className="p-4 font-bold">Trạng thái</th>
                  <th className="p-4 font-bold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-50/30 transition-colors">
                    <td className="p-4 align-top text-sm text-brand-500">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString('vi-VN') : 'N/A'}
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-brand-950">{order.customerInfo?.name || 'Khách ẩn danh'}</div>
                      <div className="text-sm text-brand-600 mt-1">SĐT: <a href={`tel:${order.customerInfo?.phone}`} className="text-sky-600 hover:underline">{order.customerInfo?.phone || 'N/A'}</a></div>
                      {order.customerInfo?.email && <div className="text-sm text-brand-600">Email: {order.customerInfo.email}</div>}
                      {order.customerInfo?.note && (
                        <div className="mt-2 text-xs p-2 bg-yellow-50 text-yellow-800 rounded border border-yellow-100">
                          <strong>Ghi chú:</strong> {order.customerInfo.note}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <ul className="list-disc list-inside space-y-1">
                        {(order.items || []).map((item, idx) => (
                          <li key={idx} className="text-sm text-brand-900 font-medium">
                            {item.title} <span className="text-brand-500 font-normal">({item.price})</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 align-top">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="completed">Đã bàn giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td className="p-4 align-top text-right">
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa đơn hàng"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!orderToDelete}
        title="Xóa Đơn Hàng"
        message="Bạn có chắc chắn muốn xóa đơn hàng này vĩnh viễn? Dữ liệu sau khi xóa sẽ không thể khôi phục."
        confirmText="Xóa vĩnh viễn"
        onConfirm={confirmDelete}
        onCancel={() => setOrderToDelete(null)}
      />
    </div>
  );
};

export default OrdersManager;
