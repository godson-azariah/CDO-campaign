import ContactSection from "@/components/ContactSection";
import FancyAChat from "@/components/FancyAChat";
import Hero from "@/components/Hero";
import OurOffices from "@/components/OurOffices";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <ContactSection />
        <OurOffices />
        <FancyAChat />
      </main>

      <SiteFooter />
    </>
  );
}
