import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white fixed top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          InkWave
        </motion.h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <motion.a whileHover={{ scale: 1.05 }} href="#">
            Our story
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="/membership">
            Membership
          </motion.a>

          <motion.a whileHover={{ scale: 1.05 }} href="#">
            Write
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="/Login">
            Sign in
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="/Signup">
          <Button className="rounded-full bg-black text-white px-4 py-2 hover:bg-gray-800">
            Get started
          </Button>
          </motion.a>
        </div>
      </div>
    </nav>
  )
}
