import { useTranslationStore } from '../../stores/useTranslationStore';
import vibeVideo from '../../assets/Videos/VibeVideo.mp4';
import './Hero.scss';

export default function Hero() {
  const getText = useTranslationStore(s => s.getText);
  const isHebrew = useTranslationStore(s => s.isHebrew);

  return (
    <section id="home" className="hero" dir={isHebrew ? 'rtl' : 'ltr'}>

      {/* Mobile only: full-screen video background */}
      <div className="hero-video-bg">
        <video autoPlay muted loop playsInline>
          <source src={vibeVideo} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">{getText('hero.title')}</h1>
          <p className="hero-subtitle">{getText('hero.subtitle')}</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">{getText('hero.buttons.getStarted')}</button>
            <button className="btn btn-secondary">{getText('hero.buttons.learnMore')}</button>
          </div>
        </div>

        {/* Desktop only: phone frame with video */}
        <div className="hero-phone-panel">
          <div className="hero-phone-frame">
            <video autoPlay muted loop playsInline>
              <source src={vibeVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
