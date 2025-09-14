import { Home, Book, User, FileText, BarChart2, Users } from "lucide-react"

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6 font-bold text-xl">InkWave</div>
      <nav className="flex flex-col gap-4 px-4">
        <a href="/home" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Home size={20} /> Home
        </a>
        <a href="/library" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Book size={20} /> Library
        </a>
        <a href="/profile" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <User size={20} /> Profile
        </a>
        <a href="/stories" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FileText size={20} /> Stories
        </a>
        <a href="/stats" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <BarChart2 size={20} /> Stats
        </a>
        <a href="/following" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <Users size={20} /> Following
        </a>
      </nav>
    </aside>
  )
}
