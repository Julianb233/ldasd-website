/**
 * State-specific execution requirements for estate planning documents.
 * Covers witnessing, notarization, and execution checklist data for all 50 states + DC.
 *
 * Sources: UPC (Uniform Probate Code), state statutes, Restatement of Property.
 * NOTE: This is educational reference data — users should verify with a licensed attorney.
 *
 * Requirements: COMP-03, COMP-04
 * Linear: AI-1741
 */

export type DocumentType = 'will' | 'trust' | 'poa' | 'healthcare-directive';

export interface WitnessRequirement {
  count: number;
  /** Whether witnesses must be "disinterested" (not beneficiaries) */
  disinterested: boolean;
  /** Minimum age for witnesses */
  minimumAge: number;
  /** Additional witness-specific notes */
  notes?: string;
}

export interface NotarizationRequirement {
  required: boolean;
  /** Whether notarization is recommended even if not required */
  recommended: boolean;
  /** Self-proving affidavit available (avoids witnesses testifying in probate) */
  selfProvingAffidavit: boolean;
  notes?: string;
}

export interface ExecutionStep {
  order: number;
  title: string;
  description: string;
  required: boolean;
}

export interface StateExecutionRequirements {
  stateCode: string;
  stateName: string;
  /** Relevant statute citation */
  statuteCitation: string;

  will: {
    witnesses: WitnessRequirement;
    notarization: NotarizationRequirement;
    /** Whether holographic (handwritten) wills are valid */
    holographicWillValid: boolean;
    /** Minimum age to create a will */
    minimumTestatorAge: number;
    /** Additional state-specific notes */
    notes?: string;
    executionSteps: ExecutionStep[];
  };

  trust: {
    witnesses: WitnessRequirement;
    notarization: NotarizationRequirement;
    notes?: string;
    executionSteps: ExecutionStep[];
  };

  poa: {
    witnesses: WitnessRequirement;
    notarization: NotarizationRequirement;
    notes?: string;
    executionSteps: ExecutionStep[];
  };

  healthcareDirective: {
    witnesses: WitnessRequirement;
    notarization: NotarizationRequirement;
    notes?: string;
    executionSteps: ExecutionStep[];
  };
}

function makeWillSteps(
  witnessCount: number,
  notaryRequired: boolean,
  selfProving: boolean,
  extras?: ExecutionStep[]
): ExecutionStep[] {
  const steps: ExecutionStep[] = [
    {
      order: 1,
      title: 'Review your will carefully',
      description: 'Read through the entire document to ensure all information is accurate, including names, addresses, and asset descriptions.',
      required: true,
    },
    {
      order: 2,
      title: `Gather ${witnessCount} qualified witnesses`,
      description: `Find ${witnessCount} adult witnesses (18+) who are NOT named as beneficiaries in your will. Witnesses must be of sound mind and able to observe your signing.`,
      required: true,
    },
    {
      order: 3,
      title: 'Sign the will in the presence of all witnesses',
      description: `Sign every signature line while all ${witnessCount} witnesses are present. All parties must be in the same room at the same time.`,
      required: true,
    },
    {
      order: 4,
      title: 'Have each witness sign the attestation clause',
      description: `Each of the ${witnessCount} witnesses must sign the attestation clause, confirming they observed you sign and believe you to be of sound mind.`,
      required: true,
    },
  ];

  let nextOrder = 5;

  if (notaryRequired || selfProving) {
    steps.push({
      order: nextOrder++,
      title: notaryRequired
        ? 'Have the document notarized'
        : 'Complete the self-proving affidavit (recommended)',
      description: notaryRequired
        ? 'Take the signed will to a notary public. The notary will verify identities and notarize the document, which is required in your state.'
        : 'Sign the self-proving affidavit before a notary public. This allows the will to be admitted to probate without requiring witnesses to testify in court.',
      required: notaryRequired,
    });
  }

  if (extras) {
    for (const extra of extras) {
      steps.push({ ...extra, order: nextOrder++ });
    }
  }

  steps.push({
    order: nextOrder++,
    title: 'Store the original safely',
    description: 'Keep the original signed will in a fireproof safe, bank safe deposit box, or with your attorney. Inform your executor of its location.',
    required: true,
  });

  steps.push({
    order: nextOrder++,
    title: 'Provide copies to key parties',
    description: 'Give copies (not originals) to your executor, attorney, and any other trusted individuals. Mark copies clearly as "COPY."',
    required: false,
  });

  return steps;
}

function makeTrustSteps(notaryRequired: boolean): ExecutionStep[] {
  return [
    { order: 1, title: 'Review the trust document', description: 'Verify all terms, trustees, beneficiaries, and asset descriptions are correct.', required: true },
    { order: 2, title: 'Sign the trust agreement', description: 'Sign as the grantor/settlor on all signature pages.', required: true },
    { order: 3, title: 'Have the trust notarized', description: notaryRequired ? 'Notarization is required in your state for a valid trust.' : 'While not strictly required, notarization is strongly recommended to avoid challenges.', required: notaryRequired },
    { order: 4, title: 'Fund the trust', description: 'Transfer assets into the trust by re-titling property, bank accounts, and investments in the name of the trust.', required: true },
    { order: 5, title: 'Record real property transfers', description: 'If transferring real estate, record the deed transfer with your county recorder\'s office.', required: true },
    { order: 6, title: 'Store securely and distribute copies', description: 'Keep the original in a safe location. Provide copies to your successor trustee.', required: true },
  ];
}

function makePoaSteps(witnessCount: number, notaryRequired: boolean): ExecutionStep[] {
  const steps: ExecutionStep[] = [
    { order: 1, title: 'Review the POA document', description: 'Verify the scope of authority granted, effective date, and agent designation.', required: true },
    { order: 2, title: 'Sign the power of attorney', description: 'Sign the document as the principal (person granting authority).', required: true },
  ];

  if (witnessCount > 0) {
    steps.push({
      order: 3,
      title: `Have ${witnessCount} witness${witnessCount > 1 ? 'es' : ''} sign`,
      description: `${witnessCount} adult witness${witnessCount > 1 ? 'es' : ''} must observe your signing and sign the document.`,
      required: true,
    });
  }

  steps.push({
    order: witnessCount > 0 ? 4 : 3,
    title: 'Have the document notarized',
    description: notaryRequired
      ? 'Notarization is required for your POA to be valid.'
      : 'Notarization is strongly recommended, as many institutions will not accept an un-notarized POA.',
    required: notaryRequired,
  });

  steps.push({
    order: witnessCount > 0 ? 5 : 4,
    title: 'Provide copies to your agent and institutions',
    description: 'Give certified copies to your designated agent, banks, and financial institutions.',
    required: true,
  });

  return steps;
}

function makeHdSteps(witnessCount: number, notaryRequired: boolean): ExecutionStep[] {
  const steps: ExecutionStep[] = [
    { order: 1, title: 'Review your healthcare directive', description: 'Verify your healthcare agent designation, treatment preferences, and end-of-life wishes.', required: true },
    { order: 2, title: 'Sign the directive', description: 'Sign the document as the principal.', required: true },
  ];

  let next = 3;

  if (witnessCount > 0) {
    steps.push({
      order: next++,
      title: `Have ${witnessCount} witness${witnessCount > 1 ? 'es' : ''} sign`,
      description: `${witnessCount} qualified witness${witnessCount > 1 ? 'es' : ''} must observe your signing and sign the document. Witnesses generally cannot be your healthcare agent, treating physician, or facility operator.`,
      required: true,
    });
  }

  if (notaryRequired) {
    steps.push({ order: next++, title: 'Have the directive notarized', description: 'Notarization is required in your state for a valid healthcare directive.', required: true });
  }

  steps.push({ order: next++, title: 'Distribute copies', description: 'Give copies to your healthcare agent, primary care physician, hospital, and family members.', required: true });

  return steps;
}

/**
 * Comprehensive state execution requirements for all 50 states + DC.
 */
export const stateExecutionRequirements: Record<string, StateExecutionRequirements> = {
  AL: {
    stateCode: 'AL', stateName: 'Alabama', statuteCitation: 'Ala. Code § 43-8-131',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 1, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(1, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'Witnesses cannot be the healthcare agent or attending physician.' },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  AK: {
    stateCode: 'AK', stateName: 'Alaska', statuteCitation: 'Alaska Stat. § 13.12.502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      notes: 'Witnesses cannot be related by blood or marriage.',
      executionSteps: makeHdSteps(2, false),
    },
  },
  AZ: {
    stateCode: 'AZ', stateName: 'Arizona', statuteCitation: 'A.R.S. § 14-2502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 1, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(1, true),
    },
    healthcareDirective: {
      witnesses: { count: 1, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(1, false),
    },
  },
  AR: {
    stateCode: 'AR', stateName: 'Arkansas', statuteCitation: 'Ark. Code § 28-25-103',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  CA: {
    stateCode: 'CA', stateName: 'California', statuteCitation: 'Cal. Prob. Code § 6110',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false, notes: 'California does not recognize self-proving affidavits by statute, but notarization is still recommended.' },
      holographicWillValid: true, minimumTestatorAge: 18,
      notes: 'California is a community property state. Surviving spouse has rights to community property regardless of will terms.',
      executionSteps: makeWillSteps(2, false, false),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      notes: 'Trust transfers of real property require notarized deeds recorded with the county.',
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'At least one witness must not be related by blood, marriage, or adoption. Witnesses cannot be the healthcare agent, treating provider, or operator of a community care facility.' },
      notarization: { required: false, recommended: false, selfProvingAffidavit: false, notes: 'A notary may substitute for one of the two witnesses.' },
      executionSteps: makeHdSteps(2, false),
    },
  },
  CO: {
    stateCode: 'CO', stateName: 'Colorado', statuteCitation: 'C.R.S. § 15-11-502',
    will: {
      witnesses: { count: 2, disinterested: false, minimumAge: 18, notes: 'Interested witnesses are allowed, but it may raise challenges.' },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  CT: {
    stateCode: 'CT', stateName: 'Connecticut', statuteCitation: 'Conn. Gen. Stat. § 45a-251',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  DE: {
    stateCode: 'DE', stateName: 'Delaware', statuteCitation: '12 Del. C. § 202',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  FL: {
    stateCode: 'FL', stateName: 'Florida', statuteCitation: 'Fla. Stat. § 732.502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'Florida is a homestead state with specific surviving spouse protections for the primary residence.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'Witnesses cannot be the healthcare surrogate or treating physician.' },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  GA: {
    stateCode: 'GA', stateName: 'Georgia', statuteCitation: 'O.C.G.A. § 53-4-20',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 14 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 14,
      notes: 'Georgia allows testators as young as 14 to create a valid will.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  HI: {
    stateCode: 'HI', stateName: 'Hawaii', statuteCitation: 'HRS § 560:2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  ID: {
    stateCode: 'ID', stateName: 'Idaho', statuteCitation: 'Idaho Code § 15-2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  IL: {
    stateCode: 'IL', stateName: 'Illinois', statuteCitation: '755 ILCS 5/4-3',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 1, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(1, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  IN: {
    stateCode: 'IN', stateName: 'Indiana', statuteCitation: 'Ind. Code § 29-1-5-3',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  IA: {
    stateCode: 'IA', stateName: 'Iowa', statuteCitation: 'Iowa Code § 633.279',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  KS: {
    stateCode: 'KS', stateName: 'Kansas', statuteCitation: 'K.S.A. § 59-606',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  KY: {
    stateCode: 'KY', stateName: 'Kentucky', statuteCitation: 'KRS § 394.040',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  LA: {
    stateCode: 'LA', stateName: 'Louisiana', statuteCitation: 'La. C.C. art. 1577',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      holographicWillValid: true, minimumTestatorAge: 16,
      notes: 'Louisiana follows Napoleonic (civil) law, not common law. Notarial wills require a notary AND 2 witnesses. Forced heirship rules may apply for children under 24 or permanently incapacitated.',
      executionSteps: makeWillSteps(2, true, false),
    },
    trust: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      notes: 'Louisiana trusts must be created by authentic act (notarized) or by act under private signature.',
      executionSteps: makeTrustSteps(true),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  ME: {
    stateCode: 'ME', stateName: 'Maine', statuteCitation: '18-C M.R.S. § 2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MD: {
    stateCode: 'MD', stateName: 'Maryland', statuteCitation: 'Md. Code, Est. & Trusts § 4-102',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MA: {
    stateCode: 'MA', stateName: 'Massachusetts', statuteCitation: 'M.G.L. c. 190B, § 2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MI: {
    stateCode: 'MI', stateName: 'Michigan', statuteCitation: 'MCL § 700.2502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MN: {
    stateCode: 'MN', stateName: 'Minnesota', statuteCitation: 'Minn. Stat. § 524.2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      notes: 'A notary may substitute for one of the two witnesses.',
      executionSteps: makeHdSteps(2, false),
    },
  },
  MS: {
    stateCode: 'MS', stateName: 'Mississippi', statuteCitation: 'Miss. Code § 91-5-1',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MO: {
    stateCode: 'MO', stateName: 'Missouri', statuteCitation: 'Mo. Rev. Stat. § 474.320',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  MT: {
    stateCode: 'MT', stateName: 'Montana', statuteCitation: 'MCA § 72-2-522',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NE: {
    stateCode: 'NE', stateName: 'Nebraska', statuteCitation: 'Neb. Rev. Stat. § 30-2327',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NV: {
    stateCode: 'NV', stateName: 'Nevada', statuteCitation: 'NRS § 133.040',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      notes: 'Nevada is a community property state.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      notes: 'Nevada has favorable asset protection trust laws (self-settled spendthrift trusts).',
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NH: {
    stateCode: 'NH', stateName: 'New Hampshire', statuteCitation: 'RSA § 551:2',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NJ: {
    stateCode: 'NJ', stateName: 'New Jersey', statuteCitation: 'N.J.S.A. § 3B:3-2',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NM: {
    stateCode: 'NM', stateName: 'New Mexico', statuteCitation: 'N.M. Stat. § 45-2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'New Mexico is a community property state.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NY: {
    stateCode: 'NY', stateName: 'New York', statuteCitation: 'N.Y. EPTL § 3-2.1',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'New York requires the testator to "publish" the will by declaring to witnesses that the document is their will. Witnesses must sign within 30 days of each other.',
      executionSteps: makeWillSteps(2, false, true, [
        { order: 0, title: 'Declare ("publish") the will to your witnesses', description: 'New York law requires you to tell your witnesses that the document is your will before they sign. This "publication" step is a strict requirement.', required: true },
      ]),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      notes: 'New York requires a specific statutory short form for POA.',
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  NC: {
    stateCode: 'NC', stateName: 'North Carolina', statuteCitation: 'N.C.G.S. § 31-3.3',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'Witnesses cannot be related by blood or marriage, or be the healthcare agent.' },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, true),
    },
  },
  ND: {
    stateCode: 'ND', stateName: 'North Dakota', statuteCitation: 'N.D.C.C. § 30.1-08-02',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  OH: {
    stateCode: 'OH', stateName: 'Ohio', statuteCitation: 'ORC § 2107.03',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'Witnesses cannot be the attending physician, administrator of the nursing home, or the agent.' },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, true),
    },
  },
  OK: {
    stateCode: 'OK', stateName: 'Oklahoma', statuteCitation: '84 Okl. St. § 55',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  OR: {
    stateCode: 'OR', stateName: 'Oregon', statuteCitation: 'ORS § 112.235',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  PA: {
    stateCode: 'PA', stateName: 'Pennsylvania', statuteCitation: '20 Pa. C.S. § 2502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'Pennsylvania does not strictly require witnesses by statute, but two witnesses are strongly recommended and needed for a self-proving affidavit.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  RI: {
    stateCode: 'RI', stateName: 'Rhode Island', statuteCitation: 'R.I. Gen. Laws § 33-5-5',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  SC: {
    stateCode: 'SC', stateName: 'South Carolina', statuteCitation: 'S.C. Code § 62-2-502',
    will: {
      witnesses: { count: 3, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'South Carolina requires 3 witnesses for a will — more than most states.',
      executionSteps: makeWillSteps(3, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, true),
    },
  },
  SD: {
    stateCode: 'SD', stateName: 'South Dakota', statuteCitation: 'SDCL § 29A-2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      notes: 'South Dakota has favorable trust laws with no state income tax on trusts and strong asset protection.',
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  TN: {
    stateCode: 'TN', stateName: 'Tennessee', statuteCitation: 'Tenn. Code § 32-1-104',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'Witnesses cannot be the agent or the treating physician.' },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  TX: {
    stateCode: 'TX', stateName: 'Texas', statuteCitation: 'Tex. Est. Code § 251.051',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 14 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      notes: 'Texas is a community property state. Witnesses must be at least 14 (credible witnesses).',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18, notes: 'One witness cannot be the patient\'s healthcare or residential care provider or an employee of that provider.' },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  UT: {
    stateCode: 'UT', stateName: 'Utah', statuteCitation: 'Utah Code § 75-2-502',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 1, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(1, false),
    },
  },
  VT: {
    stateCode: 'VT', stateName: 'Vermont', statuteCitation: '14 V.S.A. § 5',
    will: {
      witnesses: { count: 3, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'Vermont requires 3 witnesses — one of the few states with this requirement alongside South Carolina.',
      executionSteps: makeWillSteps(3, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  VA: {
    stateCode: 'VA', stateName: 'Virginia', statuteCitation: 'Va. Code § 64.2-403',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  WA: {
    stateCode: 'WA', stateName: 'Washington', statuteCitation: 'RCW § 11.12.020',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'Washington is a community property state.',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  WV: {
    stateCode: 'WV', stateName: 'West Virginia', statuteCitation: 'W. Va. Code § 41-1-3',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  WI: {
    stateCode: 'WI', stateName: 'Wisconsin', statuteCitation: 'Wis. Stat. § 853.03',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      notes: 'Wisconsin is a community property state (marital property state).',
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  WY: {
    stateCode: 'WY', stateName: 'Wyoming', statuteCitation: 'Wyo. Stat. § 2-6-112',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: true, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(0, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
  DC: {
    stateCode: 'DC', stateName: 'District of Columbia', statuteCitation: 'D.C. Code § 18-103',
    will: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: true },
      holographicWillValid: false, minimumTestatorAge: 18,
      executionSteps: makeWillSteps(2, false, true),
    },
    trust: {
      witnesses: { count: 0, disinterested: false, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeTrustSteps(false),
    },
    poa: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: true, recommended: true, selfProvingAffidavit: false },
      executionSteps: makePoaSteps(2, true),
    },
    healthcareDirective: {
      witnesses: { count: 2, disinterested: true, minimumAge: 18 },
      notarization: { required: false, recommended: true, selfProvingAffidavit: false },
      executionSteps: makeHdSteps(2, false),
    },
  },
};

export function getStateRequirements(stateCode: string): StateExecutionRequirements | null {
  return stateExecutionRequirements[stateCode] || null;
}

export function getDocumentRequirements(stateCode: string, docType: DocumentType) {
  const state = stateExecutionRequirements[stateCode];
  if (!state) return null;

  switch (docType) {
    case 'will': return state.will;
    case 'trust': return state.trust;
    case 'poa': return state.poa;
    case 'healthcare-directive': return state.healthcareDirective;
    default: return null;
  }
}

export function getAllStateCodes(): string[] {
  return Object.keys(stateExecutionRequirements);
}

export function getStatesRequiringNotarization(docType: DocumentType): string[] {
  return Object.entries(stateExecutionRequirements)
    .filter(([, state]) => {
      const doc = docType === 'healthcare-directive' ? state.healthcareDirective : state[docType];
      return doc.notarization.required;
    })
    .map(([code]) => code);
}
