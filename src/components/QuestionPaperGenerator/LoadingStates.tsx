/**
 * Loading States Component
 * Provides various loading animations and states for the question paper generator
 */

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-green-600'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${color}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

interface LoadingDotsProps {
  color?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ color = 'bg-green-600' }) => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 ${color} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

interface LoadingPulseProps {
  text: string;
}

export const LoadingPulse: React.FC<LoadingPulseProps> = ({ text }) => {
  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-3 h-3 bg-green-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <span className="text-gray-600 font-medium">{text}</span>
    </motion.div>
  );
};

interface QuestionPaperLoadingProps {
  stage: 'generating' | 'processing' | 'creating-pdf';
}

export const QuestionPaperLoading: React.FC<QuestionPaperLoadingProps> = ({ stage }) => {
  const getStageText = () => {
    switch (stage) {
      case 'generating':
        return 'Generating questions...';
      case 'processing':
        return 'Processing question paper...';
      case 'creating-pdf':
        return 'Creating PDF document...';
      default:
        return 'Loading...';
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case 'generating':
        return 'Our AI is creating relevant questions based on your selected class and subject.';
      case 'processing':
        return 'Organizing questions and preparing the paper structure.';
      case 'creating-pdf':
        return 'Converting the question paper to PDF format for download.';
      default:
        return 'Please wait while we process your request.';
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Loading Animation */}
      <motion.div
        className="relative mb-8 w-24 h-24 mx-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 w-20 h-20 border-4 border-green-600 rounded-full border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Stage Text */}
      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-2"
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getStageText()}
      </motion.h3>

      {/* Stage Description */}
      <motion.p
        className="text-gray-600 text-center max-w-md mb-6"
        key={`${stage}-desc`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {getStageDescription()}
      </motion.p>

      {/* Progress Dots */}
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-gray-300'
              }`}
            animate={{
              scale: index === 0 ? [1, 1.2, 1] : 1,
              opacity: index === 0 ? [0.5, 1, 0.5] : 0.3
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3
            }}
          />
        ))}
      </motion.div>

      {/* Estimated Time */}
      <motion.div
        className="mt-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        Estimated time: 10-15 seconds
      </motion.div>
    </motion.div>
  );
};

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Error Icon */}
      <motion.div
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.div>

      {/* Error Message */}
      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Something went wrong
      </motion.h3>

      <motion.p
        className="text-gray-600 text-center max-w-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {error}
      </motion.p>

      {/* Retry Button */}
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

interface SuccessStateProps {
  message: string;
  onAction?: () => void;
  actionText?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  message,
  onAction,
  actionText = 'Continue'
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Success Icon */}
      <motion.div
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      {/* Success Message */}
      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Success!
      </motion.h3>

      <motion.p
        className="text-gray-600 text-center max-w-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {message}
      </motion.p>

      {/* Action Button */}
      {onAction && (
        <motion.button
          onClick={onAction}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};
