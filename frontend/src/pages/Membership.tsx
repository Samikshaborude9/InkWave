import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"; 
import Navbar from "@/components/Navbar";
import membership from "@/assets/membership.png";


export default function Membership() {
  const navigate = useNavigate();
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <section className="mb-16  relative pt-48 bg-gray-50">
        <div className="max-w-7xl mx-auto justify-between px-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 justify-between">
        <div className="">
          <span className="mb-4">$ Pricing</span>
          <div>
        {/* Heading */}
          <motion.h1
            className="text-5xl font-semibold tracking-tighter mb-12 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find the plan that<br/> suits your needs.
          </motion.h1>
          <div className="pb-6">
            <Button className="rounded bg-black text-white mb-8 hover:bg-slate-800">Docs by InkWave</Button>
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
      {/* Cards */}
      {/* Pricing cards - responsive 1/2/3 columns */}
<div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pb-20">
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
    
    {/* Card 1 */}
    <Card className="p-2 rounded-xl border shadow-sm hover:shadow-2xl transition-shadow">
      <CardHeader className="bg-gray-50 rounded-xl mb-2">
        <div><svg fill="#ffffff" width="54px" height="54px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.2"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g><g id="SVGRepo_iconCarrier"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g></svg></div>
        <CardTitle className="text-lg font-semibold">Free plan</CardTitle>
        <p className="text-sm text-gray-500 mt-1">For individual creators.</p>
        <div className="mt-4 flex items-baseline gap-2 ">
          <div className="text-4xl font-bold mb-4">$0</div>
          <div className="text-sm text-gray-500 mb-4">/month</div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mb-6 mt-2">
          Get started
        </Button>
      </CardHeader>
      <CardContent>
        <div className="font-semibold mb-2">
          Free, forever:
        </div>
        
        <ul className="space-y-3 text-gray-700">
          {["Free custom domain", "AI assisted writing", "Image CDN and optimization","WYSIWYG editor with MDX support", "Advanced analytics", "Powerful docs dashboard"].map(
            (t, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="text-green-600 mt-1" size={18} />
                <span>{t}</span>
              </li>
            )
          )}
        </ul>
      </CardContent>
    </Card>

    {/* Card 2 - Most popular */}
    <Card className="p-2 rounded-xl border-2 border-indigo-100 shadow-sm hover:shadow-2xl transition-shadow relative">
      <div className="absolute -top-3 right-4 bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full">
        Most popular
      </div>
      <CardHeader className="bg-gray-50 rounded-xl mb-2">
        <div><svg fill="#ffffff" width="54px" height="54px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.2"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g><g id="SVGRepo_iconCarrier"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g></svg></div>
        <CardTitle className="text-lg font-semibold">Startup</CardTitle>
        <p className="text-sm text-gray-500 mt-1">For small teams.</p>
        <div className="mt-4 flex items-baseline gap-2 ">
          <div className="text-4xl font-bold mb-4">$199</div>
          <div className="text-sm text-gray-500 mb-4">/month</div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mb-6 mt-2">
          Get started
        </Button>
      </CardHeader>
      <CardContent>
        <div className="font-semibold mb-2">
          Everything in free plan, plus:
        </div>
        <ul className="space-y-3 text-gray-700">
          {["5 members included, $10 per extra seat", "AI search","Publish from GitHub", "Realtime collaborative editing","Inline review comments" ,"Unlimited versioning"].map(
            (t, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="text-green-600 mt-1" size={18} />
                <span>{t}</span>
              </li>
            )
          )}
        </ul>
      </CardContent>
    </Card>

    {/* Card 3 */}
        <Card className="p-2 rounded-xl border-2 shadow-sm hover:shadow-2xl transition-shadow relative">
      <CardHeader className="bg-gray-50 rounded-xl mb-2">
        <div><svg fill="#ffffff" width="54px" height="54px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.2"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g><g id="SVGRepo_iconCarrier"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z"></path></g></svg></div>
        <CardTitle className="text-lg font-semibold">Enterprise</CardTitle>
        <p className="text-sm text-gray-500 mt-1">For large organizations.</p>
        <div className="mt-4 flex items-baseline gap-2 ">
          <div className="text-4xl font-bold mb-4">$499</div>
          <div className="text-sm text-gray-500 mb-4">/month</div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mb-6 mt-2">
          Get started
        </Button>
      </CardHeader>
      <CardContent>
        <div className="font-semibold mb-2">
          Everything in free plan, plus:
        </div>
        <ul className="space-y-3 text-gray-700">
          {["Unlimited members", "SSO & Custom SLA", "Premium support","Headless mode and subpath installation","Audit logs","Content migration services","Premium support over email and Slack"].map((t, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="text-green-600 mt-1" size={18} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

  </div>
</div>

    </main>
    </>
  )
}
