import { Header } from './landing/header';
import { Hero } from './landing/hero';
import { Features } from './landing/features';
import { Testimonials } from './landing/testimonials';
import { Pricing } from './landing/pricing';
import { Contact } from './landing/contact';
import { Footer } from './landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
