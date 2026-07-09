import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Aerial } from "@/components/Aerial";
import { StockFootageSection } from "@/components/StockFootageSection";
// import { Testimonials } from "@/components/Testimonials"; // archived
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Ticker } from "@/components/Ticker";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("intro_done") === "true";
    }
    return false;
  });

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem("intro_done", "true");
  };

  return (
    <main className="relative bg-white min-h-screen">
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <Aerial />
      <StockFootageSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
