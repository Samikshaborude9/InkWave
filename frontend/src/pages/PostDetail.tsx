import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import Layout from "@/components/Layout";

type Post = {
  _id: string;
  title: string;
  content: string;
  author?: { username?: string };
  createdAt?: string;
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err: any) {
        console.error("Failed to load post:", err);
        setError(err?.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <Layout><div className="p-6">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-6 text-red-600">{error}</div></Layout>;
  if (!post) return <Layout><div className="p-6">Post not found.</div></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <button className="mb-4 text-sm text-blue-600" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-2">by {post.author?.username ?? "Unknown"}</div>
        <div className="text-sm text-gray-500 mb-8">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""} </div>

        <article className="prose max-w-none bg-white p-6 rounded-xl shadow-sm">
          {/* if content is HTML use dangerouslySetInnerHTML, otherwise render text */}
          <div className="tracking-tight text-justify leading-relaxed whitespace-pre-line">{post.content}</div>
        </article>
      </div>
    </Layout>
  );
}
