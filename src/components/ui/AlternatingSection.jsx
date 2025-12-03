import React from 'react';

const AlternatingSection = ({
  id,
  title,
  children,
  imageUrl,
  badge,
  reverse = false
}) => {
  return (
    <section id={id} className="ccib-section ccib-alt-section">
      <div className="ccib-container">
        <div
          className={`ccib-two-column ccib-alt-inner ${
            reverse ? 'ccib-alt-reverse' : ''
          }`}
        >
          <div
            className={`ccib-alt-text ${
              reverse ? 'ccib-alt-from-right' : 'ccib-alt-from-left'
            }`}
          >
            <h2 className="ccib-section-title">{title}</h2>
            <div className="ccib-alt-body">{children}</div>
          </div>

          <div className="ccib-alt-media">
            <div
              className="ccib-arabic-frame"
              style={{
                backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none'
              }}
            >
              {badge && <div className="ccib-arabic-frame-badge">{badge}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlternatingSection;
