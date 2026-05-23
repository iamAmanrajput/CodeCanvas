import DashboardMetrics from "@/components/custom/dashboard/DashboardMetrics";
import ProjectHeader from "@/components/custom/dashboard/ProjectHeader";
import Projects from "@/components/custom/dashboard/Projects";
import Navbar from "@/components/custom/shared/Navbar";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <ProjectHeader />
        <DashboardMetrics />
        <Projects />
      </main>
    </>
  );
};

export default Dashboard;
