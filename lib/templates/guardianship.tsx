import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { legalStyles as styles, formatDate, getOrdinal } from './styles';

export interface Child {
  name: string;
  dateOfBirth: string;
  birthplace?: string;
}

export interface NominatedGuardian {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  relationship: string;
  phone?: string;
  email?: string;
}

export interface GuardianshipData {
  // Parent/Nominator info
  parentName: string;
  parentAddress: string;
  parentCity: string;
  parentState: string;
  parentZipCode: string;
  parentCounty: string;

  // Co-parent info (if applicable)
  hasCoParent: boolean;
  coParentName?: string;
  coParentAddress?: string;

  // Children
  children: Child[];

  // Nominated Guardians
  primaryGuardian: NominatedGuardian;
  alternateGuardian?: NominatedGuardian;
  secondAlternateGuardian?: NominatedGuardian;

  // Specific instructions
  specialInstructions?: string;
  religiousPreferences?: string;
  educationPreferences?: string;
  medicalInstructions?: string;

  // Document date
  date: string;
}

interface GuardianshipDocumentProps {
  data: GuardianshipData;
}

export const GuardianshipDocument: React.FC<GuardianshipDocumentProps> = ({ data }) => {
  const today = new Date(data.date);
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();

  // California-specific: Reference to California Probate Code
  const isCaliforniaResident = data.parentState === 'California' || data.parentState === 'CA';

  return (
    <Document>
      {/* Page 1: Declaration and Nomination */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nomination of Guardian</Text>
          <Text style={styles.headerSubtitle}>For Minor Child{data.children.length > 1 ? 'ren' : ''}</Text>
          {isCaliforniaResident && (
            <Text style={[styles.headerSubtitle, { marginTop: 5 }]}>
              (Pursuant to California Probate Code Section 1500)
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            I, <Text style={styles.bold}>{data.parentName}</Text>, residing at {data.parentAddress},{' '}
            {data.parentCity}, {data.parentCounty} County, {data.parentState} {data.parentZipCode},
            being the{' '}
            {data.hasCoParent ? 'parent' : 'sole surviving parent or parent with legal custody'}{' '}
            of the minor child{data.children.length > 1 ? 'ren' : ''} named below, do hereby make
            this Nomination of Guardian.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE I - MINOR CHILD{data.children.length > 1 ? 'REN' : ''}</Text>
          <Text style={styles.paragraph}>
            This nomination applies to the following minor child{data.children.length > 1 ? 'ren' : ''}:
          </Text>
          {data.children.map((child, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.listItem}>
                <Text style={styles.bold}>{child.name}</Text>
              </Text>
              <Text style={[styles.listItem, { marginLeft: 50 }]}>
                Date of Birth: {formatDate(child.dateOfBirth)}
              </Text>
              {child.birthplace && (
                <Text style={[styles.listItem, { marginLeft: 50 }]}>
                  Place of Birth: {child.birthplace}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE II - NOMINATION OF GUARDIAN</Text>
          <Text style={styles.paragraph}>
            In the event of my death or incapacity, or if I am otherwise unable to care for my minor
            child{data.children.length > 1 ? 'ren' : ''}, I hereby nominate the following person to
            serve as Guardian of the person and estate of my minor child{data.children.length > 1 ? 'ren' : ''}:
          </Text>

          <View style={{ marginTop: 15, marginBottom: 15, padding: 15, backgroundColor: '#f7fafc', borderRadius: 5 }}>
            <Text style={styles.bold}>PRIMARY GUARDIAN:</Text>
            <Text style={[styles.paragraph, { marginTop: 10, marginBottom: 0 }]}>
              <Text style={styles.bold}>{data.primaryGuardian.name}</Text>
            </Text>
            <Text style={styles.paragraph}>
              {data.primaryGuardian.address}, {data.primaryGuardian.city}, {data.primaryGuardian.state}{' '}
              {data.primaryGuardian.zipCode}
            </Text>
            <Text style={styles.paragraph}>
              Relationship: {data.primaryGuardian.relationship}
            </Text>
            {data.primaryGuardian.phone && (
              <Text style={styles.paragraph}>Phone: {data.primaryGuardian.phone}</Text>
            )}
          </View>

          {data.alternateGuardian && (
            <>
              <Text style={styles.paragraph}>
                If the above-named person is unable or unwilling to serve as Guardian, I nominate
                the following person as First Alternate Guardian:
              </Text>
              <View style={{ marginTop: 15, marginBottom: 15, padding: 15, backgroundColor: '#f7fafc', borderRadius: 5 }}>
                <Text style={styles.bold}>FIRST ALTERNATE GUARDIAN:</Text>
                <Text style={[styles.paragraph, { marginTop: 10, marginBottom: 0 }]}>
                  <Text style={styles.bold}>{data.alternateGuardian.name}</Text>
                </Text>
                <Text style={styles.paragraph}>
                  {data.alternateGuardian.address}, {data.alternateGuardian.city},{' '}
                  {data.alternateGuardian.state} {data.alternateGuardian.zipCode}
                </Text>
                <Text style={styles.paragraph}>
                  Relationship: {data.alternateGuardian.relationship}
                </Text>
              </View>
            </>
          )}

          {data.secondAlternateGuardian && (
            <>
              <Text style={styles.paragraph}>
                If neither of the above-named persons is able or willing to serve, I nominate:
              </Text>
              <View style={{ marginTop: 15, marginBottom: 15, padding: 15, backgroundColor: '#f7fafc', borderRadius: 5 }}>
                <Text style={styles.bold}>SECOND ALTERNATE GUARDIAN:</Text>
                <Text style={[styles.paragraph, { marginTop: 10, marginBottom: 0 }]}>
                  <Text style={styles.bold}>{data.secondAlternateGuardian.name}</Text>
                </Text>
                <Text style={styles.paragraph}>
                  {data.secondAlternateGuardian.address}, {data.secondAlternateGuardian.city},{' '}
                  {data.secondAlternateGuardian.state} {data.secondAlternateGuardian.zipCode}
                </Text>
                <Text style={styles.paragraph}>
                  Relationship: {data.secondAlternateGuardian.relationship}
                </Text>
              </View>
            </>
          )}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 2: Reasons and Instructions */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE III - REASONS FOR NOMINATION</Text>
          <Text style={styles.paragraph}>
            I have selected {data.primaryGuardian.name} as Guardian because I believe they will provide
            a loving, stable, and nurturing environment for my child{data.children.length > 1 ? 'ren' : ''}.
            I have confidence in their judgment, values, and ability to raise my child{data.children.length > 1 ? 'ren' : ''}{' '}
            in accordance with my wishes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE IV - POWERS OF GUARDIAN</Text>
          <Text style={styles.paragraph}>
            I authorize and empower the Guardian to:
          </Text>
          <Text style={styles.listItem}>
            a) Provide for the care, custody, and control of my minor child{data.children.length > 1 ? 'ren' : ''};
          </Text>
          <Text style={styles.listItem}>
            b) Make decisions regarding education, healthcare, and general welfare;
          </Text>
          <Text style={styles.listItem}>
            c) Consent to medical treatment and procedures;
          </Text>
          <Text style={styles.listItem}>
            d) Manage any property or assets belonging to my child{data.children.length > 1 ? 'ren' : ''};
          </Text>
          <Text style={styles.listItem}>
            e) Apply for any benefits to which my child{data.children.length > 1 ? 'ren' : ''} may be entitled;
          </Text>
          <Text style={styles.listItem}>
            f) Take all actions necessary to protect the best interests of my child{data.children.length > 1 ? 'ren' : ''}.
          </Text>
        </View>

        {(data.specialInstructions || data.religiousPreferences || data.educationPreferences || data.medicalInstructions) && (
          <View style={styles.section}>
            <Text style={styles.articleTitle}>ARTICLE V - SPECIAL INSTRUCTIONS</Text>

            {data.religiousPreferences && (
              <>
                <Text style={[styles.paragraph, styles.bold]}>Religious/Spiritual Preferences:</Text>
                <Text style={styles.indentedParagraph}>{data.religiousPreferences}</Text>
              </>
            )}

            {data.educationPreferences && (
              <>
                <Text style={[styles.paragraph, styles.bold]}>Education Preferences:</Text>
                <Text style={styles.indentedParagraph}>{data.educationPreferences}</Text>
              </>
            )}

            {data.medicalInstructions && (
              <>
                <Text style={[styles.paragraph, styles.bold]}>Medical Instructions:</Text>
                <Text style={styles.indentedParagraph}>{data.medicalInstructions}</Text>
              </>
            )}

            {data.specialInstructions && (
              <>
                <Text style={[styles.paragraph, styles.bold]}>Additional Instructions:</Text>
                <Text style={styles.indentedParagraph}>{data.specialInstructions}</Text>
              </>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {(data.specialInstructions || data.religiousPreferences || data.educationPreferences || data.medicalInstructions) ? 'VI' : 'V'} - BOND WAIVER
          </Text>
          <Text style={styles.paragraph}>
            I request that no bond be required of any Guardian nominated herein. I have complete
            confidence in the integrity and ability of my nominated Guardian(s) to faithfully
            perform their duties without the necessity of bond.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 3: Signatures and Notary */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>DECLARATION</Text>
          <Text style={styles.paragraph}>
            I declare under penalty of perjury under the laws of the State of {data.parentState} that
            the foregoing is true and correct, that I am the parent of the above-named minor
            child{data.children.length > 1 ? 'ren' : ''}, and that I am of sound mind and am executing
            this Nomination of Guardian voluntarily and without duress.
          </Text>

          {isCaliforniaResident && (
            <Text style={styles.paragraph}>
              This Nomination of Guardian is made pursuant to California Probate Code Sections 1500-1502
              and shall remain in effect until revoked or superseded by a subsequent nomination.
            </Text>
          )}
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.paragraph}>
            Executed this <Text style={styles.bold}>{getOrdinal(day)}</Text> day of{' '}
            <Text style={styles.bold}>{month}</Text>, <Text style={styles.bold}>{year}</Text>,
            at {data.parentCity}, {data.parentCounty} County, {data.parentState}.
          </Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{data.parentName}, Parent</Text>
          </View>

          {data.hasCoParent && data.coParentName && (
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>{data.coParentName}, Parent</Text>
            </View>
          )}
        </View>

        <View style={styles.witnessSection}>
          <Text style={styles.witnessTitle}>WITNESSES</Text>
          <Text style={styles.paragraph}>
            We, the undersigned witnesses, each declare under penalty of perjury that the person
            who signed this document is personally known to us to be the same person who signed
            above, and that they signed this document in our presence and appeared to be of sound mind.
          </Text>

          <View style={styles.witnessBlock}>
            <View style={styles.witnessColumn}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Witness 1 Signature</Text>
              <View style={{ marginTop: 15 }}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>Printed Name</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>Address</Text>
              </View>
            </View>

            <View style={styles.witnessColumn}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>Witness 2 Signature</Text>
              <View style={{ marginTop: 15 }}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>Printed Name</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureLabel}>Address</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.notarySection}>
          <Text style={styles.notaryTitle}>NOTARY ACKNOWLEDGMENT</Text>
          <Text style={styles.notaryText}>
            State of {data.parentState}
          </Text>
          <Text style={styles.notaryText}>
            County of {data.parentCounty}
          </Text>
          <Text style={styles.notaryText}>
            On __________________, before me, a Notary Public, personally appeared{' '}
            {data.parentName}{data.hasCoParent && data.coParentName ? ` and ${data.coParentName}` : ''},
            who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s)
            is/are subscribed to the within instrument and acknowledged to me that they executed the
            same in their authorized capacity(ies).
          </Text>

          <View style={{ marginTop: 15 }}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Notary Public</Text>
          </View>

          <Text style={[styles.notaryText, { marginTop: 10 }]}>
            My Commission Expires: _______________________
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            This document was prepared with LDASD Estate Planning services.
            {isCaliforniaResident && ' Compliant with California Probate Code.'}
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default GuardianshipDocument;
