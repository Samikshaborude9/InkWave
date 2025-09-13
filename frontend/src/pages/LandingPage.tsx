import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stay Curious.
        </motion.h1>
        
        <motion.p
          className="text-lg max-w-xl mb-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover stories, thinking, and expertise from writers on any topic.
        </motion.p>

        <motion.button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Reading
        </motion.button>
      </div>
    </div>
  );
}
