'use client';

import { useState, useMemo } from 'react';
import type { DocumentType, StateExecutionRequirements } from '@/lib/data/state-execution-requirements';

const documentLabels: Record<DocumentType, string> = {
  will: 'Last Will & Testament',
  trust: 'Living Trust',
  poa: 'Power of Attorney',
  'healthcare-directive': 'Healthcare Directive',
};

interface ExecutionChecklistProps {
  stateReqs: StateExecutionRequirements;
}

export default function ExecutionChecklist({ stateReqs }: ExecutionChecklistProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>('will');
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const docReqs = useMemo(() => {
    switch (selectedDoc) {
      case 'will': return stateReqs.will;
      case 'trust': return stateReqs.trust;
      case 'poa': return stateReqs.poa;
      case 'healthcare-directive': return stateReqs.healthcareDirective;
    }
  }, [selectedDoc, stateReqs]);

  const toggleStep = (order: number) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      if (next.has(order)) next.delete(order);
      else next.add(order);
      return next;
    });
  };

  const progress = docReqs.executionSteps.length > 0
    ? Math.round((checkedSteps.size / docReqs.executionSteps.length) * 100)
    : 0;

  return (
    <div>
      {/* Document Type Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {(Object.entries(documentLabels) as [DocumentType, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setSelectedDoc(key); setCheckedSteps(new Set()); }}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedDoc === key
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-foreground/70 hover:bg-primary/10 ring-1 ring-foreground/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Requirements Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {/* Witnesses */}
        <div className="bg-white rounded-2xl p-6 shadow-premium">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground">Witnesses</h3>
          </div>
          {docReqs.witnesses.count === 0 ? (
            <p className="text-foreground/60 text-sm">No witnesses required</p>
          ) : (
            <>
              <p className="text-2xl font-bold text-primary">{docReqs.witnesses.count} Required</p>
              <ul className="mt-2 space-y-1 text-sm text-foreground/70">
                <li>Age: {docReqs.witnesses.minimumAge}+</li>
                {docReqs.witnesses.disinterested && <li>Must be disinterested (not beneficiaries)</li>}
                {docReqs.witnesses.notes && <li className="text-amber-600">{docReqs.witnesses.notes}</li>}
              </ul>
            </>
          )}
        </div>

        {/* Notarization */}
        <div className="bg-white rounded-2xl p-6 shadow-premium">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              docReqs.notarization.required ? 'bg-red-50' : 'bg-emerald-50'
            }`}>
              <svg className={`w-5 h-5 ${docReqs.notarization.required ? 'text-red-500' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground">Notarization</h3>
          </div>
          <p className={`text-lg font-bold ${docReqs.notarization.required ? 'text-red-600' : 'text-emerald-600'}`}>
            {docReqs.notarization.required ? 'Required' : docReqs.notarization.recommended ? 'Recommended' : 'Not Required'}
          </p>
          {'selfProvingAffidavit' in docReqs.notarization && docReqs.notarization.selfProvingAffidavit && (
            <p className="mt-1 text-sm text-foreground/70">Self-proving affidavit available</p>
          )}
          {docReqs.notarization.notes && (
            <p className="mt-1 text-sm text-amber-600">{docReqs.notarization.notes}</p>
          )}
        </div>

        {/* Additional Info (will-specific) */}
        {selectedDoc === 'will' && (
          <div className="bg-white rounded-2xl p-6 shadow-premium">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground">State Details</h3>
            </div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Minimum age: <span className="font-semibold text-foreground">{stateReqs.will.minimumTestatorAge}</span></li>
              <li>Holographic will: <span className={`font-semibold ${stateReqs.will.holographicWillValid ? 'text-emerald-600' : 'text-foreground/50'}`}>{stateReqs.will.holographicWillValid ? 'Valid' : 'Not valid'}</span></li>
            </ul>
            {stateReqs.will.notes && (
              <p className="mt-3 text-sm text-amber-600">{stateReqs.will.notes}</p>
            )}
          </div>
        )}

        {selectedDoc !== 'will' && docReqs.notes && (
          <div className="bg-white rounded-2xl p-6 shadow-premium">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground">State Notes</h3>
            </div>
            <p className="text-sm text-foreground/70">{docReqs.notes}</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-foreground">Execution Checklist</h3>
          <span className="text-sm font-semibold text-foreground/60">{progress}% Complete</span>
        </div>
        <div className="w-full bg-foreground/5 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Steps */}
      <div className="space-y-3">
        {docReqs.executionSteps
          .sort((a, b) => a.order - b.order)
          .map((step) => {
            const isChecked = checkedSteps.has(step.order);
            return (
              <button
                key={step.order}
                onClick={() => toggleStep(step.order)}
                className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 ${
                  isChecked
                    ? 'bg-primary/5 ring-1 ring-primary/20'
                    : 'bg-white shadow-premium hover:shadow-premium-hover'
                }`}
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 ${
                  isChecked
                    ? 'bg-primary border-primary'
                    : 'border-foreground/20'
                }`}>
                  {isChecked && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${isChecked ? 'text-primary line-through' : 'text-foreground'}`}>
                      {step.title}
                    </span>
                    {step.required ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">Required</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50 font-medium">Optional</span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isChecked ? 'text-foreground/40' : 'text-foreground/60'}`}>
                    {step.description}
                  </p>
                </div>
              </button>
            );
          })}
      </div>

      {/* Citation */}
      <div className="mt-8 p-4 rounded-xl bg-foreground/5 text-sm text-foreground/50">
        <p>
          <span className="font-semibold">Statute Reference:</span> {stateReqs.statuteCitation}
        </p>
        <p className="mt-1">
          This information is for educational purposes only and does not constitute legal advice. Laws change — consult a licensed attorney in {stateReqs.stateName} to verify current requirements.
        </p>
      </div>
    </div>
  );
}
