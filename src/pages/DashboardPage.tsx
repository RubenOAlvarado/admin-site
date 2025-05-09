import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to EHR Manager</h1>

        <p className="text-gray-600 mb-8">
          You are now logged in. Select an option from the menu to start managing your EHR system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/clients"
            className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-blue-700">Clients</h3>
            <p className="text-sm text-blue-600 mt-2">Manage organizations and clients.</p>
          </Link>

          <Link
            to="/base-questions"
            className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-green-700">Base Questions</h3>
            <p className="text-sm text-green-600 mt-2">Create and manage reusable questions.</p>
          </Link>

          <Link
            to="/question-sets"
            className="p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-purple-700">Question Sets</h3>
            <p className="text-sm text-purple-600 mt-2">Organize questionnaires by client.</p>
          </Link>

          <Link
            to="/ehr-providers"
            className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-yellow-700">EHR Providers</h3>
            <p className="text-sm text-yellow-600 mt-2">Configure integrated providers.</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;