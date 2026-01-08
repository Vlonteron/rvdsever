import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Statistics from '@/components/Statistics/Statistics';
import Products from '@/components/Products/Products';
import Suppliers from '@/components/Suppliers/Suppliers';
import Gallery from '@/components/Gallery/Gallery';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Statistics />
      <Products />
      <Suppliers />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
