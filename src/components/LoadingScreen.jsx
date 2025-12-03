// src/components/LoadingScreen.jsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="ccib-loader-root">
      <div className="ccib-loader-overlay" />

      <div
        className="ccib-loader-content"
        role="status"
        aria-live="polite"
        aria-label="Carregando conteúdo do Centro Cultural Islâmico da Bahia"
      >
        <div className="ccib-loader-logo">
          <img
            src="/images/loader/bismillah.png"
            alt="Bismillah – Em nome de Allah, o Clemente, o Misericordioso"
          />
        </div>

        <p className="ccib-loader-arabic">
          بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <p className="ccib-loader-text">
          Em nome de Allah, o Clemente, o Misericordioso
        </p>

        <div className="ccib-loader-progress">
          <span />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
