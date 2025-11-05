"use client";

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Key, Zap, Lock, Fingerprint } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const rightSection = document.querySelector('.features-right') as HTMLElement;
      
      if (!rightSection) return;

      const rightHeight = rightSection.scrollHeight;

      ScrollTrigger.create({
        trigger: '.features-container',
        start: 'top top',
        end: () => `+=${rightHeight}`,
        pin: '.features-left',
        pinSpacing: false,
      });

      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card) => {
        gsap.fromTo(card, 
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [] });

  const features = [
    {
      icon: Shield,
      title: "Trustless Smart Contracts",
      description: "Fully decentralized escrow system powered by Solana's high-performance blockchain"
    },
    {
      icon: Clock,
      title: "Time-locked Inheritance",
      description: "Automated asset transfer based on customizable time conditions and heartbeat checks"
    },
    {
      icon: Key,
      title: "Multi-Signature Security",
      description: "Enhanced protection with optional multi-sig verification for beneficiary access"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Lightning-fast transactions leveraging Solana's sub-second finality"
    },
    {
      icon: Lock,
      title: "Non-Custodial Control",
      description: "You maintain full ownership of your assets until inheritance conditions are met"
    },
    {
      icon: Fingerprint,
      title: "Proof of Life Protocol",
      description: "Configurable check-in system to verify account holder activity"
    }
  ];

  return (
    <div ref={container} className="relative">
      <div className="hidden lg:block">
        <div className="features-container flex">
          <div className="features-left w-[40vw] h-screen flex items-center relative z-50">
            <div className="p-8 lg:p-16">
              <h2 className="font-display text-[120px] xl:text-[180px] font-bold mb-8 leading-[0.9]">
                Features
              </h2>
              
              <p className="text-xl xl:text-2xl leading-relaxed max-w-lg">
                Building trustless inheritance through advanced Solana smart contracts — 
                ensuring your digital assets remain secure, autonomous, and fully in your control.
              </p>
            </div>
          </div>

          <div className="features-right w-[60vw] pl-48">
            <div className="py-24 px-8 lg:px-16 space-y-[100vh]">
              {features.map((feature, index) => (
                <div key={index} className="feature-card h-screen flex items-center">
                  <div className="relative w-full max-w-2xl">
                    <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl" />
                    
                    <div className="relative bg-card border-2 border-foreground rounded-3xl p-10 hover:border-primary transition-all duration-300">
                      <feature.icon className="h-14 w-14 text-primary mb-6" />
                      
                      <h3 className="font-display text-4xl xl:text-5xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-6 py-24 space-y-16">
        <div className="text-center">
          <h2 className="font-display text-6xl md:text-8xl font-bold mb-6">
            Features
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Building trustless inheritance through advanced Solana smart contracts — 
            ensuring your digital assets remain secure, autonomous, and fully in your control.
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-md" />
              
              <div className="relative bg-card border-2 border-foreground rounded-2xl p-8 hover:border-primary transition-all duration-300">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                
                <h3 className="font-display text-3xl font-bold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
