import React from 'react';
import { Link } from 'react-router-dom';

const InfoCard = ({ title, description, to }) => {
  return (
    <article className="ccib-card">
      <div className="ccib-card-body">
        <h3 className="ccib-card-title">{title}</h3>
        <p className="ccib-card-description">{description}</p>
      </div>
      {to && (
        <footer className="ccib-card-footer">
          <Link to={to} className="ccib-card-link">
            Saiba mais
          </Link>
        </footer>
      )}
    </article>
  );
};

export default InfoCard;
