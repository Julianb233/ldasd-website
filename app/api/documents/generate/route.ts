/**
 * API Route: POST /api/documents/generate
 *
 * Generates a PDF document from wizard form data.
 * Validates the data, maps it to the template, and returns the PDF.
 *
 * Requirements: PDF-01, PDF-02, PDF-05
 *
 * Request body:
 * {
 *   documentType: 'will' | 'trust' | 'guardianship'
 *   wizardData: { ... wizard form fields ... }
 *   includeExecutionInstructions?: boolean (default: true)
 * }
 *
 * Response:
 * - 200: PDF file (application/pdf)
 * - 400: Validation errors (application/json)
 * - 401: Unauthorized (application/json)
 * - 500: Server error (application/json)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generatePDF } from '@/lib/pdf/generate';
import type { DocumentType } from '@/lib/templates/field-mapping';

const VALID_DOCUMENT_TYPES: DocumentType[] = ['will', 'trust', 'guardianship'];

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in to generate documents.' },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    let body: {
      documentType: DocumentType;
      wizardData: Record<string, unknown>;
      includeExecutionInstructions?: boolean;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON.' },
        { status: 400 }
      );
    }

    const { documentType, wizardData, includeExecutionInstructions } = body;

    // Validate document type
    if (!documentType || !VALID_DOCUMENT_TYPES.includes(documentType)) {
      return NextResponse.json(
        {
          error: `Invalid document type. Must be one of: ${VALID_DOCUMENT_TYPES.join(', ')}`,
          field: 'documentType',
        },
        { status: 400 }
      );
    }

    // Validate wizard data exists
    if (!wizardData || typeof wizardData !== 'object') {
      return NextResponse.json(
        { error: 'wizardData is required and must be an object.' },
        { status: 400 }
      );
    }

    // 3. Generate the PDF
    const result = await generatePDF({
      documentType,
      wizardData,
      includeExecutionInstructions: includeExecutionInstructions ?? true,
    });

    // 4. Return result
    if (!result.success || !result.buffer) {
      return NextResponse.json(
        {
          error: 'Validation failed. Please correct the following errors.',
          errors: result.errors,
          metadata: result.metadata,
        },
        { status: 400 }
      );
    }

    // Return the PDF as a downloadable file
    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${result.filename}"`,
        'Content-Length': result.buffer.length.toString(),
        'X-Document-Type': result.metadata.documentType,
        'X-Document-State': result.metadata.state,
        'X-Generated-At': result.metadata.generatedAt,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during PDF generation.' },
      { status: 500 }
    );
  }
}
