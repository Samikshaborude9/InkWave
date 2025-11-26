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
      <main className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-12">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 md:mb-6 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Create, collaborate, and scale your blogs and docs.
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-lg max-w-xl mb-6 text-gray-700 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Effortlessly build blogs, API docs, and product guides with Hashnode, with the flexibility of a headless CMS and more.
        </motion.p>
        <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 justify-center">


        <motion.button
          className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>  navigate("/signup")}
        >
          Sign up for free
        </motion.button>
        <motion.button
          className="w-full sm:w-auto bg-white text-gray-700 px-6 py-2 rounded-full font-semibold border border-gray-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
           window.open(
             "https://www.linkedin.com/in/samiksha-borude-a2b172257/",
             "_blank",
             "noopener,noreferrer"
           )
         }
        >
          Talk to founder
        </motion.button>

        </div>
        <motion.img
          src={Herosection}
          alt="Hero Section"
          className="mt-8 rounded-3xl shadow-lg w-full max-w-full md:max-w-5xl object-cover"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </main>
      
      </div>
            
      <section className="mt-8 mb-14 px-4 sm:px-6 md:px-8">
        <div className="text-center text-gray-500 mb-6">
          Trusted by top engineering teams worldwide.
        </div>
        {/* Responsive logo row: use grid on small screens, flex on md+ */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between max-w-5xl items-center mx-auto gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {logos.map((l) => (
            <motion.img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-8 sm:h-10 mx-auto"
              variants={itemVariant}
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </motion.div>
      </section>

      {/* docs */}
      <div className="max-w-6xl bg-gray-50 flex flex-col md:flex-row mx-auto p-6 md:p-10 my-8 md:my-20 rounded-2xl shadow-sm gap-6">
        <div className="flex flex-col gap-6 max-w-full md:max-w-sm text-left">
          <div className="font-semibold tracking-tight text-2xl">
          Docs
          </div>
          <div className="font-semibold tracking-tight text-2xl md:text-4xl text-gray-800">
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
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img src={docsimg} alt="docs image" className="max-w-full h-auto rounded-2xl" />
        </div>
      </div>

      {/* Footer spacer */}
      <Footer />

    </div>
  );
}