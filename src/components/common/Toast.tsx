import { useState, useEffect } from 'react';

export const toast = {
  success: (msg: string) => window.dispatchEvent(new CustomEvent('add-toast', { detail: { msg, type: 'success' } })),
  error: (msg: string) => window.dispatchEvent(new CustomEvent('add-toast', { detail: { msg, type: 'error' } })),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    const handleAdd = (e: any) => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, ...e.detail }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    };
    
    window.addEventListener('add-toast', handleAdd);
    return () => window.removeEventListener('add-toast', handleAdd);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className="px-5 py-3 rounded-2xl shadow-xl border bg-white animate-in slide-in-from-right-8 fade-in duration-300 flex items-center gap-3 min-w-[280px] pointer-events-auto"
        >
          {t.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100 shadow-sm">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
          )}
          <span className="font-bold text-sm text-brand-950">{t.msg}</span>
        </div>
      ))}
    </div>
  );
};
