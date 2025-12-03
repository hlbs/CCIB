import React from 'react';

const Section = ({ id, title, description, children }) => {
  return (
    <section id={id} className="ccib-section">
      <div className="ccib-container">
        {(title || description) && (
          <header className="ccib-section-header">
            {title && <h2 className="ccib-section-title">{title}</h2>}
            {description && <p className="ccib-section-description">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
