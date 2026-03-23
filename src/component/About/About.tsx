import { useTranslationStore } from '../../stores/useTranslationStore';
import translations from '../../assets/Text/translations.json';

import imgEquipment  from '../../assets/images/model-images/IMG_5884.PNG';
import imgTrainer    from '../../assets/images/model-images/DSC03478.jpeg';
import imgPersonal   from '../../assets/images/model-images/DSC03452.jpeg';
import imgCommunity  from '../../assets/images/model-images/DSC03401.jpeg';

import './About.scss';

const FEATURE_IMAGES = [imgEquipment, imgTrainer, imgPersonal, imgCommunity];

export default function About() {
  const getText     = useTranslationStore(s => s.getText);
  const currentLang = useTranslationStore(s => s.currentLang);
  const isHebrew    = useTranslationStore(s => s.isHebrew);
  const langData    = (translations as any)[currentLang];

  const stats    = langData?.about?.stats    || [];
  const features = langData?.about?.features || [];

  return (
    <section id="about" className="about" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>{getText('about.title')}</h2>
            <p>{getText('about.text1')}</p>
            <p>{getText('about.text2')}</p>

            <div className="about-stats">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="stat">
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-features">
            {features.map((feature: any, i: number) => (
              <div key={i} className="feature-item">
                <div className="feature-img-wrap">
                  <img src={FEATURE_IMAGES[i] ?? FEATURE_IMAGES[0]} alt={feature.title} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>{getText('cta.title')}</h2>
          <p>{getText('cta.subtitle')}</p>
          <button className="cta-btn">{getText('cta.button')}</button>
        </div>
      </div>
    </section>
  );
}
