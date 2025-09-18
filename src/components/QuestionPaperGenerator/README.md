# Question Paper Generator Service

A comprehensive AI-powered question paper generation service built with React, TypeScript, and Tailwind CSS.

## Features

- **Intuitive Form Interface**: Clean, responsive form for class and subject selection
- **AI-Powered Generation**: Intelligent question paper creation with mock data simulation
- **PDF Generation**: High-quality PDF output using jsPDF with proper formatting
- **Loading States**: Beautiful loading animations with progress indicators
- **Error Handling**: Comprehensive error handling with retry functionality
- **Responsive Design**: Mobile-first design that works on all devices
- **Framer Motion**: Smooth animations and transitions throughout the user journey

## Components

### QuestionPaperForm

- Handles user input for board, class, and subject selection
- Form validation with error messages
- Responsive design with Tailwind CSS
- Loading states during submission

### QuestionPaperDisplay

- Shows generated question paper with proper formatting
- PDF download and preview functionality
- Question categorization by sections
- Difficulty level indicators
- Answer display for questions with answers

### LoadingStates

- Multiple loading components for different states
- Animated spinners, dots, and progress indicators
- Error and success state components
- Smooth transitions between states

## Services

### questionPaperService.ts

- API service for question paper generation
- Type definitions for requests and responses
- Mock data for development (when API is not available)
- Error handling and validation

### pdfGenerator.ts

- PDF generation using jsPDF
- Professional formatting with headers, sections, and instructions
- Automatic page breaks and proper spacing
- Download and preview functionality

## Usage

1. Navigate to `/question-paper-generator`
2. Select board (CBSE, ICSE, State Board)
3. Choose class (9th, 10th, 11th, 12th)
4. Select subject from available options
5. Click "Generate Question Paper"
6. Wait for AI processing (simulated)
7. Download or preview the generated PDF

## API Integration

The service is designed to integrate with a FastAPI backend running on localhost:8000. Currently uses mock data for development.

### API Endpoint

```
POST http://localhost:8000/generate-paper
Content-Type: application/json

{
  "board": "CBSE",
  "class_name": "10",
  "subject": "Science"
}
```

### Response Format

```json
{
  "paper_id": "sci-mock-p1-sA-2023",
  "board": "CBSE",
  "class": "Class 10th",
  "subject": "Science",
  "total_marks": 80,
  "time_minutes": 180,
  "questions": [
    {
      "section_id": "A",
      "q_id": "A.1",
      "q_text": "Question text here",
      "type": "SA",
      "marks": 2,
      "difficulty": "Easy",
      "answer": "Answer text",
      "sources": ["source-id"],
      "rationale": "Explanation",
      "needs_review": false
    }
  ]
}
```

## File Structure

```
src/
├── components/
│   └── QuestionPaperGenerator/
│       ├── QuestionPaperForm.tsx
│       ├── QuestionPaperDisplay.tsx
│       ├── LoadingStates.tsx
│       └── README.md
├── services/
│   ├── api/
│   │   └── questionPaperService.ts
│   └── pdfGenerator.ts
└── pages/
    └── QuestionPaperGeneratorPage.tsx
```

## Dependencies

- **jsPDF**: PDF generation library
- **framer-motion**: Animation library
- **react-helmet-async**: SEO and meta tags
- **axios**: HTTP client for API calls

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Green Theme**: Consistent with Papershapers branding
- **Smooth Animations**: Framer Motion for enhanced UX

## Error Handling

- Network error handling with user-friendly messages
- Form validation with inline error display
- PDF generation error handling with retry options
- Graceful fallback to mock data when API is unavailable

## Future Enhancements

- Real API integration
- Question difficulty customization
- Custom marking schemes
- Multiple question types (MCQ, Long Answer, etc.)
- Question bank integration
- User preferences and history
- Batch paper generation
