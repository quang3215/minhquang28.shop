import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [siteSettings, setSiteSettings] = useState<{siteName: string, logoUrl: string} | null>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSiteSettings({ siteName: data.siteName, logoUrl: data.logoUrl });
      }
    });
    return () => unsub();
  }, []);

  const toggleLanguage = () => {
    // Disabled as per user request
  };

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `text-sm font-medium transition-colors ${isActive ? 'text-brand-900' : 'text-brand-500 hover:text-brand-900'}`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => 
    `block text-lg font-bold py-3 border-b border-brand-100 transition-colors ${isActive ? 'text-brand-900' : 'text-brand-500'}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full border-b border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-[70] group">
            {siteSettings?.logoUrl ? (
              <img src={siteSettings.logoUrl} alt={siteSettings?.siteName || 'Logo'} className="h-8 md:h-10 object-contain group-hover:scale-105 transition-transform" />
            ) : (
              <span className="text-xl md:text-2xl font-black tracking-tight text-brand-950 group-hover:text-sky-600 transition-colors">
                {siteSettings?.siteName || 'MinhQuang28'}
              </span>
            )}
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/projects" className={linkClass}>{t('header.templates')}</NavLink>
            <NavLink to="/services/ads" className={linkClass}>{t('header.services')}</NavLink>
            <NavLink to="/blog" className={linkClass}>{t('header.blog')}</NavLink>
            
            <div className="flex items-center gap-2">
              <Link to="/track-order" className="p-2 text-brand-950 hover:text-brand-700 transition-colors" title={t('track_order.title')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </Link>
            
              <Link to="/cart" className="relative p-2 text-brand-950 hover:text-brand-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            <Link to="/contact" className="btn-primary py-2 px-4 text-sm">
              {t('header.contact')}
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-brand-950 z-[70] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`w-3/4 h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay (Outside header to avoid backdrop-filter stacking context issue) */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-50 transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-28 px-6 pb-8">
          <nav className="flex flex-col gap-2 flex-1">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Trang Chủ</NavLink>
            <NavLink to="/projects" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Kho Giao Diện (Templates)</NavLink>
            <NavLink to="/services/ads" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Dịch Vụ Quảng Cáo</NavLink>
            <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Blog Chia Sẻ</NavLink>
          </nav>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-brand-100 py-6 mb-2">
              <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-brand-950 font-bold hover:text-brand-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                {t('track_order.title')}
              </Link>
              
              <div className="flex items-center gap-4">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="relative p-2 text-brand-950 bg-brand-50 rounded-full hover:bg-brand-100 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full py-4 text-lg text-center flex justify-center shadow-xl"
            >
              {t('header.contact')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
