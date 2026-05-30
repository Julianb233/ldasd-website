/**
 * US State Configuration for Estate Planning Documents
 * LDASD Estate Planning Platform
 *
 * DISCLAIMER: This information is for educational and informational purposes only.
 * It does NOT constitute legal advice. Estate planning laws vary by state and change
 * frequently. Always consult a licensed attorney in your state for legal guidance.
 *
 * Data reflects general US estate planning requirements as of 2024-2025.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NotarizationRequirement =
  | 'required'
  | 'recommended'
  | 'optional'
  | 'not-recognized'

export interface StateWitnessRules {
  willWitnesses: number
  trustWitnesses: number
  poaWitnesses: number
  healthcareDirectiveWitnesses: number
}

export interface StateNotarizationRules {
  willNotarization: NotarizationRequirement
  trustNotarization: Exclude<NotarizationRequirement, 'not-recognized'>
  poaNotarization: Exclude<NotarizationRequirement, 'not-recognized'>
  healthcareDirectiveNotarization: Exclude<NotarizationRequirement, 'not-recognized'>
}

export interface StateSpecificQuestions {
  /** AZ, CA, ID, LA, NV, NM, TX, WA, WI */
  communityPropertyState: boolean
  holographicWillRecognized: boolean
  electronicWillRecognized: boolean
  /** Usually 18; GA = 14, LA = 16 */
  minimumWillAge: number
  /** State-specific name for the healthcare directive document */
  healthcareDirectiveName: string
  poaStatutoryFormRequired: boolean
  selfProvingAffidavitAvailable: boolean
  /** Inverse of communityPropertyState */
  separatePropertyState: boolean
  witnessRestrictions: string[]
}

export interface StateConfig {
  name: string
  abbreviation: string
  witnesses: StateWitnessRules
  notarization: StateNotarizationRules
  questions: StateSpecificQuestions
  /** Important state-specific notes for the user */
  notes: string[]
}

// ---------------------------------------------------------------------------
// Shared witness restriction sets (reduces repetition)
// ---------------------------------------------------------------------------

const STANDARD_WITNESS_RESTRICTIONS: string[] = [
  'Must be at least 18 years old',
  'Cannot be a beneficiary under the will',
  'Must be of sound mind',
]

const STRICT_WITNESS_RESTRICTIONS: string[] = [
  ...STANDARD_WITNESS_RESTRICTIONS,
  'Cannot be the spouse of a beneficiary',
]

// ---------------------------------------------------------------------------
// Community property & holographic will sets for quick lookups
// ---------------------------------------------------------------------------

const COMMUNITY_PROPERTY_STATES = new Set([
  'AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI',
])

const HOLOGRAPHIC_WILL_STATES = new Set([
  'AK', 'AZ', 'AR', 'CA', 'CO', 'HI', 'ID', 'KY', 'LA', 'ME',
  'MI', 'MS', 'MT', 'NE', 'NV', 'NJ', 'NC', 'ND', 'OK', 'PA',
  'SD', 'TN', 'TX', 'UT', 'VA', 'WV', 'WY',
])

const ELECTRONIC_WILL_STATES = new Set([
  'AZ', 'CO', 'FL', 'IN', 'MD', 'NV', 'ND', 'UT', 'VA',
])

const SELF_PROVING_UNAVAILABLE = new Set(['DC', 'MD', 'OH', 'VT'])

// ---------------------------------------------------------------------------
// State Configurations — all 50 states
// ---------------------------------------------------------------------------

export const stateConfigs: Record<string, StateConfig> = {
  AL: {
    name: 'Alabama',
    abbreviation: 'AL',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'optional',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for Health Care',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Alabama recognizes self-proving affidavits for wills.',
      'Notarization is strongly recommended for wills to make them self-proving.',
    ],
  },

  AK: {
    name: 'Alaska',
    abbreviation: 'AK',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Alaska recognizes holographic (handwritten) wills.',
      'Alaska allows optional community property agreements between spouses.',
      'Statutory POA form is recommended under the Alaska Uniform Power of Attorney Act.',
    ],
  },

  AZ: {
    name: 'Arizona',
    abbreviation: 'AZ',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 1,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Arizona is a community property state — marital assets are split 50/50.',
      'Arizona recognizes holographic and electronic wills.',
      'Healthcare directive requires only 1 witness.',
    ],
  },

  AR: {
    name: 'Arkansas',
    abbreviation: 'AR',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'optional',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Arkansas recognizes holographic wills if entirely handwritten, dated, and signed.',
      'Arkansas requires two attesting witnesses for formal wills.',
    ],
  },

  CA: {
    name: 'California',
    abbreviation: 'CA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'optional',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'At least one witness must not be a beneficiary',
        'Healthcare directive witnesses cannot be the treating health care provider or an employee of the provider',
      ],
    },
    notes: [
      'California is a community property state.',
      'California recognizes holographic wills (entirely handwritten, dated, and signed).',
      'California has a statutory POA form under Probate Code Section 4401.',
      'Healthcare directive witness restrictions are strict — at least one witness cannot be a beneficiary.',
    ],
  },

  CO: {
    name: 'Colorado',
    abbreviation: 'CO',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 0,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for Medical/Surgical Treatment',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Colorado recognizes holographic and electronic wills.',
      'Colorado adopted the Uniform Power of Attorney Act.',
      'Notarized wills are treated as self-proving.',
    ],
  },

  CT: {
    name: 'Connecticut',
    abbreviation: 'CT',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Instructions',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Connecticut does not recognize holographic wills.',
      'Connecticut abolished its estate tax threshold — check current year exemption.',
    ],
  },

  DE: {
    name: 'Delaware',
    abbreviation: 'DE',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Delaware does not have a state estate tax.',
      'Delaware does not recognize holographic wills.',
    ],
  },

  FL: {
    name: 'Florida',
    abbreviation: 'FL',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Designation of Health Care Surrogate',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STRICT_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Florida does NOT recognize holographic wills.',
      'Florida recognizes electronic wills under the Florida Electronic Wills Act.',
      'Florida POA requires two witnesses AND notarization.',
      'Florida has strong homestead protections that affect estate planning.',
      'Designation of Health Care Surrogate is separate from the Living Will in Florida.',
    ],
  },

  GA: {
    name: 'Georgia',
    abbreviation: 'GA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 14,
      healthcareDirectiveName: 'Georgia Advance Directive for Health Care',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Georgia allows wills at age 14 — the lowest minimum age in the US.',
      'Georgia does not recognize holographic wills.',
      'Georgia has a statutory financial POA form.',
    ],
  },

  HI: {
    name: 'Hawaii',
    abbreviation: 'HI',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Hawaii recognizes holographic wills under the Uniform Probate Code.',
      'Hawaii adopted the Uniform Power of Attorney Act.',
    ],
  },

  ID: {
    name: 'Idaho',
    abbreviation: 'ID',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Living Will and Durable Power of Attorney for Health Care',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Idaho is a community property state.',
      'Idaho recognizes holographic wills.',
    ],
  },

  IL: {
    name: 'Illinois',
    abbreviation: 'IL',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Illinois Health Care Power of Attorney',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Illinois has a state estate tax with its own exemption threshold.',
      'Illinois requires a statutory short form for POA.',
      'Illinois does not recognize holographic wills.',
    ],
  },

  IN: {
    name: 'Indiana',
    abbreviation: 'IN',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'optional',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Indiana recognizes electronic wills.',
      'Indiana does not recognize holographic wills.',
      'Indiana has a statutory Living Will Declaration form.',
    ],
  },

  IA: {
    name: 'Iowa',
    abbreviation: 'IA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Iowa does not recognize holographic wills.',
      'Iowa has a statutory form for durable power of attorney.',
    ],
  },

  KS: {
    name: 'Kansas',
    abbreviation: 'KS',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Durable Power of Attorney for Health Care Decisions',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Kansas does not recognize holographic wills.',
      'Kansas has a separate Living Will Declaration form.',
    ],
  },

  KY: {
    name: 'Kentucky',
    abbreviation: 'KY',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Kentucky recognizes holographic wills if entirely handwritten and signed.',
      'Kentucky has an inheritance tax (not the same as an estate tax).',
    ],
  },

  LA: {
    name: 'Louisiana',
    abbreviation: 'LA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'required',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 16,
      healthcareDirectiveName: 'Declaration Concerning Life-Sustaining Procedures',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Notarial testament requires notary and two witnesses',
        'Olographic (holographic) testament must be entirely handwritten, dated, and signed',
      ],
    },
    notes: [
      'Louisiana is a community property state with a CIVIL LAW system (unique in the US).',
      'Louisiana requires notarization for its "notarial testament" (standard will form).',
      'Louisiana allows wills at age 16.',
      'Louisiana calls holographic wills "olographic testaments."',
      'Louisiana has forced heirship rules for children under 24 or permanently incapable children.',
    ],
  },

  ME: {
    name: 'Maine',
    abbreviation: 'ME',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Maine recognizes holographic wills.',
      'Maine adopted the Uniform Power of Attorney Act.',
      'Maine has a state estate tax.',
    ],
  },

  MD: {
    name: 'Maryland',
    abbreviation: 'MD',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: false,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Maryland does NOT have a self-proving affidavit provision.',
      'Maryland has both a state estate tax AND an inheritance tax.',
      'Maryland recognizes electronic wills.',
      'Maryland has a statutory personal financial planning POA form.',
    ],
  },

  MA: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Proxy',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Massachusetts uses "Health Care Proxy" for the healthcare agent designation.',
      'Massachusetts has a state estate tax.',
      'Massachusetts does not recognize holographic wills.',
    ],
  },

  MI: {
    name: 'Michigan',
    abbreviation: 'MI',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Patient Advocate Designation',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Michigan recognizes holographic wills.',
      'Michigan calls its healthcare directive a "Patient Advocate Designation."',
      'Michigan POA requires two witnesses in addition to notarization.',
    ],
  },

  MN: {
    name: 'Minnesota',
    abbreviation: 'MN',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Minnesota has a state estate tax.',
      'Minnesota has a statutory short form POA.',
    ],
  },

  MS: {
    name: 'Mississippi',
    abbreviation: 'MS',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'optional',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Mississippi recognizes holographic wills.',
    ],
  },

  MO: {
    name: 'Missouri',
    abbreviation: 'MO',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive — Durable Power of Attorney for Health Care',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Missouri does not recognize holographic wills.',
      'Missouri has a statutory POA form.',
    ],
  },

  MT: {
    name: 'Montana',
    abbreviation: 'MT',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Montana recognizes holographic wills.',
      'Montana adopted the Uniform Probate Code.',
    ],
  },

  NE: {
    name: 'Nebraska',
    abbreviation: 'NE',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Power of Attorney for Health Care',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Nebraska recognizes holographic wills.',
      'Nebraska has an inheritance tax (county-level).',
    ],
  },

  NV: {
    name: 'Nevada',
    abbreviation: 'NV',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Durable Power of Attorney for Health Care Decisions',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Nevada is a community property state.',
      'Nevada recognizes holographic and electronic wills.',
      'Nevada has very favorable trust laws — no state income tax on trusts.',
      'Nevada has strong asset protection trust provisions.',
    ],
  },

  NH: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'New Hampshire does not recognize holographic wills.',
      'New Hampshire adopted the Uniform Power of Attorney Act.',
    ],
  },

  NJ: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for Health Care',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'New Jersey recognizes holographic wills.',
      'New Jersey repealed its estate tax but retains an inheritance tax.',
      'New Jersey has a combined advance directive (proxy + living will).',
    ],
  },

  NM: {
    name: 'New Mexico',
    abbreviation: 'NM',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 1,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'New Mexico is a community property state.',
      'New Mexico adopted the Uniform Probate Code.',
      'New Mexico adopted the Uniform Power of Attorney Act.',
    ],
  },

  NY: {
    name: 'New York',
    abbreviation: 'NY',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Proxy',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Witnesses must be informed they are witnessing a will',
        'Testator must declare the document is their will (publication requirement)',
      ],
    },
    notes: [
      'New York uses "Health Care Proxy" instead of advance directive.',
      'New York has strict will execution requirements (publication + attestation).',
      'New York requires the statutory short form for POA.',
      'New York has a state estate tax with a "cliff" — exceeding the exemption by more than 5% taxes the entire estate.',
      'New York does NOT recognize holographic wills (except military personnel).',
    ],
  },

  NC: {
    name: 'North Carolina',
    abbreviation: 'NC',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for a Natural Death',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Holographic will must be found among testator\'s valuable papers or in safekeeping',
      ],
    },
    notes: [
      'North Carolina recognizes holographic wills with specific requirements.',
      'North Carolina has a statutory short form POA.',
      'North Carolina healthcare directive is specifically for "Natural Death."',
    ],
  },

  ND: {
    name: 'North Dakota',
    abbreviation: 'ND',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'North Dakota recognizes holographic and electronic wills.',
      'North Dakota adopted the Uniform Probate Code.',
      'North Dakota adopted the Uniform Power of Attorney Act.',
    ],
  },

  OH: {
    name: 'Ohio',
    abbreviation: 'OH',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Power of Attorney',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: false,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Ohio does NOT have a self-proving affidavit provision — witnesses may need to testify in probate.',
      'Ohio does not recognize holographic wills.',
      'Ohio uses "Health Care Power of Attorney" for healthcare decisions.',
      'Ohio has a statutory POA form.',
    ],
  },

  OK: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for Health Care',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Oklahoma recognizes holographic wills if entirely handwritten, dated, and signed.',
    ],
  },

  OR: {
    name: 'Oregon',
    abbreviation: 'OR',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Healthcare directive witness cannot be the attending physician',
        'One witness cannot be a relative or heir',
      ],
    },
    notes: [
      'Oregon has a state estate tax.',
      'Oregon does not recognize holographic wills.',
      'Oregon has specific witness restrictions for advance directives.',
    ],
  },

  PA: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Pennsylvania recognizes holographic wills.',
      'Pennsylvania has an inheritance tax (rates vary by beneficiary relationship).',
      'Pennsylvania does not have an estate tax.',
    ],
  },

  RI: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Durable Power of Attorney for Health Care',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Rhode Island has a state estate tax.',
      'Rhode Island does not recognize holographic wills.',
    ],
  },

  SC: {
    name: 'South Carolina',
    abbreviation: 'SC',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Power of Attorney',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'At least one witness should not be a beneficiary (recommended)',
      ],
    },
    notes: [
      'South Carolina does not recognize holographic wills.',
      'South Carolina adopted the Uniform Power of Attorney Act.',
      'South Carolina has a statutory short form POA.',
    ],
  },

  SD: {
    name: 'South Dakota',
    abbreviation: 'SD',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'South Dakota recognizes holographic wills.',
      'South Dakota has very favorable trust laws — no state income tax, strong asset protection.',
      'South Dakota allows dynasty trusts with no rule against perpetuities.',
    ],
  },

  TN: {
    name: 'Tennessee',
    abbreviation: 'TN',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive for Health Care',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Tennessee recognizes holographic wills.',
      'Tennessee repealed its inheritance/estate tax effective 2016.',
      'Tennessee has a statutory durable POA form.',
    ],
  },

  TX: {
    name: 'Texas',
    abbreviation: 'TX',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 2,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Directive to Physicians and Family or Surrogates',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Witnesses must be credible and at least 14 years old',
      ],
    },
    notes: [
      'Texas is a community property state.',
      'Texas recognizes holographic wills if entirely in the testator\'s handwriting.',
      'Texas uses "Directive to Physicians" for the living will / end-of-life directive.',
      'Texas has a statutory durable POA form.',
      'Texas has strong homestead protections that affect estate planning.',
    ],
  },

  UT: {
    name: 'Utah',
    abbreviation: 'UT',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 1,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Utah recognizes holographic and electronic wills.',
      'Utah adopted the Uniform Probate Code.',
    ],
  },

  VT: {
    name: 'Vermont',
    abbreviation: 'VT',
    witnesses: {
      willWitnesses: 3,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: false,
      separatePropertyState: true,
      witnessRestrictions: [
        ...STANDARD_WITNESS_RESTRICTIONS,
        'Vermont requires THREE witnesses for wills (most states require only two)',
      ],
    },
    notes: [
      'Vermont requires 3 witnesses for wills — more than any other state.',
      'Vermont does NOT have a self-proving affidavit provision.',
      'Vermont has a state estate tax.',
    ],
  },

  VA: {
    name: 'Virginia',
    abbreviation: 'VA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: true,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Medical Directive',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Virginia recognizes holographic and electronic wills.',
      'Virginia was among the first states to adopt electronic will legislation.',
    ],
  },

  WA: {
    name: 'Washington',
    abbreviation: 'WA',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Washington is a community property state.',
      'Washington has a state estate tax.',
      'Washington does not recognize holographic wills.',
    ],
  },

  WV: {
    name: 'West Virginia',
    abbreviation: 'WV',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Medical Power of Attorney',
      poaStatutoryFormRequired: false,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'West Virginia recognizes holographic wills.',
    ],
  },

  WI: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: true,
      holographicWillRecognized: false,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Power of Attorney for Health Care',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: false,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Wisconsin is a community property state (Marital Property Act).',
      'Wisconsin has a self-proving affidavit but with some limitations.',
      'Wisconsin has a statutory form for POA for health care.',
      'Wisconsin does not recognize holographic wills.',
    ],
  },

  WY: {
    name: 'Wyoming',
    abbreviation: 'WY',
    witnesses: {
      willWitnesses: 2,
      trustWitnesses: 0,
      poaWitnesses: 1,
      healthcareDirectiveWitnesses: 2,
    },
    notarization: {
      willNotarization: 'recommended',
      trustNotarization: 'required',
      poaNotarization: 'required',
      healthcareDirectiveNotarization: 'recommended',
    },
    questions: {
      communityPropertyState: false,
      holographicWillRecognized: true,
      electronicWillRecognized: false,
      minimumWillAge: 18,
      healthcareDirectiveName: 'Advance Health Care Directive',
      poaStatutoryFormRequired: true,
      selfProvingAffidavitAvailable: true,
      separatePropertyState: true,
      witnessRestrictions: STANDARD_WITNESS_RESTRICTIONS,
    },
    notes: [
      'Wyoming recognizes holographic wills.',
      'Wyoming has very favorable trust laws — no state income tax.',
      'Wyoming adopted the Uniform Power of Attorney Act.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Look up a state by full name or two-letter abbreviation (case-insensitive).
 */
export function getStateConfig(stateNameOrAbbr: string): StateConfig | undefined {
  const upper = stateNameOrAbbr.trim().toUpperCase()

  // Try abbreviation first
  if (stateConfigs[upper]) {
    return stateConfigs[upper]
  }

  // Try full name
  const lower = stateNameOrAbbr.trim().toLowerCase()
  return Object.values(stateConfigs).find(
    (s) => s.name.toLowerCase() === lower,
  )
}

/**
 * Look up a state by its two-letter abbreviation.
 */
export function getStateByAbbreviation(abbr: string): StateConfig | undefined {
  return stateConfigs[abbr.trim().toUpperCase()]
}

/**
 * Return all 50 state configs sorted by name.
 */
export function getAllStates(): StateConfig[] {
  return Object.values(stateConfigs).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

/**
 * Return only community property states.
 */
export function getCommunityPropertyStates(): StateConfig[] {
  return Object.values(stateConfigs).filter(
    (s) => s.questions.communityPropertyState,
  )
}

/**
 * Return only states that recognize holographic wills.
 */
export function getHolographicWillStates(): StateConfig[] {
  return Object.values(stateConfigs).filter(
    (s) => s.questions.holographicWillRecognized,
  )
}

/**
 * Return only states that recognize electronic wills.
 */
export function getElectronicWillStates(): StateConfig[] {
  return Object.values(stateConfigs).filter(
    (s) => s.questions.electronicWillRecognized,
  )
}

/**
 * Return states where self-proving affidavit is available.
 */
export function getSelfProvingAffidavitStates(): StateConfig[] {
  return Object.values(stateConfigs).filter(
    (s) => s.questions.selfProvingAffidavitAvailable,
  )
}

/**
 * Get the healthcare directive name for a specific state.
 */
export function getHealthcareDirectiveName(stateAbbr: string): string {
  const config = getStateByAbbreviation(stateAbbr)
  return config?.questions.healthcareDirectiveName ?? 'Advance Directive'
}
