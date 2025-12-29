import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { legalStyles as styles, formatDate, getOrdinal } from './styles';

export interface TrustBeneficiary {
  name: string;
  relationship: string;
  percentage: number;
  isPrimary: boolean;
}

export interface Trustee {
  name: string;
  address: string;
  relationship: string;
}

export interface TrustAsset {
  type: 'real_estate' | 'bank_account' | 'investment' | 'vehicle' | 'personal_property' | 'other';
  description: string;
  value?: string;
}

export interface TrustData {
  // Grantor/Settlor info
  grantorName: string;
  grantorAddress: string;
  grantorCity: string;
  grantorState: string;
  grantorZipCode: string;
  grantorCounty: string;

  // Trust info
  trustName: string;
  trustType: 'revocable' | 'irrevocable';

  // Spouse info (for joint trusts)
  isJointTrust: boolean;
  spouseName?: string;
  spouseAddress?: string;

  // Trustees
  initialTrustee: Trustee;
  successorTrustee: Trustee;
  secondSuccessorTrustee?: Trustee;

  // Beneficiaries
  primaryBeneficiaries: TrustBeneficiary[];
  contingentBeneficiaries: TrustBeneficiary[];

  // Assets
  assets: TrustAsset[];

  // Special provisions
  specialProvisions?: string[];

  // Minor children provisions
  hasMinorChildren: boolean;
  minorChildrenAge?: number; // Age at which they receive full distribution

  // Document date
  date: string;
}

interface TrustDocumentProps {
  data: TrustData;
}

export const TrustDocument: React.FC<TrustDocumentProps> = ({ data }) => {
  const today = new Date(data.date);
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();
  const grantorTitle = data.isJointTrust ? 'Grantors' : 'Grantor';
  const grantorNames = data.isJointTrust && data.spouseName
    ? `${data.grantorName} and ${data.spouseName}`
    : data.grantorName;

  return (
    <Document>
      {/* Page 1: Cover and Introduction */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{data.trustName}</Text>
          <Text style={styles.headerSubtitle}>
            {data.trustType === 'revocable' ? 'Revocable' : 'Irrevocable'} Living Trust Agreement
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            This {data.trustType === 'revocable' ? 'REVOCABLE' : 'IRREVOCABLE'} LIVING TRUST AGREEMENT
            (hereinafter the "Trust") is made and entered into this{' '}
            <Text style={styles.bold}>{getOrdinal(day)}</Text> day of{' '}
            <Text style={styles.bold}>{month}</Text>, <Text style={styles.bold}>{year}</Text>, by and
            between:
          </Text>

          <Text style={styles.indentedParagraph}>
            <Text style={styles.bold}>{grantorNames}</Text>, of {data.grantorCity}, {data.grantorState},
            hereinafter referred to as the "{grantorTitle}",
          </Text>

          <Text style={styles.paragraph}>AND</Text>

          <Text style={styles.indentedParagraph}>
            <Text style={styles.bold}>{data.initialTrustee.name}</Text>, of {data.initialTrustee.address},
            hereinafter referred to as the "Trustee".
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE I - CREATION OF TRUST</Text>
          <Text style={styles.paragraph}>
            The {grantorTitle} hereby transfers and delivers to the Trustee the property described in
            Schedule A attached hereto, to be held, administered, and distributed in accordance with
            the terms of this Trust Agreement. This trust shall be known as the{' '}
            <Text style={styles.bold}>{data.trustName}</Text>.
          </Text>

          {data.trustType === 'revocable' ? (
            <Text style={styles.paragraph}>
              This Trust is revocable during the lifetime of the {grantorTitle}. The {grantorTitle}{' '}
              reserves the right to revoke, amend, or modify this Trust at any time during their lifetime
              by written instrument delivered to the Trustee. Upon the death of the{' '}
              {data.isJointTrust ? 'surviving ' : ''}{grantorTitle}, this Trust shall become irrevocable.
            </Text>
          ) : (
            <Text style={styles.paragraph}>
              This Trust is irrevocable. The {grantorTitle} expressly relinquishes any right to revoke,
              amend, alter, or modify this Trust in any manner whatsoever, except as specifically provided herein.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE II - TRUST PROPERTY</Text>
          <Text style={styles.paragraph}>
            The initial trust property consists of the assets listed in Schedule A. Additional property
            may be added to this Trust at any time by the {grantorTitle} or any other person, subject to
            acceptance by the Trustee. All such property, together with any accumulations and undistributed
            income, shall constitute the "Trust Estate."
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 2: Distributions and Beneficiaries */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE III - DISTRIBUTIONS DURING LIFETIME</Text>
          <Text style={styles.paragraph}>
            During the lifetime of the {grantorTitle}, the Trustee shall distribute to or for the benefit
            of the {grantorTitle} such amounts of income and principal as the {grantorTitle} may request
            from time to time, or as the Trustee deems necessary for the {grantorTitle}'s health,
            education, maintenance, and support.
          </Text>

          {data.isJointTrust && (
            <Text style={styles.paragraph}>
              Upon the death of the first {grantorTitle} to die, the surviving {grantorTitle} shall have
              the right to all income from the Trust Estate and such principal as the Trustee deems
              necessary for their health, education, maintenance, and support.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE IV - DISTRIBUTION UPON DEATH</Text>
          <Text style={styles.paragraph}>
            Upon the death of the {data.isJointTrust ? 'surviving ' : ''}{grantorTitle}, after payment of
            all debts, expenses of last illness, funeral expenses, estate taxes, and costs of
            administration, the Trustee shall distribute the remaining Trust Estate as follows:
          </Text>

          <Text style={[styles.paragraph, styles.bold]}>Primary Beneficiaries:</Text>
          {data.primaryBeneficiaries.map((beneficiary, index) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. <Text style={styles.bold}>{beneficiary.name}</Text> ({beneficiary.relationship})
              - {beneficiary.percentage}% of the Trust Estate
            </Text>
          ))}

          {data.contingentBeneficiaries.length > 0 && (
            <>
              <Text style={[styles.paragraph, styles.bold, { marginTop: 15 }]}>
                Contingent Beneficiaries:
              </Text>
              <Text style={styles.paragraph}>
                If any primary beneficiary predeceases the {grantorTitle}, their share shall be distributed
                to the following contingent beneficiaries:
              </Text>
              {data.contingentBeneficiaries.map((beneficiary, index) => (
                <Text key={index} style={styles.listItem}>
                  {index + 1}. <Text style={styles.bold}>{beneficiary.name}</Text> ({beneficiary.relationship})
                  - {beneficiary.percentage}%
                </Text>
              ))}
            </>
          )}
        </View>

        {data.hasMinorChildren && (
          <View style={styles.section}>
            <Text style={styles.articleTitle}>ARTICLE V - PROVISIONS FOR MINOR BENEFICIARIES</Text>
            <Text style={styles.paragraph}>
              If any beneficiary is under the age of {data.minorChildrenAge || 25} at the time of
              distribution, the Trustee shall hold such beneficiary's share in a separate trust for
              their benefit until they reach the specified age.
            </Text>
            <Text style={styles.paragraph}>
              During this period, the Trustee may distribute income and principal to or for the benefit
              of such beneficiary as the Trustee deems advisable for their health, education, maintenance,
              and support. Upon reaching age {data.minorChildrenAge || 25}, the beneficiary shall receive
              their remaining share outright and free of trust.
            </Text>
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 3: Trustee Powers and Provisions */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {data.hasMinorChildren ? 'VI' : 'V'} - TRUSTEE POWERS
          </Text>
          <Text style={styles.paragraph}>
            The Trustee shall have full power and authority to manage, invest, and reinvest the Trust
            Estate, including but not limited to the following powers:
          </Text>
          <Text style={styles.listItem}>
            a) To sell, exchange, lease, or otherwise dispose of any property;
          </Text>
          <Text style={styles.listItem}>
            b) To invest and reinvest in stocks, bonds, mutual funds, real estate, or other assets;
          </Text>
          <Text style={styles.listItem}>
            c) To borrow money and encumber trust property;
          </Text>
          <Text style={styles.listItem}>
            d) To employ attorneys, accountants, and other professionals;
          </Text>
          <Text style={styles.listItem}>
            e) To make distributions in cash or in kind;
          </Text>
          <Text style={styles.listItem}>
            f) To establish reserves for taxes, assessments, and contingencies;
          </Text>
          <Text style={styles.listItem}>
            g) To exercise all rights of ownership over any business interests held in trust.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {data.hasMinorChildren ? 'VII' : 'VI'} - SUCCESSOR TRUSTEES
          </Text>
          <Text style={styles.paragraph}>
            If the initial Trustee is unable or unwilling to serve, the following shall serve as
            Successor Trustee:
          </Text>
          <Text style={styles.listItem}>
            1. <Text style={styles.bold}>{data.successorTrustee.name}</Text>, of{' '}
            {data.successorTrustee.address}
          </Text>
          {data.secondSuccessorTrustee && (
            <Text style={styles.listItem}>
              2. <Text style={styles.bold}>{data.secondSuccessorTrustee.name}</Text>, of{' '}
              {data.secondSuccessorTrustee.address}
            </Text>
          )}
          <Text style={styles.paragraph}>
            No bond shall be required of any Trustee named herein.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {data.hasMinorChildren ? 'VIII' : 'VII'} - GOVERNING LAW
          </Text>
          <Text style={styles.paragraph}>
            This Trust shall be governed by and construed in accordance with the laws of the State of{' '}
            <Text style={styles.bold}>{data.grantorState}</Text>, without regard to conflict of law principles.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 4: Signatures */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            IN WITNESS WHEREOF, the parties have executed this Trust Agreement as of the date first
            written above.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <Text style={[styles.sectionTitle, { marginBottom: 20 }]}>{grantorTitle.toUpperCase()}:</Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{data.grantorName}</Text>
          </View>

          {data.isJointTrust && data.spouseName && (
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureLabel}>{data.spouseName}</Text>
            </View>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 40, marginBottom: 20 }]}>TRUSTEE:</Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{data.initialTrustee.name}, Trustee</Text>
          </View>
        </View>

        <View style={styles.notarySection}>
          <Text style={styles.notaryTitle}>NOTARY ACKNOWLEDGMENT</Text>
          <Text style={styles.notaryText}>
            State of {data.grantorState}
          </Text>
          <Text style={styles.notaryText}>
            County of {data.grantorCounty}
          </Text>
          <Text style={styles.notaryText}>
            On this _______ day of __________________, 20____, before me personally appeared
            the above-named individuals, known to me to be the persons described in and who executed
            the foregoing instrument, and acknowledged that they executed the same as their free act and deed.
          </Text>

          <View style={{ marginTop: 20 }}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Notary Public</Text>
          </View>

          <Text style={styles.notaryText}>
            My Commission Expires: _______________________
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 5: Schedule A - Trust Assets */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SCHEDULE A</Text>
          <Text style={styles.headerSubtitle}>Initial Trust Property</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            The following property is hereby transferred to the Trust:
          </Text>

          {data.assets.map((asset, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text style={styles.listItem}>
                <Text style={styles.bold}>
                  {index + 1}. {asset.type.replace('_', ' ').toUpperCase()}:
                </Text>
              </Text>
              <Text style={[styles.listItem, { marginLeft: 50 }]}>
                {asset.description}
                {asset.value && ` (Approximate Value: ${asset.value})`}
              </Text>
            </View>
          ))}

          <Text style={[styles.paragraph, { marginTop: 30 }]}>
            Additional property may be added to this Trust by attaching additional schedules or
            by amendment to this Schedule A.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.paragraph}>
            Acknowledged and agreed this {getOrdinal(day)} day of {month}, {year}:
          </Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{grantorTitle}</Text>
          </View>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Trustee</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            This document was prepared with LDASD Estate Planning services.
            Valid in the State of {data.grantorState}.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default TrustDocument;
