import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_API_KEY;
const bucketName = process.env.SUPABASE_SUBMISSIONS_BUCKET || 'Submissions - Global SDG AI Hackathon';

const allowedTypes = new Set([
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]);

const allowedExtensions = new Set(['pdf', 'ppt', 'pptx']);

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Supabase server credentials are not configured. Add SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_API_KEY to your environment.',
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const teamCode = String(formData.get('teamCode') || '').trim();
    const file = formData.get('file');

    if (!teamCode) {
      return NextResponse.json({ success: false, error: 'Missing team code' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'Missing file upload' }, { status: 400 });
    }

    const fileExtension = getFileExtension(file.name);
    if (!allowedTypes.has(file.type) && !allowedExtensions.has(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Only PDF, PPT, and PPTX files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must not exceed 20MB' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const filePath = `submissions/${teamCode}/presentation.${fileExtension}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, fileBuffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: true,
    });

    if (uploadError) {
      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      publicUrl: data.publicUrl,
      filePath,
      bucketName,
    });
  } catch (error: any) {
    console.error('Submission upload error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload submission' },
      { status: 500 }
    );
  }
}