import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase/supabaseClients';
import { User } from '@supabase/supabase-js';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold tracking-tight">EHR Manager</Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/clients"
                className="hover:text-blue-200 transition-colors font-medium relative group"
              >
                Clients
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/ehr-providers"
                className="hover:text-blue-200 transition-colors font-medium relative group"
              >
                EHR Providers
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 ring-1 ring-black ring-opacity-5">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;