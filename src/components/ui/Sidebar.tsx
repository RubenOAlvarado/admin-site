import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  closed: {
    x: -250,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  return (
    <motion.aside
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white z-30 shadow-lg overflow-y-auto`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">EHR Manager</h2>
        
        <nav className="space-y-2">
          <Link
            to="/clients"
            className="block px-4 py-2 rounded hover:bg-indigo-800 transition-colors"
          >
            Clients
          </Link>
          <Link
            to="/question-sets"
            className="block px-4 py-2 rounded hover:bg-indigo-800 transition-colors"
          >
            Question Sets
          </Link>
          <Link
            to="/base-questions"
            className="block px-4 py-2 rounded hover:bg-indigo-800 transition-colors"
          >
            Base Questions
          </Link>
          <Link
            to="/ehr-mappings"
            className="block px-4 py-2 rounded hover:bg-indigo-800 transition-colors"
          >
            EHR Mappings
          </Link>
          <Link
            to="/ehr-providers"
            className="block px-4 py-2 rounded hover:bg-indigo-800 transition-colors"
          >
            EHR Providers
          </Link>
        </nav>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.aside>
  );
};

export default Sidebar;