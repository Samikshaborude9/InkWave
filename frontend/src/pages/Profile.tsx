import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import profile from "@/assets/profile.png";

interface User {
  username: string;
  email: string;
  bio: string;
  avatar: string;
  followers?: string[];
  following?: string[];
}

// small shape for follower/following details
interface SimpleUser {
  _id?: string;
  username?: string;
  avatar?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    bio: "",
    avatar: "",
    followers: [],
    following: [],
  });
  const [followersList, setFollowersList] = useState<SimpleUser[]>([]);
  const [followingList, setFollowingList] = useState<SimpleUser[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch user profile + follower/following details
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`users/${userId}`);
        const fetchedUser: User = res.data;
        setUser(fetchedUser);

        // fetch follower details (if any)
        if (Array.isArray(fetchedUser.followers) && fetchedUser.followers.length) {
          const followersDetail = await Promise.all(
            fetchedUser.followers.map(async (fid) => {
              try {
                const r = await api.get(`users/${fid}`);
                const u: SimpleUser = {
                  _id: r.data._id || r.data.id,
                  username: r.data.username,
                  avatar: r.data.avatar,
                };
                return u;
              } catch (err) {
                return {} as SimpleUser;
              }
            })
          );
          setFollowersList(followersDetail.filter(Boolean));
        } else {
          setFollowersList([]);
        }

        // fetch following details (if any)
        if (Array.isArray(fetchedUser.following) && fetchedUser.following.length) {
          const followingDetail = await Promise.all(
            fetchedUser.following.map(async (fid) => {
              try {
                const r = await api.get(`users/${fid}`);
                const u: SimpleUser = {
                  _id: r.data._id || r.data.id,
                  username: r.data.username,
                  avatar: r.data.avatar,
                };
                return u;
              } catch (err) {
                return {} as SimpleUser;
              }
            })
          );
          setFollowingList(followingDetail.filter(Boolean));
        } else {
          setFollowingList([]);
        }
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
      const res = await api.put(`users/${userId}`, { bio: user.bio, avatar: user.avatar });
      alert("Profile updated successfully");
      setUser(res.data.user || res.data);
      setIsEditing(false);
      // refresh followers/following lists after update
      // (optional) re-run fetch by calling same logic or simply fetch updated profile:
      const updated = await api.get(`users/${userId}`);
      setUser(updated.data);
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
              src={user.avatar || profile}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-semibold">Followers:</span> {followersList.length}
                </div>
                <div>
                  <span className="font-semibold">Following:</span> {followingList.length}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 -mt-10"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Followers / Following preview */}
        {/* <div className="flex gap-6 mb-6">
          <div>
            <div className="text-sm font-medium mb-2">Followers</div>
            <div className="flex items-center gap-3">
              {followersList.length ? (
                followersList.slice(0, 6).map((f) => (
                  <div key={f._id} className="text-center">
                    <img
                      src={f.avatar || "https://via.placeholder.com/48"}
                      alt={f.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-xs">{f.username}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">No followers yet</div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Following</div>
            <div className="flex items-center gap-3">
              {followingList.length ? (
                followingList.slice(0, 6).map((f) => (
                  <div key={f._id} className="text-center">
                    <img
                      src={f.avatar || "https://via.placeholder.com/48"}
                      alt={f.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-xs">{f.username}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">Not following anyone</div>
              )}
            </div>
          </div>
        </div> */}

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

            {/* <div>
              <label className="block text-sm text-gray-600 mb-1">Avatar URL</label>
              <input
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700"
                placeholder="Enter image URL"
              />
            </div> */}

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-600"
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
