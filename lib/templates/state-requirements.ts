/**
 * State-specific legal requirements for estate planning documents.
 * Covers witness counts, notarization, self-proving affidavit support,
 * and execution instructions for all 50 US states + DC.
 *
 * Requirements: PDF-02, PDF-05, COMP-03, COMP-04, DOC-05
 */

export interface StateRequirements {
  /** Full state name */
  name: string;
  /** Two-letter abbreviation */
  abbreviation: string;

  will: {
    /** Number of witnesses required */
    witnessCount: number;
    /** Whether notarization is required for the will itself */
    notarizationRequired: boolean;
    /** Whether a self-proving affidavit is available (notarized) */
    selfProvingAffidavit: boolean;
    /** Whether holographic (handwritten) wills are recognized */
    holographicAllowed: boolean;
    /** Minimum age to make a will */
    minimumAge: number;
    /** State-specific execution instructions */
    executionInstructions: string[];
  };

  trust: {
    /** Whether notarization is required */
    notarizationRequired: boolean;
    /** Whether witnesses are required */
    witnessesRequired: boolean;
    /** Number of witnesses if required */
    witnessCount: number;
    /** State-specific execution instructions */
    executionInstructions: string[];
  };

  guardianship: {
    /** Whether notarization is required */
    notarizationRequired: boolean;
    /** Number of witnesses required */
    witnessCount: number;
    /** State-specific statute reference */
    statuteReference?: string;
    /** State-specific execution instructions */
    executionInstructions: string[];
  };

  poa: {
    /** Whether notarization is required */
    notarizationRequired: boolean;
    /** Number of witnesses required */
    witnessCount: number;
    /** State-specific execution instructions */
    executionInstructions: string[];
  };

  healthcareDirective: {
    /** Whether notarization is required */
    notarizationRequired: boolean;
    /** Number of witnesses required */
    witnessCount: number;
    /** Special witness restrictions (e.g., cannot be healthcare provider) */
    witnessRestrictions: string[];
    /** State-specific execution instructions */
    executionInstructions: string[];
  };
}

/**
 * Complete state requirements database for all 50 states + DC.
 * Keyed by two-letter state abbreviation.
 */
export const stateRequirements: Record<string, StateRequirements> = {
  AL: {
    name: 'Alabama',
    abbreviation: 'AL',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) competent witnesses.',
        'Both witnesses must sign in the presence of the testator and each other.',
        'For a self-proving affidavit, the testator and witnesses must sign before a notary public.',
        'The testator must be at least 18 years old and of sound mind.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust by changing title/ownership documents.',
        'Record any real property transfers with the county recorder.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination in the presence of two (2) witnesses.',
        'Have the document notarized.',
        'Keep the original in a safe, accessible location.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 1,
      executionInstructions: [
        'Sign the power of attorney before a notary public.',
        'One (1) witness signature is recommended.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the person appointed as healthcare proxy.',
        'At least one witness should not be a relative or heir.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Provide copies to your healthcare proxy, physician, and hospital.',
        'Keep the original in an accessible location.',
      ],
    },
  },
  AK: {
    name: 'Alaska',
    abbreviation: 'AK',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'Both witnesses must sign in the presence of the testator.',
        'A self-proving affidavit may be attached with notarization.',
        'Holographic (handwritten) wills are recognized if entirely in the testator\'s handwriting and signed.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets by changing title documents.',
        'Record real property transfers with the recording district.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination in the presence of two (2) witnesses.',
        'Have the document notarized.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: [
        'Sign the power of attorney before a notary public.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: true,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses should not be related by blood or marriage.',
        'Healthcare providers should not serve as witnesses.',
      ],
      executionInstructions: [
        'Sign before a notary public and two (2) witnesses.',
        'Provide copies to your healthcare agent and physicians.',
      ],
    },
  },
  AZ: {
    name: 'Arizona',
    abbreviation: 'AZ',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'Both witnesses must sign the will.',
        'A self-proving affidavit with notarization is recommended.',
        'Holographic wills are valid if material portions are in the testator\'s handwriting.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust.',
        'Record real property transfers with the county recorder.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public.',
        'Two (2) witnesses are recommended.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 1,
      executionInstructions: [
        'Sign before a notary public.',
        'One (1) witness is recommended.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 1,
      witnessRestrictions: [
        'The witness cannot be the appointed healthcare agent.',
        'The witness should not be a healthcare provider treating the patient.',
      ],
      executionInstructions: [
        'Sign in the presence of one (1) witness.',
        'Notarization is an alternative to witnessing.',
        'Provide copies to your healthcare agent and physician.',
      ],
    },
  },
  AR: {
    name: 'Arkansas',
    abbreviation: 'AR',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) competent witnesses.',
        'Both witnesses must sign in the testator\'s presence.',
        'A self-proving affidavit may be executed before a notary.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust by re-titling.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public with two (2) witnesses.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: [
        'Sign the power of attorney before a notary public.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare proxy.',
        'At least one witness should not be a relative.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Provide copies to your healthcare agent and physician.',
      ],
    },
  },
  CA: {
    name: 'California',
    abbreviation: 'CA',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: false,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses who are present at the same time.',
        'Both witnesses must understand that the document is the testator\'s will.',
        'Both witnesses must sign the will during the testator\'s lifetime.',
        'California does NOT recognize self-proving affidavits for wills.',
        'Holographic wills are valid if material provisions are in the testator\'s handwriting.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust by changing title/ownership.',
        'Record any real property transfers with the county recorder.',
        'Fund the trust by re-titling bank accounts, investments, and other assets.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      statuteReference: 'California Probate Code Sections 1500-1502',
      executionInstructions: [
        'Sign the nomination pursuant to California Probate Code Section 1500.',
        'Have the document notarized.',
        'Two (2) witnesses must also sign.',
        'File the nomination with the court if circumstances require it.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the power of attorney before a notary public.',
        'Two (2) witnesses must also sign (cannot be the agent).',
        'Use the California statutory form for durable financial POA.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare agent.',
        'Witnesses cannot be the patient\'s healthcare provider.',
        'At least one witness must not be related by blood, marriage, or adoption.',
        'At least one witness must not be entitled to any part of the estate.',
        'If the patient is in a skilled nursing facility, a patient advocate or ombudsman must be one of the witnesses.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) qualified witnesses, OR before a notary public.',
        'Both witnesses must sign the directive.',
        'If in a skilled nursing facility, special witness requirements apply.',
        'Provide copies to your healthcare agent, physician, and family.',
      ],
    },
  },
  CO: {
    name: 'Colorado',
    abbreviation: 'CO',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'A notarized self-proving affidavit is strongly recommended.',
        'Holographic wills are valid if signed and material portions are in the testator\'s handwriting.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public.',
        'Two (2) witnesses are recommended.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: [
        'Sign before a notary public.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses should not be the appointed agent.',
        'Healthcare providers should not serve as witnesses.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses OR before a notary.',
        'Provide copies to your agent, physician, and hospital.',
      ],
    },
  },
  CT: {
    name: 'Connecticut',
    abbreviation: 'CT',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'Both witnesses must sign in the testator\'s presence.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public with two (2) witnesses.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign before a notary public with two (2) witnesses.',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare agent.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Provide copies to your agent and physician.',
      ],
    },
  },
  DE: {
    name: 'Delaware',
    abbreviation: 'DE',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) credible witnesses.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public.',
        'Two (2) witnesses are recommended.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign before a notary public with two (2) witnesses.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare agent.',
        'Witnesses should not be related or entitled to the estate.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Provide copies to your agent and physician.',
      ],
    },
  },
  FL: {
    name: 'Florida',
    abbreviation: 'FL',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) attesting witnesses.',
        'Both witnesses must sign in the presence of the testator and each other.',
        'A self-proving affidavit with notarization is strongly recommended (Florida Statutes §732.503).',
        'Florida does NOT recognize holographic wills.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Two (2) witnesses should sign.',
        'Transfer assets into the trust by re-titling.',
        'Record any real property transfers with the county clerk.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public.',
        'Two (2) witnesses must sign.',
        'Per Florida Statutes §744, file with the court if needed.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign before a notary public with two (2) witnesses.',
        'Florida requires the statutory form (Florida Statutes §709.2104).',
        'Provide a copy to the designated agent.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare surrogate.',
        'At least one witness cannot be the spouse or blood relative.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Provide copies to your surrogate and physician.',
      ],
    },
  },
  GA: {
    name: 'Georgia',
    abbreviation: 'GA',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 14,
      executionInstructions: [
        'Sign the will in the presence of two (2) competent witnesses.',
        'Georgia allows testators as young as 14.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: [
        'Sign the trust agreement before a notary public.',
        'Transfer assets into the trust.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign the nomination before a notary public with two (2) witnesses.',
      ],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: [
        'Sign before a notary public.',
        'Georgia Financial Power of Attorney Act applies.',
      ],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: [
        'Witnesses cannot be the healthcare agent.',
        'At least one witness should not be related.',
      ],
      executionInstructions: [
        'Sign in the presence of two (2) witnesses.',
        'Notarization is also recommended.',
      ],
    },
  },
  HI: {
    name: 'Hawaii',
    abbreviation: 'HI',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: true,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent.'],
      executionInstructions: ['Sign before a notary public and two (2) witnesses.'],
    },
  },
  ID: {
    name: 'Idaho',
    abbreviation: 'ID',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'A self-proving affidavit is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent or treating physician.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.'],
    },
  },
  IL: {
    name: 'Illinois',
    abbreviation: 'IL',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) credible witnesses.',
        'Both witnesses must sign in the testator\'s presence.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 1,
      executionInstructions: ['Sign before a notary public with one (1) witness.', 'Use Illinois statutory short form if applicable.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'At least one witness must not be related.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.', 'Provide copies to your agent and physician.'],
    },
  },
  IN: {
    name: 'Indiana',
    abbreviation: 'IN',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare representative.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.'],
    },
  },
  IA: {
    name: 'Iowa',
    abbreviation: 'IA',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) competent witnesses.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.'],
    },
  },
  KS: {
    name: 'Kansas',
    abbreviation: 'KS',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) competent witnesses.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'At least one witness should not be a healthcare provider.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.'],
    },
  },
  KY: {
    name: 'Kentucky',
    abbreviation: 'KY',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) credible witnesses.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public with two (2) witnesses.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 0,
      executionInstructions: ['Sign before a notary public.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare surrogate.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses OR before a notary.'],
    },
  },
  LA: {
    name: 'Louisiana',
    abbreviation: 'LA',
    will: {
      witnessCount: 2,
      notarizationRequired: true,
      selfProvingAffidavit: false,
      holographicAllowed: true,
      minimumAge: 16,
      executionInstructions: [
        'Louisiana requires a notarial will: signed before a notary and two (2) witnesses.',
        'The testator must declare the document is their will.',
        'The testator must sign on every page.',
        'Both witnesses and the notary must sign on the last page.',
        'Alternatively, an olographic (holographic) will entirely in the testator\'s handwriting is valid.',
        'Louisiana uses Civil Law; consult local requirements carefully.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: true,
      witnessCount: 2,
      executionInstructions: [
        'Sign before a notary public and two (2) witnesses.',
        'Louisiana follows Civil Law trust provisions.',
        'Transfer assets into the trust.',
      ],
    },
    guardianship: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign the nomination before a notary public and two (2) witnesses.', 'Louisiana calls guardians "tutors" under Civil Code.'],
    },
    poa: {
      notarizationRequired: true,
      witnessCount: 2,
      executionInstructions: ['Sign before a notary public and two (2) witnesses.', 'Louisiana requires "mandate" form under Civil Code.'],
    },
    healthcareDirective: {
      notarizationRequired: false,
      witnessCount: 2,
      witnessRestrictions: ['Witnesses cannot be the healthcare agent.'],
      executionInstructions: ['Sign in the presence of two (2) witnesses.'],
    },
  },
  ME: {
    name: 'Maine',
    abbreviation: 'ME',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'A self-proving affidavit with notarization is recommended.',
      ],
    },
    trust: {
      notarizationRequired: true,
      witnessesRequired: false,
      witnessCount: 0,
      executionInstructions: ['Sign the trust agreement before a notary public.', 'Transfer assets into the trust.'],
    },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  MD: {
    name: 'Maryland',
    abbreviation: 'MD',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) credible witnesses.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  MA: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) witnesses.',
        'Both witnesses must sign in the presence of the testator.',
        'A self-proving affidavit with notarization is available.',
      ],
    },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets by re-titling.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare proxy.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  MI: {
    name: 'Michigan',
    abbreviation: 'MI',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the patient advocate.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  MN: {
    name: 'Minnesota',
    abbreviation: 'MN',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign before a notary public and two (2) witnesses.'] },
  },
  MS: {
    name: 'Mississippi',
    abbreviation: 'MS',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) credible witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  MO: {
    name: 'Missouri',
    abbreviation: 'MO',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 0, witnessRestrictions: [], executionInstructions: ['Sign before a notary public.'] },
  },
  MT: {
    name: 'Montana',
    abbreviation: 'MT',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  NE: {
    name: 'Nebraska',
    abbreviation: 'NE',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  NV: {
    name: 'Nevada',
    abbreviation: 'NV',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit with notarization is recommended.', 'Nevada also permits notarized wills without witnesses.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'At least one witness cannot be a healthcare provider.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  NH: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) credible witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign before a notary public and two (2) witnesses.'] },
  },
  NJ: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare proxy.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  NM: {
    name: 'New Mexico',
    abbreviation: 'NM',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  NY: {
    name: 'New York',
    abbreviation: 'NY',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: false,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) attesting witnesses.',
        'The testator must declare to each witness that the instrument is their will.',
        'Each witness must sign within 30 days of each other.',
        'A self-proving affidavit (SCPA §1406) with notarization is strongly recommended.',
        'New York does NOT recognize holographic wills (except military personnel).',
      ],
    },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.', 'Record real property transfers with the county clerk.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.', 'New York requires the statutory short form (GOL §5-1501B).', 'The agent must sign the POA to accept.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare proxy.'], executionInstructions: ['Sign before a notary public and two (2) witnesses.', 'The health care proxy must also sign.'] },
  },
  NC: {
    name: 'North Carolina',
    abbreviation: 'NC',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Must be registered with the register of deeds if used for real property.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'At least one witness cannot be a relative or heir.'], executionInstructions: ['Sign before a notary public and two (2) witnesses.'] },
  },
  ND: {
    name: 'North Dakota',
    abbreviation: 'ND',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  OH: {
    name: 'Ohio',
    abbreviation: 'OH',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'Both witnesses must be competent (not beneficiaries).', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: true, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'Witnesses cannot be attending physician.'], executionInstructions: ['Sign before a notary public and two (2) witnesses.'] },
  },
  OK: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare proxy.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  OR: {
    name: 'Oregon',
    abbreviation: 'OR',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare representative.', 'Witnesses cannot be the attending physician.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  PA: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign the will (or have someone sign on your behalf in your presence).', 'Two (2) witnesses are recommended but not strictly required for validity.', 'A self-proving affidavit with notarization is strongly recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  RI: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  SC: {
    name: 'South Carolina',
    abbreviation: 'SC',
    will: { witnessCount: 3, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of THREE (3) credible witnesses.', 'South Carolina requires three witnesses (more than most states).', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  SD: {
    name: 'South Dakota',
    abbreviation: 'SD',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  TN: {
    name: 'Tennessee',
    abbreviation: 'TN',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  TX: {
    name: 'Texas',
    abbreviation: 'TX',
    will: {
      witnessCount: 2,
      notarizationRequired: false,
      selfProvingAffidavit: true,
      holographicAllowed: true,
      minimumAge: 18,
      executionInstructions: [
        'Sign the will in the presence of two (2) credible witnesses over the age of 14.',
        'Both witnesses must sign in the testator\'s presence.',
        'A self-proving affidavit (Texas Estates Code §251.104) with notarization is strongly recommended.',
        'Holographic wills are valid if entirely in the testator\'s handwriting.',
      ],
    },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.', 'Record real property transfers with the county clerk.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.', 'Texas allows designation of guardian in a written declaration (Texas Estates Code §1104).'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Texas has a statutory durable POA form (Texas Estates Code §752).'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'At least one witness cannot be a healthcare provider.', 'Witnesses cannot be entitled to any part of the estate.'], executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'Provide copies to your agent and physician.'] },
  },
  UT: {
    name: 'Utah',
    abbreviation: 'UT',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 1, witnessRestrictions: ['The witness cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of one (1) witness.'] },
  },
  VT: {
    name: 'Vermont',
    abbreviation: 'VT',
    will: { witnessCount: 3, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of THREE (3) credible witnesses.', 'Vermont requires three witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  VA: {
    name: 'Virginia',
    abbreviation: 'VA',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  WA: {
    name: 'Washington',
    abbreviation: 'WA',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.', 'Witnesses should not be the treating provider.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  WV: {
    name: 'West Virginia',
    abbreviation: 'WV',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) competent witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare representative.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  WI: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is available.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  WY: {
    name: 'Wyoming',
    abbreviation: 'WY',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: true, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) witnesses.', 'A self-proving affidavit is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
  DC: {
    name: 'District of Columbia',
    abbreviation: 'DC',
    will: { witnessCount: 2, notarizationRequired: false, selfProvingAffidavit: true, holographicAllowed: false, minimumAge: 18, executionInstructions: ['Sign in the presence of two (2) credible witnesses.', 'A self-proving affidavit with notarization is recommended.'] },
    trust: { notarizationRequired: true, witnessesRequired: false, witnessCount: 0, executionInstructions: ['Sign before a notary public.', 'Transfer assets into the trust.'] },
    guardianship: { notarizationRequired: true, witnessCount: 2, executionInstructions: ['Sign before a notary public with two (2) witnesses.'] },
    poa: { notarizationRequired: true, witnessCount: 0, executionInstructions: ['Sign before a notary public.'] },
    healthcareDirective: { notarizationRequired: false, witnessCount: 2, witnessRestrictions: ['Witnesses cannot be the healthcare agent.'], executionInstructions: ['Sign in the presence of two (2) witnesses.'] },
  },
};

/**
 * Resolves a state input (abbreviation or full name) to its two-letter abbreviation.
 * Returns undefined if the state cannot be found.
 */
export function resolveStateAbbreviation(stateInput: string): string | undefined {
  const normalized = stateInput.trim();

  // Try direct abbreviation match
  const upper = normalized.toUpperCase();
  if (stateRequirements[upper]) {
    return upper;
  }

  // Try full name match
  const lower = normalized.toLowerCase();
  for (const [abbr, req] of Object.entries(stateRequirements)) {
    if (req.name.toLowerCase() === lower) {
      return abbr;
    }
  }

  return undefined;
}

/**
 * Get state requirements by abbreviation or full name.
 */
export function getStateRequirements(stateInput: string): StateRequirements | undefined {
  const abbr = resolveStateAbbreviation(stateInput);
  return abbr ? stateRequirements[abbr] : undefined;
}

/**
 * Get a list of all states (for dropdown selectors).
 */
export function getAllStates(): Array<{ abbreviation: string; name: string }> {
  return Object.entries(stateRequirements)
    .map(([abbr, req]) => ({ abbreviation: abbr, name: req.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
