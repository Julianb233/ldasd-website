import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LDASD Financial Services",
  description: "Privacy policy for LDASD Financial Services Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-sand">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-sage to-sky overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-foreground/80">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-lg">
          <div className="space-y-8 text-foreground/80">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p>
                LDASD Financial Services (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
                to protecting your personal information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, telephone number, mailing address, and other contact information you provide when contacting us or scheduling a consultation.</li>
                <li><strong>Financial Information:</strong> Information about your financial situation that you provide during the course of our advisory relationship.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and other analytics data.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and schedule consultations</li>
                <li>Send you updates about our services (with your consent)</li>
                <li>Comply with regulatory requirements</li>
                <li>Protect against fraud and unauthorized transactions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to others. We may share information
                with trusted third parties who assist us in operating our website, conducting our business,
                or servicing you, provided those parties agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
              <p>
                Our website may use cookies and similar technologies to enhance your experience.
                You can set your browser to refuse cookies, but some features of our website may
                not function properly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-premium">
                <p className="font-semibold text-foreground">LDASD Financial Services</p>
                <p>12544 High Bluff Drive, Suite 200</p>
                <p>San Diego, California 92130</p>
                <p className="mt-2">Phone: (858) 750-6206</p>
                <p>Email: sean@ldasd.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
