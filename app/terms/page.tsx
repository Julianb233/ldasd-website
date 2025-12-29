import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LDASD Financial Services",
  description: "Terms of service for LDASD Financial Services website. Read our terms and conditions for using our website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-sand">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-sage to-sky overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Terms of Service
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using the website of LDASD Financial Services (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
                you agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Use of Website</h2>
              <p className="mb-4">You agree to use our website only for lawful purposes and in a manner that does not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable federal, state, local, or international law</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with the proper working of the website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Investment Advice</h2>
              <p>
                The content on this website is for informational purposes only and does not constitute
                investment advice, financial advice, trading advice, or any other sort of advice.
                You should not treat any of the website&apos;s content as such. We do not recommend that any
                financial instrument should be bought, sold, or held by you. Nothing on this website
                should be taken as an offer to buy, sell, or hold any financial product.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Client Relationship</h2>
              <p>
                Use of this website does not create an investment advisor-client relationship. To become
                a client of LDASD Financial Services, you must complete our client onboarding process and
                execute the required advisory agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of LDASD Financial Services or its content suppliers and is protected
                by copyright laws. You may not reproduce, distribute, modify, or create derivative
                works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer of Warranties</h2>
              <p>
                This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties
                of any kind. We disclaim all warranties, express or implied, including but not limited
                to implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                In no event shall LDASD Financial Services, its officers, directors, employees, or agents
                be liable to you for any direct, indirect, incidental, special, consequential, or punitive
                damages arising out of or related to your use of, or inability to use, this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">External Links</h2>
              <p>
                Our website may contain links to third-party websites. These links are provided for
                your convenience only. We have no control over the content of these sites and accept
                no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws
                of the State of California, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Any changes will be
                effective immediately upon posting on this website. Your continued use of the website
                following the posting of revised terms means you accept those changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p>
                Questions about these Terms of Service should be sent to:
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
