import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attorney Consultation Add-On | 1-on-1 Legal Guidance | $299",
  description:
    "Get a personalized 60-minute consultation with a licensed estate planning attorney in your state. Review your documents, ask questions, and get expert guidance for $299.",
};

const benefits = [
  {
    title: "State-Licensed Attorneys",
    description:
      "Every consultation is with an attorney licensed and practicing in your specific state, ensuring advice tailored to your local laws.",
  },
  {
    title: "60-Minute Deep Dive",
    description:
      "A full hour to review your estate plan, discuss your unique situation, and address every question you have.",
  },
  {
    title: "Personalized Recommendations",
    description:
      "Receive a written summary of recommendations specific to your family, assets, and goals after your consultation.",
  },
];

const included = [
  "60-minute 1-on-1 video or phone consultation",
  "Attorney licensed in your state",
  "Review of your estate planning documents",
  "Personalized recommendations summary",
  "Follow-up email for additional questions",
  "State-specific legal guidance",
  "Tax planning considerations",
  "Asset protection strategies",
];

const faqs = [
  {
    q: "Can I book a consultation without purchasing a plan?",
    a: "Yes! While the attorney consultation is designed to complement our estate plans, you can book a standalone consultation to discuss your estate planning needs and get professional guidance.",
  },
  {
    q: "How are attorneys matched to my state?",
    a: "We maintain a network of licensed estate planning attorneys in all 50 states plus D.C. When you book, we match you with an attorney licensed and actively practicing in your state of residence.",
  },
  {
    q: "What happens during the consultation?",
    a: "Your attorney will review your estate planning documents (if applicable), discuss your family situation and goals, explain state-specific considerations, and provide personalized recommendations. You'll receive a written summary after the session.",
  },
  {
    q: "Can I do the consultation by phone instead of video?",
    a: "In most states, both phone and video consultations are available. A few states only offer video consultations. You'll see your options when you book.",
  },
  {
    q: "How quickly can I get an appointment?",
    a: "Most consultations are scheduled within 1-3 business days, depending on your state. High-demand states like California, New York, and Texas typically have next-business-day availability.",
  },
];

export default function AttorneyConsultationPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-secondary-light mb-6">
                Add-On Service
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Attorney Consultation
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Get personalized, 1-on-1 legal guidance from a licensed estate
                planning attorney in your state. Ask questions, review your
                documents, and get expert recommendations.
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-bold text-secondary">$299</span>
                <span className="text-white/80">one-time</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book?addon=attorney-consultation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Your Consultation
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 ring-1 ring-white/20 shadow-premium">
                <h3 className="text-xl font-bold text-white mb-6">
                  What&apos;s Included:
                </h3>
                <ul className="space-y-3">
                  {included.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-secondary flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Why Add an Attorney Consultation?
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Expert guidance tailored to your state and situation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Select Your State",
                description:
                  "Tell us your state of residence so we can match you with a locally licensed attorney.",
              },
              {
                step: "2",
                title: "Choose Your Time",
                description:
                  "Pick a convenient date and time. Most appointments are available within 1-3 business days.",
              },
              {
                step: "3",
                title: "Meet Your Attorney",
                description:
                  "Join your 60-minute video or phone consultation. Bring any questions — your attorney is there to help.",
              },
              {
                step: "4",
                title: "Get Your Summary",
                description:
                  "Within 24 hours, receive a written summary of recommendations tailored to your situation.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
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
            Get Expert Legal Guidance
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Book a 1-on-1 consultation with a licensed attorney in your state.
          </p>
          <Link
            href="/book?addon=attorney-consultation"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book for $299
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
