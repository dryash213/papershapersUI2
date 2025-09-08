import {
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import FAQSection from "components/FAQSection";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "components/HeroSection";

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const slideInLeft: Variants = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls };
};

const LandingPage = () => {
  // State to control visibility of "Start Free Trial" button
  const [showStartFreeTrial, setShowStartFreeTrial] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user");
      if (!stored) {
        setShowStartFreeTrial(true);
        return;
      }
      const parsed = JSON.parse(stored);
      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed) ||
        Object.keys(parsed).length === 0
      ) {
        setShowStartFreeTrial(true);
      } else {
        setShowStartFreeTrial(false);
      }
    } catch (e) {
      setShowStartFreeTrial(true);
      console.error("Failed to parse user from sessionStorage:", e);
    }
  }, []);

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection showStartFreeTrial={showStartFreeTrial} staggerContainer={staggerContainer} fadeInUp={fadeInUp} />
      
      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Pricing Section */}
      <PricingSection showStartFreeTrial={showStartFreeTrial} />

      {/* FAQSection */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const { ref, controls } = useScrollAnimation();

  const features = [
    {
      title: "AI-Powered Exam Generator",
      description:
        "Create customized mock papers and test questions for Classes 9-12 (CBSE). Select your class, subject, and chapter to generate tailored practice materials or assessment questions instantly.",
      link: "/mock-paper-creator",
      linkText: "Try Exam Generator",
      icon: <SparklesIcon className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Document-Based Question Generator",
      description:
        "Upload documents (resumes, study materials, etc.) to receive personalized text outputs with relevant interview questions or chapter tests generated using content analysis and web research integration.",
      link: "/document-helper",
      linkText: "Try Document Helper",
      icon: <CloudArrowUpIcon className="w-10 h-10 text-green-600" />,
    },
    {
      title: "Web Research Questions Generator",
      description:
        "Input your research query and get a detailed text output compiling curated web sources and research insights, empowering your study and analysis with up-to-date information.",
      link: "/research-service",
      linkText: "Try Research Text Generator",
      icon: <MagnifyingGlassIcon className="w-10 h-10 text-green-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-700">
            Smart Exam Preparation & Research Solutions
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-white/20 flex flex-col group"
            >
              <div className="flex-grow">
                <motion.div
                  className="mb-6 p-4 bg-emerald-50 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <motion.a
                href={feature.link}
                className="mt-4 inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-center font-semibold shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.linkText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  const { ref, controls } = useScrollAnimation();

  const benefits = [
    {
      title: "Cost-Free Innovation:",
      description: "Empower your studies without any cost, as our platform is completely free for students, teachers, and institutions."
    },
    {
      title: "Personalized Exam Generation:",
      description: "Leverage AI to create custom mock papers tailored to your specific curriculum and learning needs."
    },
    {
      title: "Real-Time Answer Key:",
      description: "Receive immediate solutions that helps you pinpoint strengths and address weaknesses effectively."
    },
    {
      title: "Integrated Research Support:",
      description: "Combine exam prep with research outputs and curated insights from credible web sources for a holistic learning experience."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Key Benefits of Using Papershapers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Experience a revolution in exam preparation and research with our
            free, AI-powered platform—designed exclusively for educational
            excellence.
          </p>
        </motion.div>

        <motion.ul
          className="space-y-6 text-left"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-start group"
              variants={slideInLeft}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="flex-shrink-0 mr-3 text-green-700 font-bold text-xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                •
              </motion.span>
              <span className="group-hover:text-gray-900 transition-colors duration-300">
                <strong>{benefit.title}</strong> {benefit.description}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

// Pricing Section Component
const PricingSection = ({ showStartFreeTrial }: { showStartFreeTrial: boolean }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Completely Free for Educational Use
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            We believe in accessible education for all. Our platform is
            completely free for students, teachers, and educational
            institutions.
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-green-100 relative overflow-hidden"
          variants={scaleIn}
          initial="hidden"
          animate={controls}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <span className="bg-green-700 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
              Free Forever
            </span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Full Access for Everyone
          </h3>

          <motion.p
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-green-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
          >
            $0
          </motion.p>

          <motion.ul
            className="text-gray-600 space-y-3 mb-8 text-sm sm:text-base max-w-sm mx-auto text-left"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
            {[
              "Unlimited AI-generated papers",
              "All question types and subjects",
              "Priority support for educators"
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                variants={fadeInUp}
              >
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {showStartFreeTrial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-block px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors duration-300 shadow-md text-base sm:text-lg font-semibold hover:shadow-lg"
                >
                  Get Started Free
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          className="mt-8 text-xs sm:text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          For schools and institutions needing customized solutions, contact
          our education team.
        </motion.p>
      </div>
    </section>
  );
};

export default LandingPage;