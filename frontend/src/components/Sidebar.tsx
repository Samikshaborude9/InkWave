import { Home, Book, User, FileText, BarChart2 } from "lucide-react"

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`fixed top-16 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav className="flex flex-col gap-2 px-6 mt-8">
        <a
          href="/home"
          className="flex items-center gap-3 py-3 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          <Home size={20} /> Home
        </a>

        <a
          href="/library"
          className="flex items-center gap-3 py-3 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          <Book size={20} /> Library
        </a>

        <a
          href="/profile"
          className="flex items-center gap-3 py-3 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          <User size={20} /> Profile
        </a>

        <a
          href="/stories"
          className="flex items-center gap-3 py-3 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          <FileText size={20} /> Stories
        </a>

        <a
          href="/stats"
          className="flex items-center gap-3 py-3 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
        >
          <BarChart2 size={20} /> Stats
        </a>
      </nav>
    </aside>
  )
}
