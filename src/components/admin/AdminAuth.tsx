import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ADMIN_KEY = "sk_admin_session";
// Password disimpan di env variable Vercel: VITE_ADMIN_PASSWORD
// Fallback default untuk development (ganti di production!)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "sejarahkita2026";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_KEY);
    if (session === "true") setAuthenticated(true);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
}

export function AdminLoginGate({ children }: { children: React.ReactNode }) {
  const { authenticated, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (authenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <Card className={`border-border shadow-lg ${shake ? "animate-shake" : ""}`}>
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground mt-1">Masukkan password untuk melanjutkan</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password admin"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  className={`pl-10 pr-10 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  Password salah. Silakan coba lagi.
                </motion.p>
              )}

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Masuk
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              SejarahKita &copy; 2026
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
