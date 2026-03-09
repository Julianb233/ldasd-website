/**
 * Wizard-to-template field mapping layer.
 * Maps wizard form data (flat key-value pairs from the questionnaire)
 * to the structured data interfaces expected by PDF templates.
 *
 * Requirements: PDF-01, PDF-02
 */

import type { WillData, Beneficiary, Executor, Guardian } from './will';
import type { TrustData, TrustBeneficiary, Trustee, TrustAsset } from './trust';
import type { GuardianshipData, Child, NominatedGuardian } from './guardianship';
import { resolveStateAbbreviation, getStateRequirements } from './state-requirements';

// ─── Wizard Form Data Types ─────────────────────────────────────────────────

/**
 * Generic wizard data as it comes from the questionnaire.
 * The wizard stores data as a flat record of field values,
 * some of which are arrays of objects for repeatable sections.
 */
export interface WizardFormData {
  [key: string]: unknown;
}

/**
 * Wizard data specifically for will creation.
 */
export interface WillWizardData {
  // Personal Info (Step 1)
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;

  // Marital Status (Step 2)
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  spouseFirstName?: string;
  spouseLastName?: string;

  // Children (Step 3)
  hasChildren: boolean;
  children?: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isMinor: boolean;
  }>;

  // Beneficiaries (Step 4)
  beneficiaries: Array<{
    firstName: string;
    lastName: string;
    relationship: string;
    percentage?: number;
    specificItems?: string;
  }>;
  residuaryBeneficiary: string;

  // Executor (Step 5)
  executorFirstName: string;
  executorLastName: string;
  executorAddress: string;
  executorRelationship: string;
  hasAlternateExecutor: boolean;
  altExecutorFirstName?: string;
  altExecutorLastName?: string;
  altExecutorAddress?: string;
  altExecutorRelationship?: string;

  // Guardians (Step 6 - only if minor children)
  guardians?: Array<{
    firstName: string;
    lastName: string;
    address: string;
    relationship: string;
  }>;
  hasAlternateGuardian?: boolean;
  altGuardianFirstName?: string;
  altGuardianLastName?: string;
  altGuardianAddress?: string;
  altGuardianRelationship?: string;

  // Specific Bequests (Step 7)
  hasSpecificBequests: boolean;
  specificBequests?: Array<{
    item: string;
    recipientName: string;
    description?: string;
  }>;
}

/**
 * Wizard data specifically for trust creation.
 */
export interface TrustWizardData {
  // Personal Info (Step 1)
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;

  // Trust Info (Step 2)
  trustType: 'revocable' | 'irrevocable';
  trustName?: string; // Auto-generated if not provided

  // Spouse / Joint Trust (Step 3)
  isJointTrust: boolean;
  spouseFirstName?: string;
  spouseLastName?: string;
  spouseAddress?: string;

  // Trustees (Step 4)
  initialTrusteeFirstName: string;
  initialTrusteeLastName: string;
  initialTrusteeAddress: string;
  initialTrusteeRelationship: string;
  successorTrusteeFirstName: string;
  successorTrusteeLastName: string;
  successorTrusteeAddress: string;
  successorTrusteeRelationship: string;
  hasSecondSuccessor: boolean;
  secondSuccessorFirstName?: string;
  secondSuccessorLastName?: string;
  secondSuccessorAddress?: string;
  secondSuccessorRelationship?: string;

  // Beneficiaries (Step 5)
  primaryBeneficiaries: Array<{
    firstName: string;
    lastName: string;
    relationship: string;
    percentage: number;
  }>;
  contingentBeneficiaries?: Array<{
    firstName: string;
    lastName: string;
    relationship: string;
    percentage: number;
  }>;

  // Assets (Step 6)
  assets: Array<{
    type: 'real_estate' | 'bank_account' | 'investment' | 'vehicle' | 'personal_property' | 'other';
    description: string;
    value?: string;
  }>;

  // Special Provisions (Step 7)
  hasSpecialProvisions: boolean;
  specialProvisions?: string[];

  // Minor Children (Step 8)
  hasMinorChildren: boolean;
  minorChildrenAge?: number;
}

/**
 * Wizard data specifically for guardianship nomination.
 */
export interface GuardianshipWizardData {
  // Parent Info (Step 1)
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;

  // Co-Parent (Step 2)
  hasCoParent: boolean;
  coParentFirstName?: string;
  coParentLastName?: string;
  coParentAddress?: string;

  // Children (Step 3)
  children: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    birthplace?: string;
  }>;

  // Primary Guardian (Step 4)
  guardianFirstName: string;
  guardianLastName: string;
  guardianAddress: string;
  guardianCity: string;
  guardianState: string;
  guardianZipCode: string;
  guardianRelationship: string;
  guardianPhone?: string;
  guardianEmail?: string;

  // Alternate Guardians (Step 5)
  hasAlternateGuardian: boolean;
  altGuardianFirstName?: string;
  altGuardianLastName?: string;
  altGuardianAddress?: string;
  altGuardianCity?: string;
  altGuardianState?: string;
  altGuardianZipCode?: string;
  altGuardianRelationship?: string;
  hasSecondAlternate: boolean;
  secondAltFirstName?: string;
  secondAltLastName?: string;
  secondAltAddress?: string;
  secondAltCity?: string;
  secondAltState?: string;
  secondAltZipCode?: string;
  secondAltRelationship?: string;

  // Instructions (Step 6)
  specialInstructions?: string;
  religiousPreferences?: string;
  educationPreferences?: string;
  medicalInstructions?: string;
}

// ─── Validation ─────────────────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

function requireField(
  data: Record<string, unknown>,
  field: string,
  label: string,
  errors: ValidationError[]
): void {
  const value = data[field];
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    errors.push({ field, message: `${label} is required.` });
  }
}

function requireArray(
  data: Record<string, unknown>,
  field: string,
  label: string,
  errors: ValidationError[],
  minLength = 1
): void {
  const value = data[field];
  if (!Array.isArray(value) || value.length < minLength) {
    errors.push({ field, message: `At least ${minLength} ${label} is required.` });
  }
}

/**
 * Validate will wizard data before mapping to template.
 */
export function validateWillWizardData(data: WillWizardData): ValidationResult {
  const errors: ValidationError[] = [];
  const d = data as unknown as Record<string, unknown>;

  requireField(d, 'firstName', 'First name', errors);
  requireField(d, 'lastName', 'Last name', errors);
  requireField(d, 'address', 'Address', errors);
  requireField(d, 'city', 'City', errors);
  requireField(d, 'state', 'State', errors);
  requireField(d, 'zipCode', 'ZIP code', errors);
  requireField(d, 'county', 'County', errors);
  requireField(d, 'maritalStatus', 'Marital status', errors);

  if (data.maritalStatus === 'married') {
    requireField(d, 'spouseFirstName', 'Spouse first name', errors);
    requireField(d, 'spouseLastName', 'Spouse last name', errors);
  }

  requireArray(d, 'beneficiaries', 'beneficiary', errors);
  requireField(d, 'residuaryBeneficiary', 'Residuary beneficiary', errors);
  requireField(d, 'executorFirstName', 'Executor first name', errors);
  requireField(d, 'executorLastName', 'Executor last name', errors);
  requireField(d, 'executorAddress', 'Executor address', errors);
  requireField(d, 'executorRelationship', 'Executor relationship', errors);

  // Validate state is recognized
  if (data.state && !resolveStateAbbreviation(data.state)) {
    errors.push({ field: 'state', message: `"${data.state}" is not a recognized US state.` });
  }

  // Validate beneficiary percentages sum to 100 if all have percentages
  if (data.beneficiaries && data.beneficiaries.length > 0) {
    const allHavePercentages = data.beneficiaries.every(b => b.percentage !== undefined);
    if (allHavePercentages) {
      const total = data.beneficiaries.reduce((sum, b) => sum + (b.percentage || 0), 0);
      if (Math.abs(total - 100) > 0.01) {
        errors.push({ field: 'beneficiaries', message: `Beneficiary percentages must total 100% (currently ${total}%).` });
      }
    }
  }

  // If minor children exist, guardians should be specified
  if (data.hasChildren && data.children?.some(c => c.isMinor) && (!data.guardians || data.guardians.length === 0)) {
    errors.push({ field: 'guardians', message: 'Guardian information is required when there are minor children.' });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate trust wizard data before mapping to template.
 */
export function validateTrustWizardData(data: TrustWizardData): ValidationResult {
  const errors: ValidationError[] = [];
  const d = data as unknown as Record<string, unknown>;

  requireField(d, 'firstName', 'First name', errors);
  requireField(d, 'lastName', 'Last name', errors);
  requireField(d, 'address', 'Address', errors);
  requireField(d, 'city', 'City', errors);
  requireField(d, 'state', 'State', errors);
  requireField(d, 'zipCode', 'ZIP code', errors);
  requireField(d, 'county', 'County', errors);
  requireField(d, 'trustType', 'Trust type', errors);

  if (data.isJointTrust) {
    requireField(d, 'spouseFirstName', 'Spouse first name', errors);
    requireField(d, 'spouseLastName', 'Spouse last name', errors);
  }

  requireField(d, 'initialTrusteeFirstName', 'Initial trustee first name', errors);
  requireField(d, 'initialTrusteeLastName', 'Initial trustee last name', errors);
  requireField(d, 'initialTrusteeAddress', 'Initial trustee address', errors);
  requireField(d, 'successorTrusteeFirstName', 'Successor trustee first name', errors);
  requireField(d, 'successorTrusteeLastName', 'Successor trustee last name', errors);
  requireField(d, 'successorTrusteeAddress', 'Successor trustee address', errors);

  requireArray(d, 'primaryBeneficiaries', 'primary beneficiary', errors);
  requireArray(d, 'assets', 'asset', errors);

  // Validate state
  if (data.state && !resolveStateAbbreviation(data.state)) {
    errors.push({ field: 'state', message: `"${data.state}" is not a recognized US state.` });
  }

  // Validate primary beneficiary percentages
  if (data.primaryBeneficiaries && data.primaryBeneficiaries.length > 0) {
    const total = data.primaryBeneficiaries.reduce((sum, b) => sum + b.percentage, 0);
    if (Math.abs(total - 100) > 0.01) {
      errors.push({ field: 'primaryBeneficiaries', message: `Primary beneficiary percentages must total 100% (currently ${total}%).` });
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate guardianship wizard data before mapping to template.
 */
export function validateGuardianshipWizardData(data: GuardianshipWizardData): ValidationResult {
  const errors: ValidationError[] = [];
  const d = data as unknown as Record<string, unknown>;

  requireField(d, 'firstName', 'First name', errors);
  requireField(d, 'lastName', 'Last name', errors);
  requireField(d, 'address', 'Address', errors);
  requireField(d, 'city', 'City', errors);
  requireField(d, 'state', 'State', errors);
  requireField(d, 'zipCode', 'ZIP code', errors);
  requireField(d, 'county', 'County', errors);

  requireArray(d, 'children', 'child', errors);
  requireField(d, 'guardianFirstName', 'Guardian first name', errors);
  requireField(d, 'guardianLastName', 'Guardian last name', errors);
  requireField(d, 'guardianAddress', 'Guardian address', errors);
  requireField(d, 'guardianCity', 'Guardian city', errors);
  requireField(d, 'guardianState', 'Guardian state', errors);
  requireField(d, 'guardianZipCode', 'Guardian ZIP code', errors);
  requireField(d, 'guardianRelationship', 'Guardian relationship', errors);

  if (data.state && !resolveStateAbbreviation(data.state)) {
    errors.push({ field: 'state', message: `"${data.state}" is not a recognized US state.` });
  }

  return { valid: errors.length === 0, errors };
}

// ─── Field Mapping Functions ────────────────────────────────────────────────

function buildFullName(first: string, middle: string | undefined, last: string): string {
  return middle ? `${first} ${middle} ${last}` : `${first} ${last}`;
}

/**
 * Maps will wizard data to WillData template interface.
 */
export function mapWillWizardToTemplate(wizard: WillWizardData): WillData {
  const stateReq = getStateRequirements(wizard.state);
  const stateName = stateReq?.name || wizard.state;

  const executor: Executor = {
    name: `${wizard.executorFirstName} ${wizard.executorLastName}`,
    address: wizard.executorAddress,
    relationship: wizard.executorRelationship,
  };

  const alternateExecutor: Executor | undefined =
    wizard.hasAlternateExecutor && wizard.altExecutorFirstName && wizard.altExecutorLastName
      ? {
          name: `${wizard.altExecutorFirstName} ${wizard.altExecutorLastName}`,
          address: wizard.altExecutorAddress || '',
          relationship: wizard.altExecutorRelationship || '',
        }
      : undefined;

  const beneficiaries: Beneficiary[] = wizard.beneficiaries.map(b => ({
    name: `${b.firstName} ${b.lastName}`,
    relationship: b.relationship,
    percentage: b.percentage,
    specificItems: b.specificItems,
  }));

  const guardians: Guardian[] | undefined = wizard.guardians?.map(g => ({
    name: `${g.firstName} ${g.lastName}`,
    address: g.address,
    relationship: g.relationship,
  }));

  const alternateGuardian: Guardian | undefined =
    wizard.hasAlternateGuardian && wizard.altGuardianFirstName && wizard.altGuardianLastName
      ? {
          name: `${wizard.altGuardianFirstName} ${wizard.altGuardianLastName}`,
          address: wizard.altGuardianAddress || '',
          relationship: wizard.altGuardianRelationship || '',
        }
      : undefined;

  const specificBequests = wizard.hasSpecificBequests && wizard.specificBequests
    ? wizard.specificBequests.map(b => ({
        item: b.item,
        recipient: b.recipientName,
        description: b.description,
      }))
    : undefined;

  return {
    fullName: buildFullName(wizard.firstName, wizard.middleName, wizard.lastName),
    address: wizard.address,
    city: wizard.city,
    state: stateName,
    zipCode: wizard.zipCode,
    county: wizard.county,
    isMarried: wizard.maritalStatus === 'married',
    spouseName:
      wizard.maritalStatus === 'married' && wizard.spouseFirstName && wizard.spouseLastName
        ? `${wizard.spouseFirstName} ${wizard.spouseLastName}`
        : undefined,
    children: wizard.hasChildren && wizard.children
      ? wizard.children.map(c => ({
          name: `${c.firstName} ${c.lastName}`,
          dateOfBirth: c.dateOfBirth,
          isMinor: c.isMinor,
        }))
      : [],
    beneficiaries,
    residuaryBeneficiary: wizard.residuaryBeneficiary,
    executor,
    alternateExecutor,
    guardians,
    alternateGuardian,
    specificBequests,
    date: new Date().toISOString(),
  };
}

/**
 * Maps trust wizard data to TrustData template interface.
 */
export function mapTrustWizardToTemplate(wizard: TrustWizardData): TrustData {
  const stateReq = getStateRequirements(wizard.state);
  const stateName = stateReq?.name || wizard.state;
  const fullName = buildFullName(wizard.firstName, wizard.middleName, wizard.lastName);

  // Auto-generate trust name if not provided
  const trustName = wizard.trustName || `The ${wizard.lastName} Family ${wizard.trustType === 'revocable' ? 'Revocable' : 'Irrevocable'} Trust`;

  const initialTrustee: Trustee = {
    name: `${wizard.initialTrusteeFirstName} ${wizard.initialTrusteeLastName}`,
    address: wizard.initialTrusteeAddress,
    relationship: wizard.initialTrusteeRelationship,
  };

  const successorTrustee: Trustee = {
    name: `${wizard.successorTrusteeFirstName} ${wizard.successorTrusteeLastName}`,
    address: wizard.successorTrusteeAddress,
    relationship: wizard.successorTrusteeRelationship,
  };

  const secondSuccessorTrustee: Trustee | undefined =
    wizard.hasSecondSuccessor && wizard.secondSuccessorFirstName && wizard.secondSuccessorLastName
      ? {
          name: `${wizard.secondSuccessorFirstName} ${wizard.secondSuccessorLastName}`,
          address: wizard.secondSuccessorAddress || '',
          relationship: wizard.secondSuccessorRelationship || '',
        }
      : undefined;

  const primaryBeneficiaries: TrustBeneficiary[] = wizard.primaryBeneficiaries.map(b => ({
    name: `${b.firstName} ${b.lastName}`,
    relationship: b.relationship,
    percentage: b.percentage,
    isPrimary: true,
  }));

  const contingentBeneficiaries: TrustBeneficiary[] = wizard.contingentBeneficiaries
    ? wizard.contingentBeneficiaries.map(b => ({
        name: `${b.firstName} ${b.lastName}`,
        relationship: b.relationship,
        percentage: b.percentage,
        isPrimary: false,
      }))
    : [];

  const assets: TrustAsset[] = wizard.assets.map(a => ({
    type: a.type,
    description: a.description,
    value: a.value,
  }));

  return {
    grantorName: fullName,
    grantorAddress: wizard.address,
    grantorCity: wizard.city,
    grantorState: stateName,
    grantorZipCode: wizard.zipCode,
    grantorCounty: wizard.county,
    trustName,
    trustType: wizard.trustType,
    isJointTrust: wizard.isJointTrust,
    spouseName:
      wizard.isJointTrust && wizard.spouseFirstName && wizard.spouseLastName
        ? `${wizard.spouseFirstName} ${wizard.spouseLastName}`
        : undefined,
    spouseAddress: wizard.isJointTrust ? wizard.spouseAddress : undefined,
    initialTrustee,
    successorTrustee,
    secondSuccessorTrustee,
    primaryBeneficiaries,
    contingentBeneficiaries,
    assets,
    specialProvisions: wizard.hasSpecialProvisions ? wizard.specialProvisions : undefined,
    hasMinorChildren: wizard.hasMinorChildren,
    minorChildrenAge: wizard.hasMinorChildren ? wizard.minorChildrenAge : undefined,
    date: new Date().toISOString(),
  };
}

/**
 * Maps guardianship wizard data to GuardianshipData template interface.
 */
export function mapGuardianshipWizardToTemplate(wizard: GuardianshipWizardData): GuardianshipData {
  const stateReq = getStateRequirements(wizard.state);
  const stateName = stateReq?.name || wizard.state;

  const primaryGuardian: NominatedGuardian = {
    name: `${wizard.guardianFirstName} ${wizard.guardianLastName}`,
    address: wizard.guardianAddress,
    city: wizard.guardianCity,
    state: wizard.guardianState,
    zipCode: wizard.guardianZipCode,
    relationship: wizard.guardianRelationship,
    phone: wizard.guardianPhone,
    email: wizard.guardianEmail,
  };

  const alternateGuardian: NominatedGuardian | undefined =
    wizard.hasAlternateGuardian && wizard.altGuardianFirstName && wizard.altGuardianLastName
      ? {
          name: `${wizard.altGuardianFirstName} ${wizard.altGuardianLastName}`,
          address: wizard.altGuardianAddress || '',
          city: wizard.altGuardianCity || '',
          state: wizard.altGuardianState || '',
          zipCode: wizard.altGuardianZipCode || '',
          relationship: wizard.altGuardianRelationship || '',
        }
      : undefined;

  const secondAlternateGuardian: NominatedGuardian | undefined =
    wizard.hasSecondAlternate && wizard.secondAltFirstName && wizard.secondAltLastName
      ? {
          name: `${wizard.secondAltFirstName} ${wizard.secondAltLastName}`,
          address: wizard.secondAltAddress || '',
          city: wizard.secondAltCity || '',
          state: wizard.secondAltState || '',
          zipCode: wizard.secondAltZipCode || '',
          relationship: wizard.secondAltRelationship || '',
        }
      : undefined;

  const children: Child[] = wizard.children.map(c => ({
    name: `${c.firstName} ${c.lastName}`,
    dateOfBirth: c.dateOfBirth,
    birthplace: c.birthplace,
  }));

  return {
    parentName: buildFullName(wizard.firstName, wizard.middleName, wizard.lastName),
    parentAddress: wizard.address,
    parentCity: wizard.city,
    parentState: stateName,
    parentZipCode: wizard.zipCode,
    parentCounty: wizard.county,
    hasCoParent: wizard.hasCoParent,
    coParentName:
      wizard.hasCoParent && wizard.coParentFirstName && wizard.coParentLastName
        ? `${wizard.coParentFirstName} ${wizard.coParentLastName}`
        : undefined,
    coParentAddress: wizard.hasCoParent ? wizard.coParentAddress : undefined,
    children,
    primaryGuardian,
    alternateGuardian,
    secondAlternateGuardian,
    specialInstructions: wizard.specialInstructions,
    religiousPreferences: wizard.religiousPreferences,
    educationPreferences: wizard.educationPreferences,
    medicalInstructions: wizard.medicalInstructions,
    date: new Date().toISOString(),
  };
}

// ─── Document Type Registry ─────────────────────────────────────────────────

export type DocumentType = 'will' | 'trust' | 'guardianship';

/**
 * Maps wizard form data to template data based on document type.
 * Validates the data first and throws if invalid.
 */
export function mapWizardDataToTemplate(
  documentType: DocumentType,
  wizardData: WizardFormData
): { templateData: WillData | TrustData | GuardianshipData; validation: ValidationResult } {
  switch (documentType) {
    case 'will': {
      const data = wizardData as unknown as WillWizardData;
      const validation = validateWillWizardData(data);
      const templateData = validation.valid ? mapWillWizardToTemplate(data) : ({} as WillData);
      return { templateData, validation };
    }
    case 'trust': {
      const data = wizardData as unknown as TrustWizardData;
      const validation = validateTrustWizardData(data);
      const templateData = validation.valid ? mapTrustWizardToTemplate(data) : ({} as TrustData);
      return { templateData, validation };
    }
    case 'guardianship': {
      const data = wizardData as unknown as GuardianshipWizardData;
      const validation = validateGuardianshipWizardData(data);
      const templateData = validation.valid ? mapGuardianshipWizardToTemplate(data) : ({} as GuardianshipData);
      return { templateData, validation };
    }
    default:
      return {
        templateData: {} as WillData,
        validation: { valid: false, errors: [{ field: 'documentType', message: `Unknown document type: ${documentType}` }] },
      };
  }
}
