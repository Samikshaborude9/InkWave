import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Write = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please enter both title and content before posting.");
      return;
    }

    setIsPosting(true);

    try {
      // Simulated API call — replace with your backend endpoint later
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Posted blog:", { title, body });
      alert("Your blog has been posted successfully!");

      // Clear inputs after posting
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Something went wrong while posting your blog.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen px-6 md:px-20 py-10">
        <h1 className="text-3xl font-bold mb-6">Write a New Blog</h1>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter your blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Body Input */}
        <textarea
          placeholder="Start writing your story..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full min-h-[300px] resize-y text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Post Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handlePost}
            disabled={isPosting}
            className={`rounded-full px-6 py-2 text-white ${
              isPosting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Write;
