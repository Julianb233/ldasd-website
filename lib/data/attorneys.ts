/**
 * State-specific attorney matching data for the Attorney Consultation add-on.
 * Maps each US state to available practice areas and consultation details.
 */

export interface AttorneyMatchInfo {
  state: string;
  stateCode: string;
  practiceAreas: string[];
  consultationType: 'video' | 'phone' | 'both';
  averageResponseTime: string;
  available: boolean;
}

export const stateAttorneyData: Record<string, AttorneyMatchInfo> = {
  AL: { state: 'Alabama', stateCode: 'AL', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  AK: { state: 'Alaska', stateCode: 'AK', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  AZ: { state: 'Arizona', stateCode: 'AZ', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  AR: { state: 'Arkansas', stateCode: 'AR', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  CA: { state: 'California', stateCode: 'CA', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  CO: { state: 'Colorado', stateCode: 'CO', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  CT: { state: 'Connecticut', stateCode: 'CT', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  DE: { state: 'Delaware', stateCode: 'DE', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  FL: { state: 'Florida', stateCode: 'FL', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  GA: { state: 'Georgia', stateCode: 'GA', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  HI: { state: 'Hawaii', stateCode: 'HI', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  ID: { state: 'Idaho', stateCode: 'ID', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  IL: { state: 'Illinois', stateCode: 'IL', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  IN: { state: 'Indiana', stateCode: 'IN', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  IA: { state: 'Iowa', stateCode: 'IA', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  KS: { state: 'Kansas', stateCode: 'KS', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  KY: { state: 'Kentucky', stateCode: 'KY', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  LA: { state: 'Louisiana', stateCode: 'LA', practiceAreas: ['Estate Planning', 'Probate', 'Succession Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  ME: { state: 'Maine', stateCode: 'ME', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  MD: { state: 'Maryland', stateCode: 'MD', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  MA: { state: 'Massachusetts', stateCode: 'MA', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  MI: { state: 'Michigan', stateCode: 'MI', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  MN: { state: 'Minnesota', stateCode: 'MN', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  MS: { state: 'Mississippi', stateCode: 'MS', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  MO: { state: 'Missouri', stateCode: 'MO', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  MT: { state: 'Montana', stateCode: 'MT', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  NE: { state: 'Nebraska', stateCode: 'NE', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  NV: { state: 'Nevada', stateCode: 'NV', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Asset Protection'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  NH: { state: 'New Hampshire', stateCode: 'NH', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  NJ: { state: 'New Jersey', stateCode: 'NJ', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  NM: { state: 'New Mexico', stateCode: 'NM', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  NY: { state: 'New York', stateCode: 'NY', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  NC: { state: 'North Carolina', stateCode: 'NC', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  ND: { state: 'North Dakota', stateCode: 'ND', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  OH: { state: 'Ohio', stateCode: 'OH', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  OK: { state: 'Oklahoma', stateCode: 'OK', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  OR: { state: 'Oregon', stateCode: 'OR', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  PA: { state: 'Pennsylvania', stateCode: 'PA', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  RI: { state: 'Rhode Island', stateCode: 'RI', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  SC: { state: 'South Carolina', stateCode: 'SC', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  SD: { state: 'South Dakota', stateCode: 'SD', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  TN: { state: 'Tennessee', stateCode: 'TN', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  TX: { state: 'Texas', stateCode: 'TX', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  UT: { state: 'Utah', stateCode: 'UT', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  VT: { state: 'Vermont', stateCode: 'VT', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  VA: { state: 'Virginia', stateCode: 'VA', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  WA: { state: 'Washington', stateCode: 'WA', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
  WV: { state: 'West Virginia', stateCode: 'WV', practiceAreas: ['Estate Planning', 'Probate'], consultationType: 'both', averageResponseTime: '2-3 business days', available: true },
  WI: { state: 'Wisconsin', stateCode: 'WI', practiceAreas: ['Estate Planning', 'Probate', 'Elder Law'], consultationType: 'both', averageResponseTime: '1-2 business days', available: true },
  WY: { state: 'Wyoming', stateCode: 'WY', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration'], consultationType: 'video', averageResponseTime: '2-3 business days', available: true },
  DC: { state: 'District of Columbia', stateCode: 'DC', practiceAreas: ['Estate Planning', 'Probate', 'Trust Administration', 'Elder Law', 'Tax Planning'], consultationType: 'both', averageResponseTime: '1 business day', available: true },
};

export function getAttorneyInfo(stateCode: string): AttorneyMatchInfo | null {
  return stateAttorneyData[stateCode] || null;
}

export function getAvailableStates(): string[] {
  return Object.keys(stateAttorneyData).filter(
    (code) => stateAttorneyData[code].available
  );
}
