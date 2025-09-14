import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, Pencil, Menu } from "lucide-react"

export default function HomeNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <nav className="w-full border-b bg-white fixed top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Button (all screen sizes) */}
          <button onClick={toggleSidebar} className="p-2">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <motion.h1
            className="text-2xl font-bold cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            InkWave
          </motion.h1>
        </div>

        {/* Search Bar (desktop only) */}
        <div className="flex-1 px-6 hidden md:flex">
          <Input
            placeholder="Search stories, writers, or topics"
            className="w-full rounded-full"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Pencil size={18} /> Write
          </Button>
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border w-9 h-9 flex items-center justify-center"
          >
            <User size={20} />
          </Button>
        </div>
      </div>
    </nav>
  )
}
