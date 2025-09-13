import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"; 


export default function Membership() {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen px-6 pt-8">
      {/* Heading */}
      <motion.h1
        className="text-6xl font-weight-400 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Membership plans
      </motion.h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Plan 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 border rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <span className="text-yellow-500">★</span> Medium Member
              </CardTitle>
              <p className="text-lg mt-2">$5/month or $50/year</p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/Login")}
                className="w-full bg-green-600 hover:bg-green-700 rounded-full mb-6"
              >
                Get started
              </Button>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Read member-only stories",
                  "Support writers you read most",
                  "Earn money for your writing",
                  "Listen to audio narrations",
                  "Read offline with the Medium app",
                  "Access our Mastodon community",
                  "Connect your custom domain",
                  "Create your own publications",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="text-green-600 mt-1" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 border rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <span className="text-yellow-500">★</span> Friend of Medium
              </CardTitle>
              <p className="text-lg mt-2">$15/month or $150/year</p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/Login")}
                className="w-full bg-green-600 hover:bg-green-700 rounded-full mb-6">
                Get started
              </Button>
              <ul className="space-y-3 text-gray-700">
                {[
                  "All Medium member benefits",
                  "Give 4x more to the writers you read",
                  "Share member-only stories with anyone and drive more earnings for writers",
                  "Customize app icon",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="text-green-600 mt-1" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
