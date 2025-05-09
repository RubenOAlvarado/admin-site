import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import supabase from "../../services/supabase/supabaseClients";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);

      setUser(data?.user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-gray-800 text-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-semibold tracking-tight">EHR Manager</Link>
            </div>

            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-700 rounded-md px-3 py-1.5 transition-all focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50"
                >
                  <span className="text-sm font-medium hidden sm:inline truncate max-w-[120px]">
                    {user.email || 'My Account'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase() || '?'}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              )}

              {isProfileMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-md py-1 z-10 text-gray-800 ring-1 ring-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-500 truncate">
                    {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-50 text-sm transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm transition-colors text-gray-700"
                  >
                    Log out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;