import { useState, FC } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useNavigate } from "react-router";

interface FAQItem {
  question: string;
  answer: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    borderColor: "rgba(229, 231, 235, 1)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

const answerVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const iconVariants: Variants = {
  rest: {
    rotate: 0,
    scale: 1
  },
  expanded: {
    rotate: 180,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.2
    }
  }
};

const FAQSection: FC = () => {
  const navigate = useNavigate();
  const faqData: FAQItem[] = [
    {
      question: "Is Papershapers completely free for educational use?",
      answer:
        "Yes, Papershapers is entirely free for students, teachers, and educational institutions. We believe in accessible education and offer full access with no hidden costs.",
    },
    {
      question: "Which classes does Papershapers cater to?",
      answer:
        "Papershapers is designed for exam preparation and research specifically for Classes 9-12, with a strong focus on the CBSE curriculum.",
    },
    {
      question: "How does the AI-powered exam generator work?",
      answer:
        "Our AI-powered exam generator creates customized mock papers by analyzing your selected subject, chapter, and difficulty level, ensuring a personalized practice experience.",
    },
    {
      question: "Can I use Papershapers for research purposes?",
      answer:
        "Absolutely! In addition to generating exam papers, Papershapers compiles curated research outputs from reliable web sources to help you with your studies.",
    },
    {
      question: "How is my data secured on Papershapers?",
      answer:
        "Your data is protected with state-of-the-art encryption and strict security protocols, ensuring that your information remains private and secure.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number): void => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-gray-600 mt-4 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            Everything you need to know about Papershapers
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="bg-white rounded-2xl border border-gray-200 cursor-pointer overflow-hidden shadow-md relative"
                onClick={() => toggleExpand(index)}
              >
                {/* Gradient border effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <motion.h3
                      className="text-lg sm:text-xl font-semibold text-gray-800 pr-4"
                      layout
                    >
                      {faq.question}
                    </motion.h3>

                    {/* Enhanced icon with multiple states */}
                    <motion.div
                      className="flex-shrink-0"
                      variants={iconVariants}
                      initial="rest"
                      animate={expandedIndex === index ? "expanded" : "rest"}
                      whileHover="hover"
                    >
                      <motion.div
                        className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200"
                        whileHover={{ backgroundColor: "rgb(220, 252, 231)" }}
                      >
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Answer with smooth expand/collapse */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <motion.div
                          className="pt-4 border-t border-gray-100 mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          <motion.p
                            className="text-gray-600 text-base leading-relaxed"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Pulse effect for active item */}
                {expandedIndex === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-green-400/30 rounded-2xl"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* Glow effect for expanded item */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl blur-xl -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Still have questions? We're here to help!
          </motion.p>

          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Button shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear"
              }}
            />

            <span className="relative z-10 flex items-center gap-2" onClick={() => navigate("/contact")}>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                💬
              </motion.span>
              Contact Support
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;