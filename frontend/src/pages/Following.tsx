import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  date: string;
  image: string;
  topic: string;
  publication: string;
}

const FollowingPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("Recommended");

  // Simulated API call
  useEffect(() => {
    async function fetchPosts() {
      // Replace this with your API endpoint
      const response = await fetch("/api/following"); 
      if (!response.ok) {
        // fallback mock data for demo
        setPosts([
          {
            id: 1,
            title: "Training an LLM with Hugging Face",
            author: "Drew Hemphill",
            description: "Beginner’s guide to fine-tuning an LLM.",
            date: "6d ago",
            image: "https://miro.medium.com/v2/resize:fit:800/1*example1.jpg",
            topic: "Python",
            publication: "Data Science Collective",
          },
          {
            id: 2,
            title: "From PyTorch to ONNX: Performance Comparison",
            author: "Claudia Yao",
            description:
              "Part 1 of a performance comparison between PyTorch and ONNX.",
            date: "2d ago",
            image: "https://miro.medium.com/v2/resize:fit:800/1*example2.jpg",
            topic: "Machine Learning",
            publication: "Data Science Collective",
          },
        ]);
      } else {
        const data = await response.json();
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <Layout>
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Following</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 rounded-full border bg-gray-100 text-gray-800 hover:bg-gray-200">
          Writers and publications
        </button>
        <button className="px-4 py-2 rounded-full border bg-gray-100 text-gray-800 hover:bg-gray-200">
          Topics
        </button>
        <div className="relative">
          <button
            onClick={() =>
              setFilter((prev) =>
                prev === "Recommended" ? "Latest" : "Recommended"
              )
            }
            className="flex items-center gap-1 px-4 py-2 rounded-full border bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            {filter} <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6"
          >
            <div className="sm:w-3/4">
              <p className="text-sm text-gray-500 mb-1">
                {post.publication} · {post.author}
              </p>
              <h2 className="text-xl font-semibold mb-2 hover:underline cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{post.description}</p>
              <p className="text-gray-400 text-sm">{post.date}</p>
            </div>
            <img
              src={post.image}
              alt={post.title}
              className="mt-4 sm:mt-0 sm:w-40 sm:h-24 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default FollowingPage;
