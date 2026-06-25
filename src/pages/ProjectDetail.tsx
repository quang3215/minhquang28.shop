import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleBuyNow = () => {
    if (project) {
      addToCart({ id: project.id, title: project.title, price: project.price, image: project.image });
      navigate('/cart');
    }
  };

  if (loading) {
    return <div className="pt-32 pb-20 text-center text-brand-500">{t('projects.loading')}</div>;
  }

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center text-brand-500">
        <h2 className="text-2xl font-bold mb-4">{t('project_detail.not_found')}</h2>
        <Link to="/projects" className="text-brand-900 underline">{t('project_detail.back_to_list')}</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 bg-brand-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm font-medium text-brand-500">
          <Link to="/" className="hover:text-brand-900 transition-colors">{t('header.home')}</Link>
          <span className="mx-2">/</span>
          <Link to="/projects" className="hover:text-brand-900 transition-colors">{t('header.templates')}</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-900">{project.category}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image & Demo */}
          <ScrollReveal>
            <div className="bg-white p-4 rounded-3xl border border-brand-100 shadow-xl overflow-hidden sticky top-32">
              <img 
                src={project.image || 'https://via.placeholder.com/800x600'} 
                alt={project.title} 
                className="w-full h-auto rounded-2xl object-cover"
              />
              {project.demoUrl && (
                <div className="mt-6 flex justify-center pb-2">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-brand-900 font-bold hover:text-brand-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    {t('projects.live_demo')}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right: Info & Actions */}
          <ScrollReveal delay={200}>
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-900 font-bold uppercase tracking-wider text-xs mb-6">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-brand-950 mb-6 tracking-tight">
                {project.title}
              </h1>
              <div className="text-4xl font-black text-brand-900 mb-8">
                {project.price}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => addToCart({ id: project.id, title: project.title, price: project.price, image: project.image })}
                  className="flex-1 px-8 py-4 rounded-xl border-2 border-brand-900 text-brand-900 font-bold text-lg hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  {t('cart.add_to_cart')}
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 rounded-xl bg-brand-900 text-white font-bold text-lg hover:bg-brand-950 transition-colors shadow-xl shadow-brand-900/20 hover:-translate-y-1"
                >
                  {t('cart.buy_now')}
                </button>
              </div>

              {/* Description Content */}
              <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm">
                <h3 className="text-xl font-bold text-brand-950 mb-6 pb-4 border-b border-brand-100">{t('project_detail.details')}</h3>
                <div 
                  className="prose prose-brand max-w-none prose-p:text-brand-500 prose-headings:text-brand-900 prose-li:text-brand-500"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-2xl border border-brand-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-brand-950">{t('project_detail.seo_ready')}</p>
                    <p className="text-brand-500">{t('project_detail.seo_desc')}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-brand-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-brand-950">{t('project_detail.free_setup')}</p>
                    <p className="text-brand-500">{t('project_detail.free_setup_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
