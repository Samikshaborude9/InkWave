import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-8 py-4 shadow-sm bg-background sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        InkWave
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/profile/me" className="hover:text-primary">Profile</Link>
        <Link to="/about" className="hover:text-primary">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/Signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </motion.nav>
  );
}
