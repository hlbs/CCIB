// src/layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@components/Header.jsx';
import Footer from '@components/Footer.jsx';

const MainLayout = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Sempre que a rota mudar, volta para o topo
    window.scrollTo(0, 0);

    // E mostra o loader
    setShowLoader(true);

    // Mantém o loader visível por até 3 segundos
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3000 ms = 3s

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showLoader && (
        <div
          className="ccib-loader-root"
          role="status"
          aria-live="polite"
          aria-label="Carregando conteúdo"
        >
          {/* véu suave */}
          <div className="ccib-loader-overlay" />

          {/* card central */}
          <div className="ccib-loader-content">
            <div className="ccib-loader-logo">
              <img
                src="/images/loader/bismillah.png"
                alt="بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
              />
            </div>

            <p className="ccib-loader-text">
              Em nome de Allah, o Clemente, o Misericordioso.
            </p>

            <div className="ccib-loader-progress">
              <span />
            </div>
          </div>
        </div>
      )}

      <Header />
      <main className="ccib-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;