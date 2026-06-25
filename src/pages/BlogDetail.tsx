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
    return <div className="py-32 text-center text-brand-500">Loading article...</div>;
  }

  if (!post) {
    return (
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold text-brand-900 mb-4">Post not found</h1>
        <Link to="/blog" className="text-brand-500 hover:text-brand-900 underline">
          Return to Blog
        </Link>
      </article>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <Link to="/blog" className="text-brand-400 hover:text-brand-900 font-medium mb-8 inline-flex items-center gap-2 transition-colors">
        <span aria-hidden="true">&larr;</span> Back to Blog
      </Link>
      
      <header className="mb-12 space-y-6 border-b border-brand-100 pb-10">
        <div className="flex gap-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-950 leading-tight">
          {post.title}
        </h1>
        <p className="text-brand-400">
          Published on {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      <div className="prose prose-lg prose-brand max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogDetail;
