import {
  Brain,
  Code2,
  Coins,
  PenLine,
  Palette,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WandSparkles,
  Workflow,
} from "lucide-react";
import type { ElementType } from "react";

const features = [
  {
    title: "AI Website Generation",
    description:
      "Generate complete websites from simple prompts in seconds with a polished starting point.",
    icon: Sparkles,
    accent: "from-customBlue/25 to-cyan-400/10",
  },
  {
    title: "Inline Editing",
    description:
      "Edit text, sections, and components directly without regenerating through AI.",
    icon: PenLine,
    accent: "from-emerald-400/20 to-customBlue/10",
  },
  {
    title: "Save AI Tokens",
    description:
      "Reduce token usage and cost by making small UI changes inline instead of asking AI again.",
    icon: Coins,
    accent: "from-amber-400/20 to-orange-400/10",
  },
  {
    title: "Fast Iteration",
    description:
      "Make changes instantly and keep your build loop short, simple, and efficient.",
    icon: Rocket,
    accent: "from-fuchsia-400/20 to-customBlue/10",
  },
  {
    title: "Secure Platform",
    description:
      "Keep user projects and data protected with secure infrastructure and authenticated access.",
    icon: ShieldCheck,
    accent: "from-customBlue/20 to-sky-400/10",
  },
  {
    title: "Easy to Use",
    description:
      "A beginner-friendly workflow that keeps the interface simple and easy to understand.",
    icon: WandSparkles,
    accent: "from-violet-400/20 to-customBlue/10",
  },
  {
    title: "Real-time Preview",
    description:
      "See updates instantly while editing so you can move faster with fewer mistakes.",
    icon: SearchCheck,
    accent: "from-teal-400/20 to-customBlue/10",
  },
  {
    title: "Responsive Design",
    description:
      "Generated websites adapt cleanly across mobile, tablet, and desktop screens.",
    icon: Smartphone,
    accent: "from-blue-400/20 to-indigo-400/10",
  },
  {
    title: "Code Export",
    description:
      "Export clean, production-ready code when you want to take your project elsewhere.",
    icon: Code2,
    accent: "from-lime-400/20 to-customBlue/10",
  },
  {
    title: "Project Management",
    description:
      "Manage multiple generated projects in one place with a simple dashboard workflow.",
    icon: Workflow,
    accent: "from-customBlue/20 to-slate-300/10",
  },
  {
    title: "Modern Styling",
    description:
      "Use polished gradients, premium spacing, and a consistent dark visual language.",
    icon: Palette,
    accent: "from-customBlue/20 to-cyan-300/10",
  },
  {
    title: "Smart Assistance",
    description:
      "Combine AI help with direct editing so the platform stays flexible and efficient.",
    icon: Brain,
    accent: "from-rose-400/20 to-customBlue/10",
  },
];

type FeatureIcon = ElementType<{ className?: string }>;

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-customBlack text-customGray">
      <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-customTeal/70 via-customBlack to-customBlack">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,179,255,0.18),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex items-center rounded-full border border-customBlue/30 bg-customBlue/10 px-4 py-1 text-sm text-customBlue">
              Premium AI website generator features
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-customWhite sm:text-5xl lg:text-6xl">
              Build faster with AI generation and inline editing.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-customGray sm:text-lg">
              Generate websites from prompts, edit content directly, save AI
              tokens, and keep your workflow fast with a modern dark SaaS
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon as FeatureIcon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-linear-to-b from-customTeal to-customBlack p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-customBlue/40 hover:shadow-[0_20px_60px_rgba(45,179,255,0.12)]"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-customBlue transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-customWhite">
                      {feature.title}
                    </h2>
                    <p className="text-sm leading-6 text-customGray">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-3xl border border-border/40 bg-linear-to-r from-customTeal via-customBlack to-customTeal p-8 sm:p-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-bold text-customWhite sm:text-3xl">
              A simple workflow that feels premium.
            </h2>
            <p className="text-sm leading-7 text-customGray sm:text-base">
              Keep the codebase easy to debug: one data array, one card pattern,
              and a consistent dark theme using the same palette from
              global.css.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
