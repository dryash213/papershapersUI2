import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();

  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setEmailSent(true);
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error sending reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Image and Text (unchanged) */}
      <div
        className="lg:w-2/3 w-full h-64 lg:h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5710614/pexels-photo-5710614.jpeg?auto=compress&cs=tinysrgb&w=800')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col justify-center h-full px-6 lg:px-10 text-white z-10">
          <div
            className="text-2xl lg:text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Paper Shapers{" "}
            <span className="inline-block transform rotate-45">📝</span>
          </div>
          <div className="my-4 lg:my-8">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight lg:leading-snug">
              Reset Your Password
            </h1>
            <p className="text-base lg:text-lg mb-4 lg:mb-6">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Form */}
      <motion.div
        className="lg:w-1/3 w-full flex flex-col justify-center items-center p-6 lg:p-10 bg-white lg:min-h-screen relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
              backgroundSize: "20px 20px"
            }}
          />
        </div>

        <div className="w-full max-w-md space-y-6 relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-2xl">🔐</span>
            </motion.div>

            <h2 className="text-2xl lg:text-3xl font-semibold text-green-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600">
              Don't worry! We'll help you regain access to your account.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {emailSent ? (
              <motion.div
                key="success"
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-green-800 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Email Sent Successfully! 📧
                </motion.h3>

                <motion.p
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Check your inbox for password reset instructions. If you don't
                  see it, check your spam folder.
                </motion.p>

                <motion.button
                  onClick={() => setEmailSent(false)}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Send another email? 🔄
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    📧 Email Address
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>⚠️</span>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span
                        key="loading"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        📨 Send Reset Instructions
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer Links */}
          <motion.div
            className="text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span>Remember your password? </span>
            <motion.div className="inline-block">
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1"
                >
                  🔑 Login here
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            className="text-center pt-4 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-sm text-gray-500 mb-2">Need more help?</p>
            <motion.button
              onClick={() => navigate("/contact")}
              className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 Contact Support
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;