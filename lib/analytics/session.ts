/**
 * Session management for analytics tracking.
 * Generates and persists anonymous session IDs for funnel and event correlation.
 */

const SESSION_KEY = 'ldasd_analytics_session';
const SESSION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

interface SessionData {
  id: string;
  createdAt: number;
  lastActiveAt: number;
}

function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

function isExpired(session: SessionData): boolean {
  return Date.now() - session.lastActiveAt > SESSION_EXPIRY_MS;
}

/**
 * Get or create an analytics session ID.
 * Sessions persist in sessionStorage and expire after 30 minutes of inactivity.
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const session: SessionData = JSON.parse(stored);
      if (!isExpired(session)) {
        // Refresh the last active timestamp
        session.lastActiveAt = Date.now();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session.id;
      }
    }
  } catch {
    // sessionStorage unavailable or corrupted - create fresh session
  }

  const session: SessionData = {
    id: generateSessionId(),
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  };

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Silently fail if storage is unavailable
  }

  return session.id;
}

/**
 * Reset the current session (e.g., on logout).
 */
export function resetSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Silently fail
  }
}
