import React from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

/**
 * Diretoria do CCIB
 * 
 * Para editar:
 *  - Troque nome, cargo, descricao e imageUrl conforme necessário.
 *  - Para adicionar um novo membro, basta incluir um novo objeto no array.
 */
const boardMembers = [
  {
    id: 'presidente',
    cargo: 'Presidente',
    nome: 'Wilton José de Carvalho',
    imageUrl: '/images/diretoria/presidente.jpg',
    descricao:
      'Responsável por representar o CCIB institucionalmente, coordenar a direção geral e zelar pelo cumprimento da missão e dos valores da instituição.'
  },
  {
    id: 'vice-presidente',
    cargo: 'Vice-Presidente',
    nome: 'José Gracindo França Peixinho',
    imageUrl: '/images/diretoria/vice-presidente.jpg',
    descricao:
      'Apoia a presidência nas decisões estratégicas, substitui o presidente quando necessário e acompanha projetos prioritários da comunidade.'
  },
  {
    id: 'tesoureiro',
    cargo: 'Diretor Financeiro',
    nome: 'Alins Rabello Souza',
    imageUrl: '/images/diretoria/tesoureiro.jpg',
    descricao:
      'Responsável pela gestão financeira, prestação de contas, organização de relatórios e suporte à sustentabilidade econômica das atividades do CCIB.'
  },
  {
    id: 'secretario',
    cargo: 'Diretora Social',
    nome: 'Patrícia Santana de Almeida Rabello',
    imageUrl: '/images/diretoria/secretario.jpg',
    descricao:
      'Articula campanhas de solidariedade, apoio a famílias vulneráveis e iniciativas de aproximação com a sociedade baiana em geral.'
  },
  {
    id: 'coordenacao-educacao',
    cargo: 'Diretor de Patrimonio',
    nome: 'Antônio Alfa Candé',
    imageUrl: '/images/diretoria/educacao.jpg',
    descricao:
      'Coordena cursos, círculos de estudo, atividades de ensino do Islã e ações formativas voltadas para a comunidade e para o público em geral.'
  },
  {
    id: 'coordenacao-social',
    cargo: 'Secretária',
    nome: 'Maria da Silva Andrade',
    imageUrl: '/images/diretoria/social.jpg',
    descricao:
      'Organiza registros, atas, comunicações oficiais e documentações administrativas, garantindo transparência e memória institucional.'
  }
];

const SobreCCIB = () => {
  return (
    <>
      <PageVideoHero
        title="Sobre o Centro Cultural Islâmico da Bahia"
        subtitle="Um espaço de fé, conhecimento e convivência em Salvador, dedicado a compartilhar a mensagem do Islã e fortalecer laços com a sociedade baiana."
        badge="Institucional"
        videoUrl="public/videos/hero/video-hero10.mp4"
      />

      <main className="ccib-page">
        <div className="ccib-container">
          <nav aria-label="Seções desta página" className="ccib-page-chip-nav">
            <a href="#sobre-ccib" className="ccib-chip-link">
              Sobre o CCIB
            </a>
            <a href="#nossa-comunidade" className="ccib-chip-link">
              Nossa comunidade
            </a>
            <a href="#sheikh" className="ccib-chip-link">
              Sheikh Abdul Hameed Ahmad
            </a>
            <a href="#diretoria" className="ccib-chip-link">
              Diretoria do CCIB
            </a>
          </nav>
        </div>

        {/* 1. SOBRE O CCIB */}
        <AlternatingSection
          id="sobre-ccib"
          title="Quem somos"
          imageUrl="https://images.pexels.com/photos/7249216/pexels-photo-7249216.jpeg"
          badge="Centro Cultural Islâmico da Bahia"
        >
          <p>
            O Centro Cultural Islâmico da Bahia (CCIB) é um espaço de referência para a comunidade
            muçulmana em Salvador e para todos aqueles que desejam conhecer o Islã com seriedade,
            respeito e profundidade. Nosso propósito é unir fé, conhecimento e convivência,
            oferecendo um ambiente acolhedor para oração, estudo, diálogo inter-religioso e ações
            sociais.
          </p>
          <p>
            O CCIB atua como ponte entre a tradição islâmica clássica e a realidade contemporânea
            baiana, promovendo atividades educativas, culturais e comunitárias que reforçam valores
            como misericórdia, justiça, honestidade e responsabilidade social.
          </p>
          <p>
            Além das orações e celebrações religiosas, o centro organiza palestras, cursos
            introdutórios sobre o Islã, visitas guiadas, rodas de conversa e ações de solidariedade,
            sempre buscando fortalecer laços com a sociedade e contribuir de forma positiva para a
            cidade.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 2. NOSSA COMUNIDADE */}
        <AlternatingSection
          id="nossa-comunidade"
          title="Nossa comunidade em Salvador e na Bahia"
          reverse
          imageUrl="https://images.pexels.com/photos/7249217/pexels-photo-7249217.jpeg"
          badge="Diversidade & unidade"
        >
          <p>
            A comunidade do CCIB é formada por muçulmanos e muçulmanas de diferentes origens:
            brasileiros revertidos ao Islã, famílias com raízes em diversos países, estudantes,
            profissionais de múltiplas áreas e pessoas que estão dando os primeiros passos no
            conhecimento da fé islâmica.
          </p>
          <p>
            Essa diversidade se expressa na riqueza de línguas, culturas e trajetórias pessoais, mas
            encontra unidade nos mesmos pilares da fé, na prática da oração e na busca por uma vida
            com propósito e ética. Nosso compromisso é acolher, orientar e caminhar juntos, em
            ambiente de respeito e apoio mútuo.
          </p>
          <p>
            O CCIB também se abre à sociedade baiana em geral: recebemos escolas, universidades,
            grupos de pesquisa, lideranças de outras tradições religiosas e pessoas interessadas em
            conhecer o Islã sem preconceitos, com espaço para perguntas sinceras e diálogo
            construtivo.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 3. SHEIKH ABDUL HAMEED AHMAD */}
        <AlternatingSection
          id="sheikh"
          title="Sheikh Abdul Hameed Ahmad"
          imageUrl="/images/equipe/sheikh-abdul-hameed.jpg"
          badge="Orientação religiosa"
        >
          <p>
            Sheikh Abdul Hameed Ahmad é o responsável pela liderança religiosa do Centro Cultural
            Islâmico da Bahia. Com formação em ciências islâmicas e experiência em ensino,
            acompanhamento comunitário e diálogo inter-religioso, ele dedica seu trabalho a
            transmitir o Islã de forma acessível, fiel às fontes clássicas e atenta à realidade
            local.
          </p>
          <p>
            No CCIB, o Sheikh conduz as pregações da oração de sexta-feira (Jumu‘ah), orienta
            círculos de estudo, acompanha pessoas que desejam conhecer o Islã ou reverter à fé
            islâmica e oferece aconselhamento em temas familiares, espirituais e éticos.
          </p>
          <p>
            Sua atuação reflete a missão do centro: ser um espaço em que o conhecimento não se
            separa da misericórdia, e em que cada pessoa é recebida com respeito e disposição para
            ouvir suas dúvidas, desafios e expectativas.
          </p>
        </AlternatingSection>

        {/* PARALLAX TRANSIÇÃO */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“Servir a Deus é também servir à comunidade.”</h2>
                <p>
                  O CCIB compreende que a espiritualidade autêntica se manifesta no cuidado com as
                  pessoas, na honestidade, na justiça social e na construção de pontes de
                  entendimento com a sociedade em que vivemos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DIRETORIA DO CCIB */}
        <section id="diretoria" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Diretoria do CCIB</h2>
              <p className="ccib-section-description">
                A direção do Centro Cultural Islâmico da Bahia é composta por membros da comunidade
                que assumem, de forma voluntária, a responsabilidade de organizar, planejar e
                acompanhar as atividades do centro, sempre em diálogo com a base comunitária.
              </p>
            </header>

            {/* GRID DE MEMBROS DA DIRETORIA */}
            <div className="ccib-feature-grid ccib-board-grid">
              {boardMembers.map((membro) => (
                <article key={membro.id} className="ccib-feature-card ccib-board-card">
                  <div className="ccib-board-avatar-wrapper">
                    {/* Imagem do membro da diretoria */}
                    <img
                      src={membro.imageUrl}
                      alt={membro.nome}
                      className="ccib-board-avatar"
                      loading="lazy"
                    />
                  </div>
                  <div className="ccib-board-content">
                    <p className="ccib-board-role">{membro.cargo}</p>
                    <h3 className="ccib-board-name">{membro.nome}</h3>
                    <p className="ccib-feature-text">{membro.descricao}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="ccib-section-footer-text">
              Este quadro é atualizado periodicamente, de acordo com as assembleias e eleições
              internas do Centro Cultural Islâmico da Bahia. Em caso de dúvidas sobre a
              organização, atividades ou formas de colaborar, entre em contato com a secretaria
              do CCIB pelos canais oficiais.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default SobreCCIB;
