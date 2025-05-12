import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-800 mb-3">Welcome to EHR Manager</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Streamline your electronic health records management with our comprehensive dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Link
            to="/clients"
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Clients</h3>
                  <p className="text-sm text-gray-500">Manage organizations and clients</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                  Access module
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/ehr-providers"
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">EHR Providers</h3>
                  <p className="text-sm text-gray-500">Configure integrated providers</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-800 transition-colors">
                  Access module
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/ehr-mappings"
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">EHR Mappings</h3>
                  <p className="text-sm text-gray-500">Configure questions mappers</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-800 transition-colors">
                  Access module
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/base-questions"
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-100 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Base Questions</h3>
                  <p className="text-sm text-gray-500">Create and manage reusable questions</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-800 transition-colors">
                  Access module
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/question-sets"
            className="group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-100 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Question Sets</h3>
                  <p className="text-sm text-gray-500">Organize questionnaires by client</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-800 transition-colors">
                  Access module
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;