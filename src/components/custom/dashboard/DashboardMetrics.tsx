import React from "react";
import StatCard from "./StatCard";
import { Folder } from "lucide-react";
import { generateColor } from "@/helpers/color-function";

const DashboardMetrics = () => {
  return (
    <section className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard
          icon={Folder}
          title="Total Projects"
          Color={generateColor()}
        />
        <StatCard
          icon={Folder}
          title="Credits Remaining"
          Color={generateColor()}
        />
      </div>
    </section>
  );
};

export default DashboardMetrics;
