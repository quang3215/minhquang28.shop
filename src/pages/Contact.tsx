import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service_type: 'Thiết kế Website / Mua Source Code',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.service) {
      setFormData(prev => ({ ...prev, service_type: location.state.service }));
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError("Vui lòng nhập Họ và Tên của bạn!");
    if (!formData.phone.trim()) return setError("Vui lòng nhập Số điện thoại!");
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      return setError("Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 số.");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (err) {
      console.error("Lỗi khi gửi:", err);
      setError("Máy chủ đang bận. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-brand-50 min-h-screen">
      {/* HERO LIÊN HỆ - LIGHT THEME */}
      <section className="relative pt-12 pb-16 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-brand-50 to-brand-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-brand-900 text-sm font-bold tracking-widest uppercase mb-8 border border-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Hỗ Trợ 24/7
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight text-brand-950">
            Hãy Bắt Đầu Dự Án<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">Của Bạn Ngay Hôm Nay</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed">
            Dù bạn cần thiết kế Website mới, mua Source Code hay cần tư vấn chiến lược chạy Ads, chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

      {/* MAIN CONTACT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24">
        
        {/* LEFT: CONTACT INFO */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Thông Tin Liên Hệ</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">Đội ngũ kỹ thuật và chuyên viên tư vấn luôn online để phản hồi yêu cầu của bạn nhanh nhất có thể.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-5 p-6 bg-sky-50 rounded-2xl border border-sky-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 shrink-0 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-600/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Hotline / Zalo</div>
                <a href="tel:0336280602" className="text-xl font-black text-slate-900 hover:text-sky-600 transition-colors">033.628.0602</a>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-purple-50 rounded-2xl border border-purple-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 shrink-0 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-600/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Email Support</div>
                <a href="mailto:lmquang28@gmail.com" className="text-lg font-black text-slate-900 hover:text-purple-600 transition-colors">lmquang28@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 bg-lime-50 rounded-2xl border border-lime-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 shrink-0 bg-lime-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-lime-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Văn Phòng Trực Tuyến</div>
                <div className="text-lg font-black text-slate-900">Hà Nội, Việt Nam</div>
                <p className="text-sm text-slate-600 mt-1">Giờ làm việc: 08:00 - 22:00 (T2-CN)</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Kết nối mạng xã hội</h4>
            <div className="flex gap-4">
              <a href="https://zalo.me/0336280602" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-lg hover:bg-sky-700 hover:scale-110 transition-all shadow-lg shadow-sky-600/30">Z</a>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="lg:col-span-3 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-lime-500 rounded-[2.5rem] rotate-2 opacity-10"></div>
          
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl relative z-10">
            
            {!success ? (
              <div className="transition-opacity duration-500">
                <h3 className="text-3xl font-black text-slate-900 mb-2">Gửi Yêu Cầu Tư Vấn</h3>
                <p className="text-slate-600 mb-6 font-medium">Điền thông tin bên dưới, hệ thống sẽ gửi thẳng yêu cầu của bạn vào Email của chúng tôi.</p>
                
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-pulse">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Họ và Tên <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-medium" 
                        placeholder="Nhập tên của bạn" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Số Điện Thoại <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-medium" 
                        placeholder="VD: 0987654321" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Dịch vụ quan tâm</label>
                    <select 
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none cursor-pointer font-medium"
                      value={formData.service_type}
                      onChange={e => setFormData({...formData, service_type: e.target.value})}
                      disabled={loading}
                    >
                      <option value="Thiết kế Website / Mua Source Code">Thiết kế Website / Mua Source Code</option>
                      <option value="Chạy Quảng Cáo (Facebook/Google/TikTok)">Chạy Quảng Cáo (Facebook/Google/TikTok)</option>
                      <option value="Tối ưu SEO Tổng thể">Tối ưu SEO Tổng thể</option>
                      <option value="Hợp tác khác">Hợp tác khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nội dung chi tiết (Không bắt buộc)</label>
                    <textarea 
                      rows={4} 
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none font-medium" 
                      placeholder="Hãy mô tả chi tiết yêu cầu của bạn..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-black text-lg transition-all shadow-lg shadow-sky-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    )}
                    <span>{loading ? "Đang gửi dữ liệu..." : "Gửi Yêu Cầu Tới Email"}</span>
                  </button>
                  <p className="text-center text-sm text-slate-500 mt-4">* Mọi thông tin của bạn được cam kết bảo mật tuyệt đối.</p>
                </form>
              </div>
            ) : (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-lime-100 text-lime-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/20">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Gửi Thành Công!</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-sm mx-auto font-medium">Cảm ơn bạn đã liên hệ. Chúng tôi đã nhận được yêu cầu và sẽ phản hồi trong thời gian sớm nhất.</p>
                <button 
                  onClick={() => {
                    setSuccess(false);
                    setFormData({name: '', phone: '', service_type: 'Thiết kế Website / Mua Source Code', message: ''});
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* GOOGLE MAPS */}
      <div className="bg-slate-50 rounded-[2.5rem] p-4 md:p-8 border border-slate-200 shadow-sm">
        <div className="w-full h-[450px] rounded-[2rem] overflow-hidden shadow-inner border border-slate-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119047.88200676451!2d105.74823906325178!3d21.031269550325997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{border: 0}} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Contact;
