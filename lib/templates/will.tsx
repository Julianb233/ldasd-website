import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { legalStyles as styles, formatDate, getOrdinal } from './styles';

export interface Beneficiary {
  name: string;
  relationship: string;
  percentage?: number;
  specificItems?: string;
}

export interface Executor {
  name: string;
  address: string;
  relationship: string;
}

export interface Guardian {
  name: string;
  address: string;
  relationship: string;
}

export interface WillData {
  // Testator info
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;

  // Spouse info (optional)
  spouseName?: string;
  isMarried: boolean;

  // Children
  children: Array<{
    name: string;
    dateOfBirth: string;
    isMinor: boolean;
  }>;

  // Beneficiaries
  beneficiaries: Beneficiary[];
  residuaryBeneficiary: string;

  // Executor
  executor: Executor;
  alternateExecutor?: Executor;

  // Guardians (for minor children)
  guardians?: Guardian[];
  alternateGuardian?: Guardian;

  // Specific bequests
  specificBequests?: Array<{
    item: string;
    recipient: string;
    description?: string;
  }>;

  // Document date
  date: string;
}

interface WillDocumentProps {
  data: WillData;
}

export const WillDocument: React.FC<WillDocumentProps> = ({ data }) => {
  const today = new Date(data.date);
  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();

  return (
    <Document>
      {/* Page 1: Introduction and Declarations */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Last Will and Testament</Text>
          <Text style={styles.headerSubtitle}>State of {data.state}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            I, <Text style={styles.bold}>{data.fullName}</Text>, of {data.city}, {data.county} County,
            State of {data.state}, being of sound mind and memory, and not acting under duress or undue
            influence of any person, do hereby declare this instrument to be my Last Will and Testament,
            hereby revoking all previous wills and codicils made by me.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE I - FAMILY DECLARATIONS</Text>

          {data.isMarried && data.spouseName ? (
            <Text style={styles.paragraph}>
              I am married to <Text style={styles.bold}>{data.spouseName}</Text>, hereinafter referred
              to as my spouse. Any reference to my spouse in this Will shall mean {data.spouseName}.
            </Text>
          ) : (
            <Text style={styles.paragraph}>
              I am not currently married.
            </Text>
          )}

          {data.children.length > 0 ? (
            <>
              <Text style={styles.paragraph}>
                I have the following {data.children.length === 1 ? 'child' : 'children'}:
              </Text>
              {data.children.map((child, index) => (
                <Text key={index} style={styles.listItem}>
                  {index + 1}. <Text style={styles.bold}>{child.name}</Text>,
                  born {formatDate(child.dateOfBirth)}
                  {child.isMinor ? ' (minor)' : ''}
                </Text>
              ))}
            </>
          ) : (
            <Text style={styles.paragraph}>
              I have no children.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>ARTICLE II - PAYMENT OF DEBTS AND EXPENSES</Text>
          <Text style={styles.paragraph}>
            I direct my Executor, hereinafter named, to pay all my legally enforceable debts, funeral
            expenses, costs of administration, and any estate or inheritance taxes that may be due as a
            result of my death, from my residuary estate. My Executor shall have full discretion in
            determining the order and manner of such payments.
          </Text>
        </View>

        {data.specificBequests && data.specificBequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.articleTitle}>ARTICLE III - SPECIFIC BEQUESTS</Text>
            <Text style={styles.paragraph}>
              I make the following specific bequests:
            </Text>
            {data.specificBequests.map((bequest, index) => (
              <Text key={index} style={styles.listItem}>
                {index + 1}. I give <Text style={styles.bold}>{bequest.item}</Text> to{' '}
                <Text style={styles.bold}>{bequest.recipient}</Text>
                {bequest.description ? `. ${bequest.description}` : '.'}
              </Text>
            ))}
            <Text style={styles.paragraph}>
              If any beneficiary named above predeceases me, the specific bequest intended for that
              beneficiary shall become part of my residuary estate.
            </Text>
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 2: Residuary Estate and Beneficiaries */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {data.specificBequests && data.specificBequests.length > 0 ? 'IV' : 'III'} - RESIDUARY ESTATE
          </Text>
          <Text style={styles.paragraph}>
            I give, devise, and bequeath all of my residuary estate, including all real and personal
            property that I own at the time of my death, and all property over which I have power of
            appointment, after payment of debts, expenses, and specific bequests, to the following
            beneficiaries:
          </Text>

          {data.beneficiaries.map((beneficiary, index) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. <Text style={styles.bold}>{beneficiary.name}</Text> ({beneficiary.relationship})
              {beneficiary.percentage ? ` - ${beneficiary.percentage}% of residuary estate` : ''}
              {beneficiary.specificItems ? ` - ${beneficiary.specificItems}` : ''}
            </Text>
          ))}

          <Text style={styles.paragraph}>
            If any of the above-named beneficiaries predecease me, their share shall pass to their
            surviving descendants, per stirpes. If a beneficiary leaves no surviving descendants,
            their share shall be divided equally among the surviving beneficiaries named above.
          </Text>

          <Text style={styles.paragraph}>
            If all named beneficiaries predecease me, I direct that my entire residuary estate shall
            pass to <Text style={styles.bold}>{data.residuaryBeneficiary}</Text>.
          </Text>
        </View>

        {data.children.some(c => c.isMinor) && data.guardians && data.guardians.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.articleTitle}>
              ARTICLE {data.specificBequests && data.specificBequests.length > 0 ? 'V' : 'IV'} - GUARDIANSHIP OF MINOR CHILDREN
            </Text>
            <Text style={styles.paragraph}>
              If I am the sole surviving parent of any of my minor children at the time of my death,
              I nominate and appoint the following person(s) to serve as guardian(s) of the person
              and property of my minor children:
            </Text>
            {data.guardians.map((guardian, index) => (
              <Text key={index} style={styles.listItem}>
                <Text style={styles.bold}>{guardian.name}</Text>, of {guardian.address} ({guardian.relationship})
              </Text>
            ))}

            {data.alternateGuardian && (
              <Text style={styles.paragraph}>
                If the above-named guardian(s) are unable or unwilling to serve, I nominate{' '}
                <Text style={styles.bold}>{data.alternateGuardian.name}</Text>, of{' '}
                {data.alternateGuardian.address}, as alternate guardian.
              </Text>
            )}

            <Text style={styles.paragraph}>
              I request that no bond be required of any guardian nominated herein.
            </Text>
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 3: Executor and Final Provisions */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.articleTitle}>
            ARTICLE {(() => {
              let num = 3;
              if (data.specificBequests && data.specificBequests.length > 0) num++;
              if (data.children.some(c => c.isMinor) && data.guardians && data.guardians.length > 0) num++;
              return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][num];
            })()} - EXECUTOR
          </Text>
          <Text style={styles.paragraph}>
            I nominate and appoint <Text style={styles.bold}>{data.executor.name}</Text>, of{' '}
            {data.executor.address}, as the Executor of this my Last Will and Testament.
          </Text>

          {data.alternateExecutor && (
            <Text style={styles.paragraph}>
              If <Text style={styles.bold}>{data.executor.name}</Text> is unable or unwilling to
              serve as Executor, I nominate and appoint{' '}
              <Text style={styles.bold}>{data.alternateExecutor.name}</Text>, of{' '}
              {data.alternateExecutor.address}, as alternate Executor.
            </Text>
          )}

          <Text style={styles.paragraph}>
            I grant my Executor full power and authority to do all things necessary for the complete
            administration of my estate, including but not limited to: selling, leasing, or
            mortgaging any real or personal property; investing and reinvesting estate assets;
            settling claims; and distributing the estate according to the terms of this Will.
          </Text>

          <Text style={styles.paragraph}>
            I direct that no bond or other security shall be required of any Executor named herein.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleTitle}>FINAL DECLARATIONS</Text>
          <Text style={styles.paragraph}>
            I declare that I have made and signed this Will as my own free and voluntary act for
            the purposes expressed herein, and that I am of legal age and sound mind.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <Text style={styles.paragraph}>
            IN WITNESS WHEREOF, I have hereunto set my hand and seal this{' '}
            <Text style={styles.bold}>{getOrdinal(day)}</Text> day of{' '}
            <Text style={styles.bold}>{month}</Text>, <Text style={styles.bold}>{year}</Text>.
          </Text>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{data.fullName}, Testator</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 4: Witness and Notary */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.witnessSection}>
          <Text style={styles.witnessTitle}>ATTESTATION CLAUSE</Text>
          <Text style={styles.paragraph}>
            We, the undersigned, declare that the person who signed this Will, or asked another to
            sign for them, did so in our presence, and that we believe them to be of sound mind.
            We have signed as witnesses in the presence of the Testator and in the presence of
            each other.
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
            State of {data.state}
          </Text>
          <Text style={styles.notaryText}>
            County of {data.county}
          </Text>
          <Text style={styles.notaryText}>
            On this _______ day of __________________, 20____, before me personally appeared{' '}
            <Text style={styles.bold}>{data.fullName}</Text>, known to me (or proved to me on the
            basis of satisfactory evidence) to be the person whose name is subscribed to this
            instrument, and acknowledged that they executed it.
          </Text>

          <View style={{ marginTop: 20 }}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Notary Public</Text>
          </View>

          <Text style={styles.notaryText}>
            My Commission Expires: _______________________
          </Text>

          <Text style={[styles.notaryText, { marginTop: 10, textAlign: 'center' }]}>
            [NOTARY SEAL]
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            This document was prepared with LDASD Estate Planning services.
            Valid in the State of {data.state}.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default WillDocument;
