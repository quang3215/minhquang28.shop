import { useState, useRef, useEffect } from 'react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contactOptions = [
    {
      name: 'Gọi điện',
      href: 'tel:0336280602',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
      color: 'bg-green-500 text-white hover:bg-green-600',
    },
    {
      name: 'Zalo',
      href: 'https://zalo.me/0336280602',
      target: '_blank',
      icon: <span className="font-black text-lg">Z</span>,
      color: 'bg-blue-500 text-white hover:bg-blue-600',
    },
    {
      name: 'Email',
      href: 'mailto:lmquang28@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      color: 'bg-purple-500 text-white hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end" ref={menuRef}>
      {/* Menu Options */}
      <div 
        className={`flex flex-col gap-3 mb-4 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 visible' : 'scale-75 opacity-0 invisible pointer-events-none'
        }`}
      >
        {contactOptions.map((option, idx) => (
          <a
            key={option.name}
            href={option.href}
            target={option.target}
            rel={option.target === '_blank' ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 group"
            style={{ transitionDelay: `${(contactOptions.length - idx) * 50}ms` }}
          >
            <span className="px-3 py-1.5 bg-white text-brand-900 text-sm font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:-translate-x-0 transition-all duration-300">
              {option.name}
            </span>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform ${option.color}`}>
              {option.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-sky-600 hover:scale-110 transition-all duration-300 relative group"
        aria-label="Trợ giúp"
      >
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-sky-500 opacity-50 animate-ping"></span>
        )}
        
        {/* Icon transition */}
        <div className={`transition-transform duration-300 absolute ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <div className={`transition-transform duration-300 absolute ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingContact;
