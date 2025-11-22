import Navbar from "@/components/Navbar";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Herosection from "@/assets/Herosection.webp";
import freecodecamp from "@/assets/freecodecamp.png";
import mindsdb from "@/assets/mindsdb.png";
import peerdb from "@/assets/peerdb.png";
import pieces from "@/assets/pieces.png";
import redwood from "@/assets/redwood.png";
import docsimg from "@/assets/docsimg.png";
import Footer from "@/components/Footer";
export default function LandingPage() {
    const navigate = useNavigate();
    const logos = [
    { src: freecodecamp, alt: "FreeCodeCamp" },
    { src: mindsdb, alt: "MindsDB" },
    { src: peerdb, alt: "PeerDB" },
    { src: pieces, alt: "Pieces" },
    { src: redwood, alt: "Redwood" },
  ];

  // parent + item variants for a straight horizontal slide-in with stagger
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariant: Variants = {
    hidden: { x: 40, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 160, damping: 18 } },
  };

  return (
    // use min-h-screen so page can scroll and not force hero to always be full viewport
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50">
      {/* Navbar goes first */}
      <Navbar />
   

      {/* spacer to push content below the fixed navbar.
          Adjust h-20 to match your navbar height (top padding alternative). */}
      <div className="h-20" />

      {/* Hero Section (below navbar) */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-12">
        <motion.h1
          className="text-5xl font-medium tracking-tight mb-6 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Create, collaborate, and scale your blogs and docs.
        </motion.h1>

        <motion.p
          className="text-lg max-w-xl mb-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Effortlessly build blogs, API docs, and product guides with Hashnode, with the flexibility of a headless CMS and more.
        </motion.p>
        <div className="flex justify-between gap-4">


        <motion.button
          className="bg-black text-white px-6 py-3 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>  navigate("/login")}
        >
          Sign up for free
        </motion.button>
        <motion.button
          className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border border-gray-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Talk to founder
        </motion.button>

        </div>
        <motion.img
          src={Herosection}
          alt="Hero Section"
          className="mt-12 rounded-3xl shadow-lg max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </main>
      
      </div>
      
      <section className="mt-8 mb-14">
        <div className="text-center text-gray-500 mb-6">
          Trusted by top engineering teams worldwide.
        </div>
        {/* Animated logo row: slides each logo horizontally into place in a straight line */}
        <motion.div
          className="flex justify-between max-w-5xl items-center mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {logos.map((l, i) => (
            <motion.img
              key={i}
              src={l.src}
              alt={l.alt}
              className="h-10"
              variants={itemVariant}
              // preserves layout while animating (optional)
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </motion.div>
      </section>

      {/* docs */}
      <div className="max-w-6xl bg-gray-50 flex mx-auto p-10 my-20  rounded-2xl shadow-sm">
        <div className="flex flex-row justify-between w-full gap-10">

        <div className="flex flex-col gap-6 max-w-sm">
          <div className="font-semibold tracking-tight text-2xl">
          Docs
          </div>
          <div className="font-semibold tracking-tight text-4xl text-gray-800">
            The modern content engine for API docs and product guides.
          </div>
          <div className="text-gray-600">
            Create and scale dynamic developer docs and API references. Built for teams needing full control and customization — no heavy lifting, no upkeep, no reinventing the wheel.
          </div>
          <div>
          <button className="mt-4 bg-black text-white px-6 py-3 rounded-full font-semibold">
          Explore docs
        </button>
            </div>
        </div> 
        <div>
          <img src={docsimg} alt="docs image" className="max-w-xl h-auto rounded-2xl -mt-10" />
          </div>

        </div>

      </div>

      {/* Footer spacer */}
      <Footer />

    </div>
  );
}
