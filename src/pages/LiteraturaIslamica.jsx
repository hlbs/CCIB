// src/pages/LiteraturaIslamica.jsx
import React, { useState, useRef } from 'react';
import Section from '@components/ui/Section.jsx';

const BOOKS = [
  {
    id: 'mensagem-islam',
    title: 'A Mensagem do Islam',
    subtitle: 'Introdução clara e acessível à fé islâmica',
    description:
      'Um panorama conciso sobre os fundamentos da crença e da prática islâmica, pensado para quem está dando os primeiros passos no estudo do Islam.',
    pdfUrl: '/livros/mensagem-do-islam.pdf',
    coverUrl: '/images/livros/mensagem-do-islam.jpg',
  },
  {
    id: 'conceito-deus',
    title: 'O Conceito de Deus no Islam',
    subtitle: 'Tawhid: a unicidade divina em foco',
    description:
      'Explora a compreensão islâmica sobre Deus: único, absoluto, sem parceiros e acima de qualquer representação, aproximando fé, razão e espiritualidade.',
    pdfUrl: '/livros/o-conceito-de-deus-no-islam.pdf',
    coverUrl: '/images/livros/conceito-de-deus.jpg',
  },
  {
    id: 'jesus-profeta',
    title: 'Jesus: um Profeta do Islam',
    subtitle: 'Pontes entre o Islam e o cristianismo',
    description:
      'Apresenta como o Alcorão descreve Jesus (Isa), sua missão, seus milagres e a reverência que os muçulmanos têm por ele e por Maria.',
    pdfUrl: '/livros/jesus-um-profeta-do-islam.pdf',
    coverUrl: '/images/livros/jesus-profeta.jpg',
  },
  {
    id: 'vida-apos-morte',
    title: 'Vida Após a Morte',
    subtitle: 'Responsabilidade, justiça e esperança',
    description:
      'Discute a visão islâmica sobre o que acontece após a morte, o Juízo Final e o sentido de responsabilidade ética diante de Deus.',
    pdfUrl: '/livros/vida-apos-a-morte.pdf',
    coverUrl: '/images/livros/vida-apos-a-morte.jpg',
  },
  {
    id: 'proposito-vida',
    title: 'O Propósito da Vida',
    subtitle: 'Por que estamos aqui?',
    description:
      'Aborda questões existenciais centrais: sentido da vida, liberdade, responsabilidade e a busca por uma relação consciente com o Criador.',
    pdfUrl: '/livros/o-proposito-da-vida.pdf',
    coverUrl: '/images/livros/proposito-da-vida.jpg',
  },
  {
    id: 'quarenta-hadith',
    title: 'Os Quarenta Hadith',
    subtitle: 'Coletânea clássica de An-Nawawi',
    description:
      'Seleção de hadiths fundamentais que sintetizam princípios de fé, espiritualidade e ética, amplamente estudada em todo o mundo islâmico.',
    pdfUrl: '/livros/os-quarenta-hadith.pdf',
    coverUrl: '/images/livros/quarenta-hadith.jpg',
  },
  {
    id: 'elevacao-mulheres',
    title: 'Elevação da Condição das Mulheres',
    subtitle: 'Direitos, dignidade e espiritualidade',
    description:
      'Mostra como o Islam, desde suas origens, estabeleceu direitos espirituais, sociais e econômicos para as mulheres, valorizando sua dignidade.',
    pdfUrl: '/livros/elevacao-da-condicao-das-mulheres.pdf',
    coverUrl: '/images/livros/elevacao-mulheres.jpg',
  },
];

const LiteraturaIslamica = () => {
  const [activeId, setActiveId] = useState(BOOKS[0]?.id || null);
  const carouselRef = useRef(null);

  const activeBook =
    BOOKS.find((book) => book.id === activeId) || BOOKS[0];

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 260; // aprox. largura de 1–1,5 “bolinhas”
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    carouselRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <main className="ccib-page">
      <Section
        id="literatura-islamica"
        title="Literatura islâmica"
        description="Conheça a seleção de livros gratuitos do CCIB para estudo e aprofundamento. Todos os materiais estão disponíveis em PDF para leitura em qualquer dispositivo."
      >
        <div className="ccib-library">
          {/* Card principal da vitrine */}
          <div className="ccib-library-feature">
            <div className="ccib-library-feature-visual">
              <div className="ccib-library-orbit-circle" aria-hidden="true" />
              <div className="ccib-library-feature-cover-wrapper">
                {activeBook?.coverUrl ? (
                  <div
                    className="ccib-library-feature-cover"
                    style={{ backgroundImage: `url(${activeBook.coverUrl})` }}
                  />
                ) : (
                  <div className="ccib-library-feature-cover ccib-library-feature-cover--placeholder">
                    <span>PDF</span>
                  </div>
                )}
              </div>
            </div>

            <div className="ccib-library-feature-content">
              <span className="ccib-library-badge">Vitrine CCIB</span>
              <h2 className="ccib-library-feature-title">
                {activeBook?.title}
              </h2>
              {activeBook?.subtitle && (
                <p className="ccib-library-feature-subtitle">
                  {activeBook.subtitle}
                </p>
              )}
              <p className="ccib-library-feature-description">
                {activeBook?.description}
              </p>

              <div className="ccib-library-feature-actions">
                <a
                  href={activeBook?.pdfUrl}
                  className="ccib-btn ccib-btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Baixar PDF
                </a>
                <a
                  href={activeBook?.pdfUrl}
                  className="ccib-btn ccib-btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ler no navegador
                </a>
              </div>

              <p className="ccib-library-feature-meta">
                Downloads gratuitos para uso pessoal e estudo. Compartilhe o
                link do site para que outras pessoas também tenham acesso.
              </p>
            </div>
          </div>

          {/* Vitrine circular com botões laterais (reutilizando o estilo da timeline) */}
          <div className="ccib-library-carousel-wrapper">
            <button
              type="button"
              className="ccib-timeline-nav ccib-timeline-nav--left"
              aria-label="Ver livros anteriores"
              onClick={() => handleScroll('left')}
            >
              ‹
            </button>
            <button
              type="button"
              className="ccib-timeline-nav ccib-timeline-nav--right"
              aria-label="Ver próximos livros"
              onClick={() => handleScroll('right')}
            >
              ›
            </button>

            <div
              className="ccib-library-carousel"
              aria-label="Livros disponíveis para download"
              ref={carouselRef}
            >
              {BOOKS.map((book) => {
                const isActive = book.id === activeBook.id;
                return (
                  <button
                    key={book.id}
                    type="button"
                    className={`ccib-library-item ${
                      isActive ? 'ccib-library-item--active' : ''
                    }`}
                    onClick={() => setActiveId(book.id)}
                  >
                    <div className="ccib-library-item-thumb-wrapper">
                      <div
                        className="ccib-library-item-thumb"
                        style={
                          book.coverUrl
                            ? { backgroundImage: `url(${book.coverUrl})` }
                            : undefined
                        }
                      >
                        {!book.coverUrl && (
                          <span className="ccib-library-item-thumb-label">
                            PDF
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ccib-library-item-text">
                      <span className="ccib-library-item-title">
                        {book.title}
                      </span>
                      {book.subtitle && (
                        <span className="ccib-library-item-subtitle">
                          {book.subtitle}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default LiteraturaIslamica;
