import { BookOpen, Mail, Globe, Clock, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FooterSection = () => {
  const quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Linimasa Sejarah", href: "/#linimasa" },
    { label: "Jelajahi Materi", href: "/artikel" },
    { label: "Tentang Kami", href: "/tentang" },
  ];

  const topics = [
    { label: "Kerajaan Hindu-Buddha", href: "/artikel" },
    { label: "Kesultanan Islam", href: "/artikel" },
    { label: "Masa Kolonialisme", href: "/artikel" },
    { label: "Kemerdekaan Indonesia", href: "/artikel" },
  ];

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-[hsl(25,20%,10%)] border-t border-[hsl(25,15%,18%)] text-[hsl(35,25%,80%)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 rounded-lg bg-[hsl(36,80%,50%)] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[hsl(25,20%,10%)]" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-[hsl(35,30%,97%)] leading-none block">
                  SejarahKita
                </span>
                <span className="text-[10px] tracking-widest text-[hsl(36,80%,50%)] uppercase font-body">
                  Warisan Nusantara
                </span>
              </div>
            </Link>
            <p className="font-body text-sm leading-relaxed text-[hsl(35,15%,60%)] max-w-[220px]">
              Platform pembelajaran sejarah Indonesia yang interaktif dan menyenangkan untuk semua kalangan.
            </p>
            <div className="flex gap-3 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-md bg-[hsl(25,15%,18%)] hover:bg-[hsl(36,80%,50%)] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-[hsl(35,25%,70%)]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-[hsl(35,30%,97%)] text-sm tracking-wide">
              Tautan Cepat
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="font-body text-sm text-[hsl(35,15%,60%)] hover:text-[hsl(36,80%,50%)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-[hsl(35,30%,97%)] text-sm tracking-wide">
              Topik Populer
            </h4>
            <ul className="flex flex-col gap-2">
              {topics.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="font-body text-sm text-[hsl(35,15%,60%)] hover:text-[hsl(36,80%,50%)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-[hsl(35,30%,97%)] text-sm tracking-wide">
              Informasi
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[hsl(36,80%,50%)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-xs text-[hsl(35,30%,97%)] font-medium">Email</p>
                  <p className="font-body text-xs text-[hsl(35,15%,60%)]">sejarahkita@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-[hsl(36,80%,50%)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-xs text-[hsl(35,30%,97%)] font-medium">Website</p>
                  <p className="font-body text-xs text-[hsl(35,15%,60%)]">sejarahkita.vercel.app</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[hsl(36,80%,50%)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-xs text-[hsl(35,30%,97%)] font-medium">Diperbarui</p>
                  <p className="font-body text-xs text-[hsl(35,15%,60%)]">Konten terbaru 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[hsl(36,80%,50%)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-xs text-[hsl(35,30%,97%)] font-medium">Lokasi</p>
                  <p className="font-body text-xs text-[hsl(35,15%,60%)]">Indonesia 🇮🇩</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[hsl(25,15%,18%)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[hsl(35,15%,45%)]">
            © 2026 SejarahKita. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="font-body text-xs text-[hsl(35,15%,45%)] hover:text-[hsl(36,80%,50%)] transition-colors">
              Kebijakan Privasi
            </Link>
            <Link to="#" className="font-body text-xs text-[hsl(35,15%,45%)] hover:text-[hsl(36,80%,50%)] transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;