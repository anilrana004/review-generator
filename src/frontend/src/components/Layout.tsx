import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="layout"
    >
      <header
        className="bg-card border-b border-border/60 shadow-sm sticky top-0 z-50"
        data-ocid="header"
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5" data-ocid="header.logo">
            <div className="w-7 h-7 rounded-md bg-primary/90 flex items-center justify-center flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 3h10v1.5c0 3.5-2.2 6.5-5 7.5C4.2 11 2 8 2 4.5V3z"
                  fill="currentColor"
                  fillOpacity="0.9"
                  className="text-primary-foreground"
                />
                <path
                  d="M5.5 6.5L6.5 7.5L8.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
              </svg>
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">
              REVIEW<span className="text-primary">CRAFT</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground font-body px-2 py-1 rounded-md bg-muted/60 border border-border/40">
              AI-powered review generator
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col" data-ocid="main">
        {children}
      </main>

      <footer
        className="bg-card border-t border-border/40 py-4"
        data-ocid="footer"
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
