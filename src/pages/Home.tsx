import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, doc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ScrollReveal } from '../components/common/ScrollReveal';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [homeSettings, setHomeSettings] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'homepage'));
        if (settingsDoc.exists()) {
          setHomeSettings(settingsDoc.data());
        }

        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const data: any[] = [];
        snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
        setFeaturedProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col bg-brand-50 pb-24 font-sans selection:bg-sky-500/30">
      {/* 1. HERO SECTION - LIGHT PREMIUM */}
      <section className="relative px-4 sm:px-6 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-brand-50 text-brand-950 border-b border-brand-100">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-brand-50 to-brand-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <ScrollReveal className="max-w-6xl mx-auto text-center relative z-10 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/60 backdrop-blur-md text-brand-900 border border-white shadow-sm mb-2 md:mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase">Premium Digital Agency</span>
          </div>
          
          <h1 className="text-brand-950 text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1.1] md:leading-[1.05]">
            {homeSettings?.heroTitle1 || 'Kiến Tạo Thương Hiệu'} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">
              {homeSettings?.heroTitle2 || 'Đột Phá Doanh Thu'}
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-2xl text-brand-500 max-w-3xl mx-auto leading-relaxed font-light mt-6 md:mt-8 px-2"
            dangerouslySetInnerHTML={{ __html: homeSettings?.heroDescription || 'MinhQuang28 mang đến giải pháp <strong class="text-brand-900 font-bold">Website High-end</strong> và <strong class="text-brand-900 font-bold">Performance Ads</strong> giúp doanh nghiệp tự động hóa cỗ máy kiếm tiền.' }}
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 md:pt-10">
            <Link 
              to="/projects" 
              className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-brand-900 text-white px-8 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all shadow-xl shadow-brand-900/20 hover:bg-brand-950 hover:-translate-y-1"
            >
              <span className="relative flex items-center gap-2">
                Khám Phá Giao Diện
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-900 px-8 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg border border-brand-200 hover:bg-brand-50 transition-colors shadow-sm"
            >
              Liên Hệ Nhận Báo Giá
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* INFINITE MARQUEE */}
      <section className="py-8 md:py-12 bg-brand-50 border-b border-brand-200 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-50 to-transparent z-10"></div>
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 md:gap-16 px-4 md:px-8 items-center justify-center text-brand-900/40 font-black text-2xl md:text-4xl uppercase tracking-widest whitespace-pre">
              {homeSettings?.marqueeText || '★ Website Anti-Slop ★ Hiệu Suất Tối Đa ★ Performance Marketing ★ Data Driven ★ UI/UX Sang Trọng'}
            </div>
          ))}
        </div>
      </section>

      {/* BENTO GRID SERVICES */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <ScrollReveal className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-900 font-bold uppercase tracking-wider text-xs md:text-sm mb-2 md:mb-4">
            Dịch Vụ Nổi Bật
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-brand-950 tracking-tight">Hệ Sinh Thái Giải Pháp</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[300px]">
          {/* Bento Box 1: Web Templates (Large) */}
          <ScrollReveal delay={100} className="md:col-span-2 h-full">
            <Link to="/projects" className="group h-full relative rounded-[1.5rem] md:rounded-[2rem] bg-white border border-brand-200 p-6 md:p-10 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 block">
              <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-sky-100 to-transparent rounded-full opacity-50 -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shadow-inner mb-6 md:mb-0">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 text-brand-950 group-hover:text-sky-600 transition-colors">Premium Web Templates</h3>
                  <p className="text-brand-500 text-base md:text-lg leading-relaxed max-w-xl">
                    Sở hữu kho giao diện độc quyền được thiết kế may đo tỉ mỉ, tuân thủ nghiêm ngặt nguyên lý UI/UX hiện đại. Tối ưu hóa hiệu suất tải trang đạt điểm tuyệt đối, kiến trúc chuẩn SEO giúp doanh nghiệp xây dựng nền tảng số chuyên nghiệp và bứt phá thứ hạng tìm kiếm.
                  </p>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Bento Box 2: Ads Services (Tall) */}
          <ScrollReveal delay={200} className="md:row-span-2 h-full">
            <Link to="/services/ads" className="group h-full block relative rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-lime-50 to-sky-50 text-brand-950 p-6 md:p-10 overflow-hidden shadow-sm border border-brand-200 hover:shadow-2xl hover:border-lime-200 hover:-translate-y-1 transition-all duration-500 min-h-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-to-tl from-lime-400/20 to-sky-400/20 rounded-full blur-[50px] opacity-50 translate-y-1/4 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white text-lime-600 flex items-center justify-center border border-lime-100 shadow-sm mb-6 md:mb-auto">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-5 text-brand-950">Performance Marketing</h3>
                  <p className="text-brand-600 text-base md:text-lg leading-relaxed">
                    Giải pháp quảng cáo đa kênh toàn diện (Google, Meta, TikTok) tập trung vào tối đa hóa tỷ suất hoàn vốn (ROAS). Ứng dụng Data-driven để liên tục tối ưu tệp khách hàng, tinh chỉnh thông điệp và giảm thiểu chi phí CPA, cam kết mang lại doanh thu thực tế.
                  </p>
                  <div className="mt-8 md:mt-10 inline-flex items-center gap-2 font-bold text-sky-600 group-hover:translate-x-2 transition-transform">
                    Chi tiết dịch vụ <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Bento Box 3: Setup & Optimization */}
          <ScrollReveal delay={300} className="h-full">
            <div className="group h-full relative rounded-[1.5rem] md:rounded-[2rem] bg-white border border-brand-200 p-6 md:p-8 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-brand-950">Conversion Rate Optimization</h3>
                <p className="text-brand-500 text-sm md:text-base leading-relaxed">Tinh chỉnh từng điểm chạm kỹ thuật số và nâng cấp luồng trải nghiệm UI/UX. Loại bỏ các rào cản thao tác nhằm giữ chân người dùng và thúc đẩy tỷ lệ chuyển đổi đơn hàng lên mức cao nhất.</p>
              </div>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-32 h-32 md:w-40 md:h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Box 4: Analytics */}
          <ScrollReveal delay={400} className="h-full">
            <div className="group h-full relative rounded-[1.5rem] md:rounded-[2rem] bg-sky-50 border border-sky-100 p-6 md:p-8 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-sky-900">Data Analytics & Tracking</h3>
                <p className="text-sky-700/80 text-sm md:text-base leading-relaxed">Xây dựng hệ thống đo lường chuẩn xác với Google Analytics 4, Meta Pixel và Tag Manager. Cung cấp báo cáo đa chiều giúp doanh nghiệp ra quyết định chiến lược dựa trên dữ liệu thực tế.</p>
              </div>
              <div className="absolute right-4 bottom-4 text-sky-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NEW SECTION 1: DỊCH VỤ WEB TEMPLATES */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-white border-y border-brand-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <ScrollReveal>
              <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 font-bold uppercase tracking-wider text-xs md:text-sm mb-4">
                Website High-End
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-950 tracking-tight">Kho Giao Diện Độc Quyền</h2>
              <p className="text-brand-500 text-lg mt-4 max-w-2xl">Mỗi template là một tác phẩm nghệ thuật tối ưu hóa tỷ lệ chuyển đổi, được Code tay hoàn toàn trên nền tảng React & Tailwind.</p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link to="/projects" className="inline-flex items-center gap-2 font-bold text-sky-600 hover:text-sky-800 transition-colors bg-sky-50 px-6 py-3 rounded-xl border border-sky-100 hover:bg-sky-100">
                Xem Tất Cả Giao Diện <span aria-hidden="true">&rarr;</span>
              </Link>
            </ScrollReveal>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-brand-50 rounded-[2rem] aspect-[4/3]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((p, idx) => (
                <ScrollReveal key={p.id} delay={idx * 150}>
                  <div className="group flex flex-col bg-white rounded-3xl border border-brand-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                      <img src={p.image || 'https://via.placeholder.com/800x600'} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-brand-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to="/projects" className="bg-white text-brand-950 px-6 py-3 rounded-full font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Chi tiết
                        </Link>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-brand-950 line-clamp-1">{p.title}</h3>
                        <span className="text-lg font-black text-sky-600 shrink-0 ml-4">{p.price}</span>
                      </div>
                      <p className="text-brand-500 text-sm line-clamp-2 leading-relaxed">
                        {p.description?.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEW SECTION 2: PERFORMANCE MARKETING */}
      <section className="py-24 md:py-32 px-4 sm:px-8 relative bg-white overflow-hidden rounded-[2.5rem] md:rounded-[3rem] mx-4 sm:mx-6 my-12 md:my-20 shadow-xl shadow-brand-200/50 border border-brand-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200 font-bold uppercase tracking-wider text-xs md:text-sm mb-6">
              Performance Marketing
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-brand-950">
              Tối Đa Hóa <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">Tỷ Lệ Chuyển Đổi</span>
            </h2>
            <p className="text-brand-600 text-lg md:text-xl leading-relaxed mb-10 font-light">
              Chúng tôi không đo lường thành công bằng số lượt nhấp chuột. Chúng tôi đo lường bằng <strong className="text-brand-900 font-bold">Doanh Thu Thực Tế</strong>. Triển khai quảng cáo đa kênh với sự minh bạch tuyệt đối.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="group bg-brand-50 border border-brand-100 rounded-[1.5rem] p-6 hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="text-3xl font-black text-lime-600 mb-3">Google</div>
                <div className="text-sm font-medium text-brand-500 group-hover:text-brand-700 transition-colors">Đón đầu nhu cầu tìm kiếm, tối ưu phễu cuối để chốt đơn ngay lập tức.</div>
              </div>
              <div className="group bg-brand-50 border border-brand-100 rounded-[1.5rem] p-6 hover:bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="text-3xl font-black text-sky-600 mb-3">Meta</div>
                <div className="text-sm font-medium text-brand-500 group-hover:text-brand-700 transition-colors">Kích thích nhu cầu tiềm ẩn, Retargeting bám đuổi khách hàng mạnh mẽ.</div>
              </div>
            </div>

            <Link to="/services/ads" className="inline-flex items-center gap-3 bg-brand-900 text-white px-8 py-4 md:py-5 rounded-2xl font-black text-lg hover:bg-brand-950 transition-all shadow-xl shadow-brand-900/20 hover:scale-105">
              Khám Phá Dịch Vụ Ads
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={200} className="relative mt-8 lg:mt-0">
            {/* Glowing orb behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-sky-400/30 to-lime-400/30 blur-3xl rounded-full opacity-50 mix-blend-multiply pointer-events-none"></div>
            
            <div className="relative rounded-[2.5rem] border border-white bg-white/80 backdrop-blur-2xl p-8 md:p-12 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-brand-100">
                <h3 className="text-2xl font-black text-brand-950">Báo Cáo Hiệu Quả</h3>
                <div className="flex gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-sm"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-sm"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-sm"></span>
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  { label: 'Ngân sách chi tiêu', value: '150,000,000đ', progress: '100%', color: 'from-brand-300 to-brand-400' },
                  { label: 'Doanh thu đem lại', value: '680,500,000đ', progress: '85%', color: 'from-lime-400 to-lime-500 shadow-md' },
                  { label: 'Chi phí trên 1 Đơn (CPA)', value: '35,000đ', progress: '30%', color: 'from-sky-400 to-sky-500' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-brand-500 font-medium text-sm md:text-base">{stat.label}</span>
                      <span className="text-brand-950 font-black text-xl md:text-2xl tracking-tight">{stat.value}</span>
                    </div>
                    <div className="w-full h-3 md:h-4 bg-brand-50 rounded-full overflow-hidden border border-brand-100">
                      <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`} style={{ width: stat.progress }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-brand-100 text-center">
                <div className="inline-block px-5 py-2.5 bg-lime-50 rounded-xl border border-lime-100">
                  <p className="text-base md:text-lg text-lime-700 font-bold tracking-wider">★ ROAS Trung bình: <span className="text-lime-900">4.5x</span></p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NEW SECTION 3: E-COMMERCE GROWTH PARTNER */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <ScrollReveal>
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 font-bold uppercase tracking-wider text-xs md:text-sm mb-4">
                E-Commerce Solutions
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-950 tracking-tight mb-4">
                Đế Chế <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-sky-500">Thương Mại Điện Tử</span>
              </h2>
              <p className="text-brand-500 text-lg max-w-3xl mx-auto">
                Không chỉ làm web, chúng tôi xây dựng cho bạn một cỗ máy bán lẻ trực tuyến hoàn chỉnh. Từ việc setup cửa hàng chuẩn UX/UI đến việc vít Ads bùng nổ doanh số.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1: Build */}
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-brand-50 rounded-[2rem] p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-brand-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-brand-950 mb-4">Xây Dựng Store</h3>
                <p className="text-brand-600 leading-relaxed flex-grow">Thiết kế & lập trình Website TMĐT cao cấp (Shopify, WooCommerce, Custom Build). Chuẩn hóa phễu thanh toán (Checkout flow) mượt mà không độ trễ.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-500">UI/UX Tối ưu</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-500">Payment Gateway</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Ads */}
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-purple-900 rounded-[2rem] p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-500 text-white">
                <div className="absolute inset-0 bg-grid-pattern-dark opacity-10"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6 text-purple-300 relative z-10 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 relative z-10">E-com Performance Ads</h3>
                <p className="text-purple-200 leading-relaxed flex-grow relative z-10">Triển khai Catalog Ads, Dynamic Retargeting, Google Shopping, và TikTok Shop Ads. Đuổi bám khách hàng mọi ngóc ngách internet cho đến khi ra đơn.</p>
                <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-100">Dynamic Ads</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-100">ROAS Focus</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Scale */}
            <ScrollReveal delay={300} className="h-full">
              <div className="bg-sky-50 rounded-[2rem] p-8 h-full flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-sky-100">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-sky-600 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-brand-950 mb-4">Vận Hành & Scale</h3>
                <p className="text-brand-600 leading-relaxed flex-grow">Tích hợp hệ thống CRM, Email Marketing tự động (Klaviyo), khôi phục giỏ hàng bị bỏ rơi (Abandoned Cart). Giúp tăng Life-Time Value của khách hàng.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-sky-700">Automation</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-sky-700">Retention</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BRAND ETHOS / WHY US */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-brand-50 border-y border-brand-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal delay={100} className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-lime-400 rounded-[2rem] md:rounded-[2.5rem] rotate-3 md:rotate-6 opacity-30 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                alt="Data Analysis" 
                loading="lazy"
                className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] border border-brand-100 shadow-2xl w-full object-cover aspect-square md:aspect-auto md:h-[600px] hover:scale-[1.02] transition-transform duration-700"
              />
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 z-20 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-brand-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-lime-100 text-lime-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <div>
                    <p className="text-xl md:text-3xl font-black text-brand-950">{homeSettings?.statNumber || '+300%'}</p>
                    <p className="text-[10px] md:text-sm font-bold text-brand-500 uppercase">{homeSettings?.statLabel || 'Tăng Trưởng'}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="order-1 md:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-900 font-bold uppercase tracking-wider text-xs md:text-sm mb-4 md:mb-6">
                Lợi Thế Cạnh Tranh
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight tracking-tight text-brand-950">
                Data-Driven & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-lime-500">Anti-slop Design</span>
              </h2>
              <p className="text-brand-500 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 font-light">
                Chúng tôi không vẽ vời những mỹ từ sáo rỗng. Mọi thiết kế đều phục vụ một mục đích duy nhất: <strong className="font-bold text-brand-950">Tối đa hóa lợi nhuận cho bạn.</strong>
              </p>
              
              <ul className="space-y-6 md:space-y-8">
                {[
                  { title: 'Tập trung vào Chuyển Đổi', desc: 'Không làm giao diện rườm rà. Thiết kế UI/UX theo hành vi người mua hàng thực tế.' },
                  { title: 'Minh bạch Ngân Sách', desc: 'Report Real-time cho mọi chiến dịch Ads. Bạn biết rõ từng đồng được tiêu vào đâu.' },
                  { title: 'Tối ưu Tốc Độ', desc: 'Website load < 2s. Không để rớt khách hàng chỉ vì mạng chậm.' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 md:gap-5 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0 border border-brand-200 group-hover:bg-brand-900 group-hover:text-white transition-colors duration-300">
                      <span className="font-black text-sm md:text-base">{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-brand-950 mb-1">{item.title}</h4>
                      <p className="text-brand-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA - FLOATING CARD */}
      <section className="py-16 md:py-32 px-4 sm:px-6 bg-brand-50">
        <ScrollReveal delay={100} className="max-w-5xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl border border-brand-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-sky-400/10 to-lime-400/10 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-brand-950 tracking-tighter">Bạn đã sẵn sàng?</h2>
            <p className="text-brand-500 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Bứt phá doanh thu ngay hôm nay với hệ sinh thái giải pháp toàn diện: <strong className="font-bold text-brand-900">Phát triển Website High-end</strong>, <strong className="font-bold text-brand-900">Performance Marketing (FB, Google, TikTok, Shopee)</strong> và <strong className="font-bold text-brand-900">E-Commerce Growth</strong>.
            </p>
            <div className="pt-4 md:pt-8">
              <Link to="/contact" className="group inline-flex items-center justify-center gap-3 md:gap-4 w-full sm:w-auto bg-brand-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-xl shadow-brand-900/20 hover:bg-brand-950">
                Bắt đầu dự án
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
