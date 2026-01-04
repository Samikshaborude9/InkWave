import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tabs = ["Stories", "Audience"];

const data = [
  { date: "Oct 1", views: 10, reads: 4 },
  { date: "Oct 4", views: 5, reads: 3 },
  { date: "Oct 7", views: 15, reads: 8 },
];

const Stats = () => {
  const [activeTab, setActiveTab] = useState("Stories");

  return (
    <Layout>
      <div className="flex flex-col min-h-screen px-10 md:px-20 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Stats</h1>

        {/* Tabs */}
        <div className="flex space-x-8 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-base ${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* === STORIES TAB === */}
        {activeTab === "Stories" && (
          <>
            {/* Monthly Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Monthly</h2>
                  <p className="text-sm text-gray-500">
                    October 1, 2025 – Today (UTC) · Updated hourly
                  </p>
                </div>
                <select className="border rounded-full px-3 py-1 text-sm">
                  <option>October 2025</option>
                </select>
              </div>

              {/* Stats Counters */}
              <div className="flex flex-wrap gap-8 mb-6">
                {[
                  { label: "Presentations", value: 0, tag: "New" },
                  { label: "Views", value: 40 },
                  { label: "Reads", value: 12 },
                  { label: "Followers", value: 5 },
                  { label: "Subscribers", value: 2 },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-start">
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-semibold">{item.value}</p>
                      {item.tag && (
                        <span className="bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="reads"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lifetime Section */}
            <div className="border-t pt-6">
              <h2 className="font-semibold text-lg mb-3">Lifetime</h2>
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-6 text-sm text-gray-600">
                  <p className="font-medium">Published</p>
                </div>
                <select className="border rounded-full px-3 py-1 text-sm">
                  <option>Latest</option>
                </select>
              </div>

              <div className="text-sm text-gray-600 border-t pt-4 flex justify-between">
                <p>You haven’t published any stories yet.</p>
                <Button
                  variant="secondary"
                  className="text-xs px-3 py-1 rounded-full"
                >
                  Start writing
                </Button>
              </div>
            </div>
          </>
        )}

        {/* === AUDIENCE TAB === */}
        {activeTab === "Audience" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Lifetime</h2>
            <p className="text-sm text-gray-500 mb-8">
              July 29, 2025 – Today (UTC) · Updated daily
            </p>

            <div className="flex flex-wrap gap-16">
              <div>
                <p className="text-3xl font-semibold">0</p>
                <p className="text-sm text-gray-600">
                  Followers{" "}
                  <span className="text-xs text-gray-400">
                    (0 from last month)
                  </span>
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">0</p>
                <p className="text-sm text-gray-600">
                  Email Subscribers{" "}
                  <span className="text-xs text-gray-400">
                    (0 from last month)
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stats;
