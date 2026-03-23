import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import ExperienceSection from '../sections/ExperienceSection';
import PortfolioSection from '../sections/PortfolioSection';
import ContactSection from '../sections/ContactSection';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <PortfolioSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  );
}
