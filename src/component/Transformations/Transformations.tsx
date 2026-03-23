import { useTranslationStore } from '../../stores/useTranslationStore';
import translations from '../../assets/Text/translations.json';
import './Transformations.scss';

// Import images from before-after-images folder
import img1 from '../../assets/images/befor-after-images/6065865f-30d1-494e-a245-92824cd9aa1d.jpg';
import img2 from '../../assets/images/befor-after-images/7751bd9f-6dff-4698-976f-4e57b7322f31.jpg';
import img3 from '../../assets/images/befor-after-images/c58a58f7-2ac5-4056-b509-5e333cfadf08.jpg';
import img4 from '../../assets/images/befor-after-images/cb574bef-782e-4ed0-8d69-2d7bbd1887b0.jpg';

const IMAGES = [img1, img2, img3, img4];

export default function Transformations() {
  const getText = useTranslationStore(s => s.getText);
  const currentLang = useTranslationStore(s => s.currentLang);
  const isHebrew = useTranslationStore(s => s.isHebrew);
  const langData = (translations as any)[currentLang];
  const items = langData?.transformations?.items || [];

  return (
    <section id="transformations" className="transformations" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="transformations-container">
        <div className="transformations-heading">
          <h2>{getText('transformations.title')}</h2>
          <p>{getText('transformations.subtitle')}</p>
        </div>

        <div className="transformations-grid">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="transformation-card">
              <div className="image-container">
                <img src={IMAGES[idx]} alt={item.name} />
              </div>
              <div className="transformation-info">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="transformations-cta">
          <button className="cta-button">{getText('transformations.buttonLabel')}</button>
        </div> */}
      </div>
    </section>
  );
}
