import Footer from "@/components/custom/shared/Footer";
import Navbar from "@/components/custom/shared/Navbar";
import CtaSection from "@/components/custom/home/CtaSection";
import FeatureSection from "@/components/custom/home/FeatureSection";
import HeroSection from "@/components/custom/home/HeroSection";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="w-full ">
        <HeroSection />
        <FeatureSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
