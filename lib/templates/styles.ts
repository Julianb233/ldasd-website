import { StyleSheet } from '@react-pdf/renderer';

// Professional legal document color palette
export const colors = {
  primary: '#1a365d',      // Deep navy blue
  secondary: '#2d3748',    // Dark gray
  accent: '#c9a227',       // Gold accent
  text: '#1a202c',         // Near black
  lightText: '#4a5568',    // Medium gray
  border: '#cbd5e0',       // Light gray border
  background: '#ffffff',
  headerBg: '#f7fafc',
};

// Common styles for all legal documents
export const legalStyles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 72,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.lightText,
    textAlign: 'center',
  },
  documentTitle: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: colors.text,
    marginBottom: 8,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    color: colors.text,
    textAlign: 'justify',
    marginBottom: 10,
  },
  indentedParagraph: {
    fontSize: 12,
    lineHeight: 1.6,
    color: colors.text,
    textAlign: 'justify',
    marginBottom: 10,
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    lineHeight: 1.6,
    color: colors.text,
    marginBottom: 6,
    marginLeft: 30,
  },
  signatureSection: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 30,
  },
  signatureBlock: {
    marginTop: 30,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    width: 250,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 10,
    color: colors.lightText,
  },
  dateBlock: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    marginRight: 10,
  },
  dateLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    width: 150,
  },
  witnessSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  witnessTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  witnessBlock: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  witnessColumn: {
    width: '45%',
  },
  notarySection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: colors.headerBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notaryTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  notaryText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: colors.text,
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 72,
    right: 72,
    textAlign: 'center',
    fontSize: 9,
    color: colors.lightText,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 72,
    fontSize: 10,
    color: colors.lightText,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  italic: {
    fontFamily: 'Times-Italic',
  },
  underline: {
    textDecoration: 'underline',
  },
  centerText: {
    textAlign: 'center',
  },
  blankLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    marginHorizontal: 5,
    minWidth: 100,
  },
  inlineBlank: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    paddingHorizontal: 40,
  },
});

// Helper function to format dates
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to get ordinal suffix
export const getOrdinal = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
