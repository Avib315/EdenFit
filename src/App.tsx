import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/component/Header/Header';
import HomePage from '@/pages/HomePage/HomePage';
import DevPage from '@/pages/DevPage/DevPage';
import { useTranslationStore } from '@/stores/useTranslationStore';

import './App.scss';

function App() {
  const isHebrew = useTranslationStore(s => s.isHebrew);

  useEffect(() => {
    document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
    document.documentElement.lang = isHebrew ? 'he' : 'en';
  }, [isHebrew]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dev" element={<DevPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
