import HeroSection from "@/components/sections/HeroSection";
import EfficiencySection from "@/components/sections/EfficiencySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EfficiencySection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
