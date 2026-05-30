/**
 * State-Specific Question Overrides for the Document Wizard
 * LDASD Estate Planning Platform
 *
 * These overrides modify or add questions in the document creation wizard
 * based on the user's state of residence. They ensure state-specific legal
 * requirements are captured during the intake process.
 *
 * DISCLAIMER: This information is for educational and informational purposes only.
 * It does NOT constitute legal advice. Always consult a licensed attorney in your
 * state for guidance on estate planning requirements.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DocumentType = 'will' | 'trust' | 'poa' | 'healthcare-directive'

export interface StateQuestionOverride {
  /** Unique identifier for the question */
  questionId: string
  /** Display label shown to the user */
  label: string
  /** Optional help text displayed below the question */
  helpText?: string
  /** Whether the user must answer this question to proceed */
  required: boolean
  /** Which document types this question applies to */
  appliesTo: DocumentType[]
  /** State abbreviations where this question appears */
  states: string[]
}

// ---------------------------------------------------------------------------
// Shared state groups
// ---------------------------------------------------------------------------

const COMMUNITY_PROPERTY_STATES = [
  'AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI',
]

const HOLOGRAPHIC_WILL_STATES = [
  'AK', 'AZ', 'AR', 'CA', 'CO', 'HI', 'ID', 'KY', 'LA', 'ME',
  'MI', 'MS', 'MT', 'NE', 'NV', 'NJ', 'NC', 'ND', 'OK', 'PA',
  'SD', 'TN', 'TX', 'UT', 'VA', 'WV', 'WY',
]

const ELECTRONIC_WILL_STATES = [
  'AZ', 'CO', 'FL', 'IN', 'MD', 'NV', 'ND', 'UT', 'VA',
]

const SELF_PROVING_AFFIDAVIT_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
  'NY', 'NC', 'ND', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
  'TX', 'UT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

const STATUTORY_POA_STATES = [
  'AK', 'AZ', 'CA', 'CO', 'FL', 'GA', 'HI', 'IL', 'IA', 'ME',
  'MD', 'MN', 'MO', 'NC', 'ND', 'NH', 'NM', 'NY', 'OH', 'RI',
  'SC', 'TN', 'TX', 'WA', 'WI', 'WY',
]

// States where the POA requires both witnesses AND notarization
const POA_WITNESSES_AND_NOTARY_STATES = [
  'CA', 'FL', 'MI', 'NJ', 'NY', 'PA', 'TX',
]

// States with a state-level estate or inheritance tax
const ESTATE_TAX_STATES = [
  'CT', 'HI', 'IL', 'ME', 'MD', 'MA', 'MN', 'NY', 'OR', 'RI',
  'VT', 'WA',
]

const INHERITANCE_TAX_STATES = [
  'IA', 'KY', 'MD', 'NE', 'NJ', 'PA',
]

// States with homestead protection considerations
const HOMESTEAD_STATES = ['FL', 'TX']

/** All 50 state abbreviations */
const ALL_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

// ---------------------------------------------------------------------------
// State Question Overrides
// ---------------------------------------------------------------------------

export const stateQuestionOverrides: StateQuestionOverride[] = [
  // ---- Community property ----
  {
    questionId: 'community-property-acknowledgment',
    label: 'Do you understand that your state follows community property rules?',
    helpText:
      'In community property states, most assets acquired during marriage are owned equally by both spouses. This affects how assets are distributed in your estate plan. Separate property (owned before marriage or received as a gift/inheritance) is treated differently.',
    required: true,
    appliesTo: ['will', 'trust'],
    states: COMMUNITY_PROPERTY_STATES,
  },
  {
    questionId: 'community-property-agreement',
    label: 'Do you and your spouse have a community property agreement or prenuptial agreement?',
    helpText:
      'A community property agreement or prenuptial/postnuptial agreement may change how your assets are classified. If you have one, your estate plan should account for its terms.',
    required: false,
    appliesTo: ['will', 'trust'],
    states: COMMUNITY_PROPERTY_STATES,
  },
  {
    questionId: 'separate-property-identification',
    label: 'Do you have separate property you want to keep separate in your estate plan?',
    helpText:
      'Separate property includes assets you owned before marriage, inheritances, and gifts received individually. Identifying these assets helps ensure they are distributed according to your wishes.',
    required: false,
    appliesTo: ['will', 'trust'],
    states: COMMUNITY_PROPERTY_STATES,
  },

  // ---- Holographic will ----
  {
    questionId: 'holographic-will-option',
    label: 'Would you like information about creating a handwritten (holographic) will?',
    helpText:
      'Your state recognizes holographic wills — wills that are entirely handwritten, dated, and signed by the testator. While valid, typed and witnessed wills are generally recommended for clarity and to reduce the chance of disputes.',
    required: false,
    appliesTo: ['will'],
    states: HOLOGRAPHIC_WILL_STATES,
  },

  // ---- Electronic will ----
  {
    questionId: 'electronic-will-option',
    label: 'Are you interested in creating an electronic will?',
    helpText:
      'Your state recognizes electronic wills, which can be created, signed, and witnessed electronically. Electronic wills must still meet specific requirements for validity under your state\'s law.',
    required: false,
    appliesTo: ['will'],
    states: ELECTRONIC_WILL_STATES,
  },

  // ---- Self-proving affidavit ----
  {
    questionId: 'self-proving-affidavit',
    label: 'Would you like to include a self-proving affidavit with your will?',
    helpText:
      'A self-proving affidavit is a sworn statement signed by the witnesses and notarized. It allows the will to be accepted by the probate court without requiring the witnesses to testify in person. This is strongly recommended.',
    required: false,
    appliesTo: ['will'],
    states: SELF_PROVING_AFFIDAVIT_STATES,
  },

  // ---- Notarization requirement notices ----
  {
    questionId: 'will-notarization-required-notice',
    label: 'Your state requires notarization for wills',
    helpText:
      'Louisiana requires that a "notarial testament" (the standard will form) be executed in the presence of a notary public and two witnesses. This is a mandatory requirement for your will to be valid.',
    required: true,
    appliesTo: ['will'],
    states: ['LA'],
  },
  {
    questionId: 'poa-notarization-notice',
    label: 'Your Power of Attorney must be notarized to be valid',
    helpText:
      'Your state requires that a Power of Attorney be notarized. Some states also require witnesses in addition to notarization. We will include notarization instructions with your document.',
    required: true,
    appliesTo: ['poa'],
    states: ALL_STATES, // Nearly universal for POA
  },
  {
    questionId: 'poa-witnesses-and-notary-notice',
    label: 'Your Power of Attorney requires both witnesses and notarization',
    helpText:
      'Your state requires that a Power of Attorney be both witnessed and notarized. We will include instructions for proper execution with your document.',
    required: true,
    appliesTo: ['poa'],
    states: POA_WITNESSES_AND_NOTARY_STATES,
  },

  // ---- Statutory POA form ----
  {
    questionId: 'statutory-poa-form',
    label: 'Your state has a statutory Power of Attorney form',
    helpText:
      'Your state provides an official statutory form for Powers of Attorney. While custom forms may also be valid, using the statutory form is recommended as it is widely recognized by financial institutions and courts in your state.',
    required: true,
    appliesTo: ['poa'],
    states: STATUTORY_POA_STATES,
  },

  // ---- Healthcare directive name localization ----
  {
    questionId: 'healthcare-directive-ny',
    label: 'Designate your Health Care Proxy',
    helpText:
      'In New York, the healthcare directive is called a "Health Care Proxy." This document allows you to appoint someone you trust to make healthcare decisions on your behalf if you become unable to do so.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['NY'],
  },
  {
    questionId: 'healthcare-directive-tx',
    label: 'Create your Directive to Physicians and Family or Surrogates',
    helpText:
      'In Texas, the advance directive for end-of-life care is called a "Directive to Physicians and Family or Surrogates." This document states your wishes regarding life-sustaining treatment.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['TX'],
  },
  {
    questionId: 'healthcare-directive-fl',
    label: 'Designate your Health Care Surrogate',
    helpText:
      'In Florida, the healthcare agent designation is called a "Designation of Health Care Surrogate." This is separate from the Florida Living Will, which addresses end-of-life treatment preferences.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['FL'],
  },
  {
    questionId: 'healthcare-directive-oh',
    label: 'Create your Health Care Power of Attorney',
    helpText:
      'In Ohio, the document for appointing a healthcare decision-maker is called a "Health Care Power of Attorney." Ohio also has a separate Living Will Declaration for end-of-life wishes.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['OH'],
  },
  {
    questionId: 'healthcare-directive-mi',
    label: 'Create your Patient Advocate Designation',
    helpText:
      'In Michigan, the healthcare directive is called a "Patient Advocate Designation." This document allows you to name a patient advocate to make healthcare decisions if you are unable to participate in treatment decisions.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['MI'],
  },
  {
    questionId: 'healthcare-directive-ma',
    label: 'Designate your Health Care Proxy',
    helpText:
      'In Massachusetts, you appoint a healthcare agent through a "Health Care Proxy" form. This person will make medical decisions on your behalf if you cannot communicate your wishes.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['MA'],
  },

  // ---- Witness count notice (Vermont) ----
  {
    questionId: 'vt-three-witnesses-notice',
    label: 'Vermont requires three witnesses for wills',
    helpText:
      'Vermont is the only state that requires three witnesses for a will to be valid. Make sure you have three qualified witnesses available when you sign your will.',
    required: true,
    appliesTo: ['will'],
    states: ['VT'],
  },

  // ---- Minimum age notice (Georgia, Louisiana) ----
  {
    questionId: 'ga-minimum-age-notice',
    label: 'Georgia allows wills at age 14',
    helpText:
      'Georgia has the lowest minimum age for creating a will at 14 years old. If you are between 14 and 17, you may create a valid will in Georgia.',
    required: false,
    appliesTo: ['will'],
    states: ['GA'],
  },
  {
    questionId: 'la-minimum-age-notice',
    label: 'Louisiana allows wills at age 16',
    helpText:
      'Louisiana allows testators to create a will starting at age 16, lower than the standard 18 in most states.',
    required: false,
    appliesTo: ['will'],
    states: ['LA'],
  },

  // ---- Louisiana forced heirship ----
  {
    questionId: 'la-forced-heirship',
    label: 'Do you have children under 24 or permanently incapable children?',
    helpText:
      'Louisiana has forced heirship rules. Children under 24 years of age, or children of any age who are permanently incapable of taking care of themselves, are "forced heirs" entitled to a portion of your estate that cannot be disinherited by will.',
    required: true,
    appliesTo: ['will', 'trust'],
    states: ['LA'],
  },

  // ---- Homestead protection ----
  {
    questionId: 'homestead-protection',
    label: 'Do you own a primary residence (homestead) in this state?',
    helpText:
      'Your state has strong homestead protection laws that may limit how you can transfer or encumber your primary residence in your estate plan. If you are married, your spouse may have homestead rights that affect distribution.',
    required: true,
    appliesTo: ['will', 'trust'],
    states: HOMESTEAD_STATES,
  },

  // ---- Estate / inheritance tax notice ----
  {
    questionId: 'state-estate-tax-notice',
    label: 'Your state has a state-level estate tax',
    helpText:
      'In addition to the federal estate tax, your state imposes its own estate tax. The exemption threshold may be lower than the federal exemption. Estate planning strategies such as trusts may help reduce your state estate tax liability.',
    required: false,
    appliesTo: ['will', 'trust'],
    states: ESTATE_TAX_STATES,
  },
  {
    questionId: 'state-inheritance-tax-notice',
    label: 'Your state has an inheritance tax',
    helpText:
      'Your state has an inheritance tax, which is paid by the person receiving the inheritance (unlike an estate tax, which is paid by the estate). Tax rates typically vary based on the beneficiary\'s relationship to the deceased.',
    required: false,
    appliesTo: ['will', 'trust'],
    states: INHERITANCE_TAX_STATES,
  },

  // ---- California-specific healthcare directive restrictions ----
  {
    questionId: 'ca-healthcare-witness-restrictions',
    label: 'Healthcare directive witness restrictions in California',
    helpText:
      'In California, at least one of your two healthcare directive witnesses cannot be a beneficiary of your estate. Neither witness can be your treating health care provider, an employee of your health care provider, or an operator/employee of a community care facility or residential care facility.',
    required: true,
    appliesTo: ['healthcare-directive'],
    states: ['CA'],
  },

  // ---- New York will execution requirements ----
  {
    questionId: 'ny-will-publication',
    label: 'New York requires formal will publication and attestation',
    helpText:
      'New York has strict will execution requirements. You must declare to your witnesses that the document is your will ("publication"), and each witness must sign within 30 days of each other. Failure to follow these steps can invalidate the will.',
    required: true,
    appliesTo: ['will'],
    states: ['NY'],
  },

  // ---- Florida living will vs surrogate ----
  {
    questionId: 'fl-living-will-separate',
    label: 'Would you also like to create a Florida Living Will?',
    helpText:
      'In Florida, the "Designation of Health Care Surrogate" (agent appointment) and the "Living Will" (end-of-life treatment preferences) are two separate documents. We recommend creating both for comprehensive healthcare planning.',
    required: false,
    appliesTo: ['healthcare-directive'],
    states: ['FL'],
  },
]

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Get all question overrides that apply to a specific state.
 */
export function getOverridesForState(stateAbbr: string): StateQuestionOverride[] {
  const abbr = stateAbbr.trim().toUpperCase()
  return stateQuestionOverrides.filter((q) => q.states.includes(abbr))
}

/**
 * Get all question overrides that apply to a specific state AND document type.
 */
export function getOverridesForStateAndDocument(
  stateAbbr: string,
  documentType: DocumentType,
): StateQuestionOverride[] {
  const abbr = stateAbbr.trim().toUpperCase()
  return stateQuestionOverrides.filter(
    (q) => q.states.includes(abbr) && q.appliesTo.includes(documentType),
  )
}

/**
 * Get all unique states that have overrides for a given document type.
 */
export function getStatesWithOverridesForDocument(
  documentType: DocumentType,
): string[] {
  const stateSet = new Set<string>()
  for (const override of stateQuestionOverrides) {
    if (override.appliesTo.includes(documentType)) {
      for (const state of override.states) {
        stateSet.add(state)
      }
    }
  }
  return Array.from(stateSet).sort()
}

/**
 * Check if a specific question override applies to a given state.
 */
export function doesOverrideApply(
  questionId: string,
  stateAbbr: string,
): boolean {
  const abbr = stateAbbr.trim().toUpperCase()
  const override = stateQuestionOverrides.find((q) => q.questionId === questionId)
  return override ? override.states.includes(abbr) : false
}

/**
 * Get required overrides only — these must be shown in the wizard.
 */
export function getRequiredOverridesForState(
  stateAbbr: string,
  documentType: DocumentType,
): StateQuestionOverride[] {
  return getOverridesForStateAndDocument(stateAbbr, documentType).filter(
    (q) => q.required,
  )
}

/**
 * Get optional overrides — informational or user-choice questions.
 */
export function getOptionalOverridesForState(
  stateAbbr: string,
  documentType: DocumentType,
): StateQuestionOverride[] {
  return getOverridesForStateAndDocument(stateAbbr, documentType).filter(
    (q) => !q.required,
  )
}
