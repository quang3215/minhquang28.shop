import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform scale-100 transition-transform animate-in zoom-in-95 duration-200">
        <div className="p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          
          <h3 className="text-2xl font-black text-brand-950 mb-3">{title}</h3>
          <p className="text-brand-500 text-base leading-relaxed mb-8">
            {message}
          </p>
          
          <div className="flex gap-3 justify-center">
            <button 
              onClick={onCancel}
              className="px-6 py-3 font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors flex-1"
            >
              {cancelText}
            </button>
            <button 
              onClick={onConfirm}
              className="px-6 py-3 font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 rounded-xl transition-colors flex-1"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
