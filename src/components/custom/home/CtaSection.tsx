"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CtaSection = () => {
  const router = useRouter();
  return (
    <section className="w-full py-10 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-4xl font-bold">Ready to build?</h2>
        <p className="text-xl max-w-2xl text-center">
          Join thousands of developers and designers using AI to create
          beautiful websites.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/")}
          className="font-outfit group transition-all duration-300 bg-customBlue hover:bg-customBlue-hover mb-3"
        >
          Start Building Now{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
