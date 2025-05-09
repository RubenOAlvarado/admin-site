import { useEffect, useState } from "react";
import supabase from "../services/supabase/supabaseClients";
import { motion } from 'framer-motion';
import { User } from "@supabase/supabase-js";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">User ID</label>
            <p className="text-gray-800">{user?.id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Created At</label>
            <p className="text-gray-800">{new Date(user?.created_at || "").toLocaleDateString()}</p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => supabase.auth.signOut()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;