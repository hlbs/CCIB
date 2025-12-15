// src/pages/LiteraturaIslamica.jsx
import React, { useState, useRef } from 'react';
import Section from '@components/ui/Section.jsx';

const BOOKS = [
  {
    id: 'alcorao-sagrado',
    title: 'Os Significados dos Versículos do Alcorão Sagrado',
    subtitle: 'Tradução para o português pelo Prof. Samir El Hayek',
    description:
      'Edição em português dos significados do Alcorão, publicada no contexto do projeto de distribuição gratuita da FAMBRAS, com a tradução do Prof. Samir El Hayek, escolhida e elogiada por especialistas. ',
    pdfUrl: '/livros/alcorao-sagrado.pdf',
    coverUrl: '/images/livros/alcorao-sagrado.png',
  },
  {
    id: 'muhammad-mensageiro-de-deus',
    title: 'Muhammad, o Mensageiro de Deus',
    subtitle: 'Vida, caráter, ética e evidências da missão profética | Autor: Abdurrahman al-Sheha',
    description:
      'Introdução acessível à biografia do Profeta Muhammad, cobrindo sua linhagem, nascimento, descrição, atitudes e ética, além de argumentos e evidências (textuais e intelectuais) sobre sua missão e a Mensagem do Islam.',
    pdfUrl: '/livros/muhammad-o-mensageiro-de-Deus.pdf',
    coverUrl: '/images/livros/muhammad-o-mensageiro-de-Deus.png',
  },
  {
    id: 'mensagem-islam',
    title: 'A Mensagem do Islam',
    subtitle: 'Introdução clara e acessível à fé islâmica | Autor: Dr. Aji I. Arfaj',
    description:
      'Um panorama conciso sobre os fundamentos da crença e da prática islâmica, pensado para quem está dando os primeiros passos no estudo do Islam.',
    pdfUrl: '/livros/mensagem-do-islam.pdf',
    coverUrl: '/images/livros/mensagem-do-islam.png',
  },
  {
    id: 'meu-grande-amor-por-jesus',
    title: 'Meu Grande Amor Por Jesus Me Conduziu Ao Islam',
    subtitle: 'Relato de conversão e reflexões entre cristianismo e Islam | Autor: Simon Alfredo Caraballo A.Maria.A ',
    description:
      'Um testemunho pessoal de quem foi educado no catolicismo e, após estudos e questionamentos, abraça o Islam. O livro discute a autenticidade das escrituras, a mensagem do Alcorão e temas centrais como Deus, Jesus, Maria e a vida após a morte.',
    pdfUrl: '/livros/meu-grande-amor-por-jesus-me-conduziu-ao-islam.pdf',
    coverUrl: '/images/livros/meu-grande-amor-por-jesus-me-conduziu-ao-islam.png',
  },
  {
    id: 'jesus-profeta',
    title: 'Jesus: um Profeta do Islam',
    subtitle: 'Pontes entre o Islam e o cristianismo | Autor: Muhammad Ata ur-Rahim',
    description:
      'Apresenta como o Alcorão descreve Jesus (Isa), sua missão, seus milagres e a reverência que os muçulmanos têm por ele e por Maria.',
    pdfUrl: '/livros/jesus-um-profeta-do-islam.pdf',
    coverUrl: '/images/livros/jesus-profeta.png',
  },
  {
    id: 'maria-no-islam',
    title: 'Maria no Islam',
    subtitle: 'A mãe de Jesus (Mariam) à luz do Alcorão | Autor: M. Abdulsalam ',
    description:
      'Apresenta a posição especial de Maria no Islam, destacando sua devoção, castidade e a narrativa corânica sobre sua vida e o nascimento virginal de Jesus, reforçando o monoteísmo e a adoração exclusiva a Deus.',
    pdfUrl: '/livros/maria-no-islam.pdf',
    coverUrl: '/images/livros/maria-no-islam.png',
  },
  {
    id: 'proposito-vida',
    title: 'O Propósito da Vida',
    subtitle: 'Por que estamos aqui? | Autor: Dr.Bilal Philips',
    description:
      'Aborda questões existenciais centrais: sentido da vida, liberdade, responsabilidade e a busca por uma relação consciente com o Criador.',
    pdfUrl: '/livros/proposito-da-vida.pdf',
    coverUrl: '/images/livros/proposito-da-vida.png',
  },
  {
    id: 'quarenta-hadith',
    title: 'Os Quarenta Hadith',
    subtitle: 'Coletânea clássica de An-Nawawi | Autor: Abu Zakaria An-Nawawi',
    description:
      'Seleção de hadiths fundamentais que sintetizam princípios de fé, espiritualidade e ética, amplamente estudada em todo o mundo islâmico.',
    pdfUrl: '/livros/os-quarenta-hadith.pdf',
    coverUrl: '/images/livros/quarenta-hadith.png',
  },
  {
    id: 'mulher-no-islam',
    title: 'A mulher no Islam: Mito e Realidade',
    subtitle: 'Direitos, dignidade e espiritualidade | Autor: Sherif Abdel Azim',
    description:
      'Mostra como o Islam, desde suas origens, estabeleceu direitos espirituais, sociais e econômicos para as mulheres, valorizando sua dignidade.',
    pdfUrl: '/livros/mulher-no-islam.pdf',
    coverUrl: '/images/livros/mulher-no-islam.png',
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
                    className={`ccib-library-item ${isActive ? 'ccib-library-item--active' : ''
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
