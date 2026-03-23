import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslationStore } from '../../stores/useTranslationStore';
import logo from '../../assets/images/logo.png';
import './Header.scss';

export default function Header() {
  const getText = useTranslationStore(s => s.getText);
  const isHebrew = useTranslationStore(s => s.isHebrew);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) setIsDarkMode(savedMode === 'dark');
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('dark-mode', isDarkMode);
    body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = [
    { href: '#home',    label: getText('header.nav.home') },
    { href: '#classes', label: getText('header.nav.classes') },
    { href: '#about',   label: getText('header.nav.about') },
  ];

  return (
    <header
      className={`header${isScrolled ? ' header--scrolled' : ''}${menuOpen ? ' header--open' : ''}`}
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="EdenFit" className="header-logo-img" />
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <Link to="/" className="nav-link nav-link-cta">{getText('header.nav.joinNow')}</Link>
        </nav>

        {/* Mobile controls */}
        <div className="header-mobile-controls">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <nav className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/"
          className="mobile-nav-link mobile-nav-link-cta"
          onClick={() => setMenuOpen(false)}
        >
          {getText('header.nav.joinNow')}
        </Link>
      </nav>
    </header>
  );
}
