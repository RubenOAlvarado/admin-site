import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase/supabaseClients";
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
      } else {
        navigate("/clients");
      }
    } catch (err) {
      setError(`Error logging in: ${err}`);
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
          <p className="text-gray-500 mt-1">Admin Site</p>
        </div>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-5 text-center">Sign In</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm rounded"
              >
                <p>{error}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="you@email.com"
                  required
                />
              </motion.div>

              <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                      Remember me
                    </label>
                  </div>

                  <a href="#" className="text-xs text-gray-600 hover:text-gray-800">
                    Forgot password?
                  </a>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all mt-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center"
          >
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-gray-700 hover:text-gray-900">
                Sign up
              </a>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}