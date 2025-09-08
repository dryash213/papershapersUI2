import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, sendVerificationEmail } = useContext(AuthContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const result = await signup(data.email, data.password);
      if (result.success) {
        setEmailSent(true);
        toast.success(result.message);
      } else {
        throw new Error(result.error as string);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    }
  };

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      toast.success("Verification email resent!");
    } catch (error: any) {
      toast.error("Failed to resend verification email");
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
            className="text-2xl lg:text-3xl font-bold cursor-pointer mb-4"
            onClick={() => navigate("/")}
          >
            Paper Shapers{" "}
            <span className="inline-block transform rotate-45">📝</span>
          </div>
          <div className="my-4 lg:my-8">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight lg:leading-snug">
              Join Paper Shapers
            </h1>
            <p className="text-base lg:text-lg mb-4 lg:mb-6">
              Start generating AI-powered mock papers for classes 9, 10, and 12
              with ease. Enhance your preparation and stay ahead.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Signup Form */}
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

        <div className="relative z-10 w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.h2
              key={emailSent ? "verify" : "signup"}
              className="text-2xl lg:text-3xl font-semibold mb-6 lg:mb-8 text-green-800 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {emailSent ? (
                <span className="flex items-center justify-center gap-2">
                  📧 Verify Your Email
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Create Account
                </span>
              )}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {emailSent ? (
              <motion.div
                key="email-sent"
                className="w-full space-y-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-2xl">✅</span>
                </motion.div>

                <motion.p
                  className="text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  We've sent a verification link to your email address. Please check
                  your inbox and click the link to verify your account.
                </motion.p>

                <motion.button
                  onClick={handleResendEmail}
                  className="w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-base lg:text-lg hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    📬 Resend Verification Email
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => navigate("/login")}
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Already verified? Login here 🔑
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="signup-form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <motion.input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white text-sm lg:text-base"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>⚠️</span>
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white text-sm lg:text-base"
                    whileFocus={{ scale: 1.01 }}
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

                {/* Password Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white text-sm lg:text-base pr-12"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>⚠️</span>
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white text-sm lg:text-base pr-12"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>⚠️</span>
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-base lg:text-lg hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Account ✨
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!emailSent && (
            <motion.div
              className="text-center text-gray-600 mt-8 text-sm lg:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
              >
                Login here 🔑
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;