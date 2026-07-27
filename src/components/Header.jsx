import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BRAND, LOGO, NAV_LINKS } from "../constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5">
          <img
            src={LOGO}
            alt={BRAND.name}
            className="h-11 w-11 rounded-full object-cover shadow-sm"
          />
          <span className="font-display text-xl tracking-wide text-ink hidden sm:inline">
            {BRAND.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft hover:text-nude-dark transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#produtos"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-nude-dark px-5 py-2.5 text-sm font-medium text-cream hover:bg-gold transition-colors"
        >
          <ShoppingBag size={15} />
          Comprar
        </a>

        <button
          type="button"
          aria-label="Abrir menu"
          className="md:hidden text-ink"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-cream/98 backdrop-blur border-t border-beige"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-ink-soft hover:text-nude-dark transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#produtos"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-nude-dark px-5 py-2.5 text-sm font-medium text-cream hover:bg-gold transition-colors"
              >
                <ShoppingBag size={15} />
                Comprar
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
