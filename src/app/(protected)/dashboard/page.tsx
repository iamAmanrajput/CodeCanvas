import DashboardMetrics from "@/components/custom/dashboard/DashboardMetrics";
import ProjectHeader from "@/components/custom/dashboard/ProjectHeader";
import Navbar from "@/components/custom/shared/Navbar";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <ProjectHeader />
        <DashboardMetrics />
      </main>
    </>
  );
};

export default Dashboard;
