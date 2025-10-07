import { useState } from "react";
import Layout from '@/components/Layout';

const tabs = ["Your lists", "Saved lists", "Highlights", "Reading history", "Responses"];

const Library = () => {
  const [activeTab, setActiveTab] = useState("Your lists");

  return (
    <Layout>
    <div className="flex display-center flex-col min-h-screen">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6">Your library</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Your lists" && (
          <div className="bg-green-500 text-white p-6 rounded-lg mb-6 size-">
            <h2 className="text-xl font-semibold mb-2">
              Create a list to easily organize and share stories
            </h2>
            <button className="bg-black text-white px-4 py-2 rounded-md mt-2">
              Start a list
            </button>
          </div>
        )}

        {activeTab === "Saved lists" && <p>No saved lists yet.</p>}
        {activeTab === "Highlights" && <p>No highlights yet.</p>}
        {activeTab === "Reading history" && <p>Your reading history will appear here.</p>}
        {activeTab === "Responses" && <p>No responses yet.</p>}
      </div>
    </div>
    </Layout>
  );
};

export default Library;
