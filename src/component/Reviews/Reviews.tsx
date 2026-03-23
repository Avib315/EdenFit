import { useState, useEffect, useRef } from 'react';
import messages from '../../assets/Text/messeages.json';
import logo from '../../assets/images/logo.png';
import './Reviews.scss';

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Start animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Reveal messages one-by-one
  useEffect(() => {
    if (!hasStarted || visibleCount >= messages.length) return;
    const delay = visibleCount === 0 ? 400 : 600;
    const timer = setTimeout(() => setVisibleCount(prev => prev + 1), delay);
    return () => clearTimeout(timer);
  }, [hasStarted, visibleCount]);

  // Auto-scroll chat body as new messages appear
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const isTyping = hasStarted && visibleCount < messages.length;

  return (
    <section id="reviews" className="reviews-section" ref={sectionRef} dir="rtl">
      <div className="reviews-container">
        <div className="reviews-heading">
          <h2>מה הלקוחות אומרות</h2>
          <p>חוויות אמיתיות מהסטודיו</p>
        </div>

        <div className="whatsapp-phone">
          {/* Status bar */}
          <div className="wa-status-bar">
            <span>9:41</span>
            <span className="wa-status-icons">●●●</span>
          </div>

          {/* Chat header */}
          <div className="wa-header">
            <div className="wa-back">‹</div>
            <img src={logo} alt="EdenFit" className="wa-avatar" />
            <div className="wa-contact-info">
              <span className="wa-contact-name">Eden Fit</span>
              <span className="wa-contact-status">
                {isTyping ? 'מקלידה...' : 'מחובר'}
              </span>
            </div>
          </div>

          {/* Messages body */}
          <div className="wa-body" ref={bodyRef}>
            <div className="wa-date-badge">היום</div>

            {messages.slice(0, visibleCount).map((msg, i) => (
              <div key={msg.id} className="wa-message wa-received" style={{ animationDelay: `${i * 0.05}s` }}>
                <p>{msg.message}</p>
                <span className="wa-time">✓✓</span>
              </div>
            ))}

            {isTyping && (
              <div className="wa-typing-bubble">
                <span /><span /><span />
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="wa-input-bar">
            <div className="wa-input-field">הקלידי הודעה</div>
            <button className="wa-send-btn">➤</button>
          </div>
        </div>
      </div>
    </section>
  );
}
