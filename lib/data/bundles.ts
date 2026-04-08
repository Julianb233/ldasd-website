export interface BundleProduct {
  name: string;
  quantity: number;
  individualPrice: number;
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  products: BundleProduct[];
  bundlePrice: number;
  features: string[];
  bestFor: string;
  highlighted: boolean;
  href: string;
}

export const bundles: Bundle[] = [
  {
    id: "essential-couple",
    name: "Essential Couple",
    tagline: "Basic protection for both partners",
    description:
      "Two customized Wills — one for each partner. Name guardians, designate beneficiaries, and appoint executors. Each document is tailored to your state's laws.",
    products: [
      { name: "Last Will & Testament", quantity: 2, individualPrice: 199 },
    ],
    bundlePrice: 349,
    features: [
      "2 Last Wills & Testaments",
      "Guardianship designations",
      "Asset distribution for each spouse",
      "Executor appointments",
      "Digital asset instructions",
      "Attorney review for both",
      "1 year free updates",
    ],
    bestFor: "Married couples or partners with straightforward estates and few assets.",
    highlighted: false,
    href: "/book?bundle=essential-couple",
  },
  {
    id: "trust-couple",
    name: "Trust Couple",
    tagline: "Avoid probate together",
    description:
      "Two Living Trusts with Pour-over Wills — keep both estates out of probate and protect your family's privacy. Includes trust funding guidance for both partners.",
    products: [
      { name: "Living Trust", quantity: 2, individualPrice: 599 },
    ],
    bundlePrice: 999,
    features: [
      "2 Revocable Living Trusts",
      "2 Pour-over Wills",
      "Avoid probate for both estates",
      "Privacy protection",
      "Incapacity planning for both",
      "Trust funding guidance",
      "3 years free updates",
      "Priority email support",
    ],
    bestFor: "Homeowners and couples with $100K+ in combined assets who want to avoid probate.",
    highlighted: true,
    href: "/book?bundle=trust-couple",
  },
  {
    id: "complete-family",
    name: "Complete Family",
    tagline: "Comprehensive protection for the whole family",
    description:
      "Two Complete Estate Plans covering every aspect of protection — healthcare directives, powers of attorney, trusts, and more. Everything both partners need in one package.",
    products: [
      { name: "Complete Estate Plan", quantity: 2, individualPrice: 699 },
    ],
    bundlePrice: 1199,
    features: [
      "2 Living Trusts & Pour-over Wills",
      "2 Durable Powers of Attorney",
      "2 Healthcare Powers of Attorney",
      "2 Living Wills / Healthcare Directives",
      "2 HIPAA Authorizations",
      "Guardianship designations",
      "Digital asset management",
      "Lifetime free updates",
      "Priority phone support",
    ],
    bestFor: "Families who want full coverage for both partners — healthcare, finances, and legacy.",
    highlighted: false,
    href: "/book?bundle=complete-family",
  },
  {
    id: "ultimate-family",
    name: "Ultimate Family",
    tagline: "Everything + personalized attorney guidance",
    description:
      "Two Complete Estate Plans plus a 60-minute attorney consultation. Get expert, personalized guidance on your family's unique situation — tax planning, asset protection, and more.",
    products: [
      { name: "Complete Estate Plan", quantity: 2, individualPrice: 699 },
      { name: "Attorney Consultation", quantity: 1, individualPrice: 299 },
    ],
    bundlePrice: 1399,
    features: [
      "Everything in Complete Family, plus:",
      "60-minute attorney consultation",
      "State-licensed attorney matched to you",
      "Document review & recommendations",
      "Written summary of advice",
      "Tax planning considerations",
      "Follow-up email support",
    ],
    bestFor: "Families with complex assets, blended families, or anyone wanting expert guidance.",
    highlighted: false,
    href: "/book?bundle=ultimate-family",
  },
];

export function getBundleRetailTotal(bundle: Bundle): number {
  return bundle.products.reduce(
    (total, p) => total + p.individualPrice * p.quantity,
    0
  );
}

export function getBundleSavings(bundle: Bundle): number {
  return getBundleRetailTotal(bundle) - bundle.bundlePrice;
}

export function getBundleSavingsPercent(bundle: Bundle): number {
  const retail = getBundleRetailTotal(bundle);
  if (retail === 0) return 0;
  return Math.round((getBundleSavings(bundle) / retail) * 100);
}

// Comparison features for the side-by-side table
export interface ComparisonFeature {
  feature: string;
  essentialCouple: string | boolean;
  trustCouple: string | boolean;
  completeFamily: string | boolean;
  ultimateFamily: string | boolean;
}

export const comparisonFeatures: ComparisonFeature[] = [
  { feature: "Last Will & Testament", essentialCouple: true, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Living Trust", essentialCouple: false, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Pour-over Will", essentialCouple: false, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Avoid Probate", essentialCouple: false, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Power of Attorney", essentialCouple: false, trustCouple: false, completeFamily: true, ultimateFamily: true },
  { feature: "Healthcare Directive", essentialCouple: false, trustCouple: false, completeFamily: true, ultimateFamily: true },
  { feature: "HIPAA Authorization", essentialCouple: false, trustCouple: false, completeFamily: true, ultimateFamily: true },
  { feature: "Privacy Protection", essentialCouple: false, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Attorney Review", essentialCouple: true, trustCouple: true, completeFamily: true, ultimateFamily: true },
  { feature: "Attorney Consultation", essentialCouple: false, trustCouple: false, completeFamily: false, ultimateFamily: "60 min" },
  { feature: "Free Updates", essentialCouple: "1 year", trustCouple: "3 years", completeFamily: "Lifetime", ultimateFamily: "Lifetime" },
  { feature: "Support Level", essentialCouple: "Email", trustCouple: "Priority Email", completeFamily: "Priority Phone", ultimateFamily: "Priority Phone" },
];
