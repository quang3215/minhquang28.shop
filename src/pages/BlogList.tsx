import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: any;
  tags: string[];
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
    return <div className="py-32 text-center text-brand-500">Loading articles...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-950">Insights & News</h1>
        <p className="text-brand-500 text-lg">Thoughts on design, technology, and marketing.</p>
      </div>

      <div className="space-y-12">
        {posts.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <article className="p-8 rounded-3xl bg-brand-50/50 border border-brand-100 hover:bg-white hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-300">
                <div className="flex gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold uppercase tracking-wider text-brand-400 bg-brand-100/50 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-brand-950 mb-3 group-hover:text-brand-900 transition-colors">
                  {post.title}
                </h2>
                <p className="text-brand-500 mb-6 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex items-center text-sm font-medium text-brand-400">
                  <span>{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-brand-900">
                    Read article <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </article>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
