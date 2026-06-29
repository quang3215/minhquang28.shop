import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ScrollReveal } from '../components/common/ScrollReveal';
import blogHeroImage from '../assets/images/blog_hero.jpg';

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: any;
  tags: string[];
  coverImage?: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data: Post[] = [];
        snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() } as Post));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-brand-100 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-brand-100 rounded col-span-2"></div>
                <div className="h-2 bg-brand-100 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-brand-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="bg-brand-50 min-h-screen pb-24">
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-brand-50 to-brand-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-brand-900 text-sm font-bold tracking-widest uppercase mb-6 border border-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                Insights & News
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black text-brand-950 tracking-tight mb-6 leading-[1.1]">
                Kiến Thức <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-lime-500">Thực Chiến</span>
              </h1>
              <p className="text-brand-500 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                Những bài viết chuyên sâu về UI/UX, lập trình Frontend tối ưu hiệu suất, và nghệ thuật tăng trưởng doanh thu bằng Performance Ads.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="order-1 lg:order-2">
            <ScrollReveal delay={200}>
              <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-tr from-sky-400/50 via-lime-400/30 to-brand-400/50 shadow-[0_0_80px_-20px_rgba(14,165,233,0.3)] group overflow-hidden">
                <div className="absolute inset-0 bg-white rounded-[2.5rem] z-0"></div>
                <img 
                  src={blogHeroImage} 
                  alt="Content Strategy and Marketing Insights" 
                  loading="lazy"
                  className="relative z-10 rounded-[2.4rem] w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 aspect-video md:aspect-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* FEATURED POST */}
        {featuredPost && (
          <ScrollReveal delay={100} className="mb-16 md:mb-24">
            <Link to={`/blog/${featuredPost.slug}`} className="group block relative bg-white rounded-[2rem] md:rounded-[3rem] border border-brand-100 p-4 md:p-6 overflow-hidden hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-brand-50">
                  <img 
                    src={featuredPost.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-brand-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      Mới Nhất
                    </span>
                  </div>
                </div>
                
                <div className="pr-4 md:pr-12 pb-8 md:pb-0">
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-950 mb-6 leading-tight group-hover:text-sky-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-brand-500 text-lg md:text-xl leading-relaxed mb-8 line-clamp-3 font-light">
                    {featuredPost.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-brand-400 uppercase tracking-widest font-bold">
                      {featuredPost.createdAt?.toDate ? featuredPost.createdAt.toDate().toLocaleDateString('vi-VN') : new Date(featuredPost.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-brand-950 font-bold bg-brand-50 px-4 py-2 rounded-xl group-hover:bg-brand-100">
                      Đọc ngay <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* REGULAR POSTS GRID */}
        {regularPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, idx) => (
              <ScrollReveal key={post.id} delay={idx * 100}>
                <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-3xl border border-brand-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                    <img 
                      src={post.coverImage || `https://source.unsplash.com/random/800x600?tech,${idx}`} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-brand-500 bg-brand-50 border border-brand-100 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-brand-950 mb-4 group-hover:text-sky-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-brand-500 mb-6 leading-relaxed line-clamp-3 text-sm md:text-base flex-grow">
                      {post.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-50">
                      <span className="text-xs text-brand-400 font-bold tracking-wider">
                        {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('vi-VN') : new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-sky-600 font-bold text-sm">
                        Đọc tiếp <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-brand-950 mb-2">Chưa có bài viết nào</h3>
            <p className="text-brand-500">Các bài viết chia sẻ kiến thức sẽ sớm được cập nhật tại đây.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
