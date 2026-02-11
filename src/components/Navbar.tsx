import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Beranda", path: "/" },
    { name: "Linimasa", path: "/#linimasa" },
    { name: "Materi", path: "/artikel" },
    { name: "Tentang", path: "/tentang" },
  ];

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
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className={`w-5 h-5 ${scrolled ? "text-primary" : "text-gold"}`} />
          <span className={`font-display font-bold text-lg ${scrolled ? "text-foreground" : "text-parchment"}`}>
            SejarahKita
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-sm transition-colors relative group ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-parchment/70 hover:text-parchment"
              } ${location.pathname === link.path ? "text-primary font-semibold" : ""}`}
            >
              {link.name}
              {/* Active indicator */}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Hover underline */}
              <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? "bg-foreground" : "bg-parchment"} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </Link>
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
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body text-sm hover:text-foreground py-2 transition-colors ${
                  location.pathname === link.path 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;