/**
 * Resume Analysis Service
 * Handles API communication for analyzing resumes
 */

import axiosInstance from '../axiosInstance';

// Types for the API request and response
export interface ResumeAnalysisRequest {
  file: File;
  analysisType?: 'general' | 'detailed' | 'skills' | 'experience';
}

export interface ResumeAnalysisResponse {
  success: boolean;
  data: {
    personalInfo: {
      name?: string;
      email?: string;
      phone?: string;
      location?: string;
    };
    summary: string;
    skills: string[];
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
    recommendations: {
      strengths: string[];
      improvements: string[];
      suggestions: string[];
    };
    score: {
      overall: number;
      skills: number;
      experience: number;
      education: number;
    };
  };
  message?: string;
}

export interface ResumeAnalysisError {
  success: false;
  error: string;
  message: string;
}

/**
 * Analyze resume by calling the backend API
 * @param request - The resume analysis request
 * @returns Promise<ResumeAnalysisResponse> - The analysis results
 */
export const analyzeResume = async (
  request: ResumeAnalysisRequest
): Promise<ResumeAnalysisResponse> => {
  try {
    console.log('Analyzing resume:', request.file.name);

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', request.file);
    if (request.analysisType) {
      formData.append('analysisType', request.analysisType);
    }

    const response = await axiosInstance.post<ResumeAnalysisResponse>(
      '/analyze-resume',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout for file processing
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing resume:', error);

    // // Handle different types of errors
    // if (axiosInstance.isAxiosError && axiosInstance.isAxiosError(error as any)) {
    //   if (error.response) {
    //     // Server responded with error status
    //     const errorData = error.response.data as ResumeAnalysisError;
    //     throw new Error(errorData.message || `Server error: ${error.response.status}`);
    //   } else if (error.request) {
    //     // Request was made but no response received
    //     throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    //   } else {
    //     // Something else happened
    //     throw new Error(`Request error: ${error.message}`);
    //   }
    // }

    // Re-throw any other errors
    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Validate resume file
 * @param file - The file to validate
 * @returns boolean - Whether the file is valid
 */
export const validateResumeFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a PDF, DOC, DOCX, or TXT file.'
    };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB.'
    };
  }

  return { isValid: true };
};

/**
 * Get supported file types for resume upload
 * @returns Array of supported file types
 */
export const getSupportedFileTypes = (): string[] => {
  return ['.pdf', '.doc', '.docx', '.txt'];
};

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
