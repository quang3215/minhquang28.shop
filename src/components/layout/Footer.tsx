import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Footer = () => {
  const [settings, setSettings] = useState({
    phone: '0865151136',
    email: 'lmquang28@gmail.com',
    facebook: 'https://www.facebook.com/minhquang28.ga/',
    zalo: '0865151136',
    footerDescription: 'MinhQuang28 chuyên cung cấp Source Code Website cao cấp và Giải pháp Quảng Cáo đa nền tảng tối ưu tỷ lệ chuyển đổi.',
    address: 'Hà Nội, Việt Nam'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'general'));
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching footer settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="border-t border-brand-200 bg-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand Col */}
        <div className="md:col-span-12 lg:col-span-5 pr-0 lg:pr-8">
          <Link to="/" className="text-3xl font-black tracking-tight text-brand-950 block mb-6">
            MinhQuang<span className="text-sky-500">28</span>
          </Link>
          <p className="text-brand-500 text-lg leading-relaxed mb-8">
            {settings.footerDescription}
          </p>
          <div className="flex gap-4">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 hover:bg-sky-500 hover:text-white transition-colors duration-300 shadow-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href={`https://zalo.me/${settings.zalo.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-sm font-bold text-sm">
              Zalo
            </a>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-4 lg:col-span-2">
          <h4 className="font-black text-brand-950 mb-6 uppercase tracking-wider text-sm">Điều Hướng</h4>
          <ul className="space-y-4 font-medium text-brand-600">
            <li><Link to="/projects" className="hover:text-sky-600 transition-colors inline-block hover:translate-x-1 transform duration-300">Kho Giao Diện</Link></li>
            <li><Link to="/services/ads" className="hover:text-lime-600 transition-colors inline-block hover:translate-x-1 transform duration-300">Dịch Vụ Quảng Cáo</Link></li>
            <li><Link to="/services/clickguard" className="hover:text-sky-600 transition-colors inline-block hover:translate-x-1 transform duration-300">Hệ Thống ClickGuard</Link></li>
            <li><Link to="/blog" className="hover:text-sky-600 transition-colors inline-block hover:translate-x-1 transform duration-300">Blog Chia Sẻ</Link></li>
            <li><Link to="/contact" className="hover:text-sky-600 transition-colors inline-block hover:translate-x-1 transform duration-300">Liên Hệ</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-4 lg:col-span-2">
          <h4 className="font-black text-brand-950 mb-6 uppercase tracking-wider text-sm">Chính Sách</h4>
          <ul className="space-y-4 font-medium text-brand-600">
            <li><Link to="#" className="hover:text-brand-900 transition-colors inline-block hover:translate-x-1 transform duration-300">Chính sách bảo mật</Link></li>
            <li><Link to="#" className="hover:text-brand-900 transition-colors inline-block hover:translate-x-1 transform duration-300">Điều khoản dịch vụ</Link></li>
            <li><Link to="#" className="hover:text-brand-900 transition-colors inline-block hover:translate-x-1 transform duration-300">Chính sách hoàn tiền</Link></li>
          </ul>
        </div>

        {/* Contact Col */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="font-black text-brand-950 mb-6 uppercase tracking-wider text-sm">Thông tin Liên hệ</h4>
          <ul className="space-y-5 text-brand-600">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Hotline / Zalo</p>
                <a href={`tel:${settings.phone}`} className="font-bold text-brand-900 hover:text-sky-600 transition-colors text-lg">{settings.phone}</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Email Support</p>
                <a href={`mailto:${settings.email}`} className="font-bold text-brand-900 hover:text-sky-600 transition-colors truncate block">{settings.email}</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Địa chỉ</p>
                <span className="font-bold text-brand-900">{settings.address}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-100 flex flex-col md:flex-row justify-center items-center text-sm font-medium text-brand-400 text-center">
        <p>&copy; {new Date().getFullYear()} MinhQuang28. All rights reserved. | Coded & Optimized by Le Minh Quang.</p>
      </div>
    </footer>
  );
};

export default Footer;
