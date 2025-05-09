import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from 'framer-motion';
import supabase from "../../services/supabase/supabaseClients";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/" className="text-2xl font-bold tracking-tight">EHR Manager</Link>
            </div>

            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 hover:bg-opacity-70 rounded-full px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  <span className="text-sm font-medium hidden sm:inline truncate max-w-[120px]">
                    {user.email || 'My Account'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-indigo-800 flex items-center justify-center font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase() || '?'}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              )}

              {isProfileMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 ring-1 ring-black ring-opacity-5"
                >
                  <div className="px-4 py-2 border-b text-sm text-gray-500 truncate">
                    {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors"
                  >
                    Log out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      <Sidebar isOpen={true} />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;