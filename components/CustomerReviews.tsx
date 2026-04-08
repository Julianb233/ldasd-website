"use client";

import { useState } from "react";

const reviews = [
  {
    content: "Creating our living trust was so much easier than I expected. LDASD made it simple, affordable, and gave us complete peace of mind about our family's future.",
    author: "Sarah & Michael T.",
    role: "Parents of Three",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
  },
  {
    content: "After putting it off for years, we finally got our will done through LDASD. Knowing our kids are protected and our guardianship wishes are documented is priceless.",
    author: "Jennifer K.",
    role: "Single Mom",
    rating: 5,
    date: "1 month ago",
    verified: true,
  },
  {
    content: "The complete estate plan was exactly what we needed. Living trust, healthcare directive, power of attorney - all done in one afternoon. Worth every penny.",
    author: "Robert & Linda M.",
    role: "Retirees",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
  },
  {
    content: "LDASD explained everything in plain English. No confusing legal jargon. As a small business owner, I needed protection for both my family and my business assets.",
    author: "David H.",
    role: "Small Business Owner",
    rating: 5,
    date: "1 month ago",
    verified: true,
  },
  {
    content: "As a single parent, creating guardianship documents was my top priority. LDASD made it easy and affordable. I can sleep better knowing my children are protected.",
    author: "Maria G.",
    role: "Single Parent",
    rating: 5,
    date: "2 months ago",
    verified: true,
  },
  {
    content: "We updated our estate plan after our second child was born. The process was seamless and the team was incredibly helpful answering all our questions.",
    author: "James & Emily R.",
    role: "Growing Family",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-secondary" : "text-foreground/15"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-black/5 hover:shadow-premium transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={review.rating} />
        {review.verified && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>

      <blockquote className="text-foreground/80 leading-relaxed mb-4">
        &ldquo;{review.content}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-white">
            <span className="text-primary font-bold text-sm">{review.author.charAt(0)}</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{review.author}</p>
            <p className="text-xs text-foreground/50">{review.role}</p>
          </div>
        </div>
        <p className="text-xs text-foreground/40">{review.date}</p>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="relative py-24 sm:py-32 bg-sage overflow-hidden" aria-label="Customer reviews">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with aggregate rating */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
            Real Stories, Real Peace of Mind
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What Our Families Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Join thousands of families who&apos;ve protected what matters most.
          </p>

          {/* Aggregate rating display */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm ring-1 ring-black/5">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-foreground/50">out of 5</p>
            </div>
            <div className="h-10 w-px bg-foreground/10" />
            <div>
              <StarRating rating={5} />
              <p className="text-xs text-foreground/50 mt-1">Based on 847+ reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* Show more / less button */}
        {reviews.length > 3 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
            >
              {showAll ? "Show Less" : `See All ${reviews.length} Reviews`}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
