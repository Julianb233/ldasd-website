import type { Metadata } from 'next';
import StateExecutionPage from './StateExecutionPage';

export const metadata: Metadata = {
  title: 'State-Specific Execution Instructions | How to Sign Your Estate Documents | LDASD',
  description:
    'Find the exact witnessing, notarization, and signing requirements for wills, trusts, powers of attorney, and healthcare directives in all 50 states.',
  keywords: [
    'will signing requirements',
    'notarization requirements by state',
    'estate planning execution instructions',
    'witness requirements for will',
    'self-proving affidavit',
    'how to sign a will',
  ],
};

export default function Page() {
  return <StateExecutionPage />;
}
