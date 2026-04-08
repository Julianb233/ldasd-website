// State-specific execution instructions for legal documents
// Source: General state law requirements (not legal advice)

export interface ExecutionRequirements {
  witnesses: number
  notarization: 'required' | 'recommended' | 'optional'
  selfProving: boolean
  minAge: number
  additionalNotes: string[]
}

export interface StateInstructions {
  state: string
  abbreviation: string
  will: ExecutionRequirements
  trust: ExecutionRequirements
  poa: ExecutionRequirements
  healthcareDirective: ExecutionRequirements
  generalSteps: string[]
}

const defaultWill: ExecutionRequirements = {
  witnesses: 2,
  notarization: 'recommended',
  selfProving: true,
  minAge: 18,
  additionalNotes: [],
}

const defaultTrust: ExecutionRequirements = {
  witnesses: 0,
  notarization: 'required',
  selfProving: false,
  minAge: 18,
  additionalNotes: ['Transfer assets into the trust after signing.'],
}

const defaultPoa: ExecutionRequirements = {
  witnesses: 1,
  notarization: 'required',
  selfProving: false,
  minAge: 18,
  additionalNotes: [],
}

const defaultHealthcare: ExecutionRequirements = {
  witnesses: 2,
  notarization: 'recommended',
  selfProving: false,
  minAge: 18,
  additionalNotes: ['Witnesses generally cannot be your healthcare agent or provider.'],
}

// State-specific overrides
export const stateInstructions: Record<string, StateInstructions> = {
  California: {
    state: 'California',
    abbreviation: 'CA',
    will: {
      ...defaultWill,
      notarization: 'optional',
      additionalNotes: ['California allows holographic (handwritten) wills without witnesses, but typed wills require 2 witnesses.'],
    },
    trust: {
      ...defaultTrust,
      additionalNotes: [
        'Transfer assets into the trust after signing.',
        'Real property transfers require a new deed recorded with the county.',
      ],
    },
    poa: {
      ...defaultPoa,
      witnesses: 2,
      additionalNotes: ['California requires the statutory POA warning to be included.'],
    },
    healthcareDirective: {
      ...defaultHealthcare,
      notarization: 'optional',
      additionalNotes: [
        'Witnesses cannot be your healthcare provider or their employees.',
        'At least one witness must not be related to you by blood, marriage, or adoption.',
      ],
    },
    generalSteps: [
      'Print the document on standard letter-size paper.',
      'Read the entire document carefully before signing.',
      'Sign in the presence of required witnesses.',
      'Have witnesses sign the attestation clause.',
      'If notarization is required or recommended, visit a notary public.',
      'Store the original in a secure location (safe deposit box or fireproof safe).',
      'Provide copies to your executor, trustee, or agent as applicable.',
      'Inform your family members where the original is stored.',
    ],
  },
  Texas: {
    state: 'Texas',
    abbreviation: 'TX',
    will: {
      ...defaultWill,
      additionalNotes: ['Texas recognizes holographic wills if entirely in the testator\'s handwriting.'],
    },
    trust: defaultTrust,
    poa: {
      ...defaultPoa,
      additionalNotes: ['Texas uses a statutory durable power of attorney form.'],
    },
    healthcareDirective: {
      ...defaultHealthcare,
      additionalNotes: [
        'Called "Directive to Physicians" in Texas.',
        'Witnesses cannot be your designated agent.',
      ],
    },
    generalSteps: [
      'Print the document on standard letter-size paper.',
      'Read the entire document carefully before signing.',
      'Sign in the presence of required witnesses.',
      'Have witnesses sign the attestation clause.',
      'Have the document notarized for a self-proving affidavit.',
      'Store the original in a secure location.',
      'Provide copies to relevant parties.',
    ],
  },
  'New York': {
    state: 'New York',
    abbreviation: 'NY',
    will: {
      ...defaultWill,
      notarization: 'recommended',
      additionalNotes: [
        'New York does NOT recognize holographic wills.',
        'The testator must sign at the end of the will.',
        'Witnesses must sign within 30 days of each other.',
      ],
    },
    trust: defaultTrust,
    poa: {
      ...defaultPoa,
      witnesses: 2,
      additionalNotes: ['New York requires the statutory short form POA.'],
    },
    healthcareDirective: {
      ...defaultHealthcare,
      additionalNotes: [
        'Called "Health Care Proxy" in New York.',
        'Witnesses cannot be the appointed agent.',
      ],
    },
    generalSteps: [
      'Print the document on standard letter-size paper.',
      'Read the entire document carefully before signing.',
      'Sign in the presence of two witnesses.',
      'Have witnesses sign the attestation clause.',
      'Have the document notarized.',
      'Store the original in a secure, accessible location.',
      'Provide copies to your attorney, executor, or agent.',
    ],
  },
  Florida: {
    state: 'Florida',
    abbreviation: 'FL',
    will: {
      ...defaultWill,
      notarization: 'required',
      additionalNotes: [
        'Florida does NOT recognize holographic wills.',
        'Two witnesses AND notarization required for self-proving will.',
      ],
    },
    trust: defaultTrust,
    poa: {
      ...defaultPoa,
      witnesses: 2,
      additionalNotes: ['Florida requires two witnesses in addition to notarization.'],
    },
    healthcareDirective: {
      ...defaultHealthcare,
      additionalNotes: [
        'Called "Designation of Health Care Surrogate" in Florida.',
        'Two witnesses required; one cannot be the surrogate.',
      ],
    },
    generalSteps: [
      'Print the document on standard letter-size paper.',
      'Read the entire document carefully before signing.',
      'Sign in the presence of two witnesses and a notary.',
      'Have witnesses and notary sign.',
      'Store the original in a secure location — NOT a safe deposit box (may be sealed at death).',
      'Provide copies to relevant parties.',
    ],
  },
}

// Fallback for states without specific overrides
export function getStateInstructions(state: string): StateInstructions {
  if (stateInstructions[state]) {
    return stateInstructions[state]
  }

  // Return default instructions
  return {
    state,
    abbreviation: state.substring(0, 2).toUpperCase(),
    will: defaultWill,
    trust: defaultTrust,
    poa: defaultPoa,
    healthcareDirective: defaultHealthcare,
    generalSteps: [
      'Print the document on standard letter-size paper.',
      'Read the entire document carefully before signing.',
      'Sign in the presence of required witnesses.',
      'Have witnesses sign the attestation clause.',
      'If notarization is required or recommended, visit a notary public.',
      'Store the original in a secure location.',
      'Provide copies to your executor, trustee, or agent as applicable.',
      'Inform your family members where the original is stored.',
    ],
  }
}

export function getDocumentRequirements(
  state: string,
  documentType: 'will' | 'trust' | 'poa' | 'healthcare-directive'
): ExecutionRequirements {
  const instructions = getStateInstructions(state)
  switch (documentType) {
    case 'will':
      return instructions.will
    case 'trust':
      return instructions.trust
    case 'poa':
      return instructions.poa
    case 'healthcare-directive':
      return instructions.healthcareDirective
  }
}
