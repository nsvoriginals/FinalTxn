// components/About.tsx
"use client";

export default function About() {
  return (
    <section className="w-full min-h-screen flex items-center px-6 lg:px-16 py-24">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left - About Text */}
          <div className="space-y-6">
            <h2 className="font-display text-[100px] sm:text-[140px] md:text-[160px] lg:text-[220px] font-bold leading-[0.85]">
              About
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
              Last Txn is decentralised asset inheritance system that works both 
              custodial and non custodial way to securely transfer funds to heirs
            </p>
          </div>

          {/* Right - Auto-playing Video */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/vid.mp4" type="video/mp4" />
              {/* Fallback */}
              <div className="flex items-center justify-center h-full">
                <span className="font-display text-4xl font-bold text-muted-foreground">
                  Video not supported
                </span>
              </div>
            </video>
          </div>
          
        </div>
      </div>
    </section>
  );
}
