import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ConfirmModal } from '../../components/common/ConfirmModal';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: string;
  createdAt: any;
}

const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Contact[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'new' ? 'done' : 'new';
    try {
      await updateDoc(doc(db, 'contacts', id), { status: newStatus });
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = (id: string) => {
    setContactToDelete(id);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;
    try {
      await deleteDoc(doc(db, 'contacts', contactToDelete));
      if (selectedContact?.id === contactToDelete) setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setContactToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Yêu Cầu Liên Hệ</h1>
          <p className="text-sm text-brand-500 mt-1">Quản lý các khách hàng tiềm năng từ form liên hệ.</p>
        </div>
      </header>

      {loading ? (
        <div className="py-10 text-center text-brand-500">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50/50 text-brand-500 border-b border-brand-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Ngày</th>
                  <th className="px-6 py-4 font-semibold">Khách hàng</th>
                  <th className="px-6 py-4 font-semibold">Dịch vụ</th>
                  <th className="px-6 py-4 font-semibold hidden md:table-cell">Tin nhắn</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {contacts.length === 0 ? (
                  <tr><td colSpan={6} className="p-6 text-center text-brand-400">Không có yêu cầu liên hệ nào.</td></tr>
                ) : contacts.map(c => (
                  <tr key={c.id} className="hover:bg-brand-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-brand-500">
                      {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Không rõ'}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brand-950">{c.name}</p>
                      {c.email && <p className="text-xs text-brand-500">{c.email}</p>}
                      <a href={`tel:${c.phone}`} className="text-xs text-sky-600 hover:underline block">{c.phone}</a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-brand-100 text-brand-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {c.service_type || 'Không rõ'}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[150px] truncate text-brand-600 hidden md:table-cell" title={c.message}>
                      {c.message || <span className="italic text-brand-300">Không có tin nhắn cụ thể</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleStatus(c.id, c.status || 'new')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${c.status === 'done' ? 'bg-lime-100 text-lime-700 hover:bg-lime-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                        title="Click to toggle status"
                      >
                        {c.status === 'done' ? '✓ Đã Xử Lý' : '● Chờ Xử Lý'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => setSelectedContact(c)}
                        className="text-brand-600 hover:text-brand-900 font-semibold text-sm transition-colors"
                      >
                        Xem
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm" onClick={() => setSelectedContact(null)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-brand-100 flex justify-between items-center bg-brand-50/50">
              <h2 className="text-xl font-bold text-brand-950">Chi tiết yêu cầu</h2>
              <button onClick={() => setSelectedContact(null)} className="text-brand-400 hover:text-brand-900 p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-brand-950 mb-1">{selectedContact.name}</h3>
                  <p className="text-brand-500 text-sm">
                    Gửi vào: {selectedContact.createdAt?.toDate ? selectedContact.createdAt.toDate().toLocaleString('vi-VN') : 'Không rõ'}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${selectedContact.status === 'done' ? 'bg-lime-100 text-lime-700' : 'bg-orange-100 text-orange-700'}`}>
                  {selectedContact.status === 'done' ? '✓ Đã Xử Lý' : '● Chờ Xử Lý'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-50 rounded-2xl">
                  <p className="text-xs font-bold text-brand-400 uppercase mb-1">Số Điện Thoại / Zalo</p>
                  <a href={`tel:${selectedContact.phone}`} className="text-lg font-bold text-sky-600 hover:underline">{selectedContact.phone}</a>
                </div>
                {selectedContact.email && (
                  <div className="p-4 bg-brand-50 rounded-2xl">
                    <p className="text-xs font-bold text-brand-400 uppercase mb-1">Email</p>
                    <a href={`mailto:${selectedContact.email}`} className="text-lg font-bold text-sky-600 hover:underline break-all">{selectedContact.email}</a>
                  </div>
                )}
                <div className="p-4 bg-brand-50 rounded-2xl col-span-2">
                  <p className="text-xs font-bold text-brand-400 uppercase mb-1">Dịch vụ quan tâm</p>
                  <p className="text-lg font-bold text-brand-950">{selectedContact.service_type || 'N/A'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-brand-400 uppercase mb-2">Nội dung tin nhắn</p>
                <div className="p-5 bg-white border border-brand-100 rounded-2xl text-brand-900 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message || <span className="italic text-brand-400">Khách hàng không cung cấp tin nhắn cụ thể.</span>}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-brand-100 bg-brand-50/50 flex gap-3 justify-end">
              <a href={`https://zalo.me/${selectedContact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors">
                Mở trong Zalo
              </a>
              <button 
                onClick={() => toggleStatus(selectedContact.id, selectedContact.status || 'new')}
                className={`px-5 py-2.5 font-bold rounded-xl transition-colors ${selectedContact.status === 'done' ? 'bg-white border border-brand-200 text-brand-600 hover:bg-brand-50' : 'bg-brand-900 text-white hover:bg-brand-950'}`}
              >
                {selectedContact.status === 'done' ? 'Đánh dấu Chưa Xử Lý' : 'Đánh dấu Đã Xử Lý'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!contactToDelete}
        title="Xóa Liên Hệ"
        message="Bạn có chắc chắn muốn xóa vĩnh viễn yêu cầu liên hệ này không? Dữ liệu sau khi xóa sẽ không thể khôi phục."
        confirmText="Xóa vĩnh viễn"
        onConfirm={confirmDelete}
        onCancel={() => setContactToDelete(null)}
      />
    </div>
  );
};

export default ContactsManager;
