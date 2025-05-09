import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6"
          >
            <Outlet />
          </motion.div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;