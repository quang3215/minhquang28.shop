import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { POSTS } from '../../data/posts'; // local data to migrate
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from '../../components/common/Toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    contacts: 0
  });
  const [seeding, setSeeding] = useState(false);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postsSnap = await getDocs(collection(db, 'posts'));
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const contactsSnap = await getDocs(collection(db, 'contacts'));
        
        setStats({
          posts: postsSnap.size,
          projects: projectsSnap.size,
          contacts: contactsSnap.size
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, [seeding]);

  const handleSeedData = () => {
    setShowSeedConfirm(true);
  };

  const confirmSeedData = async () => {
    setShowSeedConfirm(false);
    setSeeding(true);
    try {
      for (const post of POSTS) {
        // Use the post.id as the document ID
        await setDoc(doc(db, 'posts', post.id), {
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          tags: post.tags,
          content: post.content,
          createdAt: post.createdAt, // Just string for now or convert to timestamp
        });
      }
      toast.success("Hoàn tất đẩy dữ liệu!");
    } catch (error) {
      console.error("Seed error:", error);
      toast.error("Lỗi khi đẩy dữ liệu");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-brand-950">Tổng Quan Hệ Thống</h1>
        <p className="text-brand-500 mt-2">Chào mừng bạn quay trở lại trang quản trị.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Tổng Giao Diện</h3>
          <p className="text-4xl font-bold text-brand-900 mt-2">{stats.projects}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Tổng Bài Viết</h3>
          <p className="text-4xl font-bold text-brand-900 mt-2">{stats.posts}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Yêu Cầu Liên Hệ</h3>
          <p className="text-4xl font-bold text-brand-900 mt-2">{stats.contacts}</p>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-brand-100 bg-white">
        <h2 className="text-xl font-bold text-brand-950 mb-4">Thao Tác Hệ Thống</h2>
        <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-brand-900">Đẩy Dữ Liệu Bài Viết Lên Database</h3>
            <p className="text-sm text-brand-500">Đưa các bài viết markdown cục bộ lên Firestore.</p>
          </div>
          <button 
            onClick={handleSeedData} 
            disabled={seeding}
            className="btn-secondary px-4 py-2"
          >
            {seeding ? 'Đang đẩy...' : 'Chạy Dữ Liệu'}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showSeedConfirm}
        title="Đẩy Dữ Liệu"
        message="Hành động này sẽ đẩy dữ liệu bài viết cục bộ lên Firestore. Bạn có muốn tiếp tục không?"
        confirmText="Chạy dữ liệu"
        onConfirm={confirmSeedData}
        onCancel={() => setShowSeedConfirm(false)}
      />
    </div>
  );
};

export default AdminDashboard;
