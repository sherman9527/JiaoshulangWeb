import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import SecuritySection from '../components/SecuritySection';
import CompareSection from '../components/CompareSection';
import PricingSection from '../components/PricingSection';
import TestimonialSection from '../components/TestimonialSection';
import GuideSection from '../components/GuideSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <SecuritySection />
        <CompareSection />
        <PricingSection />
        <TestimonialSection />
        <GuideSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
