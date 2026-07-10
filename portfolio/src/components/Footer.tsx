export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] py-8 px-6 md:px-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/30 text-[10px] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Malik — All rights reserved
        </p>

        <div className="flex gap-8">
          {[
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "Twitter", href: "https://twitter.com" },
            { label: "Instagram", href: "https://instagram.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-white/30 text-[10px] uppercase tracking-widest hover:text-[#FF442B] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
