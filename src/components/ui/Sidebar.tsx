import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={{ x: isMenuOpen ? 0 : -250 }}
      animate={{ x: isMenuOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-200 w-64 overflow-y-auto z-10 shadow-md pt-16`}
    >
      <div className="p-4">
        <nav className="space-y-1">
          <Link
            to="/clients"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/clients') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Clients
          </Link>
          <Link
            to="/ehr-providers"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/ehr-providers') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            EHR Providers
          </Link>
          <Link
            to="/ehr-mappings"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/ehr-mappings') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            EHR Mappings
          </Link>
          <Link
            to="/question-sets"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/question-sets') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Question Sets
          </Link>
          <Link
            to="/base-questions"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/base-questions') 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Base Questions
          </Link>
        </nav>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-4 right-3 text-gray-400 hover:text-white transition-colors"
        aria-label={isMenuOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </motion.aside>
  );
};

export default Sidebar;