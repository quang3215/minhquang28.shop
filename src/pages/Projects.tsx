import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useCart } from '../components/context/CartContext';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  demoUrl: string;
  description: string;
}

const ITEMS_PER_PAGE = 6;

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data: Project[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Project);
        });
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-brand-50 to-brand-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-brand-900 text-sm font-bold tracking-widest uppercase mb-8 border border-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Premium Selection
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-950 mb-6 tracking-tight leading-[1.1]">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </ScrollReveal>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24 relative z-10 w-full">
        {/* SLEEK CATEGORY FILTER */}
        <ScrollReveal delay={100} className="mb-12 md:mb-16">
          <div className="flex flex-wrap justify-center gap-3 p-2 bg-white rounded-full shadow-sm border border-brand-100 max-w-fit mx-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-brand-950 text-white shadow-md transform scale-105' 
                    : 'bg-transparent text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                }`}
              >
                {category === 'All' ? t('projects.all') : category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="text-center py-32">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-brand-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-brand-500 font-medium text-lg">{t('projects.loading')}</p>
          </div>
        ) : currentProjects.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2rem] border border-brand-100 shadow-sm">
            <div className="w-20 h-20 bg-brand-50 text-brand-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-brand-500 text-lg">Không tìm thấy giao diện nào cho danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {currentProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100} className="h-full">
                <div className="group h-full flex flex-col bg-white rounded-[2rem] border border-brand-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                    <img 
                      src={project.image || 'https://via.placeholder.com/800x600?text=Premium+Template'} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-brand-900 text-xs font-black uppercase tracking-widest rounded-lg shadow-sm border border-white">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-brand-950 transition-colors shadow-lg"
                        >
                          {t('projects.live_demo')}
                        </a>
                      )}
                      <Link 
                        to={`/projects/${project.id}`}
                        className="bg-sky-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/30"
                      >
                        {t('projects.view_details')}
                      </Link>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <Link to={`/projects/${project.id}`}>
                        <h3 className="text-xl md:text-2xl font-black text-brand-950 hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                          {project.title}
                        </h3>
                      </Link>
                      <span className="shrink-0 inline-flex items-center justify-center px-4 py-2 bg-lime-50 text-lime-700 rounded-xl font-black text-sm md:text-base border border-lime-100">
                        {project.price}
                      </span>
                    </div>
                    
                    <div className="mb-6 flex-grow">
                      <p className="text-brand-500 text-sm md:text-base line-clamp-2 leading-relaxed">
                        {project.description?.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-brand-50 flex gap-3">
                      <button 
                        onClick={() => addToCart({ id: project.id, title: project.title, price: project.price, image: project.image })}
                        className="w-12 h-12 shrink-0 bg-brand-50 hover:bg-sky-50 text-brand-600 hover:text-sky-600 border border-brand-100 hover:border-sky-200 rounded-xl flex items-center justify-center transition-all group/btn"
                        title={t('cart.add_to_cart')}
                      >
                        <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      </button>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="flex-1 bg-brand-950 hover:bg-brand-900 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-xl text-center flex items-center justify-center gap-2"
                      >
                        {t('projects.view_details')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-brand-100 bg-white text-brand-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand-950 hover:text-brand-950 hover:bg-brand-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-100 shadow-sm">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-black text-sm transition-all ${
                    currentPage === i + 1 
                      ? 'bg-brand-950 text-white shadow-md transform scale-110' 
                      : 'bg-transparent text-brand-500 hover:bg-brand-50 hover:text-brand-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-brand-100 bg-white text-brand-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand-950 hover:text-brand-950 hover:bg-brand-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
