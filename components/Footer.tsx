import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <nav className="flex gap-8">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              HOME
            </a>
            <a
              href="/contract"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              CONTRACT
            </a>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://github.com/lasttxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="h-10 w-10 rounded-full bg-foreground hover:bg-primary transition-all duration-200 flex items-center justify-center"
            >
              <Github className="h-5 w-5 text-background" />
            </a>

            <a
              href="https://twitter.com/lasttxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="h-10 w-10 rounded-full bg-foreground hover:bg-primary transition-all duration-200 flex items-center justify-center"
            >
              <Twitter className="h-5 w-5 text-background" />
            </a>

            <a
              href="https://linkedin.com/company/lasttxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="h-10 w-10 rounded-full bg-foreground hover:bg-primary transition-all duration-200 flex items-center justify-center"
            >
              <Linkedin className="h-5 w-5 text-background" />
            </a>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            copyright © 2025 @lasttxn
          </p>
          <h2 className="font-display text-6xl lg:text-7xl font-bold">
            LAST TXN
          </h2>
        </div>
      </div>
    </footer>
  );
}
