import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [siteSettings, setSiteSettings] = useState<{siteName: string, logoUrl: string} | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSiteSettings({ siteName: data.siteName, logoUrl: data.logoUrl });
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive 
        ? 'bg-brand-900 text-white shadow-md' 
        : 'text-brand-600 hover:bg-brand-100 hover:text-brand-900'
    }`;

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-brand-100 flex flex-col shrink-0">
        <div className="p-6 border-b border-brand-100">
          <div className="flex items-center gap-2 mb-1">
            {siteSettings?.logoUrl ? (
              <img src={siteSettings.logoUrl} alt={siteSettings?.siteName || 'Logo'} className="h-8 object-contain" />
            ) : (
              <h2 className="text-xl font-bold text-brand-950 truncate">{siteSettings?.siteName || 'MinhQuang28'}</h2>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">Cổng Quản Trị</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin" end className={navClass}>
            Tổng Quan
          </NavLink>
          <NavLink to="/admin/projects" className={navClass}>
            Giao Diện
          </NavLink>
          <NavLink to="/admin/posts" className={navClass}>
            Bài Viết
          </NavLink>
          <NavLink to="/admin/contacts" className={navClass}>
            Liên Hệ
          </NavLink>
          <NavLink to="/admin/orders" className={navClass}>
            Đơn Hàng
          </NavLink>
          <NavLink to="/admin/home-settings" className={navClass}>
            Cài Đặt Trang Chủ
          </NavLink>
          <NavLink to="/admin/settings" className={navClass}>
            Cài Đặt Hệ Thống
          </NavLink>
        </nav>

        <div className="p-4 border-t border-brand-100 bg-brand-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img src={user?.photoURL || ''} alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-950 truncate">{user?.displayName}</p>
              <p className="text-xs text-brand-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-center"
          >
            Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
