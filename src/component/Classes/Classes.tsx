import { useTranslationStore } from '../../stores/useTranslationStore';
import translations from '../../assets/Text/translations.json';

import imgStrength   from '../../assets/images/model-images/DSC03478.jpeg';
import imgHiit       from '../../assets/images/model-images/28E04078-0262-4E10-9CF0-ED2C97004EDF.jpeg';
import imgYoga       from '../../assets/images/model-images/DSC03452.jpeg';
import imgFunctional from '../../assets/images/model-images/6996CCA2-350D-4069-8007-508D2D41375E.jpg';

import './Classes.scss';

const CLASS_IMAGES = [imgStrength, imgHiit, imgYoga, imgFunctional];

interface ClassCard {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: string;
  level: string;
}

export default function Classes() {
  const getText    = useTranslationStore(s => s.getText);
  const currentLang = useTranslationStore(s => s.currentLang);
  const isHebrew   = useTranslationStore(s => s.isHebrew);
  const langData   = (translations as any)[currentLang];

  const classItems: ClassCard[] = (langData?.classes?.items || []).map((item: any, i: number) => ({
    id: i + 1,
    name: item.name,
    description: item.description,
    image: CLASS_IMAGES[i] ?? CLASS_IMAGES[0],
    duration: item.duration,
    level: item.level,
  }));

  return (
    <section id="classes" className="classes" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="classes-container">
        <div className="section-header">
          <h2>{getText('classes.title')}</h2>
          <p>{getText('classes.description')}</p>
        </div>

        <div className="classes-grid">
          {classItems.map((cls) => (
            <div key={cls.id} className="class-card">
              <div className="class-card-image">
                <img src={cls.image} alt={cls.name} />
                <div className="class-card-image-overlay" />
              </div>
              <div className="class-card-body">
                <h3>{cls.name}</h3>
                <p className="class-description">{cls.description}</p>
                <div className="class-meta">
                  <span className="class-duration">⏱ {cls.duration}</span>
                  <span className="class-level">{cls.level}</span>
                </div>
                <button className="class-btn">{getText('classes.bookNow')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
