import Hero from '../../component/Hero/Hero';
import Classes from '../../component/Classes/Classes';
import About from '../../component/About/About';
import Reviews from '../../component/Reviews/Reviews';
import ContactUs from '../../component/ContactUs/ContactUs';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Classes />
      <About />
      <Reviews />
      <ContactUs />
    </div>
  );
}
