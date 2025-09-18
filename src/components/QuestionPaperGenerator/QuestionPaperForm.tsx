/**
 * Question Paper Generation Form Component
 * Handles user input for class and subject selection
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionPaperRequest } from '../../services/api/questionPaperService';

interface QuestionPaperFormProps {
  onSubmit: (request: QuestionPaperRequest) => void;
  isLoading: boolean;
}

const QuestionPaperForm: React.FC<QuestionPaperFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<QuestionPaperRequest>({
    board: 'CBSE',
    class_name: '',
    subject: ''
  });

  const [errors, setErrors] = useState<Partial<QuestionPaperRequest>>({});

  // Available classes and subjects (matching the existing classData.json structure)
  const classOptions = [
    { value: '9', label: 'Class 9th' },
    { value: '10', label: 'Class 10th' },
    { value: '11', label: 'Class 11th' },
    { value: '12', label: 'Class 12th' }
  ];

  const subjectOptions: Record<string, string[]> = {
    '9': ['Science', 'English-Words and Expressions', 'Sst', 'Maths', 'English-Moments'],
    '10': ['Science', 'Sst', 'Maths', 'English-First Flight'],
    '11': ['Chemistry', 'sample paper + mock paper', 'Maths', 'Physics', 'Biology'],
    '12': ['Chemistry', 'sample paper + mock paper', 'Maths', 'Physics', 'Biology']
  };

  const handleInputChange = (field: keyof QuestionPaperRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Reset subject when class changes
    if (field === 'class_name' && formData.class_name !== value) {
      setFormData(prev => ({
        ...prev,
        subject: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionPaperRequest> = {};

    if (!formData.class_name) {
      newErrors.class_name = 'Please select a class';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const availableSubjects = formData.class_name ? subjectOptions[formData.class_name] || [] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Generate Question Paper
        </h2>
        <p className="text-gray-600">
          Select your class and subject to generate a customized question paper
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Board Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Board
          </label>
          <div className="relative">
            <select
              value={formData.board}
              onChange={(e) => handleInputChange('board', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              disabled={isLoading}
            >
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
            </select>
          </div>
        </motion.div>

        {/* Class Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.class_name}
              onChange={(e) => handleInputChange('class_name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.class_name
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-white'
                }`}
              disabled={isLoading}
            >
              <option value="">Select a class</option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.class_name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.class_name}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Subject Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${errors.subject
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-white'
                }`}
              disabled={isLoading || !formData.class_name}
            >
              <option value="">
                {formData.class_name ? 'Select a subject' : 'Select a class first'}
              </option>
              {availableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.subject}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Paper...</span>
              </div>
            ) : (
              'Generate Question Paper'
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-800">AI Disclaimer</h4>
            <p className="text-sm text-blue-700 mt-1">
              This AI-generated question paper is for educational purposes only.
              While we strive for accuracy, AI systems may occasionally make mistakes.
              Please review all questions and answers before use in formal assessments.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionPaperForm;
