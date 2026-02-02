import HeroSection from "./_components/hero-section";
import PricingHomepage from "./_components/pricing-homepage";
import Features from "./_components/features-homepage";
import FAQHomepage from "./_components/faq-homepage";
import FooterHome from "./_components/footer-home";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <Features />
      <PricingHomepage />
      <FAQHomepage />
      <FooterHome />
    </main>
  );
}
