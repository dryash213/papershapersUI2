import React, { useState, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { validateResumeFile, getSupportedFileTypes, formatFileSize } from '../services/api/resumeAnalysisService';

interface ResumeUploadFormProps {
  onFileSelect: (file: File) => void;
  onAnalysisTypeChange: (type: 'general' | 'detailed' | 'skills' | 'experience') => void;
  isLoading: boolean;
  error?: string;
}

const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({
  onFileSelect,
  onAnalysisTypeChange,
  isLoading,
  error
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisType, setAnalysisType] = useState<'general' | 'detailed' | 'skills' | 'experience'>('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validation = validateResumeFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalysisTypeChange = (type: 'general' | 'detailed' | 'skills' | 'experience') => {
    setAnalysisType(type);
    onAnalysisTypeChange(type);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-green-500 bg-green-50'
            : selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <DocumentIcon className="w-12 h-12 text-green-600" />
              <div className="text-left">
                <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button
                onClick={removeFile}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                disabled={isLoading}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your resume here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-green-600 hover:text-green-700 font-medium"
                  disabled={isLoading}
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports: {getSupportedFileTypes().join(', ')} (max 10MB)
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={getSupportedFileTypes().join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isLoading}
        />
      </div>

      {/* Analysis Type Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Analysis Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'general', label: 'General Analysis', desc: 'Overall resume review' },
            { value: 'detailed', label: 'Detailed Analysis', desc: 'Comprehensive evaluation' },
            { value: 'skills', label: 'Skills Focus', desc: 'Skills assessment' },
            { value: 'experience', label: 'Experience Review', desc: 'Work experience analysis' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnalysisTypeChange(option.value as any)}
              className={`p-3 rounded-lg border text-left transition-all ${
                analysisType === option.value
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
              disabled={isLoading}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
          <span className="text-sm text-gray-600">Analyzing resume...</span>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadForm;
