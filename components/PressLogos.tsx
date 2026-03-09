/**
 * Press/Media logos section - displays logos of publications/partners
 * Uses SVG-based placeholder logos styled to match the brand
 */

const pressLogos = [
  { name: "Forbes", width: "w-24" },
  { name: "Bloomberg", width: "w-28" },
  { name: "CNBC", width: "w-20" },
  { name: "The Wall Street Journal", width: "w-32" },
  { name: "USA Today", width: "w-24" },
  { name: "Kiplinger", width: "w-24" },
];

export default function PressLogos() {
  return (
    <section className="relative py-12 bg-sand" aria-label="As seen in">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/40 mb-8">
          As Seen In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {pressLogos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-8 flex items-center justify-center text-foreground/25 hover:text-foreground/40 transition-colors duration-300`}
            >
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
