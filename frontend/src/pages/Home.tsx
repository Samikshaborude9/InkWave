import { useEffect, useState } from "react"
import HomeNavbar from "../components/HomeNavbar"
import Sidebar from "../components/Sidebar"

interface Posts {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  image?: string;
}

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // open by default
  const [posts, setPosts] = useState<Posts[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <HomeNavbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main
        className={`p-6 mt-16 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold">Welcome to Home Feed</h1>
        <p className="mt-4">This is your feed after login.</p>
      </main>
    </div>
  )
}

export default Home
