import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SUBMISSION_UPLOAD_ENDPOINT = '/api/submissions/upload';

// Storage helpers
export const uploadSubmission = async (
  teamCode: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  onProgress?.(5);

  const formData = new FormData();
  formData.append('teamCode', teamCode);
  formData.append('file', file);

  const response = await fetch(SUBMISSION_UPLOAD_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  onProgress?.(70);

  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(`Upload failed: ${result?.error || response.statusText}`);
  }

  onProgress?.(100);

  return result.publicUrl as string;
};

export const validateSubmissionFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];
  
  const allowedExtensions = ['.pdf', '.ppt', '.pptx'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

  if (!allowedTypes.includes(file.type) && !hasValidExtension) {
    return {
      valid: false,
      error: 'Only PDF, PPT, and PPTX files are allowed',
    };
  }

  const maxSize = 20 * 1024 * 1024; // 20MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must not exceed 20MB',
    };
  }

  return { valid: true };
};
