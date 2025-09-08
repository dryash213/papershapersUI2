import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useContext(AuthContext)!;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        toast.success("Google login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error: any) {
      toast.error("Google login failed. Please try again.", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Image and Text (unchanged) */}
      <div
        className="lg:w-2/3 w-full h-64 lg:h-auto bg-cover bg-center relative"
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
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-snug">
              Generate Mock Papers Effortlessly
            </h1>
            <p className="text-base lg:text-lg mb-6">
              Create AI-powered mock tests for classes 9, 10, 11, and 12.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Login Form */}
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
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold mb-6 lg:mb-8 text-green-800 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome Back 👋
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Email Field */}
            <motion.div className="relative">
              <motion.input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white"
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

            {/* Password Field */}
            <motion.div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white pr-12"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
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

            {/* Forgot Password */}
            <div className="text-right">
              <motion.a
                href="/forgot-password"
                className="text-green-600 text-sm hover:text-green-700 transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Forgot Password? 🔑
              </motion.a>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Sign In ✨</span>
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <motion.div
                  className="w-full border-t border-gray-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 48 48"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </motion.svg>
              Continue with Google
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            className="text-center text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
            >
              Create your account 🚀
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;