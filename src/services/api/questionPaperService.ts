/**
 * Question Paper Generation Service
 * Handles API communication for generating question papers
 */

import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://papershapers-test.up.railway.app';

// Types for the API request and response
export interface QuestionPaperRequest {
  board: string;
  class_label: string;
  subject: string;
}

export interface Question {
  section_id: string;
  q_id: string;
  q_text: string;
  type: string;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answer: string | null;
  sources: string[];
  rationale: string;
  needs_review: boolean;
  reason?: string;
}

export interface QuestionPaperResponse {
  paper_id: string;
  board: string;
  class: string;
  subject: string;
  total_marks: number;
  time_minutes: number;
  questions: Question[];
}

/**
 * Generate question paper by calling the FastAPI endpoint
 * @param request - The question paper generation request
 * @returns Promise<QuestionPaperResponse> - The generated question paper
 */
export const generateQuestionPaper = async (
  request: QuestionPaperRequest
): Promise<QuestionPaperResponse> => {
  try {
    console.log('Generating question paper with request:', request);

    const response = await axios.post<QuestionPaperResponse>(
      `${API_BASE_URL}/generate_full`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error generating question paper:', error);

    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      } else {
        // Something else happened
        throw new Error(`Request error: ${error.message}`);
      }
    }

    // Re-throw any other errors
    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Validate question paper request
 * @param request - The request to validate
 * @returns boolean - Whether the request is valid
 */
export const validateQuestionPaperRequest = (request: QuestionPaperRequest): boolean => {
  return !!(
    request.board &&
    request.class_label &&
    request.subject &&
    request.board.trim() !== '' &&
    request.class_label.trim() !== '' &&
    request.subject.trim() !== ''
  );
};

/**
 * Get available classes and subjects from class data
 * @returns Object containing classes and their subjects
 */
export const getAvailableClassesAndSubjects = () => {
  // This would typically come from an API or configuration
  // For now, we'll use the existing classData.json structure
  return {
    "Class 9th": ["Science", "English-Words and Expressions", "Sst", "Maths", "English-Moments"],
    "Class 10th": ["Science", "Sst", "Maths", "English-First Flight"],
    "Class 11th": ["Chemistry", "sample paper + mock paper", "Maths", "Physics", "Biology"],
    "Class 12th": ["Chemistry", "sample paper + mock paper", "Maths", "Physics", "Biology"]
  };
};
