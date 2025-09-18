/**
 * Question Paper Generator Page
 * Main page component that orchestrates the entire question paper generation flow
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionPaperForm from '../components/QuestionPaperGenerator/QuestionPaperForm';
import QuestionPaperDisplay from '../components/QuestionPaperGenerator/QuestionPaperDisplay';
import { QuestionPaperLoading, ErrorState } from '../components/QuestionPaperGenerator/LoadingStates';
import { QuestionPaperRequest, QuestionPaperResponse, generateQuestionPaper } from '../services/api/questionPaperService';

type LoadingStage = 'generating' | 'processing' | 'creating-pdf';

const QuestionPaperGeneratorPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'loading' | 'result' | 'error'>('form');
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('generating');
  const [questionPaper, setQuestionPaper] = useState<QuestionPaperResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (request: QuestionPaperRequest) => {
    setCurrentStep('loading');
    setError(null);
    setLoadingStage('generating');

    try {
      // Simulate different loading stages
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoadingStage('processing');

      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingStage('creating-pdf');

      // Generate question paper
      const result = await generateQuestionPaper(request);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setQuestionPaper(result);
      setCurrentStep('result');
    } catch (err) {
      console.error('Error generating question paper:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate question paper');
      setCurrentStep('error');
    }
  };

  const handleGenerateNew = () => {
    setCurrentStep('form');
    setQuestionPaper(null);
    setError(null);
  };

  const handleRetry = () => {
    setCurrentStep('form');
    setError(null);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'form':
        return (
          <QuestionPaperForm
            onSubmit={handleFormSubmit}
            isLoading={false}
          />
        );

      case 'loading':
        return (
          <div className="bg-white rounded-lg shadow-lg">
            <QuestionPaperLoading stage={loadingStage} />
          </div>
        );

      case 'result':
        return questionPaper ? (
          <QuestionPaperDisplay
            questionPaper={questionPaper}
            onGenerateNew={handleGenerateNew}
          />
        ) : null;

      case 'error':
        return (
          <div className="bg-white rounded-lg shadow-lg">
            <ErrorState
              error={error || 'An unexpected error occurred'}
              onRetry={handleRetry}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Question Paper Generator - Papershapers</title>
        <meta
          name="description"
          content="Generate customized CBSE question papers instantly with our AI-powered tool. Select your class and subject to create practice papers."
        />
        <meta
          name="keywords"
          content="question paper generator, CBSE papers, AI education, mock papers, practice tests"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <motion.section
            className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-7xl -my-12 mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  AI Question Paper Generator
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                  Create customized question papers in seconds with our intelligent AI system.
                  Perfect for teachers, students, and educational institutions.
                </p>

                {/* Features Grid */}
                {/* <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                    <p className="text-sm opacity-80">Generate papers in under 30 seconds</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
                    <p className="text-sm opacity-80">Intelligent question selection and generation</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">PDF Ready</h3>
                    <p className="text-sm opacity-80">Download or preview instantly</p>
                  </div>
                </motion.div> */}
              </motion.div>
            </div>
          </motion.section>

          {/* Main Content */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          {/* {currentStep === 'form' && (
            <motion.section
              className="bg-white py-16 md:py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    How It Works
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Generate professional question papers in three simple steps
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '01',
                      title: 'Select Details',
                      description: 'Choose your board, class, and subject from our comprehensive options.',
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )
                    },
                    {
                      step: '02',
                      title: 'AI Processing',
                      description: 'Our AI analyzes the requirements and generates relevant questions.',
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )
                    },
                    {
                      step: '03',
                      title: 'Download PDF',
                      description: 'Get your customized question paper ready for printing or sharing.',
                      icon: (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold text-green-600 mb-2">{item.step}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )} */}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default QuestionPaperGeneratorPage;
