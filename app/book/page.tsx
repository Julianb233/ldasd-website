"use client";

import { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  product: string;
  addSpouse: boolean;
}

const products = [
  {
    id: "will",
    name: "Will",
    price: 199,
    description: "Perfect for naming guardians and distributing assets",
  },
  {
    id: "trust",
    name: "Living Trust",
    price: 599,
    description: "Avoid probate and keep your estate private",
    popular: true,
  },
  {
    id: "estate-plan",
    name: "Complete Estate Plan",
    price: 699,
    description: "Everything you need for comprehensive protection",
  },
];

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
];

export default function BookPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    product: "",
    addSpouse: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleProductSelect = (productId: string) => {
    setFormData((prev) => ({ ...prev, product: productId }));
  };

  const getSelectedProduct = () => products.find((p) => p.id === formData.product);

  const getTotalPrice = () => {
    const product = getSelectedProduct();
    if (!product) return 0;
    return formData.addSpouse ? product.price + 100 : product.price;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.product) {
      toast.error("Please select a product");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setIsSubmitted(true);
      toast.success("Request submitted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-sand">
      <Toaster position="top-center" />

      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-tan to-sky overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
            Get Started
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Create Your Estate Plan
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Choose the product that&apos;s right for you and get started in minutes. No appointments necessary.
            Attorney-backed documents starting at just $199.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Choose Your Product",
                    description:
                      "Select from Will ($199), Trust ($599), or Complete Estate Plan ($699) based on your needs.",
                  },
                  {
                    title: "Answer Simple Questions",
                    description:
                      "Our guided questionnaire walks you through every detail in plain English. No legal jargon.",
                  },
                  {
                    title: "Review & Customize",
                    description:
                      "Preview your documents and make any changes before finalizing. Everything is customizable.",
                  },
                  {
                    title: "Attorney Review",
                    description:
                      "Licensed attorneys in your state review all documents to ensure legal compliance.",
                  },
                  {
                    title: "Download & Sign",
                    description:
                      "Receive your completed, notarization-ready documents within 2-3 business days.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium">
                <h3 className="font-semibold text-foreground mb-2">100% Satisfaction Guaranteed</h3>
                <p className="text-foreground/70">
                  Not happy with your documents? We offer a 60-day money-back guarantee, no questions asked.
                </p>
              </div>
            </div>

            {/* Product Selection & Form */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-premium">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Request Submitted!</h3>
                  <p className="text-foreground/70 mb-6">
                    Thank you for choosing LDASD Estate Planning. We&apos;ll contact you shortly to get started
                    on your {getSelectedProduct()?.name || "estate plan"}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        state: "",
                        product: "",
                        addSpouse: false,
                      });
                    }}
                    className="text-secondary font-semibold hover:underline"
                  >
                    Start a new request
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Select Your Product</h2>
                  <div className="space-y-4 mb-8">
                    {products.map((product) => (
                      <label
                        key={product.id}
                        className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.product === product.id
                            ? "border-secondary bg-secondary/5"
                            : "border-foreground/10 hover:border-secondary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="productSelect"
                          value={product.id}
                          checked={formData.product === product.id}
                          onChange={() => handleProductSelect(product.id)}
                          className="mt-1 accent-secondary"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{product.name}</p>
                              <p className="text-sm text-foreground/70">{product.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary">${product.price}</p>
                              {product.popular && (
                                <span className="text-xs text-secondary font-semibold">Most Popular</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                        State of Residence *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      >
                        <option value="">Select your state...</option>
                        {states.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="addSpouse"
                        name="addSpouse"
                        checked={formData.addSpouse}
                        onChange={handleChange}
                        className="mt-1 accent-secondary"
                      />
                      <label htmlFor="addSpouse" className="text-sm text-foreground/70">
                        I want to add my spouse/partner (+$100)
                      </label>
                    </div>

                    {formData.product && (
                      <div className="bg-secondary/5 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">Total</span>
                          <span className="text-2xl font-bold text-primary">${getTotalPrice()}</span>
                        </div>
                        {formData.addSpouse && (
                          <p className="text-sm text-foreground/60 mt-1">
                            Includes spouse/partner (+$100)
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.product}
                      className="w-full rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary/90 shadow-premium hover:shadow-premium-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Start Your Estate Plan"
                      )}
                    </button>

                    <p className="text-sm text-foreground/50 text-center">
                      Secure checkout. 60-day money-back guarantee. Your information is encrypted and secure.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
