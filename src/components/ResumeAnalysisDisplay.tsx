import React from 'react';
import { 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { ResumeAnalysisResponse } from '../services/api/resumeAnalysisService';

interface ResumeAnalysisDisplayProps {
  analysis: ResumeAnalysisResponse['data'];
  isLoading?: boolean;
}

const ResumeAnalysisDisplay: React.FC<ResumeAnalysisDisplayProps> = ({ 
  analysis, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis Results</h2>
        <p className="text-gray-600">Comprehensive analysis of your resume</p>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <ChartBarIcon className="w-6 h-6 mr-2 text-green-600" />
            Overall Score
          </h3>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${getScoreColor(analysis.score.overall)}`}>
            {getScoreLabel(analysis.score.overall)}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analysis.score).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      {analysis.personalInfo && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-6 h-6 mr-2 text-green-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.personalInfo).map(([key, value]) => (
              value && (
                <div key={key} className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-gray-900">{value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <StarIcon className="w-6 h-6 mr-2 text-green-600" />
          Summary
        </h3>
        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Skills */}
      {analysis.skills && analysis.skills.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AcademicCapIcon className="w-6 h-6 mr-2 text-green-600" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {analysis.experience && analysis.experience.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BriefcaseIcon className="w-6 h-6 mr-2 text-green-600" />
            Work Experience
          </h3>
          <div className="space-y-4">
            {analysis.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                  <span className="text-sm text-gray-500">{exp.duration}</span>
                </div>
                <p className="font-medium text-gray-700 mb-1">{exp.company}</p>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {analysis.education && analysis.education.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AcademicCapIcon className="w-6 h-6 mr-2 text-green-600" />
            Education
          </h3>
          <div className="space-y-3">
            {analysis.education.map((edu, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <LightBulbIcon className="w-6 h-6 mr-2 text-green-600" />
          Recommendations
        </h3>
        
        {/* Strengths */}
        {analysis.recommendations.strengths && analysis.recommendations.strengths.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {analysis.recommendations.improvements && analysis.recommendations.improvements.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-yellow-600" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {analysis.recommendations.suggestions && analysis.recommendations.suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
              Suggestions
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <LightBulbIcon className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysisDisplay;
