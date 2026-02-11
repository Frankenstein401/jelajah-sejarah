import { BookOpen } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">SejarahKita</span>
        </div>
        <p className="text-muted-foreground font-body text-sm text-center">
          Belajar sejarah Indonesia dengan cara yang menyenangkan dan interaktif.
        </p>
        <p className="text-muted-foreground font-body text-xs">
          © 2026 SejarahKita
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
