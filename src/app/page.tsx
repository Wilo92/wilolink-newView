import Hero from "@/components/Hero";
import TechCarousel from "@/components/TechCarousel";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import StatsSection from "@/components/StatsSection";
import Reviews from "@/components/Reviews";
import CallbackForm  from "@/components/CallbackForm";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-16 bg-[#0a0e1a] md:h-25" />
      <Services />
      <ProcessTimeline />
      <StatsSection />
      <Reviews />
      <CallbackForm />
      <TechCarousel />



    </>
  );

}