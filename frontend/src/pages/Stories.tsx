import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
const tabs = ["Drafts", "Published", "Unlisted", "Submissions"];

const Stories = () => {
  const [activeTab, setActiveTab] = useState("Drafts");
  return (   
    <Layout>
      <div className='mx-auto flex flex-col min-h-screen px-6 md:px-12 lg:px-20 py-10'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Stories</h1>
          <Button variant="outline" className='rounded-full'>Import a Story</Button>
        </div>
        <div className='flex space-x-8 border-b mb-8'>
          {tabs.map((tab) => (
            <button key={tab}
            onClick={()=> setActiveTab(tab)}
            className={`pb-3 text-base ${activeTab === tab ? 'border-b-2 font-semibold text-black' : 'text-gray-500 hover:text-black'}`}>{tab}</button>
          ))}
        </div>
        {/* Tab Content */}
        <div className='flex flex-col items-center justify-center h-64 text-center text-gray-600'>
          {activeTab === "Drafts" && (
            <>
            <p className="mb-2">You have no stories in draft.</p> <p> Why not{" "} <a href="/write" className="text-blue-600 underline"> start writing one? </a> </p>
            </>
          )}
          {activeTab === "Published" && <p>No published stories yet.</p>}
          {activeTab === "Unlisted" && <p>No unlisted stories yet.</p>}
          {activeTab === "Submissions" && <p>No submissions yet.</p>}

          </div>
        
      </div>
    </Layout>
  )
}

export default Stories;
