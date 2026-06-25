import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from '../../components/common/Toast';

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  phone: string;
  email: string;
  facebook: string;
  zalo: string;
  footerDescription: string;
  address: string;
  // SEO & Tracking
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  trackingHeader?: string;
  trackingBody?: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'MinhQuang28',
  logoUrl: '',
  phone: '0865151136',
  email: 'lmquang28@gmail.com',
  facebook: 'https://www.facebook.com/minhquang28.ga/',
  zalo: '0865151136',
  footerDescription: 'MinhQuang28 chuyên cung cấp Source Code Website cao cấp và Giải pháp Quảng Cáo đa nền tảng tối ưu tỷ lệ chuyển đổi.',
  address: 'Hà Nội, Việt Nam',
  metaTitle: 'Web Agency - Premium Templates & Services',
  metaDescription: 'MinhQuang28 mang đến giải pháp Website High-end và Performance Ads giúp doanh nghiệp tự động hóa cỗ máy kiếm tiền.',
  metaKeywords: 'Thiết kế website, Chạy quảng cáo, Performance Ads',
  ogImage: '',
  trackingHeader: '',
  trackingBody: ''
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettings);
        } else {
          // Initialize default if not exists
          await setDoc(docRef, { ...defaultSettings, updatedAt: serverTimestamp() });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        ...settings,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Đã lưu cài đặt thành công!');
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error('Lỗi khi lưu cài đặt. Vui lòng kiểm tra console.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-brand-500">Đang tải cài đặt...</div>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-950">Cài Đặt Hệ Thống</h1>
        <p className="text-sm text-brand-500 mt-1">Quản lý các thông tin cấu hình chung của website (Chân trang, Liên hệ, v.v.).</p>
      </header>

      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-6 max-w-3xl">
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4">Thông Tin Thương Hiệu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Tên Website (Thương Hiệu)</label>
              <input className="input-field" value={settings.siteName || ''} onChange={e => setSettings({...settings, siteName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Logo (URL ảnh - Để trống sẽ dùng chữ)</label>
              <input type="url" className="input-field" value={settings.logoUrl || ''} onChange={e => setSettings({...settings, logoUrl: e.target.value})} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4 mt-8">Thông Tin Liên Hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Số Điện Thoại</label>
              <input className="input-field" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Số Zalo</label>
              <input className="input-field" value={settings.zalo} onChange={e => setSettings({...settings, zalo: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" className="input-field" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Đường dẫn Facebook (URL)</label>
              <input type="url" className="input-field" value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Địa chỉ</label>
              <input className="input-field" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4">Chi tiết Thương hiệu</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Mô tả Chân trang</label>
              <textarea 
                className="input-field" 
                rows={3} 
                value={settings.footerDescription} 
                onChange={e => setSettings({...settings, footerDescription: e.target.value})} 
                required 
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4">Tối ưu SEO (Tìm kiếm)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Thẻ Tiêu đề (Meta Title)</label>
              <input className="input-field" value={settings.metaTitle || ''} onChange={e => setSettings({...settings, metaTitle: e.target.value})} placeholder="VD: Công ty TNHH MinhQuang28" />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Thẻ Mô tả (Meta Description)</label>
              <textarea className="input-field" rows={2} value={settings.metaDescription || ''} onChange={e => setSettings({...settings, metaDescription: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Từ khoá (Meta Keywords - Phân cách bằng dấu phẩy)</label>
              <input className="input-field" value={settings.metaKeywords || ''} onChange={e => setSettings({...settings, metaKeywords: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Ảnh chia sẻ Facebook/Zalo (OG Image URL)</label>
              <input type="url" className="input-field" value={settings.ogImage || ''} onChange={e => setSettings({...settings, ogImage: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Tracking Scripts */}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4">Mã Theo Dõi (Tracking Scripts)</h2>
          <div className="p-4 bg-sky-50 text-sky-800 rounded-xl text-sm mb-4 border border-sky-100">
            <strong>Lưu ý:</strong> Dán nguyên bản đoạn mã <code>&lt;script&gt;...&lt;/script&gt;</code> được cấp bởi Google Analytics, Facebook Pixel hoặc TikTok Pixel.
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Mã chèn vào thẻ &lt;head&gt; (Khuyên dùng cho Meta Pixel, GA4, GTM)</label>
              <textarea className="input-field font-mono text-xs" rows={4} value={settings.trackingHeader || ''} onChange={e => setSettings({...settings, trackingHeader: e.target.value})} placeholder="<script>...</script>" />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Mã chèn vào thẻ &lt;body&gt; (Thường dùng cho GTM noscript hoặc Livechat)</label>
              <textarea className="input-field font-mono text-xs" rows={4} value={settings.trackingBody || ''} onChange={e => setSettings({...settings, trackingBody: e.target.value})} placeholder="<noscript>...</noscript>" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-100 flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary px-8">
            {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
