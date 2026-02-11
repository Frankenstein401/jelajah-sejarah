import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Beranda", "Linimasa", "Materi", "Tentang"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <BookOpen className={`w-5 h-5 ${scrolled ? "text-primary" : "text-gold"}`} />
          <span className={`font-display font-bold text-lg ${scrolled ? "text-foreground" : "text-parchment"}`}>
            SejarahKita
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className={`font-body text-sm transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-parchment/70 hover:text-parchment"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? (
            <X className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-parchment"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-parchment"}`} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
