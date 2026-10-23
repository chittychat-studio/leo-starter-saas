import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { ScrollMotion } from "@/components/scroll-motion";
import { site } from "@/config/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    description: site.description,
    applicationCategory: "BusinessApplication",
    url: site.url,
    offers: site.pricing.tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.monthly,
      priceCurrency: "USD",
    })),
  };

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <ScrollMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
