import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { toast } from '../../components/common/Toast';

interface Project {
  id?: string;
  title: string;
  category: string;
  price: string;
  image: string;
  demoUrl: string;
  description: string;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({ title: '', category: 'E-commerce', price: '', image: '', demoUrl: '', description: '' });

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Project[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(data);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error: ", err);
      setError(err.message);
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
      await deleteDoc(doc(db, 'projects', itemToDelete));
    } catch (err) {
      console.error(err);
    } finally {
      setItemToDelete(null);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id!);
    setFormData(project);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), { ...formData });
      } else {
        await addDoc(collection(db, 'projects'), { ...formData, createdAt: serverTimestamp() });
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', category: 'E-commerce', price: '', image: '', demoUrl: '', description: '' });
      toast.success('Lưu giao diện thành công!');
    } catch (err) {
      console.error(err);
      toast.error('Lỗi khi lưu giao diện');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', category: 'E-commerce', price: '', image: '', demoUrl: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Quản Lý Giao Diện</h1>
          <p className="text-sm text-brand-500 mt-1">Quản lý các mẫu website mà bạn đang cung cấp.</p>
        </div>
        <button onClick={() => showForm ? cancelForm() : setShowForm(true)} className="btn-primary py-2 px-4 text-sm">
          {showForm ? 'Hủy' : 'Thêm Giao Diện Mới'}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-xl font-bold mb-4 md:col-span-2">{editingId ? 'Chỉnh Sửa Giao Diện' : 'Thêm Giao Diện Mới'}</h2>
          <input className="input-field" placeholder="Tên Giao Diện" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input className="input-field" placeholder="Danh mục (VD: Landing Page)" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          <input className="input-field" placeholder="Giá (VD: 5.000.000 VNĐ)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <input className="input-field" placeholder="Đường dẫn ảnh (URL)" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <input className="input-field" placeholder="Đường dẫn Demo (URL)" value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} />
          <textarea className="input-field md:col-span-2 font-mono text-sm" placeholder="Mô tả (Hỗ trợ thẻ HTML)" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <div className="md:col-span-2">
            <button type="submit" className="btn-secondary w-full py-2">{editingId ? 'Cập Nhật Giao Diện' : 'Lưu Giao Diện'}</button>
          </div>
        </form>
      )}

      {error ? (
        <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100">
          <p className="font-bold mb-2">Lỗi Cơ Sở Dữ Liệu</p>
          <p className="font-mono text-sm break-all">{error}</p>
          <p className="mt-4 text-sm">Vui lòng mở Developer Console (F12) để xem chi tiết lỗi, hoặc kiểm tra lại Security Rules trên Firebase.</p>
        </div>
      ) : loading ? (
        <div className="py-10 text-center text-brand-500">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm flex flex-col">
              <img src={p.image || 'https://via.placeholder.com/400x250?text=No+Image'} alt={p.title} className="w-full h-48 object-cover bg-brand-50" />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 bg-brand-50 px-2 py-1 rounded-md">{p.category}</span>
                  <span className="text-sm font-bold text-brand-900">{p.price}</span>
                </div>
                <h3 className="font-bold text-lg text-brand-950 mb-1">{p.title}</h3>
                <div 
                  className="text-sm text-brand-500 line-clamp-2 mb-4 flex-1 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => handleEdit(p)} className="flex-1 py-2 text-xs font-semibold bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-100 transition-colors">Sửa</button>
                  <button onClick={() => handleDelete(p.id!)} className="flex-1 py-2 text-xs font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Xóa Giao Diện"
        message="Bạn có chắc chắn muốn xóa giao diện này không? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default ProjectsManager;
