import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

const HERO_VIDEOS = [
  {
    src: 'videos/hero/video-hero02.mp4',
    alt: 'Páginas do Alcorão sendo folheadas',
  },
  {
    src: 'videos/hero/video-hero01.mp4',
    alt: 'Tecidos e detalhes no interior de uma mesquita',
  },
  {
    src: 'videos/hero/video-hero07.mp4',
    alt: 'Paisagem tranquila com horizonte ao fundo',
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotaciona os vídeos a cada 5 segundos com crossfade
  useEffect(() => {
    const intervalId = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % HERO_VIDEOS.length),
      5000
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="ccib-hero ccib-hero--video">
      {/* BACKGROUND DE VÍDEO EM TELA CHEIA */}
      <div className="ccib-hero-bg" aria-hidden="true">
        {HERO_VIDEOS.map((video, index) => (
          <video
            key={video.src}
            className={`ccib-hero-bg-video ${
              index === activeIndex ? 'ccib-hero-bg-video--active' : ''
            }`}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ))}
        <div className="ccib-hero-bg-overlay" />
      </div>

      {/* CONTEÚDO POR CIMA DO VÍDEO */}
      <div className="ccib-container ccib-hero-inner">
        <div className="ccib-hero-text-panel">
          <div className="ccib-hero-kicker">
            CENTRO CULTURAL ISLÂMICO DA BAHIA
          </div>
          <h1 className="ccib-hero-title">
            Conhecimento, espiritualidade e islamismo em Salvador.
          </h1>
          <p className="ccib-hero-subtitle">
            O CCIB é um espaço aberto para quem deseja aprender sobre o Islam,
            fortalecer a fé e construir pontes de respeito entre diferentes
            comunidades.
          </p>

          <div className="ccib-hero-actions">
            <Button to="/conheca-o-islam">Conheça o Islam</Button>
            <Button to="/contato">
              Fale com o CCIB
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
