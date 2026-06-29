import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';
import ecommerceAdsImage from '../assets/images/ecommerce_ads_dashboard.png';

const AdsService = () => {
  return (
    <div className="flex flex-col bg-brand-50">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-brand-50 to-brand-50"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-brand-900 text-sm font-bold tracking-widest uppercase mb-6 border border-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                Performance Marketing
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black text-brand-950 tracking-tight leading-[1.1] mb-6">
                Đừng Đốt Tiền Mù Quáng.<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">
                  Hãy Đầu Tư Sinh Lời!
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-brand-500 mb-10 leading-relaxed max-w-xl">
                Giải pháp quảng cáo đa nền tảng tập trung tối đa vào Tỷ Lệ Chuyển Đổi (CR) và Tối ưu Chi Phí (CPA). Chúng tôi không bán lượt Click, chúng tôi cam kết mang lại doanh thu thực tế.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  state={{ service: 'Tư Vấn Quảng Cáo Ads' }} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-950 transition-all shadow-xl shadow-brand-900/20 hover:-translate-y-1"
                >
                  Nhận Phân Tích Kênh Miễn Phí
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
                <a 
                  href="#process" 
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg border border-brand-200 hover:bg-brand-50 transition-colors shadow-sm"
                >
                  Tìm Hiểu Quy Trình
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="order-1 lg:order-2">
            <ScrollReveal delay={200}>
              <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-tr from-sky-400/50 via-lime-400/30 to-brand-400/50 shadow-[0_0_80px_-20px_rgba(14,165,233,0.3)] group overflow-hidden">
                <div className="absolute inset-0 bg-white rounded-[2.5rem] z-0"></div>
                <img 
                  src={ecommerceAdsImage} 
                  alt="Ecommerce Ads Dashboard" 
                  loading="lazy"
                  className="relative z-10 rounded-[2.4rem] w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 aspect-video md:aspect-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS & SOLUTIONS */}
      <section className="py-24 px-6 bg-white border-y border-brand-100 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Pain Points */}
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-black text-brand-950 mb-10 leading-tight">
              Chiến dịch hiện tại của bạn đang gặp bế tắc?
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Đốt tiền nhưng không ra đơn', desc: 'Thu hút ngàn click, tin nhắn đổ về ầm ầm nhưng tỷ lệ chốt đơn (CR) cực kỳ thấp.', color: 'red' },
                { title: 'Chi phí Ads ngày càng đắt đỏ', desc: 'Giá thầu (CPC/CPM) tăng phi mã từng ngày nhưng bạn không biết cách vít scale tệp.', color: 'orange' },
                { title: 'Nhắm sai tệp khách hàng', desc: 'Target quá rộng hoặc sai Insight, phân phối quảng cáo cho người không có nhu cầu.', color: 'slate' }
              ].map((item, idx) => (
                <div key={idx} className="group p-6 rounded-2xl bg-brand-50/50 border border-brand-100 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5 transition-all duration-300">
                  <h3 className="text-xl font-bold text-brand-950 mb-2 flex items-center gap-3">
                    <span className={`w-8 h-2 rounded-full ${item.color === 'red' ? 'bg-red-500' : item.color === 'orange' ? 'bg-orange-500' : 'bg-brand-400'}`}></span>
                    {item.title}
                  </h3>
                  <p className="text-brand-500 leading-relaxed pl-11">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Solution Card */}
          <ScrollReveal delay={200} className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-lime-400 rounded-[2.5rem] rotate-3 opacity-20 blur-lg"></div>
            <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative z-10 bg-white/90">
              <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-3xl font-black text-brand-950 mb-6">
                Giải Pháp Của MinhQuang28
              </h3>
              <p className="text-brand-500 text-lg leading-relaxed mb-10">
                Thay vì "Set camp" máy móc theo thói quen, chúng tôi tiếp cận quảng cáo hoàn toàn dựa trên dữ liệu (Data-Driven). Phân tích hành trình khách hàng, cấu trúc lại phễu bán hàng và A/B Testing liên tục để tối đa hóa lợi nhuận (ROI).
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 text-center">
                  <div className="text-4xl font-black text-sky-600 mb-2">X3</div>
                  <div className="text-sm font-bold text-sky-800 uppercase tracking-wide">Tỷ lệ chốt đơn</div>
                </div>
                <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100 text-center">
                  <div className="text-4xl font-black text-lime-600 mb-2">-40%</div>
                  <div className="text-sm font-bold text-lime-800 uppercase tracking-wide">Chi phí CPA</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. PLATFORMS */}
      <section className="py-24 px-6 bg-brand-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-950 mb-6">Đa Nền Tảng - Phủ Sóng Mọi Điểm Chạm</h2>
            <p className="text-lg text-brand-500 max-w-2xl mx-auto">Chọn đúng kênh để tiếp cận khách hàng vào đúng thời điểm họ phát sinh nhu cầu mua sắm.</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* FB */}
            <ScrollReveal delay={100}>
              <div className="h-full bg-white p-10 rounded-3xl border border-brand-100 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-4">Facebook Ads</h3>
                <p className="text-brand-500 mb-8 leading-relaxed">Khơi gợi nhu cầu bằng nội dung trực quan. Bám đuổi khách hàng (Retargeting) triệt để qua Pixel.</p>
                <ul className="space-y-4 text-sm font-semibold text-brand-800">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Tin nhắn (Messenger)</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Chuyển đổi Landing Page</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Lead Generation</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Google */}
            <ScrollReveal delay={200}>
              <div className="h-full bg-white p-10 rounded-3xl border border-brand-100 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-4">Google & Youtube</h3>
                <p className="text-brand-500 mb-8 leading-relaxed">Đón đầu khách hàng ĐÃ CÓ NHU CẦU. Đưa doanh nghiệp của bạn chễm chệ ngay trên Top 1 tìm kiếm.</p>
                <ul className="space-y-4 text-sm font-semibold text-brand-800">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Google Search</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Google Shopping</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Youtube & GDN</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* TikTok */}
            <ScrollReveal delay={300}>
              <div className="h-full bg-white p-10 rounded-3xl border border-brand-100 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.11-1.55.3-3.1 1.15-4.38 1.16-1.74 3.09-2.82 5.17-2.93.18-.01.35-.01.53-.01v4.06c-1.31.06-2.58.74-3.23 1.83-.56.9-.66 2.05-.28 3.02.43 1.09 1.45 1.94 2.62 2.11 1.41.22 2.87-.24 3.84-1.28.84-.91 1.25-2.14 1.24-3.38.01-6.79.01-13.59.01-20.38z"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-4">TikTok Ads</h3>
                <p className="text-brand-500 mb-8 leading-relaxed">Kích thích tâm lý mua sắm bốc đồng cực mạnh qua video ngắn Viral, tối ưu cho Gen-Z và Millennials.</p>
                <ul className="space-y-4 text-sm font-semibold text-brand-800">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> In-Feed Video</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> Traffic Tiktok Shop</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> Livestream Boost</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Shopee/Lazada (New E-commerce card) */}
            <ScrollReveal delay={400}>
              <div className="h-full bg-white p-10 rounded-3xl border border-brand-100 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-4">E-Commerce Sàn</h3>
                <p className="text-brand-500 mb-8 leading-relaxed">Thống trị Shopee, Lazada. Triển khai CPAS và quảng cáo nội sàn để vươn lên top ngành hàng.</p>
                <ul className="space-y-4 text-sm font-semibold text-brand-800">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Đấu thầu từ khóa</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> CPAS (Collaborative Ads)</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Tối ưu gian hàng</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* NEW SECTION: E-COMMERCE DEEP DIVE */}
      <section className="py-24 px-6 relative overflow-hidden bg-white border-y border-brand-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-sky-400 rounded-[2.5rem] rotate-3 opacity-20 blur-xl"></div>
              <img 
                src={ecommerceAdsImage}
                alt="E-commerce Analytics Dashboard" 
                loading="lazy"
                className="relative z-10 rounded-[2.5rem] shadow-2xl border border-brand-100 object-cover aspect-square md:aspect-[4/3] w-full"
              />
              <div className="absolute -bottom-8 -right-8 z-20 bg-brand-950 text-white p-6 rounded-3xl shadow-2xl border border-white/10 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">4.8x</p>
                    <p className="text-sm font-bold text-brand-300 uppercase">E-com ROAS</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 font-bold uppercase tracking-wider text-xs md:text-sm mb-6">
              Đặc Quyền Của Cửa Hàng Trực Tuyến
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-950 mb-6 leading-tight">
              Giải Pháp Vít Ads Chuyên Biệt Cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-sky-500">Thương Mại Điện Tử</span>
            </h2>
            <p className="text-lg text-brand-500 mb-8 leading-relaxed">
              Bán hàng online (E-commerce) đòi hỏi một chiến lược Ads phức tạp hơn rất nhiều so với chạy tin nhắn thông thường. Chúng tôi thiết lập hệ thống Tracking chuẩn xác đến từng đồng (Pixel, CAPI, GTM) để AI của Facebook/Google học tệp khách hàng mua hàng thực sự.
            </p>

            <ul className="space-y-6">
              {[
                { title: 'Dynamic Product Ads (DPA)', desc: 'Tự động hiển thị đúng sản phẩm khách đã xem vào quảng cáo, đuổi bám họ khắp mọi nơi để chốt đơn.' },
                { title: 'Chạy Chuyển Đổi (Conversion API)', desc: 'Gắn tracking mọi hành vi: Add to Cart, Initiate Checkout, Purchase. Đo lường ROAS thời gian thực.' },
                { title: 'Tối Ưu Landing Page & Checkout', desc: 'Không chỉ chạy Ads, chúng tôi tối ưu lại tốc độ load và trải nghiệm mua hàng trên Website để không rơi vãi khách.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0 border border-brand-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-950 mb-2">{item.title}</h4>
                    <p className="text-brand-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* 3.5 PRICING TABLE */}
      <section className="py-24 px-6 bg-white border-y border-brand-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-950 mb-6">Bảng Giá Dịch Vụ Thuê Tài Khoản & Chạy Ads</h2>
            <p className="text-lg text-brand-500 max-w-2xl mx-auto">Cam kết minh bạch ngân sách. Báo cáo tự động mỗi ngày.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { tier: 'Khởi động', price: '10%', desc: 'Phí dịch vụ dựa trên ngân sách tiêu', color: 'border-brand-200 hover:border-sky-400', features: ['Ngân sách < 50tr/tháng', 'Tối ưu 1 kênh (FB/Google)', 'Báo cáo hàng tuần', 'Hỗ trợ content cơ bản'] },
              { tier: 'Doanh nghiệp', price: '8%', desc: 'Phí dịch vụ dựa trên ngân sách tiêu', color: 'border-lime-400 shadow-xl shadow-lime-900/10 scale-105 bg-brand-950 text-white', features: ['Ngân sách 50tr - 200tr/tháng', 'Đa kênh (FB, Google, Tiktok)', 'Báo cáo Real-time (Looker Studio)', 'Cấp tài khoản Invoice cực khỏe', 'Hỗ trợ A/B Testing liên tục'] },
              { tier: 'VIP Scale', price: 'Liên hệ', desc: 'Dành cho ngân sách cực lớn', color: 'border-brand-200 hover:border-purple-400', features: ['Ngân sách > 200tr/tháng', 'Ưu tiên duyệt chiến dịch nhanh', 'Hỗ trợ 1-1 chuyên sâu 24/7', 'Lên chiến lược phễu toàn diện', 'Audit hệ thống Tracking'] }
            ].map((plan, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className={`h-full flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${plan.color}`}>
                  <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${idx === 1 ? 'text-lime-400' : 'text-brand-900'}`}>{plan.tier}</h3>
                  <div className={`text-5xl font-black mb-4 ${idx === 1 ? 'text-white' : 'text-brand-950'}`}>{plan.price}</div>
                  <p className={`mb-8 pb-8 border-b ${idx === 1 ? 'border-white/10 text-brand-300' : 'border-brand-100 text-brand-500'}`}>{plan.desc}</p>
                  <ul className={`space-y-4 mb-8 flex-1 ${idx === 1 ? 'text-brand-100' : 'text-brand-700'}`}>
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className={`w-5 h-5 shrink-0 ${idx === 1 ? 'text-lime-400' : 'text-sky-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    state={{ service: `Đăng ký gói Ads: ${plan.tier}` }}
                    className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${idx === 1 ? 'bg-lime-500 text-brand-950 hover:bg-lime-400' : 'bg-brand-50 text-brand-900 hover:bg-brand-900 hover:text-white'}`}
                  >
                    Chọn Gói Này
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS TIMELINE */}
      <section id="process" className="py-24 px-6 bg-brand-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-950 mb-6">Quy Trình Triển Khai Bài Bản</h2>
            <p className="text-lg text-brand-500 max-w-2xl mx-auto">Sự kết hợp hoàn hảo giữa thuật toán thông minh và kinh nghiệm chạy thực chiến ngân sách lớn.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-0.5 bg-brand-200"></div>
            
            {[
              { step: '01', title: 'Audit & Phân Tích', desc: 'Khám bệnh tài khoản cũ, nghiên cứu nội dung của đối thủ và vẽ ra chân dung khách hàng mục tiêu.' },
              { step: '02', title: 'Lập Chiến Lược', desc: 'Xây dựng ma trận nội dung, thiết kế hành trình phễu (Customer Funnel), lên ngân sách dự kiến.' },
              { step: '03', title: 'A/B Testing', desc: 'Chia nhỏ chiến dịch chạy thử nghiệm nhiều nội dung/tệp khách để tìm ra "Winning Camp".' },
              { step: '04', title: 'Scale & Tối Ưu', desc: 'Dồn ngân sách vào mẫu hiệu quả, loại trừ tệp rác để tối đa hóa doanh thu và giữ vững ROI.' }
            ].map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 150} className="relative text-center group">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-black mb-8 relative z-10 transition-all duration-500 ${i === 3 ? 'bg-brand-900 text-white shadow-xl shadow-brand-900/30' : 'bg-white text-brand-300 border-4 border-brand-100 group-hover:border-brand-300 group-hover:text-brand-900'}`}>
                  {p.step}
                </div>
                <h3 className="text-xl font-bold text-brand-950 mb-3">{p.title}</h3>
                <p className="text-brand-500 text-sm leading-relaxed px-2">{p.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 px-6 bg-white border-y border-brand-100">
        <ScrollReveal className="max-w-5xl mx-auto bg-brand-950 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/40 via-brand-950 to-brand-950"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Báo Cáo Hiệu Quả <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-lime-400">Minh Bạch Real-Time</span>
            </h2>
            <p className="text-xl text-brand-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Khách hàng được cấp quyền theo dõi trực tiếp các chỉ số (Chi tiêu, CPM, CTR, CPA) trên Dashboard ngay trong thời gian thực.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact" 
                state={{ service: 'Nhận Tư Vấn Ads' }} 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-950 hover:bg-brand-50 px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1"
              >
                Liên Hệ Lên Camp Ngay
              </Link>
              <a 
                href="https://zalo.me/0336280602" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-xl text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all backdrop-blur-md"
              >
                Nhắn tin Zalo
              </a>
            </div>
            <p className="text-sm text-brand-400 mt-8 opacity-80">
              * MinhQuang28 cam kết tư vấn chiến lược hoàn toàn miễn phí trước khi hợp tác.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default AdsService;
