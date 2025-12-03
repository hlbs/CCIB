import React from 'react';

const PageVideoHero = ({ title, subtitle, videoUrl }) => {
  return (
    <section className="ccib-page-video-hero" aria-label={title}>
      <div className="ccib-page-video-hero-inner">
        <div className="ccib-page-video-media">
          <video
            className="ccib-page-video-video"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="ccib-page-video-overlay">
            <div className="ccib-container">
              <div className="ccib-page-video-text">
                <h1 className="ccib-page-video-title">{title}</h1>
                {subtitle && (
                  <p className="ccib-page-video-subtitle">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageVideoHero;
