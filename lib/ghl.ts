/**
 * Go High Level (GHL) CRM Integration Client
 *
 * Handles contact creation, tagging, and opportunity management
 * via the GHL API v2. Used for:
 * - CRM-01: Contact form submissions
 * - CRM-02: Purchase confirmation notifications
 * - CRM-03: Lead tagging by product
 * - CRM-04: Abandoned cart recovery
 *
 * @see https://highlevel.stoplight.io/docs/integrations
 */

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

interface GHLConfig {
  apiKey: string;
  locationId: string;
}

function getConfig(): GHLConfig {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    throw new Error(
      'GHL_API_KEY and GHL_LOCATION_ID environment variables are required'
    );
  }

  return { apiKey, locationId };
}

function getHeaders(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GHLContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Array<{ id: string; value: string }>;
}

export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags?: string[];
  locationId: string;
}

export interface GHLCreateContactResponse {
  contact: GHLContact;
}

export interface GHLOpportunityInput {
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  name: string;
  monetaryValue?: number;
  status?: 'open' | 'won' | 'lost' | 'abandoned';
  source?: string;
}

// ─── Contact Operations ──────────────────────────────────────────────────────

/**
 * Create or update a contact in GHL.
 * Uses upsert behavior — if a contact with the same email exists, it updates.
 */
export async function upsertContact(
  input: GHLContactInput
): Promise<GHLContact | null> {
  const { apiKey, locationId } = getConfig();

  const payload = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone || undefined,
    tags: input.tags || [],
    source: input.source || 'website',
    locationId,
    customFields: input.customFields || [],
  };

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: getHeaders(apiKey),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[GHL] Contact upsert failed:', response.status, errorBody);
      return null;
    }

    const data: GHLCreateContactResponse = await response.json();
    console.log('[GHL] Contact upserted:', data.contact.id);
    return data.contact;
  } catch (error) {
    console.error('[GHL] Contact upsert error:', error);
    return null;
  }
}

/**
 * Add tags to an existing contact.
 */
export async function addContactTags(
  contactId: string,
  tags: string[]
): Promise<boolean> {
  const { apiKey } = getConfig();

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: getHeaders(apiKey),
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[GHL] Add tags failed:', response.status, errorBody);
      return false;
    }

    console.log('[GHL] Tags added to contact:', contactId, tags);
    return true;
  } catch (error) {
    console.error('[GHL] Add tags error:', error);
    return false;
  }
}

// ─── Opportunity Operations ──────────────────────────────────────────────────

/**
 * Create an opportunity (deal) in GHL pipeline.
 * Used for tracking purchase flow and abandoned carts.
 */
export async function createOpportunity(
  input: GHLOpportunityInput
): Promise<string | null> {
  const { apiKey } = getConfig();

  try {
    const response = await fetch(`${GHL_API_BASE}/opportunities/`, {
      method: 'POST',
      headers: getHeaders(apiKey),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        '[GHL] Create opportunity failed:',
        response.status,
        errorBody
      );
      return null;
    }

    const data = await response.json();
    console.log('[GHL] Opportunity created:', data.opportunity?.id);
    return data.opportunity?.id || null;
  } catch (error) {
    console.error('[GHL] Create opportunity error:', error);
    return null;
  }
}

/**
 * Update opportunity status (e.g., mark as won on purchase, abandoned on cart drop).
 */
export async function updateOpportunityStatus(
  opportunityId: string,
  status: 'open' | 'won' | 'lost' | 'abandoned'
): Promise<boolean> {
  const { apiKey } = getConfig();

  try {
    const response = await fetch(
      `${GHL_API_BASE}/opportunities/${opportunityId}/status`,
      {
        method: 'PUT',
        headers: getHeaders(apiKey),
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        '[GHL] Update opportunity status failed:',
        response.status,
        errorBody
      );
      return false;
    }

    console.log('[GHL] Opportunity status updated:', opportunityId, status);
    return true;
  } catch (error) {
    console.error('[GHL] Update opportunity status error:', error);
    return false;
  }
}

// ─── High-Level Helpers ──────────────────────────────────────────────────────

/** Product-to-tag mapping for CRM-03 */
const PRODUCT_TAGS: Record<string, string[]> = {
  will: ['product:will', 'interest:estate-planning'],
  trust: ['product:trust', 'interest:estate-planning', 'interest:probate-avoidance'],
  'estate-plan': ['product:estate-plan', 'interest:estate-planning', 'interest:comprehensive'],
};

/**
 * CRM-01: Send a contact form submission to GHL.
 * Creates/updates contact with subject-based tags.
 */
export async function sendContactFormToGHL(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<GHLContact | null> {
  const subjectTags: Record<string, string[]> = {
    trust: ['inquiry:trust', 'interest:probate-avoidance'],
    will: ['inquiry:will', 'interest:estate-planning'],
    'estate-plan': ['inquiry:estate-plan', 'interest:comprehensive'],
    pricing: ['inquiry:pricing'],
    support: ['inquiry:support'],
    general: ['inquiry:general'],
  };

  const tags = [
    'source:contact-form',
    'lead',
    ...(subjectTags[data.subject] || ['inquiry:general']),
  ];

  return upsertContact({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    tags,
    source: 'contact-form',
  });
}

/**
 * CRM-02 + CRM-03: Send a booking/purchase lead to GHL with product tags.
 * Creates contact tagged by product type and creates a sales opportunity.
 */
export async function sendBookingToGHL(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  product: string;
  addSpouse: boolean;
  estimatedPrice: number;
}): Promise<{ contact: GHLContact | null; opportunityId: string | null }> {
  const productTags = PRODUCT_TAGS[data.product] || [];
  const tags = [
    'source:booking-form',
    'lead',
    ...productTags,
    ...(data.addSpouse ? ['couples-plan'] : ['individual-plan']),
    `state:${data.state.toLowerCase()}`,
  ];

  const contact = await upsertContact({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    tags,
    source: 'booking-form',
  });

  let opportunityId: string | null = null;

  // Create opportunity in pipeline if configured
  if (contact && process.env.GHL_PIPELINE_ID && process.env.GHL_STAGE_NEW_LEAD_ID) {
    opportunityId = await createOpportunity({
      pipelineId: process.env.GHL_PIPELINE_ID,
      pipelineStageId: process.env.GHL_STAGE_NEW_LEAD_ID,
      contactId: contact.id,
      name: `${data.firstName} ${data.lastName} - ${data.product}${data.addSpouse ? ' (Couples)' : ''}`,
      monetaryValue: data.estimatedPrice * 100, // GHL uses cents
      status: 'open',
      source: 'booking-form',
    });
  }

  return { contact, opportunityId };
}

/**
 * CRM-04: Track abandoned cart — create contact + tag as abandoned.
 * Called when a user starts but doesn't complete checkout.
 */
export async function sendAbandonedCartToGHL(data: {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  product?: string;
  estimatedPrice?: number;
}): Promise<GHLContact | null> {
  const tags = [
    'source:abandoned-cart',
    'abandoned-cart',
    'lead',
    ...(data.product ? (PRODUCT_TAGS[data.product] || []) : []),
  ];

  const contact = await upsertContact({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email,
    phone: data.phone,
    tags,
    source: 'abandoned-cart',
  });

  // Create opportunity marked as abandoned if pipeline configured
  if (
    contact &&
    process.env.GHL_PIPELINE_ID &&
    process.env.GHL_STAGE_ABANDONED_ID
  ) {
    await createOpportunity({
      pipelineId: process.env.GHL_PIPELINE_ID,
      pipelineStageId: process.env.GHL_STAGE_ABANDONED_ID,
      contactId: contact.id,
      name: `Abandoned: ${data.email} - ${data.product || 'unknown'}`,
      monetaryValue: (data.estimatedPrice || 0) * 100,
      status: 'open',
      source: 'abandoned-cart',
    });
  }

  return contact;
}

/**
 * CRM-02: Send purchase confirmation to GHL.
 * Updates existing contact with purchase tags and marks opportunity as won.
 */
export async function sendPurchaseConfirmationToGHL(data: {
  email: string;
  firstName: string;
  lastName: string;
  product: string;
  amount: number;
  orderId: string;
  isCouple: boolean;
}): Promise<void> {
  const productTags = PRODUCT_TAGS[data.product] || [];
  const tags = [
    'customer',
    'purchased',
    `purchased:${data.product}`,
    ...productTags,
    ...(data.isCouple ? ['couples-plan'] : ['individual-plan']),
  ];

  await upsertContact({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    tags,
    source: 'purchase',
  });
}

/**
 * Check if GHL integration is configured (env vars present).
 * Returns false if not configured — callers should gracefully skip GHL calls.
 */
export function isGHLConfigured(): boolean {
  return !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}
