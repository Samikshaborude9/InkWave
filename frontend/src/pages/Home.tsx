import { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "@/lib/api";

interface Author {
  _id: string;
  username: string;
  email: string;
}

interface Posts {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  views: number;
  image?: string;
}

const Home = () => {
  // detect mobile and control sidebar behaviour
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // desktop default
  const [posts, setPosts] = useState<Posts[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // set initial mobile state and adjust sidebar default
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // close sidebar on mobile, open on desktop
      setIsSidebarOpen(!mobile);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        const data = response.data;
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <HomeNavbar toggleSidebar={toggleSidebar} />

      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar isOpen={isSidebarOpen} />}

      {/* Main Content */}
      <main
        className={`p-6 mt-16 transition-all duration-300 ${
          !isMobile && isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
{/* Feed */}
<div className="max-w-3xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {posts.map((post) => (
     <Link
  to={`/posts/${post._id}`}
  key={post._id}
  className="block p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-150"
>
  {/* Title */}
  <h2 className="text-xl font-semibold py-2">{post.title}</h2>

  {/* Content preview (3 lines) */}
  <p className="text-gray-600 mb-4 line-clamp-3 text-sm tracking-tight">
    {post.content || "No content available"}
  </p>

  {/* Footer - Date + Author */}
  <div className="flex text-sm text-gray-400 gap-4">
    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
    <span>by {post.author?.username || "Unknown"}</span>
  </div>
</Link>

    ))}
  </div>
</div>

      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={toggleSidebar} />
          <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-lg overflow-auto">
            <Sidebar isOpen={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
