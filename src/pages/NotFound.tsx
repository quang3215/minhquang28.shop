import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-6 pt-20 pb-12">
      <div className="max-w-2xl w-full text-center">
        <ScrollReveal>
          <div className="relative mb-10 inline-block">
            <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-lime-500 leading-none tracking-tighter drop-shadow-sm select-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-50/20 backdrop-blur-[2px] rounded-full pointer-events-none"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-brand-950 mb-6">
            Opps! Đường dẫn này không tồn tại
          </h2>
          
          <p className="text-lg text-brand-600 mb-10 max-w-lg mx-auto">
            Có vẻ như trang bạn đang tìm kiếm đã bị xóa, đổi tên hoặc chưa bao giờ tồn tại trên hệ thống của MinhQuang28.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/"
              className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Về Trang Chủ
            </Link>
            <Link 
              to="/projects"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-brand-100 text-brand-950 border border-brand-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Xem Kho Giao Diện
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default NotFound;
