"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";
import { Folder, Wallet } from "lucide-react";

type DashboardSummary = {
  totalProjects: number;
  creditsRemaining: number;
};

const DashboardMetrics = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalProjects: 0,
    creditsRemaining: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axios.get("/api/dashboard");

        if (!data.success) {
          throw new Error(data.message || "Failed to load dashboard data");
        }

        setSummary({
          totalProjects: data.totalProjects || 0,
          creditsRemaining: data.creditsRemaining || 0,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <section className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard
          icon={Folder}
          title="Total Projects"
          value={loading ? "..." : error ? "-" : summary.totalProjects}
        />
        <StatCard
          icon={Wallet}
          title="Credits Remaining"
          value={loading ? "..." : error ? "-" : summary.creditsRemaining}
        />
      </div>
    </section>
  );
};

export default DashboardMetrics;
