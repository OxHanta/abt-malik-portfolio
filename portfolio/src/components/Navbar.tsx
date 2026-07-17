import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const lastY = useRef(0);
  const isNavigating = useRef(false);

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      // hide when scrolling down past 80px, show when scrolling up
      if (y > lastY.current && y > 80 && !isNavigating.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "About", href: isHome ? "#about" : "/#about", isHash: true },
    { name: "Projects", href: isHome ? "#projects" : "/#projects", isHash: true },
    { name: "Aerials", href: isHome ? "#aerials" : "/#aerials", isHash: true },
    { name: "Stock Footage", href: isHome ? "#stock-footage" : "/#stock-footage", isHash: true },
  ];

  const contactLink = { name: "Contact", href: isHome ? "#contact" : "/#contact", isHash: true };

  const handleNavClick = () => {
    isNavigating.current = true;
    setTimeout(() => {
      isNavigating.current = false;
    }, 1000); // prevent hiding for 1 second
  };

  const scrollToTop = () => {
    handleNavClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = "font-['DM_Mono'] text-[11px] uppercase tracking-widest text-white hover:opacity-60 transition-opacity cursor-pointer";

  const renderLink = (link: { name: string; href: string; isHash: boolean }, className: string, onClick?: () => void) => {
    const handleClick = () => {
      handleNavClick();
      if (onClick) onClick();
    };

    if (link.isHash && isHome) {
      return (
        <a key={link.name} href={link.href} className={className} onClick={handleClick}>
          {link.name}
        </a>
      );
    }
    return (
      <Link key={link.name} href={link.href}>
        <span className={className} onClick={handleClick}>
          {link.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: hidden ? -100 : 0,
          backgroundColor: isScrolled ? "rgba(11, 11, 11, 0.75)" : "rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          borderBottomColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0)",
          paddingTop: isScrolled ? "12px" : "16px",
          paddingBottom: isScrolled ? "12px" : "16px"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent select-none"
        style={{ mixBlendMode: isScrolled ? "normal" : "difference" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex-1">
            <Link href="/">
              <motion.img
                src="https://res.cloudinary.com/dba2kof3v/image/upload/v1784249206/Abt_2x_swixpi.png"
                alt="Abt Malik Logo"
                className="h-6 w-auto hover:opacity-60 transition-opacity cursor-pointer inline-block"
                whileTap={{ y: 4, opacity: 0.6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={isHome ? scrollToTop : undefined}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-[2] justify-center gap-8">
            {navLinks.map((link) => renderLink(link, linkClass))}
          </div>

          <div className="hidden md:flex flex-1 justify-end">
            {renderLink(contactLink, linkClass)}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0B0B0B] flex flex-col items-center justify-center gap-8 md:hidden select-none"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:opacity-60 transition-opacity"
            >
              <X size={24} />
            </button>

            {[...navLinks, contactLink].map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {link.isHash && isHome ? (
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-['Inter_Tight'] text-3xl font-bold text-white hover:text-[#FF442B] transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link href={link.href}>
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-['Inter_Tight'] text-3xl font-bold text-white hover:text-[#FF442B] transition-colors cursor-pointer"
                    >
                      {link.name}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
