import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the blog post data from our API
        const response = await fetch(`/api/blog/post/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar post do blog: ${response.statusText}`);
        }
        
        const postData = await response.json();
        
        // Remove the first heading (title) from the markdown content to avoid duplicates
        const contentWithoutTitle = postData.content.replace(/^#\s+.*$/m, '').trim();
        setContent(contentWithoutTitle);
        
        setPost({
          title: postData.title,
          date: postData.date,
          author: postData.author,
          coverImage: postData.coverImage
        });
      } catch (fetchError) {
        console.error("Error fetching post:", fetchError);
        setError("Falha ao carregar post do blog.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse">Carregando post...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container-custom">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
          <Link to="/blog" className="text-neon-green hover:underline">
            &larr; Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container-custom max-w-4xl">
        <Link to="/blog" className="text-neon-green hover:underline inline-block mb-6">
          &larr; Voltar para o Blog
        </Link>

        {post && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-bgdark rounded-lg shadow-lg overflow-hidden border border-white/10"
          >
            {post.coverImage && (
              <div className="h-64 md:h-96 bg-gray-800">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.png";
                  }}
                />
              </div>
            )}

            <div className="p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-8 text-gray-400">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">·</span>
                <span>{post.author}</span>
              </div>

              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </div>
  );
};

export default BlogPost;