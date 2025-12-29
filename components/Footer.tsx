import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  products: [
    { name: "Trust", href: "/products/trust" },
    { name: "Will", href: "/products/will" },
    { name: "Guardianship", href: "/products/guardianship" },
    { name: "Estate Plan", href: "/products/estate-plan" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Who We Serve", href: "/who-we-serve" },
    { name: "Learn", href: "/learn" },
    { name: "Contact", href: "/contact" },
    { name: "Get Started", href: "/book" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/">
              <Image
                src="/images/logo/logo.png"
                alt="LDASD Estate Planning"
                width={160}
                height={58}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm leading-6 text-white/70">
              Protecting what matters most with simple, affordable estate planning.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p>12544 High Bluff Drive</p>
              <p>Suite 200</p>
              <p>San Diego, California 92130</p>
              <p className="pt-2">
                <a href="tel:+18587506206" className="hover:text-secondary transition-all duration-300">
                  (858) 750-6206
                </a>
              </p>
              <p>
                <a href="mailto:sean@ldasd.com" className="hover:text-secondary transition-all duration-300">
                  sean@ldasd.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Products</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.products.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-white/70 hover:text-secondary transition-all duration-300">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-white/70 hover:text-secondary transition-all duration-300">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-white/70 hover:text-secondary transition-all duration-300">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-5 text-white/50">
            LDASD Estate Planning provides legal document preparation services. We are not a law firm and do not provide legal advice.
            For complex estate planning needs, we recommend consulting with a licensed attorney in your state.
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs leading-5 text-white/50">
            &copy; {new Date().getFullYear()} LDASD Estate Planning. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-white/50 mt-4 md:mt-0">
            Your legacy, simplified.
          </p>
        </div>
      </div>
    </footer>
  );
}
