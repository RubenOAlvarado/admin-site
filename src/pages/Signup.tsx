import { useState } from 'react';
import supabase from '../services/supabase/supabaseClients';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate("/clients");
      }
    } catch (err) {
      setError(`Error creating account: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">EHR Manager</h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 text-center">Create Account</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm rounded"
              >
                <p>{error}</p>
              </motion.div>
            )}

            <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </motion.div>

            <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors mt-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center"
          >
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-700 hover:text-gray-900">
                Log in
              </a>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}