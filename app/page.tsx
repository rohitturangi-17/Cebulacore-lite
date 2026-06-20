import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { CloudComparison } from "@/components/landing/cloud-comparison";
import { AIWorkflow } from "@/components/landing/ai-workflow";
import { Testimonials } from "@/components/landing/testimonials";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { AmbientBackground } from "@/components/shared/ambient-background";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-background">
      <AmbientBackground />
      <Hero />
      <Features />
      <CloudComparison />
      <AIWorkflow />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
