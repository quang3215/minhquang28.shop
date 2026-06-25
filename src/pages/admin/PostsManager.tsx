import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from '../../components/common/Toast';

interface Post {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[] | string;
  coverImage?: string;
}

const PostsManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Post>({ title: '', slug: '', summary: '', content: '', tags: '', coverImage: '' });

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Post[] = [];
      snapshot.forEach((doc) => {
        const postData = doc.data();
        data.push({ 
          id: doc.id, 
          ...postData,
          tags: Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags
        } as Post);
      });
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteDoc(doc(db, 'posts', itemToDelete));
    } catch (err) {
      console.error(err);
    } finally {
      setItemToDelete(null);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id!);
    setFormData(post);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags;
        
      const postToSave = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        content: formData.content,
        tags: tagsArray,
        coverImage: formData.coverImage || ''
      };

      if (editingId) {
        await updateDoc(doc(db, 'posts', editingId), postToSave);
      } else {
        await addDoc(collection(db, 'posts'), { ...postToSave, createdAt: serverTimestamp() });
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', slug: '', summary: '', content: '', tags: '', coverImage: '' });
      toast.success('Lưu bài viết thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi lưu bài viết');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', slug: '', summary: '', content: '', tags: '', coverImage: '' });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Quản Lý Bài Viết</h1>
          <p className="text-sm text-brand-500 mt-1">Quản lý tin tức và bài viết chia sẻ.</p>
        </div>
        <button onClick={() => showForm ? cancelForm() : setShowForm(true)} className="btn-primary py-2 px-4 text-sm">
          {showForm ? 'Hủy' : 'Viết Bài Mới'}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Chỉnh Sửa Bài Viết' : 'Viết Bài Mới'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Tiêu đề" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <input className="input-field" placeholder="Đường dẫn (VD: my-post-title)" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Thẻ tag (cách nhau bởi dấu phẩy)" value={formData.tags as string} onChange={e => setFormData({...formData, tags: e.target.value})} />
            <input className="input-field" placeholder="URL Ảnh Bìa (Cover Image)" type="url" value={formData.coverImage || ''} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
          </div>
          <textarea className="input-field" placeholder="Tóm tắt" rows={2} required value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
          <textarea className="input-field font-mono text-sm" placeholder="Nội dung (Hỗ trợ Markdown)..." rows={10} required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          <button type="submit" className="btn-secondary w-full py-3 mt-4">{editingId ? 'Cập Nhật Bài Viết' : 'Xuất Bản Bài Viết'}</button>
        </form>
      )}

      {loading ? (
        <div className="py-10 text-center text-brand-500">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm">
          <ul className="divide-y divide-brand-50">
            {posts.map(p => (
              <li key={p.id} className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-brand-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-brand-950 mb-1 truncate">{p.title}</h3>
                  <p className="text-sm text-brand-500 line-clamp-1">{p.summary}</p>
                </div>
                <div className="shrink-0 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1.5 text-xs font-semibold bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-100 transition-colors">Sửa</button>
                  <button onClick={() => handleDelete(p.id!)} className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">Xóa</button>
                </div>
              </li>
            ))}
            {posts.length === 0 && <li className="p-6 text-center text-brand-500">Không có bài viết nào.</li>}
          </ul>
        </div>
      )}

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Xóa Bài Viết"
        message="Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default PostsManager;
