/**
 * Question Paper Display Component
 * Shows the generated question paper with options to download PDF
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionPaperResponse } from '../../services/api/questionPaperService';
import { generateQuestionPaperPDF, downloadPDF, previewPDF, generatePDFFilename } from '../../services/pdfGenerator';
import { LoadingSpinner, ErrorState, SuccessState } from './LoadingStates';

interface QuestionPaperDisplayProps {
  questionPaper: QuestionPaperResponse;
  onGenerateNew: () => void;
}

const QuestionPaperDisplay: React.FC<QuestionPaperDisplayProps> = ({
  questionPaper,
  onGenerateNew
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setPdfError(null);
    setPdfSuccess(false);

    try {
      const pdfBlob = await generateQuestionPaperPDF(questionPaper);
      const filename = generatePDFFilename(questionPaper);
      downloadPDF(pdfBlob, filename);
      setPdfSuccess(true);
    } catch (error) {
      console.error('PDF generation error:', error);
      setPdfError(error instanceof Error ? error.message : 'Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreviewPDF = async () => {
    setIsGeneratingPDF(true);
    setPdfError(null);

    try {
      const pdfBlob = await generateQuestionPaperPDF(questionPaper);
      previewPDF(pdfBlob);
    } catch (error) {
      console.error('PDF generation error:', error);
      setPdfError(error instanceof Error ? error.message : 'Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Group questions by section
  const questionsBySection = questionPaper.questions.reduce((acc, question) => {
    if (!acc[question.section_id]) {
      acc[question.section_id] = [];
    }
    acc[question.section_id].push(question);
    return acc;
  }, {} as Record<string, typeof questionPaper.questions>);


  if (pdfError) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ErrorState
          error={pdfError}
          onRetry={() => {
            setPdfError(null);
            handleDownloadPDF();
          }}
        />
      </div>
    );
  }

  if (pdfSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <SuccessState
          message="PDF has been downloaded successfully!"
          onAction={onGenerateNew}
          actionText="Generate New Paper"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* CBSE Style Header */}
      <div className="bg-white border-b-2 border-gray-300 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QUESTION PAPER</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">{questionPaper.board}</span>
            </div>
            <div>
              <span className="font-semibold">{questionPaper.class}</span>
            </div>
            <div>
              <span className="font-semibold">Subject:</span> {questionPaper.subject}
            </div>
            <div>
              <span className="font-semibold">Time:</span> {questionPaper.time_minutes} minutes
            </div>
            <div>
              <span className="font-semibold">Total Marks:</span> {questionPaper.total_marks}
            </div>
            <div>
              <span className="font-semibold">Paper ID:</span> {questionPaper.paper_id}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${isGeneratingPDF
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              }`}
          >
            {isGeneratingPDF ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" color="text-white" />
                <span>Generating PDF...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </div>
            )}
          </motion.button>

          <motion.button
            onClick={handlePreviewPDF}
            disabled={isGeneratingPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-lg font-medium border-2 transition-all duration-200 ${isGeneratingPDF
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              }`}
          >
            {isGeneratingPDF ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" color="text-gray-400" />
                <span>Generating PDF...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Preview PDF</span>
              </div>
            )}
          </motion.button>

          <motion.button
            onClick={onGenerateNew}
            disabled={isGeneratingPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-6 rounded-lg font-medium border-2 border-gray-300 text-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>New Paper</span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* CBSE Style Question Paper Content */}
      <div className="bg-white p-8 max-w-4xl mx-auto">
        {/* CBSE Style Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="border-l-4 border-blue-600 pl-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">GENERAL INSTRUCTIONS:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>1. All questions are compulsory.</p>
              <p>2. Read each question carefully before answering.</p>
              <p>3. Write your answers in the space provided.</p>
              <p>4. Use blue or black ink only.</p>
              <p>5. Draw diagrams wherever necessary.</p>
            </div>
          </div>
        </motion.div>

        {/* CBSE Style Questions */}
        {Object.entries(questionsBySection).map(([sectionId, questions], sectionIndex) => (
          <motion.div
            key={sectionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + sectionIndex * 0.1, duration: 0.5 }}
            className="mb-12"
          >
            {/* Section Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                SECTION {sectionId}
              </h3>
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>

            {/* Questions List */}
            <div className="space-y-8">
              {(expandedSections.has(sectionId) ? questions : questions.slice(0, 3)).map((question, questionIndex) => (
                <motion.div
                  key={question.q_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + sectionIndex * 0.1 + questionIndex * 0.05, duration: 0.4 }}
                  className="relative"
                >
                  {/* Question */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                      {question.q_id.split('.')[1]}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-base leading-relaxed mb-2">
                        {question.q_text}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-medium">[{question.marks} marks]</span>
                        <span className="text-gray-400">•</span>
                        <span className="capitalize">{question.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More/Hide Button */}
            {questions.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + sectionIndex * 0.1, duration: 0.5 }}
                className="text-center mt-6"
              >
                {expandedSections.has(sectionId) ? (
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Hide Questions
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    View More Questions ({questions.length - 3} more)
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionPaperDisplay;
