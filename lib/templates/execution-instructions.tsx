/**
 * State-specific execution instructions page component.
 * Appended to the end of every generated PDF document.
 *
 * Requirement: PDF-05 — Execution instructions page per state
 */

import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { legalStyles as styles, colors } from './styles';
import type { StateRequirements } from './state-requirements';

interface ExecutionInstructionsPageProps {
  /** The state requirements for the user's state */
  stateReqs: StateRequirements;
  /** Which document type this is for */
  documentType: 'will' | 'trust' | 'guardianship' | 'poa' | 'healthcare-directive';
  /** The full name on the document */
  personName: string;
}

/**
 * Returns human-readable document type name.
 */
function getDocumentTypeName(type: string): string {
  switch (type) {
    case 'will': return 'Last Will and Testament';
    case 'trust': return 'Living Trust Agreement';
    case 'guardianship': return 'Nomination of Guardian';
    case 'poa': return 'Power of Attorney';
    case 'healthcare-directive': return 'Healthcare Directive';
    default: return 'Legal Document';
  }
}

/**
 * Gets the relevant state requirements for the specific document type.
 */
function getDocumentRequirements(stateReqs: StateRequirements, documentType: string) {
  switch (documentType) {
    case 'will':
      return {
        notarizationRequired: stateReqs.will.notarizationRequired,
        witnessCount: stateReqs.will.witnessCount,
        executionInstructions: stateReqs.will.executionInstructions,
        additionalNotes: [
          stateReqs.will.selfProvingAffidavit
            ? 'A self-proving affidavit is available in your state. This can simplify the probate process.'
            : 'Your state does not recognize self-proving affidavits for wills.',
          stateReqs.will.holographicAllowed
            ? 'Your state recognizes holographic (handwritten) wills, though a typed and witnessed will provides better protection.'
            : 'Your state does NOT recognize holographic (handwritten) wills. This typed document must be properly witnessed.',
          `Minimum age to make a will in ${stateReqs.name}: ${stateReqs.will.minimumAge} years old.`,
        ],
      };
    case 'trust':
      return {
        notarizationRequired: stateReqs.trust.notarizationRequired,
        witnessCount: stateReqs.trust.witnessCount,
        executionInstructions: stateReqs.trust.executionInstructions,
        additionalNotes: stateReqs.trust.witnessesRequired
          ? [`Witnesses are required in ${stateReqs.name} for trust documents.`]
          : [`Witnesses are not required for trust documents in ${stateReqs.name}, but notarization is.`],
      };
    case 'guardianship':
      return {
        notarizationRequired: stateReqs.guardianship.notarizationRequired,
        witnessCount: stateReqs.guardianship.witnessCount,
        executionInstructions: stateReqs.guardianship.executionInstructions,
        additionalNotes: stateReqs.guardianship.statuteReference
          ? [`This nomination is governed by ${stateReqs.guardianship.statuteReference}.`]
          : [],
      };
    case 'poa':
      return {
        notarizationRequired: stateReqs.poa.notarizationRequired,
        witnessCount: stateReqs.poa.witnessCount,
        executionInstructions: stateReqs.poa.executionInstructions,
        additionalNotes: [],
      };
    case 'healthcare-directive':
      return {
        notarizationRequired: stateReqs.healthcareDirective.notarizationRequired,
        witnessCount: stateReqs.healthcareDirective.witnessCount,
        executionInstructions: stateReqs.healthcareDirective.executionInstructions,
        additionalNotes: stateReqs.healthcareDirective.witnessRestrictions.length > 0
          ? ['Witness Restrictions:', ...stateReqs.healthcareDirective.witnessRestrictions.map(r => `• ${r}`)]
          : [],
      };
    default:
      return {
        notarizationRequired: false,
        witnessCount: 2,
        executionInstructions: ['Please consult your state\'s specific requirements.'],
        additionalNotes: [],
      };
  }
}

/**
 * Execution Instructions Page — appended to every generated PDF.
 * Provides state-specific signing, witnessing, and notarization instructions.
 */
export const ExecutionInstructionsPage: React.FC<ExecutionInstructionsPageProps> = ({
  stateReqs,
  documentType,
  personName,
}) => {
  const docName = getDocumentTypeName(documentType);
  const reqs = getDocumentRequirements(stateReqs, documentType);

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Execution Instructions</Text>
        <Text style={styles.headerSubtitle}>
          {docName} — State of {stateReqs.name}
        </Text>
      </View>

      {/* Important Notice */}
      <View style={{
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fffbeb',
        borderWidth: 1,
        borderColor: '#f59e0b',
        borderRadius: 4,
      }}>
        <Text style={{
          fontSize: 11,
          fontFamily: 'Times-Bold',
          color: '#92400e',
          marginBottom: 8,
        }}>
          IMPORTANT NOTICE
        </Text>
        <Text style={{
          fontSize: 10,
          lineHeight: 1.5,
          color: '#92400e',
        }}>
          This document is NOT valid until properly executed according to the instructions below.
          Failure to follow these instructions may result in your document being legally
          unenforceable. Read all instructions carefully before signing.
        </Text>
      </View>

      {/* Document Information */}
      <View style={styles.section}>
        <Text style={styles.articleTitle}>DOCUMENT INFORMATION</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Document:</Text> {docName}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Prepared for:</Text> {personName}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>State:</Text> {stateReqs.name}
        </Text>
      </View>

      {/* Requirements Summary */}
      <View style={styles.section}>
        <Text style={styles.articleTitle}>REQUIREMENTS SUMMARY</Text>

        <View style={{
          flexDirection: 'row',
          marginBottom: 15,
          gap: 20,
        }}>
          <View style={{
            flex: 1,
            padding: 12,
            backgroundColor: reqs.notarizationRequired ? '#fef2f2' : '#f0fdf4',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: reqs.notarizationRequired ? '#fecaca' : '#bbf7d0',
          }}>
            <Text style={{
              fontSize: 10,
              fontFamily: 'Times-Bold',
              color: colors.text,
              marginBottom: 4,
            }}>
              Notarization
            </Text>
            <Text style={{
              fontSize: 12,
              fontFamily: 'Times-Bold',
              color: reqs.notarizationRequired ? '#dc2626' : '#16a34a',
            }}>
              {reqs.notarizationRequired ? 'REQUIRED' : 'Not Required'}
            </Text>
          </View>

          <View style={{
            flex: 1,
            padding: 12,
            backgroundColor: '#f0f9ff',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#bae6fd',
          }}>
            <Text style={{
              fontSize: 10,
              fontFamily: 'Times-Bold',
              color: colors.text,
              marginBottom: 4,
            }}>
              Witnesses
            </Text>
            <Text style={{
              fontSize: 12,
              fontFamily: 'Times-Bold',
              color: '#2563eb',
            }}>
              {reqs.witnessCount} Required
            </Text>
          </View>
        </View>
      </View>

      {/* Step-by-Step Instructions */}
      <View style={styles.section}>
        <Text style={styles.articleTitle}>STEP-BY-STEP EXECUTION INSTRUCTIONS</Text>
        {reqs.executionInstructions.map((instruction, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 8, marginLeft: 10 }}>
            <Text style={{
              fontSize: 11,
              fontFamily: 'Times-Bold',
              color: colors.primary,
              width: 25,
            }}>
              {index + 1}.
            </Text>
            <Text style={{
              fontSize: 11,
              lineHeight: 1.5,
              color: colors.text,
              flex: 1,
            }}>
              {instruction}
            </Text>
          </View>
        ))}
      </View>

      {/* Additional Notes */}
      {reqs.additionalNotes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.articleTitle}>ADDITIONAL INFORMATION</Text>
          {reqs.additionalNotes.map((note, index) => (
            <Text key={index} style={{
              fontSize: 10,
              lineHeight: 1.5,
              color: colors.lightText,
              marginBottom: 4,
              marginLeft: 10,
            }}>
              {note}
            </Text>
          ))}
        </View>
      )}

      {/* Legal Disclaimer */}
      <View style={{
        position: 'absolute',
        bottom: 50,
        left: 72,
        right: 72,
        padding: 10,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 4,
      }}>
        <Text style={{
          fontSize: 8,
          lineHeight: 1.4,
          color: '#64748b',
          textAlign: 'center',
        }}>
          DISCLAIMER: This document and these instructions are provided for informational purposes only
          and do not constitute legal advice. LDASD Estate Planning is not a law firm and does not
          provide legal representation. For specific legal questions about your estate plan, please
          consult a licensed attorney in your state. Laws may change; verify current requirements
          with local authorities.
        </Text>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>
  );
};

export default ExecutionInstructionsPage;
