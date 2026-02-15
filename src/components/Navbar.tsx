import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback((path: string) => {
    setMobileOpen(false);
    if (path.includes("#")) {
      const [basePath, hash] = path.split("#");
      if (location.pathname === basePath || (basePath === "/" && location.pathname === "/")) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      navigate(basePath);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.pathname, navigate]);

  const links = [
    { name: "Beranda", path: "/" },
    { name: "Linimasa", path: "/#linimasa" },
    { name: "Peta", path: "/#peta" },
    { name: "Materi", path: "/artikel" },
    { name: "Tentang", path: "/tentang" },
  ];

  // On non-home pages or when scrolled, always show solid navbar
  const showSolid = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className={`w-5 h-5 ${showSolid ? "text-primary" : "text-gold"}`} />
          <span className={`font-display font-bold text-lg ${showSolid ? "text-foreground" : "text-parchment"}`}>
            SejarahKita
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isHash = link.path.includes("#");
            const isActive = link.path === location.pathname || (link.path === "/" && location.pathname === "/");
            return isHash ? (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`font-body text-sm transition-colors relative group ${
                  showSolid
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-parchment/70 hover:text-parchment"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${showSolid ? "bg-foreground" : "bg-parchment"} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body text-sm transition-colors relative group ${
                  showSolid
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-parchment/70 hover:text-parchment"
                } ${isActive ? "text-primary font-semibold" : ""}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${showSolid ? "bg-foreground" : "bg-parchment"} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            mobileOpen
              ? "bg-card text-foreground"
              : showSolid
                ? "text-foreground"
                : "text-parchment"
          }`}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu - speech bubble / cloud design */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-2 right-4 left-4 z-40"
          >
            {/* Bubble container */}
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Header with logo and close */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-display font-bold text-sm text-foreground">SejarahKita</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Nav links */}
              <div className="px-5 py-4 flex flex-col gap-1">
                {links.map((link, i) => {
                  const isHash = link.path.includes("#");
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {isHash ? (
                        <button
                          onClick={() => handleNavClick(link.path)}
                          className="w-full text-left font-body text-sm text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2.5 rounded-lg transition-colors"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block font-body text-sm px-3 py-2.5 rounded-lg transition-colors ${
                            isActive
                              ? "text-primary font-semibold bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Speech bubble tail/pointer */}
            <div className="absolute -top-1.5 right-6 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;