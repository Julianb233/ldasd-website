import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LDASD Estate Planning",
  description: "Terms of service for LDASD Estate Planning. Read our terms and conditions for using our website and document preparation services.",
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
            Last updated: April 2026
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
                By accessing or using the website of LDASD Estate Planning (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
                you agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our website or services.
              </p>
            </div>

            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Important: We Are Not a Law Firm
              </h2>
              <p className="mb-4">
                <strong>LDASD Estate Planning is a document preparation service. We are NOT a law firm,
                and we do NOT provide legal advice.</strong> Our services are limited to providing
                self-help legal document preparation based on information you provide.
              </p>
              <p className="mb-4">
                The documents we prepare are based entirely on the information and instructions you
                supply. We do not review your answers for legal sufficiency, draw legal conclusions,
                provide legal opinions, apply the law to the facts of your situation, or provide
                recommendations about your legal rights, remedies, defenses, options, or strategies.
              </p>
              <p>
                If you need legal advice for your specific situation, we strongly recommend consulting
                with a licensed attorney in your state. We offer an optional attorney consultation
                add-on for this purpose.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Nature of Our Services</h2>
              <p className="mb-4">LDASD Estate Planning provides:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Document preparation services:</strong> We prepare estate planning documents (wills, trusts, powers of attorney, healthcare directives) based on information you provide through our questionnaires.</li>
                <li><strong>Educational information:</strong> We provide general educational information about estate planning topics. This information is not tailored to your individual circumstances.</li>
                <li><strong>State-specific forms:</strong> Our documents are formatted to comply with general state requirements, but we cannot guarantee compliance with all local rules or recent legislative changes.</li>
                <li><strong>Optional attorney referral:</strong> We offer an add-on service to connect you with a licensed estate planning attorney in your state for personalized legal guidance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Attorney-Client Relationship</h2>
              <p>
                Your use of this website and our document preparation services does NOT create an
                attorney-client relationship between you and LDASD Estate Planning, its employees,
                agents, or affiliates. No confidential or privileged relationship is formed by your
                use of this website. Communications between you and LDASD are not protected by the
                attorney-client privilege or work product doctrine.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Responsibilities</h2>
              <p className="mb-4">By using our services, you acknowledge and agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for determining whether our document preparation services are appropriate for your needs</li>
                <li>You are responsible for the accuracy and completeness of all information you provide</li>
                <li>You understand that improperly executed documents may be legally invalid</li>
                <li>You are responsible for properly executing (signing, witnessing, notarizing) your documents according to your state&apos;s requirements</li>
                <li>You should consult with a licensed attorney if you have questions about the legal implications of your estate plan</li>
                <li>You understand that estate planning laws vary by state and change over time</li>
              </ul>
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
              <h2 className="text-2xl font-bold text-foreground mb-4">No Guarantee of Legal Validity</h2>
              <p>
                While our documents are designed to comply with general state requirements, we cannot
                and do not guarantee that any document prepared through our service will be legally
                valid, enforceable, or sufficient for your particular circumstances. The legal validity
                of estate planning documents depends on many factors, including proper execution,
                applicable state laws, and individual circumstances that are beyond our control or knowledge.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of LDASD Estate Planning or its content suppliers and is protected
                by copyright laws. You may not reproduce, distribute, modify, or create derivative
                works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer of Warranties</h2>
              <p>
                This website and our document preparation services are provided on an &quot;as is&quot; and
                &quot;as available&quot; basis without any warranties of any kind. We disclaim all warranties,
                express or implied, including but not limited to implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement. We do not warrant that our
                services will meet your specific requirements or that any documents will be legally
                sufficient for your circumstances.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                In no event shall LDASD Estate Planning, its officers, directors, employees, or agents
                be liable to you for any direct, indirect, incidental, special, consequential, or punitive
                damages arising out of or related to your use of, or inability to use, this website or
                our document preparation services, including but not limited to damages arising from
                documents that are found to be legally invalid or unenforceable.
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
                <p className="font-semibold text-foreground">LDASD Estate Planning</p>
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
