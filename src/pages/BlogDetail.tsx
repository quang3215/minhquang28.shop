import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const BlogDetail = () => {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', params.slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.slug) fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-brand-100 rounded w-1/4"></div>
          <div className="h-[400px] bg-brand-100 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-brand-100 rounded w-3/4"></div>
            <div className="h-4 bg-brand-100 rounded w-5/6"></div>
            <div className="h-4 bg-brand-100 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <article className="max-w-3xl mx-auto px-6 pt-40 pb-32 text-center">
        <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 className="text-4xl font-black text-brand-950 mb-6">Không tìm thấy bài viết</h1>
        <p className="text-brand-500 text-lg mb-10">Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc đường dẫn không chính xác.</p>
        <Link to="/blog" className="btn-primary py-4 px-8 text-lg inline-flex items-center gap-2">
          <span aria-hidden="true">&larr;</span> Trở về danh sách bài viết
        </Link>
      </article>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* HEADER BACKGROUND */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-brand-50/50 pointer-events-none border-b border-brand-100/50"></div>
      
      <article className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        <Link to="/blog" className="text-brand-500 hover:text-sky-600 font-bold mb-8 inline-flex items-center gap-2 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-brand-100">
          <span aria-hidden="true">&larr;</span> Trở về danh sách
        </Link>
        
        <header className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-brand-100 text-brand-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-brand-200">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-950 leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-brand-500 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('vi-VN', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date(post.createdAt).toLocaleDateString('vi-VN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300"></span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {Math.ceil(post.content.length / 1000)} phút đọc
            </span>
          </div>
        </header>

        {/* HERO IMAGE */}
        {post.coverImage && (
          <div className="mb-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-900/10 border border-brand-100 aspect-[16/9] md:aspect-[21/9]">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {/* SUMMARY SUMMARY */}
          {post.summary && (
            <div className="mb-12 p-8 bg-brand-50 border-l-4 border-sky-500 rounded-r-2xl">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-brand-800 italic">
                "{post.summary}"
              </p>
            </div>
          )}

          {/* MAIN CONTENT */}
          <div className="prose prose-lg md:prose-xl prose-brand max-w-none prose-headings:font-black prose-a:text-sky-600 prose-img:rounded-2xl prose-img:border prose-img:border-brand-100 prose-img:shadow-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
