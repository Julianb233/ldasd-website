/**
 * PDF Generation Service
 * Connects wizard data to React-PDF templates and generates PDF buffers.
 *
 * Requirements: PDF-01, PDF-02, PDF-05
 *
 * This module is server-side only — it uses @react-pdf/renderer's
 * renderToBuffer() to generate PDFs on the server.
 */

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document } from '@react-pdf/renderer';

import { WillDocument, WillPages } from '../templates/will';
import type { WillData } from '../templates/will';
import { TrustDocument, TrustPages } from '../templates/trust';
import type { TrustData } from '../templates/trust';
import { GuardianshipDocument, GuardianshipPages } from '../templates/guardianship';
import type { GuardianshipData } from '../templates/guardianship';

import { ExecutionInstructionsPage } from '../templates/execution-instructions';
import { getStateRequirements, resolveStateAbbreviation } from '../templates/state-requirements';
import type { StateRequirements } from '../templates/state-requirements';

import {
  mapWillWizardToTemplate,
  mapTrustWizardToTemplate,
  mapGuardianshipWizardToTemplate,
  validateWillWizardData,
  validateTrustWizardData,
  validateGuardianshipWizardData,
} from '../templates/field-mapping';
import type {
  DocumentType,
  WillWizardData,
  TrustWizardData,
  GuardianshipWizardData,
} from '../templates/field-mapping';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PDFGenerationResult {
  /** Whether generation was successful */
  success: boolean;
  /** The PDF buffer (only present on success) */
  buffer?: Buffer;
  /** The suggested filename */
  filename: string;
  /** Validation errors (only present on failure) */
  errors?: Array<{ field: string; message: string }>;
  /** Document metadata */
  metadata: {
    documentType: DocumentType;
    state: string;
    personName: string;
    generatedAt: string;
  };
}

export interface GeneratePDFOptions {
  /** The document type to generate */
  documentType: DocumentType;
  /** The wizard form data */
  wizardData: Record<string, unknown>;
  /** Whether to include execution instructions page (default: true) */
  includeExecutionInstructions?: boolean;
}

// ─── Composite Document Components ─────────────────────────────────────────
// These compose the document pages with an execution instructions page,
// all inside a single <Document> wrapper.

const WillWithInstructions: React.FC<{
  data: WillData;
  stateReqs: StateRequirements;
}> = ({ data, stateReqs }) => (
  <Document>
    <WillPages data={data} />
    <ExecutionInstructionsPage
      stateReqs={stateReqs}
      documentType="will"
      personName={data.fullName}
    />
  </Document>
);

const TrustWithInstructions: React.FC<{
  data: TrustData;
  stateReqs: StateRequirements;
}> = ({ data, stateReqs }) => (
  <Document>
    <TrustPages data={data} />
    <ExecutionInstructionsPage
      stateReqs={stateReqs}
      documentType="trust"
      personName={data.grantorName}
    />
  </Document>
);

const GuardianshipWithInstructions: React.FC<{
  data: GuardianshipData;
  stateReqs: StateRequirements;
}> = ({ data, stateReqs }) => (
  <Document>
    <GuardianshipPages data={data} />
    <ExecutionInstructionsPage
      stateReqs={stateReqs}
      documentType="guardianship"
      personName={data.parentName}
    />
  </Document>
);

// ─── Internal helpers ───────────────────────────────────────────────────────

function resolveState(wizardData: Record<string, unknown>): {
  stateReqs: StateRequirements | undefined;
  stateInput: string;
} {
  const stateInput = (wizardData.state as string) || '';
  const abbr = resolveStateAbbreviation(stateInput);
  const stateReqs = abbr ? getStateRequirements(abbr) : undefined;
  return { stateReqs, stateInput };
}

function generateFilename(documentType: DocumentType, personName: string, state: string): string {
  const safeName = personName
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  const safeState = state.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const dateStr = new Date().toISOString().split('T')[0];

  const typeNames: Record<DocumentType, string> = {
    will: 'last-will-and-testament',
    trust: 'living-trust',
    guardianship: 'guardianship-nomination',
  };

  return `${typeNames[documentType]}-${safeName}-${safeState}-${dateStr}.pdf`;
}

// ─── Main Generation Functions ──────────────────────────────────────────────

async function generateWillPDF(
  wizardData: Record<string, unknown>,
  includeInstructions: boolean
): Promise<PDFGenerationResult> {
  const data = wizardData as unknown as WillWizardData;
  const validation = validateWillWizardData(data);

  if (!validation.valid) {
    return {
      success: false,
      filename: '',
      errors: validation.errors,
      metadata: {
        documentType: 'will',
        state: data.state || '',
        personName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        generatedAt: new Date().toISOString(),
      },
    };
  }

  const templateData = mapWillWizardToTemplate(data);
  const { stateReqs } = resolveState(wizardData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  if (includeInstructions && stateReqs) {
    element = React.createElement(WillWithInstructions, { data: templateData, stateReqs });
  } else {
    element = React.createElement(WillDocument, { data: templateData });
  }

  const buffer = await renderToBuffer(element);

  return {
    success: true,
    buffer,
    filename: generateFilename('will', templateData.fullName, templateData.state),
    metadata: {
      documentType: 'will',
      state: templateData.state,
      personName: templateData.fullName,
      generatedAt: new Date().toISOString(),
    },
  };
}

async function generateTrustPDF(
  wizardData: Record<string, unknown>,
  includeInstructions: boolean
): Promise<PDFGenerationResult> {
  const data = wizardData as unknown as TrustWizardData;
  const validation = validateTrustWizardData(data);

  if (!validation.valid) {
    return {
      success: false,
      filename: '',
      errors: validation.errors,
      metadata: {
        documentType: 'trust',
        state: data.state || '',
        personName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        generatedAt: new Date().toISOString(),
      },
    };
  }

  const templateData = mapTrustWizardToTemplate(data);
  const { stateReqs } = resolveState(wizardData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  if (includeInstructions && stateReqs) {
    element = React.createElement(TrustWithInstructions, { data: templateData, stateReqs });
  } else {
    element = React.createElement(TrustDocument, { data: templateData });
  }

  const buffer = await renderToBuffer(element);

  return {
    success: true,
    buffer,
    filename: generateFilename('trust', templateData.grantorName, templateData.grantorState),
    metadata: {
      documentType: 'trust',
      state: templateData.grantorState,
      personName: templateData.grantorName,
      generatedAt: new Date().toISOString(),
    },
  };
}

async function generateGuardianshipPDF(
  wizardData: Record<string, unknown>,
  includeInstructions: boolean
): Promise<PDFGenerationResult> {
  const data = wizardData as unknown as GuardianshipWizardData;
  const validation = validateGuardianshipWizardData(data);

  if (!validation.valid) {
    return {
      success: false,
      filename: '',
      errors: validation.errors,
      metadata: {
        documentType: 'guardianship',
        state: data.state || '',
        personName: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        generatedAt: new Date().toISOString(),
      },
    };
  }

  const templateData = mapGuardianshipWizardToTemplate(data);
  const { stateReqs } = resolveState(wizardData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  if (includeInstructions && stateReqs) {
    element = React.createElement(GuardianshipWithInstructions, { data: templateData, stateReqs });
  } else {
    element = React.createElement(GuardianshipDocument, { data: templateData });
  }

  const buffer = await renderToBuffer(element);

  return {
    success: true,
    buffer,
    filename: generateFilename('guardianship', templateData.parentName, templateData.parentState),
    metadata: {
      documentType: 'guardianship',
      state: templateData.parentState,
      personName: templateData.parentName,
      generatedAt: new Date().toISOString(),
    },
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Generate a PDF document from wizard data.
 *
 * Main entry point for PDF generation. Validates wizard data, maps it to
 * the template format, and renders the PDF with optional state-specific
 * execution instructions.
 *
 * @example
 * ```ts
 * const result = await generatePDF({
 *   documentType: 'will',
 *   wizardData: {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     state: 'California',
 *     // ... other wizard fields
 *   },
 * });
 *
 * if (result.success) {
 *   // result.buffer contains the PDF
 *   // result.filename is the suggested filename
 * } else {
 *   // result.errors contains validation errors
 * }
 * ```
 */
export async function generatePDF(options: GeneratePDFOptions): Promise<PDFGenerationResult> {
  const { documentType, wizardData, includeExecutionInstructions = true } = options;

  try {
    switch (documentType) {
      case 'will':
        return await generateWillPDF(wizardData, includeExecutionInstructions);
      case 'trust':
        return await generateTrustPDF(wizardData, includeExecutionInstructions);
      case 'guardianship':
        return await generateGuardianshipPDF(wizardData, includeExecutionInstructions);
      default:
        return {
          success: false,
          filename: '',
          errors: [{ field: 'documentType', message: `Unsupported document type: ${documentType}` }],
          metadata: {
            documentType,
            state: '',
            personName: '',
            generatedAt: new Date().toISOString(),
          },
        };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during PDF generation';
    return {
      success: false,
      filename: '',
      errors: [{ field: '_general', message: errorMessage }],
      metadata: {
        documentType,
        state: (wizardData.state as string) || '',
        personName: '',
        generatedAt: new Date().toISOString(),
      },
    };
  }
}
