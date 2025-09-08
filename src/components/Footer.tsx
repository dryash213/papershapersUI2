import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const socialIconVariants: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
    color: "rgb(156, 163, 175)" // gray-400
  },
  hover: {
    scale: 1.2,
    rotate: 5,
    color: "rgb(255, 255, 255)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1
    }
  }
};

const linkVariants: Variants = {
  rest: {
    x: 0,
    color: "rgb(156, 163, 175)" // gray-400
  },
  hover: {
    x: 5,
    color: "rgb(255, 255, 255)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const brandVariants: Variants = {
  rest: {
    scale: 1,
    color: "rgb(255, 255, 255)"
  },
  hover: {
    scale: 1.05,
    color: "rgb(34, 197, 94)", // green-500
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8 relative z-10">
        {/* Brand Section */}
        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.h3
            className="text-2xl font-bold cursor-pointer"
            variants={brandVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => window.location.replace("/")}
          >
            Paper Shapers
          </motion.h3>

          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Your partner in AI-powered mock paper creation, transforming
            education one test at a time.
          </motion.p>

          <motion.div
            className="flex space-x-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* LinkedIn Icon */}
            <motion.a
              href="https://www.linkedin.com/company/papershapersai"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              variants={socialIconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label="Papershapers on LinkedIn"
            >
              <span className="sr-only">Papershapers on LinkedIn</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <title>LinkedIn</title>
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </motion.svg>
            </motion.a>

            {/* Instagram Icon */}
            <motion.a
              href="https://www.instagram.com/papershapers_works/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
              variants={socialIconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label="Papershapers on Instagram"
            >
              <span className="sr-only">Papershapers on Instagram</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-instagram"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <title>Instagram</title>
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </motion.svg>
            </motion.a>

            {/* Facebook Icon */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=61572831503971"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              variants={socialIconVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label="Papershapers on Facebook"
            >
              <span className="sr-only">Papershapers on Facebook</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <title>Facebook</title>
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div variants={itemVariants}>
          <motion.h4
            className="text-xl font-semibold text-white mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Quick Links
          </motion.h4>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {[
              { to: "/dashboard", text: "Dashboard" },
              { to: "/about", text: "About Us" },
              { to: "/services", text: "Services" },
              { to: "/contact", text: "Contact" }
            ].map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4 }
                  }
                }}
              >
                <motion.div
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    to={link.to}
                    className="transition-colors duration-300 block"
                  >
                    {link.text}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Resources Section */}
        <motion.div variants={itemVariants}>
          <motion.h4
            className="text-xl font-semibold text-white mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Resources
          </motion.h4>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.7
                }
              }
            }}
          >
            {[
              { to: "#", text: "Blog" },
              { to: "#", text: "FAQ" },
              { to: "#", text: "Documentation" },
              { to: "#", text: "Support" }
            ].map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4 }
                  }
                }}
              >
                <motion.div
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    to={link.to}
                    className="transition-colors duration-300 block"
                  >
                    {link.text}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Legal Section */}
        <motion.div variants={itemVariants}>
          <motion.h4
            className="text-xl font-semibold text-white mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Legal
          </motion.h4>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.9
                }
              }
            }}
          >
            {[
              { to: "#", text: "Privacy Policy" },
              { to: "#", text: "Terms & Conditions" },
              { to: "#", text: "Cookie Policy" },
              { to: "#", text: "Refund Policy" }
            ].map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4 }
                  }
                }}
              >
                <motion.div
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    to={link.to}
                    className="transition-colors duration-300 block"
                  >
                    {link.text}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div
        className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          © 2025 Papershapers. All rights reserved.
        </motion.div>
        <motion.div
          className="mt-2 text-sm text-gray-600"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          App Version: {__APP_VERSION__}
        </motion.div>

        {/* Animated line decoration */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-4"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </motion.footer>
  );
}
