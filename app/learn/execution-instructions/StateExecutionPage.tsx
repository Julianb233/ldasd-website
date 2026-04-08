'use client';

import { useState } from 'react';
import Link from 'next/link';
import { stateExecutionRequirements, getStateRequirements } from '@/lib/data/state-execution-requirements';
import ExecutionChecklist from '@/components/ExecutionChecklist';

const sortedStates = Object.values(stateExecutionRequirements).sort((a, b) =>
  a.stateName.localeCompare(b.stateName)
);

export default function StateExecutionPage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const stateReqs = selectedState ? getStateRequirements(selectedState) : null;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            State-Specific Execution Instructions
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Every state has unique requirements for how estate planning documents must be signed,
            witnessed, and notarized. Select your state below to see your exact requirements.
          </p>
        </div>
      </section>

      {/* State Selector */}
      <section className="py-16 bg-sky">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-premium">
            <label htmlFor="state-select" className="block text-lg font-bold text-foreground mb-3">
              Select Your State
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-foreground/10 bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            >
              <option value="">Choose a state...</option>
              {sortedStates.map((state) => (
                <option key={state.stateCode} value={state.stateCode}>
                  {state.stateName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      {stateReqs ? (
        <section className="py-16 bg-sand">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {stateReqs.stateName} Execution Requirements
            </h2>
            <p className="text-foreground/60 mb-10">
              Select a document type below to view specific signing, witnessing, and notarization requirements.
            </p>
            <ExecutionChecklist stateReqs={stateReqs} />
          </div>
        </section>
      ) : (
        /* Placeholder content when no state selected */
        <section className="py-16 bg-sand">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Choose Your State to Get Started
              </h3>
              <p className="text-foreground/60 max-w-lg mx-auto">
                Each state has unique signing, witnessing, and notarization requirements for wills,
                trusts, powers of attorney, and healthcare directives. Select your state above to see
                a personalized execution checklist.
              </p>
            </div>

            {/* Quick Facts Grid */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-premium text-center">
                <p className="text-4xl font-bold text-primary">50</p>
                <p className="text-foreground/60 mt-1">States + DC Covered</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-premium text-center">
                <p className="text-4xl font-bold text-primary">4</p>
                <p className="text-foreground/60 mt-1">Document Types</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-premium text-center">
                <p className="text-4xl font-bold text-primary">100%</p>
                <p className="text-foreground/60 mt-1">Free to Use</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Educational FAQ section */}
      <section className="py-24 bg-sage">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Common Execution Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'What does "executing" a will mean?',
                a: 'Executing a will means signing it according to your state\'s legal requirements. This typically includes signing in front of witnesses and possibly a notary public. A will that isn\'t properly executed may be declared invalid by a court.',
              },
              {
                q: 'What is a "disinterested" witness?',
                a: 'A disinterested witness is someone who has no financial stake in your estate — they are not named as a beneficiary, executor, or trustee in the document. Most states require disinterested witnesses to prevent undue influence.',
              },
              {
                q: 'What is a self-proving affidavit?',
                a: 'A self-proving affidavit is a notarized document signed by you and your witnesses that allows your will to be accepted by the probate court without requiring your witnesses to testify in person. Most states offer this option, and it\'s strongly recommended.',
              },
              {
                q: 'Do I need a notary for my will?',
                a: 'In most states, notarization is not strictly required for a will to be valid, but it is required for the self-proving affidavit. Louisiana is a notable exception where notarization is required. Check your state\'s specific requirements above.',
              },
              {
                q: 'Can I use the same witnesses for multiple documents?',
                a: 'Yes, the same people can serve as witnesses for your will, trust, POA, and healthcare directive — as long as they meet the qualification requirements for each document type in your state.',
              },
              {
                q: 'What happens if I move to a different state?',
                a: 'Most states honor wills that were validly executed under the laws of the state where they were signed. However, it\'s a good idea to review and potentially re-execute your documents under your new state\'s laws to avoid any issues.',
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Estate Plan?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Now that you know your state&apos;s requirements, let us help you create legally compliant
            estate planning documents.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
