// components/Footer.tsx
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full rounded-4xl border-t bg-primary border mt-auto">
      <div className="container mx-auto rounded-xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl px-24">
          
          {/* Left side - Navigation Links */}
          <div className="flex flex-col gap-2">
            <a 
              href="/" 
              className="text-foreground hover:text-white transition-colors font-medium"
            >
              HOME
            </a>
            <a 
              href="/contract" 
              className="text-foreground hover:text-white transition-colors font-medium"
            >
              CONTRACT
            </a>
          </div>

          {/* Right side - Social Links */}
          <div>
            <div className="flex gap-4">
              {/* GitHub - Filled */}
              <a
                href="https://github.com/lasttxn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-12 w-12 rounded-full bg-foreground hover:bg-white transition-all duration-200 flex items-center justify-center group"
              >
                <Github className="h-5 w-5 text-primary group-hover:text-primary transition-colors fill-current" />
              </a>
              
              {/* Twitter/X - Filled */}
              <a
                href="https://twitter.com/lasttxn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="h-12 w-12 rounded-full bg-foreground hover:bg-white transition-all duration-200 flex items-center justify-center group"
              >
                <Twitter className="h-5 w-5 text-primary group-hover:text-primary transition-colors fill-current" />
              </a>

              {/* LinkedIn - Filled */}
              <a
                href="https://linkedin.com/company/lasttxn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-12 w-12 rounded-full bg-foreground hover:bg-white transition-all duration-200 flex items-center justify-center group"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:text-primary transition-colors fill-current" />
              </a>
            </div>

            <p className="text-md mt-24 text-foreground">
              copyright © 2025 @lasttxn
            </p>
          </div>
        </div>

        {/* Large Brand Name */}
        <div className="flex flex-col  items-center gap-2">
          <h2 className="font-display  text-[275px] font-bold">
            LAST TXN
          </h2>
        </div>
      </div>
    </footer>
  );
}
