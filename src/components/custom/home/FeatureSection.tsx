import React from "react";
import {
  Sparkles,
  Paintbrush,
  Brain,
  Download,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Generation",
    description:
      "Describe what you want and let AI generate clean, production-ready code instantly.",
    icon: Sparkles,
  },
  {
    title: "Live Preview",
    description:
      "See your website update in real-time as you modify the code in our Monaco editor.",
    icon: Paintbrush,
  },
  {
    title: "Smart Editing",
    description:
      "Edit and customize your website with intelligent suggestions and auto improvements.",
    icon: Brain,
  },
  {
    title: "Download & Export",
    description:
      "Export your website as a complete ZIP file ready to deploy anywhere.",
    icon: Download,
  },
  {
    title: "Iterative Chat",
    description:
      "Chat with AI to refine and improve your design through natural conversation.",
    icon: MessageCircle,
  },
  {
    title: "Fast & Reliable",
    description:
      "Powered by cutting-edge AI models for quick and accurate code generation.",
    icon: Rocket,
  },
];

const colors = [
  {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export const generateColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const FeatureSection = () => {
  return (
    <section className="w-full bg-linear-to-br from-customTeal via-customBlack to-customTeal py-10 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-customWhite">
            Powerful Features
          </h1>
          <p className="font-bold">
            Everything you need to create amazing websites
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => {
            let generatedColor = generateColor();
            return (
              <Card key={index} className="bg-background/50 border-border/40">
                <CardHeader>
                  <div
                    className={`w-10 h-10 rounded-lg ${generatedColor.bg} flex items-center justify-center text-accent mb-4`}
                  >
                    {<feature.icon className={`${generatedColor.text}`} />}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
