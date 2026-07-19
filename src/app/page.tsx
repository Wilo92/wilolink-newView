import Hero from "@/components/Hero";
import TechCarousel from "@/components/TechCarousel";
import Services from "@/components/Services";

import Reviews from "@/components/Reviews";
import CallbackForm  from "@/components/CallbackForm";
import StatsAndProcess from "@/components/StatsAndProcess";
import ContactInfo from "@/components/ContactInfo";
import Projects from "@/components/Projects";
import WhyUs from "@/components/Whyus";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-16 bg-[#0a0e1a] md:h-25" />
      <Services />
      <WhyUs />
      <Projects />
     <StatsAndProcess />
      <Reviews />
      
      <CallbackForm />
      <ContactInfo />
      <TechCarousel />



    </>
  );

}