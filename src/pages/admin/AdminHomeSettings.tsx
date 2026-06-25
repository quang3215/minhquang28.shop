import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from '../../components/common/Toast';

interface HomeSettings {
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  marqueeText: string;
  statNumber: string;
  statLabel: string;
}

const defaultHomeSettings: HomeSettings = {
  heroTitle1: 'Kiến Tạo Thương Hiệu',
  heroTitle2: 'Đột Phá Doanh Thu',
  heroDescription: 'MinhQuang28 mang đến giải pháp Website High-end và Performance Ads giúp doanh nghiệp tự động hóa cỗ máy kiếm tiền.',
  marqueeText: '★ Website Anti-Slop ★ Hiệu Suất Tối Đa ★ Performance Marketing ★ Data Driven ★ UI/UX Sang Trọng',
  statNumber: '+300%',
  statLabel: 'Tăng Trưởng'
};

const AdminHomeSettings = () => {
  const [settings, setSettings] = useState<HomeSettings>(defaultHomeSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'homepage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as HomeSettings);
        } else {
          await setDoc(docRef, { ...defaultHomeSettings, updatedAt: serverTimestamp() });
        }
      } catch (error) {
        console.error("Error fetching home settings:", error);
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
      await setDoc(doc(db, 'settings', 'homepage'), {
        ...settings,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast.success('Đã lưu cấu hình trang chủ thành công!');
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error('Lỗi khi lưu cấu hình. Vui lòng kiểm tra console.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-brand-500">Đang tải cấu hình trang chủ...</div>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-950">Cài Đặt Trang Chủ</h1>
        <p className="text-sm text-brand-500 mt-1">Điều chỉnh các nội dung nổi bật hiển thị trên Trang Chủ.</p>
      </header>

      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-8 max-w-3xl">
        {/* HERO SECTION */}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4 pb-2 border-b border-brand-100">1. Hero Section (Phần đầu trang)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Tiêu đề dòng 1 (Chữ đen)</label>
              <input 
                className="input-field" 
                value={settings.heroTitle1} 
                onChange={e => setSettings({...settings, heroTitle1: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Tiêu đề dòng 2 (Chữ màu Gradient)</label>
              <input 
                className="input-field" 
                value={settings.heroTitle2} 
                onChange={e => setSettings({...settings, heroTitle2: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Đoạn mô tả ngắn (Phụ đề)</label>
              <textarea 
                className="input-field" 
                rows={3}
                value={settings.heroDescription} 
                onChange={e => setSettings({...settings, heroDescription: e.target.value})} 
                required 
              />
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4 pb-2 border-b border-brand-100">2. Dải chữ chạy (Marquee)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Nội dung chữ chạy dọc màn hình</label>
              <input 
                className="input-field" 
                placeholder="VD: ★ Điểm 1 ★ Điểm 2..."
                value={settings.marqueeText} 
                onChange={e => setSettings({...settings, marqueeText: e.target.value})} 
                required 
              />
              <p className="text-xs text-brand-400 mt-2">Gợi ý: Sử dụng biểu tượng ★ hoặc • giữa các từ khoá để phân cách.</p>
            </div>
          </div>
        </div>

        {/* FLOATING STAT */}
        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-4 pb-2 border-b border-brand-100">3. Chỉ số nổi bật (Khối hình ảnh)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Con số (VD: +300%)</label>
              <input 
                className="input-field font-black" 
                value={settings.statNumber} 
                onChange={e => setSettings({...settings, statNumber: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Nhãn mô tả (VD: Tăng Trưởng)</label>
              <input 
                className="input-field" 
                value={settings.statLabel} 
                onChange={e => setSettings({...settings, statLabel: e.target.value})} 
                required 
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary px-10 py-3 text-lg">
            {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHomeSettings;
