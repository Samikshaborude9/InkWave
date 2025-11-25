import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(()=>{
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll,{ passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);

  }, [])
  return (
    <nav className="fixed top-4 z-50 left-0 right-0 ">
      <div className={
          `mx-auto w-full max-w-4xl rounded-full shadow-lg px-1 py-2 flex items-center justify-between transition-colors duration-300 ` +
          (isScrolled
            ? "backdrop-blur-md shadow-lg border-none"
            : "bg-white border-b shadow")
        }>
        <div className="flex items-center justify-between px-6 w-full">
  {/* Left: logo */}
  <div className="flex-shrink-0">
    {/* Add `import { useNavigate } from 'react-router-dom'` and `const navigate = useNavigate();` in the component body above the return */}
    <motion.h1
      className="text-2xl font-semibold cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate("/")}
    >
      InkWave
    </motion.h1>
  </div>

  {/* Center links */}
  <div className="hidden md:flex items-center justify-center flex-1 gap-6 text-sm font-medium">
    <motion.a whileHover={{ scale: 1.05 }} href="/ourstory">
      Our story
    </motion.a>
    <motion.a whileHover={{ scale: 1.05 }} href="/membership">
      Membership
    </motion.a>
    <motion.a whileHover={{ scale: 1.05 }} href="/signup">
      Write
    </motion.a>
  </div>

  {/* Right actions */}
  <div className="flex items-center ">
    <motion.a whileHover={{ scale: 1.05 }} href="/login">
      <Button className="rounded-full bg-black text-white  hover:bg-gray-800">
        Sign In
      </Button>
    </motion.a>
  </div>
</div>
      </div>
    </nav>
  )
}
