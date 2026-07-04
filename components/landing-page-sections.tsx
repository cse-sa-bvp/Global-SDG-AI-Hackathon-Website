import OrganizedBySection from "@/components/landing-page-sections/organized-by-section";
import WhyHackathonSection from "@/components/landing-page-sections/why-hackathon-section";
import TracksSection from "@/components/landing-page-sections/tracks-section";
import JourneySection from "@/components/landing-page-sections/journey-section";
import WhyParticipateSection from "@/components/landing-page-sections/why-participate-section";
import CountdownSection from "@/components/landing-page-sections/countdown-section";
import PrizePoolSection from "@/components/landing-page-sections/prize-pool-section";
import AboutBvSection from "@/components/landing-page-sections/about-bv-section";
import SponsorsSection from "@/components/landing-page-sections/sponsors-section";
import FaqSection from "@/components/landing-page-sections/faq-section";
import FinalCtaSection from "@/components/landing-page-sections/final-cta-section";
import ContactSection from "@/components/landing-page-sections/contact-section";

export default function LandingPageSections() {
  return (
    <>
      <OrganizedBySection />
      <WhyHackathonSection />
      <TracksSection />
      <JourneySection />
      <WhyParticipateSection />
      <CountdownSection />
      <PrizePoolSection />
      <AboutBvSection />
      <SponsorsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </>
  );
}