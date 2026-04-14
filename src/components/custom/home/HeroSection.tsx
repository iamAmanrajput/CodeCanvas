"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="w-full my-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row">
        {/* Right */}
        <div className="flex-1">
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              Build websites with <br />
              <span className="bg-linear-to-r from-customBlue via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Transform your ideas into stunning websites in seconds. <br />{" "}
              Write natural language descriptions and let AI generate <br />{" "}
              production-ready HTML and CSS code.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => router.push("/")}
            className="font-outfit group transition-all duration-300 bg-customBlue hover:bg-customBlue-hover mb-3"
          >
            Get Started{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="pt-6 border-t border-border/40">
            <p className="text-sm text-foreground/60 mb-4">
              Built for modern developers & creators
            </p>
            <div className="flex items-center gap-8 flex-wrap">
              <div className="text-sm font-semibold text-foreground/60">
                AI Powered
              </div>
              <div className="text-sm font-semibold text-foreground/60">
                Instant Preview
              </div>
              <div className="text-sm font-semibold text-foreground/60">
                No Code Required
              </div>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="flex-1 bg-linear-to-b from-customTeal to-customBlack rounded-t-3xl">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              {/* Animated Gradient Box */}
              <div className="w-24 h-24 mx-auto rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                <div className="text-4xl animate-pulse">
                  <Image src="/logo.svg" alt="logo" height={40} width={40} />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  Your AI Preview Will Appear Here
                </p>
                <p className="text-sm text-foreground/60">
                  Generate a website to see live preview instantly
                </p>
              </div>

              {/* Fake loading bars */}
              <div className="space-y-2 mt-4">
                <div className="h-2 w-40 mx-auto bg-white/10 rounded animate-pulse"></div>
                <div className="h-2 w-32 mx-auto bg-white/10 rounded animate-pulse"></div>
                <div className="h-2 w-24 mx-auto bg-white/10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
