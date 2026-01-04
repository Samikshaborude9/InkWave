import { useEffect, useState } from "react";
import Layout from '@/components/Layout';
import api from "@/lib/api";

const tabs = ["Your lists", "Saved lists"];

type PostPreview = {
  _id: string;
  title: string;
  content?: string;
  author?: { username?: string };
};

type SavedList = {
  _id: string;
  name: string;
  postIds: string[];
  createdAt: string;
};

export default function Library() {
  const [activeTab, setActiveTab] = useState("Your lists");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [savedLists, setSavedLists] = useState<SavedList[]>([]);
  const [previewList, setPreviewList] = useState<SavedList | null>(null);

  useEffect(() => {
    // load saved lists from localStorage
    const fetchLists = async () => {
      try {
        const res = await api.get("/lists");
        setSavedLists(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch lists", err);
      }
    };
    fetchLists();
  }, []);

  useEffect(() => {
    // fetch posts for selection when modal opens or library mounts
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch posts for lists", err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    //backend stores the lists, so no need for localStorage now
  }, [savedLists]);

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveList = (list: Omit<SavedList, "_id" | "createdAt"> & { _id?: string }) => {
    (async () => {
      try{
        const res = await api.post("/lists",{ name: list.name, postIds: list.postIds });
        setSavedLists((s) => [res.data, ...s]);
        setIsModalOpen(false);
        setActiveTab("Saved lists");
      } catch(err){
        console.error("Failed to save list", err);
        alert("Failed to create list");
      }
    })();
  };
  
  const handleDeleteList = (id: string) => {
    if (!confirm("Delete this saved list?")) return;
    (async () => {
      try{
        await api.delete(`/lists/${id}`);
        setSavedLists((s) => s.filter((l) => l._id !== id));
        setPreviewList(null);
      } catch(err){
        console.error("Failed to delete list", err);
        alert("Failed to delete list");
      }
    })();
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto px-6 py-10">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold mb-6">Your library</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setPreviewList(null); }}
              className={`pb-2 ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Your lists" && (
            <div className="bg-white p-6 rounded-2xl mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Create a list to easily organize and share stories</h2>
              <p className="text-sm text-gray-600 mb-4">Pick posts, name your list and save it for later.</p>
              <div className="flex items-center gap-4">
                <button
                  className="bg-black text-white px-4 py-2 rounded-full text-sm"
                  onClick={openCreateModal}
                >
                  Start a list
                </button>
                <button
                  className="bg-white border px-4 py-2 rounded-full text-sm"
                  onClick={() => {
                    // quick demo: prefill posts if none loaded
                    if (posts.length === 0) {
                      alert("No posts loaded yet.");
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                >
                  Start from posts
                </button>
              </div>
            </div>
          )}

          {activeTab === "Saved lists" && (
            <div className="space-y-4">
              {savedLists.length === 0 ? (
                <div className="text-gray-500">You have no saved lists yet. Create one using "Start a list".</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedLists.map((list) => (
                    <div key={list._id} className="p-4 border rounded-2xl bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">{list.name}</div>
                          <div className="text-sm text-gray-500">{list.postIds.length} saved item{list.postIds.length !== 1 ? "s" : ""}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => {
                              setPreviewList(list);
                            }}
                          >
                            View
                          </button>
                          <button
                            className="text-sm text-red-600 hover:underline"
                            onClick={() => handleDeleteList(list._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* small preview of items */}
                      <div className="mt-4 space-y-2 text-sm">
                        {list.postIds.slice(0, 4).map((pid) => {
                          const p = posts.find((x) => x._id === pid);
                          return (
                            <div key={pid} className="text-gray-700">
                              {p ? p.title : <span className="text-gray-400">Post removed</span>}
                            </div>
                          );
                        })}
                        {list.postIds.length > 4 && <div className="text-xs text-gray-500">+{list.postIds.length - 4} more</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
        </div>

        {/* Preview modal for a saved list */}
        {previewList && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl overflow-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{previewList.name}</h3>
                <button className="text-sm text-gray-600" onClick={() => setPreviewList(null)}>Close</button>
              </div>
              <div className="space-y-4">
                {previewList.postIds.map((pid) => {
                  const p = posts.find((x) => x._id === pid);
                  if (!p) return null;
                  return (
                    <article key={pid} className="p-4 border rounded">
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{p.content}</p>
                      <div className="text-xs text-gray-500 mt-2">by {p.author?.username ?? "Unknown"}</div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Create List Modal */}
        {isModalOpen && (
          <CreateListModal
            posts={posts}
            onClose={() => setIsModalOpen(false)}
            onSave={(name, postIds) => handleSaveList({ name, postIds })}
          />
        )}
      </div>
    </Layout>
  );
}

/* CreateListModal component - placed inside same file for simplicity */
function CreateListModal({
  posts,
  onClose,
  onSave,
}: {
  posts: PostPreview[];
  onClose: () => void;
  onSave: (name: string, postIds: string[]) => void;
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");

  const toggle = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  const selectAll = () => {
    const all: Record<string, boolean> = {};
    posts.forEach((p) => (all[p._id] = true));
    setSelected(all);
  };

  const clearAll = () => setSelected({});

  const handleSave = () => {
    const postIds = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (!name.trim()) {
      alert("Please provide a name for the list.");
      return;
    }
    if (postIds.length === 0) {
      alert("Select at least one post to save.");
      return;
    }
    onSave(name.trim(), postIds);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden p-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">Create a new list</h3>
            <p className="text-sm text-gray-500">Select posts to add to your list</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600" onClick={selectAll}>Select all</button>
            <button className="text-sm text-gray-600" onClick={clearAll}>Clear</button>
            <button className="text-sm text-gray-600" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
          <div className="md:col-span-1 space-y-3">
            <label className="block text-sm font-medium">List name</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Favorite JavaScript reads"
            />

            <div className="mt-4 text-sm text-gray-600">Selected: {Object.values(selected).filter(Boolean).length}</div>
            <div className="mt-4">
              <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">Save list</button>
            </div>
          </div>

          <div className="md:col-span-1 space-y-3">
            {posts.length === 0 ? (
              <div className="text-gray-500">No posts available.</div>
            ) : (
              posts.map((p) => (
                <label key={p._id} className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selected[p._id]}
                    onChange={() => toggle(p._id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-2">{p.content}</div>
                    <div className="text-xs text-gray-400 mt-1">by {p.author?.username ?? "Unknown"}</div>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
