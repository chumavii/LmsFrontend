import { useEffect, useState } from "react";
import { Loader2, AlertCircle, User, Settings as SettingsIcon } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
}

interface UserSettings {
  fullName: string;
  email: string;
  roles: string[];
  preferences: UserPreferences;
}

function Settings() {
  const [user, setUser] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch user"))
      .then(data => {
        // Ensure preferences exist
        setUser({
          ...data,
          preferences: data.preferences || { notifications: false, darkMode: false },
        });
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-[#4e8ccf]" />
        <span className="ml-3 text-[#4e8ccf]">Loading settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="page-div max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-[#4e8ccf]">Settings</h2>

      {/* Account Info */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="flex items-center text-xl font-semibold mb-4 ">
          <User className="w-5 h-5 mr-2 text-[#f97316]" /> Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="text-sm font-medium">{user.fullName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="text-sm font-medium">{user.roles.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="flex items-center text-xl font-semibold mb-4 ">
          <SettingsIcon className="w-5 h-5 mr-2 text-[#f97316]" /> Preferences
        </h3>
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={user.preferences?.notifications ?? false}
              className="form-checkbox h-5 w-5 text-[#f97316]"
              readOnly
            />
            <span className="text-sm text-gray-700">Email Notifications</span>
          </label>
          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={user.preferences?.darkMode ?? false}
              className="form-checkbox h-5 w-5 text-[#f97316]"
              readOnly
            />
            <span className="text-sm text-gray-700">Dark Mode</span>
          </label>
        </div>
      </section>

      {/* Save */}
      <section className="bg-white shadow-md rounded-lg p-6 flex justify-end">
        <button className="btn-primary bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md">
          Save Changes
        </button>
      </section>
    </div>
  );
}

export default Settings;
