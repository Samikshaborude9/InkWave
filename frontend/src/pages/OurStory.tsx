import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar";
import membership from "@/assets/membership.png";
import Footer from "@/components/Footer";


export default function OurStory() {
  return (
    <div>
    
    <main>
      <section className="relative pt-48 bg-gray-50">
        <header>
      <Navbar />
    </header>
        <div className="max-w-7xl mx-auto justify-between px-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 justify-between">
        <div className="">
          
          <div>
        {/* Heading */}
          <motion.h1
            className="text-5xl font-semibold tracking-tighter mb-12 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Cultivating a place <br/>where writers and <br/>readers unite. <br/>Our story.
          </motion.h1>
          <div className="pb-6">
            <Button className="rounded-full bg-black text-white mb-8 hover:bg-slate-800">Docs by InkWave</Button>
            <p className="text-lg text-gray-800">Choose the perfect plan to build your <b> Docs on Hashnode.</b><br/> Start today, no credit card required.</p>
          </div>
        </div>
        </div>


        <div className="w-1/2 h-1/2 hidden md:block ">
          <img src={membership} alt="Membership" className="w-auto h-auto" />
        </div>

      </div>
      </div>
      </section>
      

    </main>
    <Footer />
    </div>
  )
}
