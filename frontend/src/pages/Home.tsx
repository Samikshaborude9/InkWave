import { useEffect, useState } from "react"
import HomeNavbar from "../components/HomeNavbar"
import Sidebar from "../components/Sidebar"

interface Author{
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
        {/* Feed */}
        <div className="flex max-w-2xl">
          {posts.map((post) => (
            <article key={post._id} className="mb-6 p-4 border rounded-lg w-full">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex text-sm text-gray-500 gap-4">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.views} views</span>
                <span>by {post.author.username}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home;
