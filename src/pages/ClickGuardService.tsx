import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';
import clickGuardHeroImage from '../assets/images/clickguard_hero.jpg';
import { Helmet } from 'react-helmet-async';

const ClickGuardService = () => {
  return (
    <div className="bg-brand-50 min-h-screen font-sans selection:bg-sky-500/30">
      <Helmet>
        <title>ClickGuard Pro - Hệ Thống Chặn Click Tặc Đỉnh Cao | MinhQuang28</title>
        <meta name="description" content="ClickGuard Pro là giải pháp chặn click tặc, bảo vệ ngân sách quảng cáo Google Ads & Facebook Ads hiệu quả nhất. Tự động nhận diện IP xấu, bot và click phá hoại." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-brand-50 to-brand-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-200 text-sky-600 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                ClickGuard Pro v2.0
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-brand-950">
                Bảo Vệ Ngân Sách,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">Chặn Đứng Click Tặc.</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-500 mb-10 max-w-xl leading-relaxed">
                Hệ thống giám sát và bảo vệ quảng cáo Google Ads / Facebook Ads theo thời gian thực. Tự động nhận diện và chặn đứng 99% các cú click phá hoại từ đối thủ và Bot tự động.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" state={{ service: "Tư Vấn ClickGuard Pro" }} className="px-8 py-4 bg-brand-900 hover:bg-brand-950 text-white rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  Đăng Ký Trải Nghiệm
                </Link>
                <a href="https://clickguard-pro.vercel.app/" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white hover:bg-brand-100 border border-brand-200 text-brand-900 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                  Xem Demo Bảng Điều Khiển
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="order-1 lg:order-2">
            <ScrollReveal delay={200}>
              <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-tr from-sky-400/50 via-lime-400/30 to-brand-400/50 shadow-[0_0_80px_-20px_rgba(14,165,233,0.3)] group overflow-hidden">
                <div className="absolute inset-0 bg-white rounded-[2.5rem] z-0"></div>
                <img 
                  src={clickGuardHeroImage} 
                  alt="ClickGuard Pro Dashboard" 
                  loading="lazy"
                  className="relative z-10 rounded-[2.4rem] w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                />
                
                {/* Floating Elements */}
                <div className="absolute -left-6 top-1/4 bg-white/95 backdrop-blur-md border border-brand-100 p-4 rounded-2xl z-20 shadow-xl animate-float hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Đã Chặn Thành Công</p>
                      <p className="text-brand-950 font-black text-lg">IP: 113.190.x.x</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TÍNH NĂNG NỔI BẬT */}
      <section className="py-24 px-6 relative bg-white border-y border-brand-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-black text-brand-950 mb-6">
                Tại Sao Chọn ClickGuard Pro?
              </h2>
              <p className="text-brand-500 max-w-2xl mx-auto text-lg">
                Giải pháp toàn diện giúp bạn ngừng lãng phí ngân sách vào những click vô giá trị và tập trung vào khách hàng thật sự.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={100} className="bg-brand-50 border border-brand-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-brand-900/5 transition-all group duration-300">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-brand-950 mb-4">Phát Hiện Thời Gian Thực</h3>
              <p className="text-brand-500 leading-relaxed">
                Hệ thống AI liên tục phân tích hành vi click chuột theo từng giây (Real-time). Lập tức cảnh báo và chặn đứng khi phát hiện dấu hiệu bất thường.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-brand-50 border border-brand-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-brand-900/5 transition-all group duration-300">
              <div className="w-16 h-16 rounded-2xl bg-lime-100 text-lime-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-lime-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-brand-950 mb-4">Chặn IP Tự Động (Auto-Block)</h3>
              <p className="text-brand-500 leading-relaxed">
                Tích hợp sâu qua API với Google Ads. Tự động đưa các dải IP phá hoại vào danh sách đen (Blacklist) của chiến dịch mà không cần làm thủ công.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-brand-50 border border-brand-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-brand-900/5 transition-all group duration-300">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-brand-950 mb-4">Báo Cáo Phân Tích Chuyên Sâu</h3>
              <p className="text-brand-500 leading-relaxed">
                Thống kê chi tiết từng click: Nguồn gốc IP, nhà mạng, thiết bị, hệ điều hành, trình duyệt và thời gian thao tác trên trang (Time on site).
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-brand-50 border-t border-brand-100">
        <ScrollReveal className="max-w-5xl mx-auto bg-brand-950 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/40 via-brand-950 to-brand-950"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Bạn đang bị đối thủ "đốt" tiền quảng cáo?</h2>
            <p className="text-xl text-brand-300 mb-10 max-w-2xl mx-auto leading-relaxed">Đừng để ngân sách marketing rơi vào tay click tặc. Hãy bảo vệ doanh nghiệp của bạn ngay hôm nay bằng ClickGuard Pro.</p>
            <Link to="/contact" state={{ service: "Tư Vấn ClickGuard Pro" }} className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-950 rounded-xl font-black text-lg hover:bg-brand-50 transition-colors shadow-2xl hover:-translate-y-1 duration-300">
              Nhận Tư Vấn Cài Đặt Ngay
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default ClickGuardService;
