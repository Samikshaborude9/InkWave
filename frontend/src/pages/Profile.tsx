import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import Layout from "@/components/Layout";
import axios from "axios";

interface User {
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [userId, token]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { bio: user.bio, avatar: user.avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully");
      setUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Editable Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                name="username"
                value={user.username}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-2 border rounded-md text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
                placeholder="Tell something about yourself"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Avatar URL</label>
              <input
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
                placeholder="Enter image URL"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="text-gray-700">
            <p>
              <strong>Bio:</strong> {user.bio || "No bio added yet."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
