import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="ccib-footer">
      <div className="ccib-container">
        <p>
          © {year} Centro Cultural Islâmico da Bahia (CCIB). Todos os direitos reservados.
        </p>
        <p>
          Desenvolvido com respeito e dedicação para a comunidade muçulmana e para todos que desejam
          conhecer o Islam.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
