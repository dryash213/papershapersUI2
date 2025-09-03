// src/pages/PricingPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              All plans are now free to help you get started with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                plan: "Basic",
                features: [
                  "AI-Powered Mock Papers",
                  "Basic Question Bank Access",
                  "Performance Analytics",
                  "Email Support",
                  "5 Papers/Month",
                ],
                recommended: false,
              },
              {
                plan: "Pro",
                features: [
                  "All Basic Features",
                  "Advanced Question Bank",
                  "Detailed Analytics",
                  "Priority Support",
                  "Unlimited Papers",
                  "Exam Simulator",
                ],
                recommended: true,
              },
              {
                plan: "Institution",
                features: [
                  "All Pro Features",
                  "Bulk License Management",
                  "Dedicated Support",
                  "Custom Integration",
                  "SLA Agreement",
                  "Training & Onboarding",
                ],
                recommended: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                  plan.recommended
                    ? "bg-green-50 border-2 border-green-200 transform scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.plan}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-green-600">
                      Free
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.recommended
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes, you can switch between plans anytime since all are free.",
                },
                {
                  question: "Do you offer discounts for students?",
                  answer: "All plans are free, so no discounts are needed.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "No payment is required as all plans are free.",
                },
                {
                  question: "Is there a free trial available?",
                  answer:
                    "All plans are free forever, so a trial is not needed.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8">
            Start creating better mock papers today with Paper Shapers
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-green-600 rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg font-medium"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
