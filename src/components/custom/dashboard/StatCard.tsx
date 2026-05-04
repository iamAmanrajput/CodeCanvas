import React from "react";
import { HelpCircle } from "lucide-react";

interface StatCardProps {
  icon?: React.ElementType;
  title?: string;
  value?: string | number;
  Color: {
    bg: string;
    text: string;
  };
}

const StatCard = ({
  icon: Icon = HelpCircle,
  title = "Stat Title",
  value = "15",
  Color,
}: StatCardProps) => {
  return (
    <div className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex items-center justify-between overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-white/20">
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent blur-xl" />

      {/* Content */}
      <div className="flex items-center gap-4 z-10">
        {/* Icon */}
        <div className={`p-3 rounded-xl border ${Color.bg} shadow-inner`}>
          <Icon className={`w-6 h-6 ${Color.text}`} />
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mt-1 tracking-wide">{title}</p>
        </div>
      </div>

      {/* Right subtle decoration */}
      <div className="text-white/5 text-6xl font-bold select-none">{value}</div>
    </div>
  );
};

export default StatCard;
