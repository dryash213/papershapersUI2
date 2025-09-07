import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({ showStartFreeTrial, staggerContainer, fadeInUp }: any) => {
  // Floating Elements Component
  const FloatingElements = () => {
    return (
      <>
        {/* Floating Papers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`paper-${i}`}
            className="absolute w-8 h-10 bg-white/10 rounded-lg border border-green-200/20 backdrop-blur-sm"
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
            }}
            initial={{
              opacity: 0,
              y: 20,
              rotate: Math.random() * 20 - 10
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -15, 0],
              rotate: [
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
              ],
              x: [0, Math.random() * 10 - 5, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {/* Paper lines */}
            <div className="p-1 space-y-1">
              <div className="h-0.5 bg-green-300/30 rounded w-3/4"></div>
              <div className="h-0.5 bg-green-300/20 rounded w-full"></div>
              <div className="h-0.5 bg-green-300/20 rounded w-2/3"></div>
            </div>
          </motion.div>
        ))}

        {/* Floating Icons */}
        {['📝', '🧠', '⚡', '🎯'].map((icon, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-2xl opacity-20 pointer-events-none"
            style={{
              left: `${70 + (i % 2) * 15}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>
        ))}

        {/* Geometric Shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full"
            style={{
              left: `${10 + i * 25}%`,
              top: `${60 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </>
    );
  };

  // Particle System
  const ParticleSystem = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="text-center py-12 md:py-24 bg-gray-50 px-4 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Animated Background Elements */}
      <FloatingElements />
      <ParticleSystem />

      {/* Radial Glow Effects */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-green-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform Your Exam Preparation and Research Workflow with
        </motion.h1>

        {/* Animated Heading with enhanced animation */}
        <motion.h2
          className="inline-block overflow-hidden border-r-4 border-green-700 text-xl motion-preset-typewriter-[50] motion-duration-[8s] sm:text-2xl md:text-4xl font-bold text-green-700 whitespace-nowrap mx-auto max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-6xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          GenAI-Powered Exam Papers for Classes 9-12 | CBSE
        </motion.h2>

        <motion.p
          className="text-md sm:text-lg md:text-xl text-gray-600 mt-6 sm:mt-8 md:mt-8 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Elevate Your Study Game with Expert Tools: Create AI-Powered Mock
          Papers and generate comprehensive research outputs from curated web
          sources with ease.
        </motion.p>

        {/* Enhanced Buttons Container */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {showStartFreeTrial && (
            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="group relative overflow-hidden px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10">Start Free Trial</span>
                </Link>
              </motion.div>
            </motion.div>
          )}

          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/mock-paper-creator"
                className="group relative overflow-hidden px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gray-100/80 backdrop-blur-sm text-gray-700 font-semibold text-sm sm:text-base border border-gray-200/70 shadow-sm hover:shadow-lg transition-all duration-300 inline-block"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Exam Generator</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/research-service"
                className="group relative overflow-hidden px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-sm sm:text-base text-green-800 bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 border border-green-200/70 shadow-sm hover:shadow-lg transition-all duration-300 inline-block"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Research Text Output</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;