import { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Sidebar from "../components/Sidebar";
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
        <div className="flex max-w-3xl flex-col items-center mx-auto">
          {posts.map((post) => (
            <article key={post._id} className="mb-6 p-4 border rounded-lg w-full bg-gray-50">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="flex text-sm text-gray-600 gap-4">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                {/* <span>{post.views} views</span> */}
                <span>by {post.author.username}</span>
              </div>
            </article>
          ))}
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
