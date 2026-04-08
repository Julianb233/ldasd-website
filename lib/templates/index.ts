/**
 * Templates module barrel export.
 *
 * Provides unified access to:
 * - PDF document templates (Will, Trust, Guardianship)
 * - State-specific requirements for all 50 states + DC
 * - Wizard-to-template field mapping and validation
 * - Execution instructions page component
 */

// Document templates (Document-wrapped for standalone use, Pages for composition)
export { WillDocument, WillPages } from './will';
export type { WillData, Beneficiary, Executor, Guardian } from './will';

export { TrustDocument, TrustPages } from './trust';
export type { TrustData, TrustBeneficiary, Trustee, TrustAsset } from './trust';

export { GuardianshipDocument, GuardianshipPages } from './guardianship';
export type { GuardianshipData, Child, NominatedGuardian } from './guardianship';

// Shared styles
export { legalStyles, colors, formatDate, getOrdinal } from './styles';

// State requirements
export {
  stateRequirements,
  getStateRequirements,
  resolveStateAbbreviation,
  getAllStates,
} from './state-requirements';
export type { StateRequirements } from './state-requirements';

// Field mapping
export {
  mapWillWizardToTemplate,
  mapTrustWizardToTemplate,
  mapGuardianshipWizardToTemplate,
  mapWizardDataToTemplate,
  validateWillWizardData,
  validateTrustWizardData,
  validateGuardianshipWizardData,
} from './field-mapping';
export type {
  DocumentType,
  WizardFormData,
  WillWizardData,
  TrustWizardData,
  GuardianshipWizardData,
  ValidationError,
  ValidationResult,
} from './field-mapping';

// Execution instructions
export { ExecutionInstructionsPage } from './execution-instructions';
