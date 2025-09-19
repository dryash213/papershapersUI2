import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeUploadForm from '../components/ResumeUploadForm';
import ResumeAnalysisDisplay from '../components/ResumeAnalysisDisplay';
import { analyzeResume, ResumeAnalysisRequest, ResumeAnalysisResponse } from '../services/api/resumeAnalysisService';

const ResumeAnalysisPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResponse['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<'general' | 'detailed' | 'skills' | 'experience'>('general');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setAnalysis(null);
  };

  const handleAnalysisTypeChange = (type: 'general' | 'detailed' | 'skills' | 'experience') => {
    setAnalysisType(type);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select a resume file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: ResumeAnalysisRequest = {
        file: selectedFile,
        analysisType
      };

      const response = await analyzeResume(request);
      
      if (response.success) {
        setAnalysis(response.data);
        toast.success('Resume analyzed successfully!');
      } else {
        setError(response.message || 'Analysis failed');
        toast.error('Failed to analyze resume');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setError(null);
    setAnalysisType('general');
  };

  return (
    <>
      <Helmet>
        <title>Resume Analysis | AI-Powered Resume Review - Papershapers</title>
        <meta
          name="description"
          content="Get comprehensive AI-powered resume analysis with detailed feedback, skill assessment, and improvement suggestions. Upload your resume for instant professional review."
        />
        <meta
          name="keywords"
          content="resume analysis, AI resume review, resume feedback, career advice, job application, resume optimization, Papershapers"
        />
        <link rel="canonical" href="https://papershapers.in/resume-analysis" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Resume Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get comprehensive feedback on your resume with our advanced AI analysis. 
              Receive detailed insights, skill assessments, and personalized recommendations 
              to make your resume stand out.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant Analysis
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Detailed Feedback
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Improvement Suggestions
              </span>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {!analysis ? (
              <div className="space-y-8">
                {/* Upload Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <ResumeUploadForm
                    onFileSelect={handleFileSelect}
                    onAnalysisTypeChange={handleAnalysisTypeChange}
                    isLoading={isLoading}
                    error={error || undefined}
                  />
                  
                  {/* Analyze Button */}
                  {selectedFile && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Resume...
                          </span>
                        ) : (
                          'Analyze Resume'
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                    <p className="text-gray-600 text-sm">Get detailed insights into your resume's strengths and areas for improvement.</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
                    <p className="text-gray-600 text-sm">Receive your analysis results in seconds with our advanced AI technology.</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Actionable Insights</h3>
                    <p className="text-gray-600 text-sm">Get specific recommendations to optimize your resume for better results.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Analysis Results */}
                <ResumeAnalysisDisplay analysis={analysis} />
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Analyze Another Resume
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Print Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResumeAnalysisPage;
