/**
 * PDF Generation Service
 * Handles conversion of question paper data to PDF using jsPDF
 */

import jsPDF from 'jspdf';
import { QuestionPaperResponse, Question } from './api/questionPaperService';

/**
 * Generate PDF from question paper data
 * @param questionPaper - The question paper data to convert to PDF
 * @returns Promise<Blob> - The generated PDF as a blob
 */
export const generateQuestionPaperPDF = async (
  questionPaper: QuestionPaperResponse
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;


      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
          return true;
        }
        return false;
      };

      // CBSE Style Header
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('QUESTION PAPER', pageWidth / 2, 20, { align: 'center' });

      // CBSE Style Paper Details
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${questionPaper.board}`, 20, 35);
      doc.text(`${questionPaper.class}`, pageWidth - 60, 35);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Subject: ${questionPaper.subject}`, 20, 45);
      doc.text(`Time: ${questionPaper.time_minutes} minutes`, pageWidth - 60, 45);

      doc.text(`Total Marks: ${questionPaper.total_marks}`, 20, 55);
      doc.text(`Paper ID: ${questionPaper.paper_id}`, pageWidth - 60, 55);

      // CBSE Style line separator
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(20, 65, pageWidth - 20, 65);

      yPosition = 75;

      // CBSE Style Instructions
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('GENERAL INSTRUCTIONS:', 20, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const instructions = [
        '1. All questions are compulsory.',
        '2. Read each question carefully before answering.',
        '3. Write your answers in the space provided.',
        '4. Use blue or black ink only.',
        '5. Draw diagrams wherever necessary.'
      ];

      instructions.forEach(instruction => {
        checkNewPage(8);
        doc.text(instruction, 20, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Group questions by section
      const questionsBySection = questionPaper.questions.reduce((acc, question) => {
        if (!acc[question.section_id]) {
          acc[question.section_id] = [];
        }
        acc[question.section_id].push(question);
        return acc;
      }, {} as Record<string, Question[]>);

      // CBSE Style Questions Section
      Object.entries(questionsBySection).forEach(([sectionId, questions]) => {
        // CBSE Style Section Header
        checkNewPage(20);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(`SECTION ${sectionId}`, 20, yPosition);

        // CBSE Style line under section
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(20, yPosition + 3, pageWidth - 20, yPosition + 3);
        yPosition += 15;

        // CBSE Style Questions
        questions.forEach((question) => {
          const questionText = `${question.q_id}. ${question.q_text}`;

          // Check if we need a new page for this question
          const estimatedHeight = Math.ceil(questionText.length / 60) * 6 + 15;
          checkNewPage(estimatedHeight);

          // Question text with proper wrapping to avoid overlap with marks
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);

          // Split text into lines to avoid overlap with marks
          const maxWidth = pageWidth - 80; // Leave space for marks on right
          const lines = doc.splitTextToSize(questionText, maxWidth);

          // Draw each line
          lines.forEach((line: string) => {
            checkNewPage(8);
            doc.text(line, 20, yPosition);
            yPosition += 6;
          });

          // Marks in CBSE style - positioned after text
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`[${question.marks} marks]`, pageWidth - 50, yPosition - 6);

          yPosition += 12;
        });
      });

      // CBSE Style Footer with Copyright
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        // Page number
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`${i}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

        // Copyright
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('© Papershapers - https://papershapers.in', pageWidth - 20, pageHeight - 10, { align: 'right' });
      }

      // Convert to blob
      const pdfBlob = doc.output('blob');
      resolve(pdfBlob);

    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(new Error('Failed to generate PDF. Please try again.'));
    }
  });
};

/**
 * Download PDF file
 * @param pdfBlob - The PDF blob to download
 * @param filename - The filename for the downloaded file
 */
export const downloadPDF = (pdfBlob: Blob, filename: string = 'question-paper.pdf') => {
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate filename for the question paper PDF
 * @param questionPaper - The question paper data
 * @returns string - The generated filename
 */
export const generatePDFFilename = (questionPaper: QuestionPaperResponse): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  const className = questionPaper.class.replace(' ', '-').toLowerCase();
  const subject = questionPaper.subject.toLowerCase().replace(/\s+/g, '-');

  return `${questionPaper.board}-${className}-${subject}-${timestamp}.pdf`;
};

/**
 * Preview PDF in new window
 * @param pdfBlob - The PDF blob to preview
 */
export const previewPDF = (pdfBlob: Blob) => {
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, '_blank');
  // Clean up the URL after a delay to allow the browser to load it
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
