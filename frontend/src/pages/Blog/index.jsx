import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionTitle from "../../components/ui/SectionTitle";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog posts
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog/posts");
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar posts do blog: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Falha ao carregar posts do blog.");
        // Fallback to empty array
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle title="Blog" subtitle="Insights & Atualizações" />

          <div className="mt-12">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-pulse">Carregando posts...</div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                <p className="text-red-700">{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Nenhum post disponível ainda.</p>
                <p className="mt-4 text-gray-500">Volte em breve para novos conteúdos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-bgdark rounded-lg overflow-hidden shadow-lg h-full transition-all duration-300 hover:shadow-xl border border-white/10"
                    >
                      <div className="h-48 bg-gray-800 relative">
                        {post.coverImage && (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/blog/placeholder.png";
                            }}
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-400 mb-2">
                          {new Date(post.date).toLocaleDateString()} · {post.author}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-300">
                          {post.excerpt}
                        </p>
                        <div className="mt-4">
                          <span className="text-neon-green inline-flex items-center">
                            Leia mais
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;