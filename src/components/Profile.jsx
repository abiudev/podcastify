import { useState, useEffect } from "react";
import {
  Bell,
  Edit2,
  Headphones,
  Heart,
  Share2,
  Play,
  Trash2,
  User,
  BarChart2,
  Radio,
  MoreHorizontal,
} from "lucide-react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import Auth from "./Auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile({ favorites, toggleView }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState();
  const [userEmail, setUserEmail] = useState();

  const listeningStats = [
    { label: "Hours Listened", value: "127" },
    { label: "Shows Completed", value: "34" },
    { label: "Current Streak", value: "7 days" },
  ];

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated user data to your backend
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User signed in:", user);
        const docRef = doc(db, "Users", user.uid);
        const docGrab = await getDoc(docRef);

        if (docGrab.exists()) {
          const userData = docGrab.data();
          setUser(userData);
          setUsername(userData.username);
          setProfilePic(userData.profilePic);
          setBio(userData.bio);
          setUserEmail(user.email);

          console.log(docGrab.data());
        } else {
          console.log("User document does not exist");
        }
      } else {
        console.log("No user signed in");
      }
    });
  };
  const handleSignOut = () => {
    auth.signOut();
    navigate("/trending");
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // const handleSave = () => {
  //   if(user)
  // };

  const renderContent = () => {
    if (!user) {
      return <Auth toggleView={toggleView} />;
    }
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-500">Profile</h2>
              <button
                onClick={handleEditToggle}
                className="text-green-500 hover:text-green-600"
              >
                <Edit2 size={20} />
              </button>
            </div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-300"
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 cursor-pointer"
                >
                  <Edit2 size={16} />
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">Hello, {username}</h3>
                <p className="text-gray-600">{userEmail}</p>
              </div>
              <div>
                <button
                  onClick={handleSignOut}
                  className="absolute bottom-4 right-4 border bg-green-300 hover:bg-red-300 rounded-md shadow-md p-2"
                >
                  Log Out
                </button>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={user.bio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  <Headphones className="inline mr-2" size={16} /> {bio}
                </p>
              </div>
            )}
          </div>
        );
      case "stats":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Listening Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {listeningStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-green-100 rounded-lg p-4 text-center"
                >
                  <p className="text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-green-500">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Favorite Shows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((favShow) => (
                <div
                  key={favShow.id}
                  className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg"
                >
                  <img
                    src={favShow.image}
                    alt={favShow.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {favShow.title}
                    </h3>
                    <button className="text-green-500 hover:text-green-600 mt-2">
                      <Play size={15} />
                    </button>

                    <button className="text-green-500 ml-4 hover:text-green-600 mt-2">
                      <Share2 size={15} />
                    </button>
                    <button className="text-red-500 ml-4 hover:text-red-600 mt-2">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "more":
        return (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              More Options
            </h2>
            <p className="text-gray-600">
              Additional settings and options can be added here.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Navigation */}
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-500 mb-6">
            Podcast App
          </h1>
          <ul className="space-y-2">
            {[
              { name: "Profile", Icon: User, id: "profile" },
              { name: "Stats", Icon: BarChart2, id: "stats" },
              { name: "Favorite Shows", Icon: Radio, id: "favorites" },
              { name: "More", Icon: MoreHorizontal, id: "more" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-green-300 text-white"
                      : "text-gray-600 hover:bg-green-100"
                  }`}
                >
                  <item.Icon size={20} />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
