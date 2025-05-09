import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-500">
            You are now logged in. Select an option below to manage your EHR system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/clients"
            className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Clients</h3>
            </div>
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Manage organizations and clients.</p>
          </Link>

          <Link
            to="/base-questions"
            className="group p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors">Base Questions</h3>
            </div>
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Create and manage reusable questions.</p>
          </Link>

          <Link
            to="/question-sets"
            className="group p-6 border border-gray-200 rounded-lg hover:border-purple-500 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors">Question Sets</h3>
            </div>
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Organize questionnaires by client.</p>
          </Link>

          <Link
            to="/ehr-providers"
            className="group p-6 border border-gray-200 rounded-lg hover:border-amber-500 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-100 transition-colors">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-amber-600 transition-colors">EHR Providers</h3>
            </div>
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Configure integrated providers.</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;