import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from '../components/common/Toast';
import { useCart } from '../components/context/CartContext';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = cart.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'orders'), {
        customerInfo: formData,
        items: cart,
        status: 'pending', // pending, completed, cancelled
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-brand-50 flex items-center justify-center">
        <ScrollReveal className="max-w-lg w-full bg-white p-10 rounded-3xl text-center shadow-2xl border border-brand-100">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-black text-brand-950 mb-4">Đặt hàng thành công!</h2>
          <p className="text-brand-500 mb-8 leading-relaxed">
            Cảm ơn bạn đã quan tâm đến Source Code của MinhQuang28. Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ qua SĐT/Zalo của bạn trong thời gian sớm nhất để bàn giao Source Code.
          </p>
          <Link to="/projects" className="btn-primary py-4 px-8 block w-full text-center">
            {t('project_detail.back_to_list')}
          </Link>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 bg-brand-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-black text-brand-950 mb-4 text-center">{t('cart.checkout')}</h1>
          <p className="text-brand-500 text-center mb-12">Hoàn tất thông tin bên dưới để nhận Source Code</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <ScrollReveal className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-100">
              <h2 className="text-2xl font-bold text-brand-950 mb-6 pb-4 border-b border-brand-100">Sản phẩm trong giỏ ({cart.length})</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-brand-50 text-brand-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  </div>
                  <p className="text-brand-500 mb-6">{t('cart.empty')}</p>
                  <Link to="/projects" className="btn-secondary py-2 px-6">{t('header.templates')}</Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center p-4 rounded-2xl border border-brand-50 bg-brand-50/50">
                      <img src={item.image || 'https://via.placeholder.com/150'} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h3 className="font-bold text-brand-950 line-clamp-2">{item.title}</h3>
                        <p className="text-brand-900 font-black mt-2">{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm"
                        title="Xóa"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={100} className="bg-brand-950 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50"></div>
              
              <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Thông tin liên hệ</h2>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div>
                  <label className="block text-brand-300 text-sm font-medium mb-1">Họ và Tên *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-brand-900/50 border border-brand-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-brand-300 text-sm font-medium mb-1">Số điện thoại (Zalo) *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-brand-900/50 border border-brand-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="Nhập SĐT để nhận Source"
                  />
                </div>
                <div>
                  <label className="block text-brand-300 text-sm font-medium mb-1">Email (Tùy chọn)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-brand-900/50 border border-brand-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="Email nhận mã nguồn"
                  />
                </div>
                <div>
                  <label className="block text-brand-300 text-sm font-medium mb-1">Ghi chú thêm</label>
                  <textarea 
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full bg-brand-900/50 border border-brand-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                    placeholder="Bạn cần hỗ trợ cài đặt không?"
                  ></textarea>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-800">
                  <div className="flex justify-between items-center mb-6 text-white">
                    <span className="font-medium">Tổng sản phẩm:</span>
                    <span className="font-black text-xl">{totalAmount} Template</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={cart.length === 0 || isSubmitting}
                    className="w-full bg-lime-500 text-brand-950 hover:bg-lime-400 font-bold text-lg py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      'Gửi Yêu Cầu Đặt Hàng'
                    )}
                  </button>
                  <p className="text-brand-400 text-xs text-center mt-4">
                    * Sau khi gửi yêu cầu, MinhQuang28 sẽ liên hệ Zalo của bạn để xác nhận và bàn giao Source Code trong vòng 15 phút.
                  </p>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
