import React, { useState, useRef } from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

// 25 profetas mencionados pelo nome no Alcorão
const prophetsTimeline = [
  {
    id: 'adam',
    ar: 'Ādam',
    pt: 'Adão',
    description:
      'Primeiro ser humano e primeiro profeta. Ensina o arrependimento sincero e a misericórdia de Deus após o erro.'
  },
  {
    id: 'idris',
    ar: 'Idrīs',
    pt: 'Enoque',
    description:
      'Conhecido por sua devoção, sabedoria e paciência. Exemplo de constância na busca do conhecimento e do bem.'
  },
  {
    id: 'nuh',
    ar: 'Nūḥ',
    pt: 'Noé',
    description:
      'Chamou seu povo à fé durante muitos anos, mesmo diante da rejeição. A arca simboliza salvação para quem responde ao chamado de Deus.'
  },
  {
    id: 'hud',
    ar: 'Hūd',
    pt: 'Éber',
    description:
      'Enviado ao povo de ‘Ad, que se orgulhava do poder material. Lembra que a arrogância abre caminho para a ruína espiritual.'
  },
  {
    id: 'salih',
    ar: 'Ṣāliḥ',
    pt: 'Selá',
    description:
      'Profeta do povo de Thamud. O milagre da camela foi um sinal de Deus, mas muitos o rejeitaram, desprezando a justiça.'
  },
  {
    id: 'lut',
    ar: 'Lūṭ',
    pt: 'Ló',
    description:
      'Chamou seu povo à retidão moral e à proteção da família. Seu exemplo evidencia que a fé exige coragem diante de ambientes corrompidos.'
  },
  {
    id: 'ibrahim',
    ar: 'Ibrāhīm',
    pt: 'Abraão',
    description:
      'Modelo de monoteísmo e submissão sincera. Questionou ídolos, confiou em Deus em todas as provas e tornou-se “amigo íntimo” de Allah.'
  },
  {
    id: 'ismail',
    ar: 'Ismāʿīl',
    pt: 'Ismael',
    description:
      'Filho de Abraão. Sua história de sacrifício e paciência está ligada à origem da Kaaba e dos rituais da peregrinação em Meca.'
  },
  {
    id: 'ishaq',
    ar: 'Isḥāq',
    pt: 'Isaque',
    description:
      'Herda a missão profética de Abraão, lembrando a continuidade da mensagem entre as gerações de uma mesma família.'
  },
  {
    id: 'yaqub',
    ar: 'Yaʿqūb',
    pt: 'Jacó',
    description:
      'Também chamado de Israel. Ensinou a perseverança na fé e a confiança em Deus mesmo diante de longas provações familiares.'
  },
  {
    id: 'yusuf',
    ar: 'Yūsuf',
    pt: 'José',
    description:
      'Sua história é um roteiro completo de inveja, queda e reabilitação. É exemplo de castidade, paciência e perdão a quem o prejudicou.'
  },
  {
    id: 'shuaib',
    ar: 'Shuʿayb',
    pt: 'Jetro',
    description:
      'Chamou seu povo à honestidade econômica, denunciando fraudes comerciais. Lembra que fé e ética nos negócios caminham juntas.'
  },
  {
    id: 'ayyub',
    ar: 'Ayyūb',
    pt: 'Jó',
    description:
      'Símbolo de paciência diante do sofrimento. Perdeu bens e saúde, mas manteve a confiança absoluta na misericórdia de Deus.'
  },
  {
    id: 'dhulkifl',
    ar: 'Dhūl-Kifl',
    pt: 'Ezequiel',
    description:
      'Embora pouco detalhado no Alcorão, é lembrado pela firmeza, justiça e cumprimento de compromissos com seu povo.'
  },
  {
    id: 'musa',
    ar: 'Mūsā',
    pt: 'Moisés',
    description:
      'Conduziu os filhos de Israel, enfrentou o Faraó e recebeu a Torá. Sua história ocupa grande parte do Alcorão, unindo justiça e libertação.'
  },
  {
    id: 'harun',
    ar: 'Hārūn',
    pt: 'Arão',
    description:
      'Irmão de Moisés, cooperou com ele na mensagem. Representa a importância de trabalhar em equipe em causas de fé.'
  },
  {
    id: 'dawud',
    ar: 'Dāwūd',
    pt: 'Davi',
    description:
      'Profeta e rei, conhecido por sua justiça e espiritualidade profunda. Suas orações são citadas como exemplo de devoção.'
  },
  {
    id: 'sulayman',
    ar: 'Sulaymān',
    pt: 'Salomão',
    description:
      'Teve poder e recursos, mas permaneceu submisso a Deus. Exemplo de que autoridade deve ser exercida com responsabilidade e gratidão.'
  },
  {
    id: 'ilyas',
    ar: 'Ilyās',
    pt: 'Elias',
    description:
      'Combateu a idolatria entre seu povo, chamando-os de volta à adoração exclusiva de Deus.'
  },
  {
    id: 'alyasa',
    ar: 'Al-Yasaʿ',
    pt: 'Eliseu',
    description:
      'Dá continuidade à missão de Elias. Seu papel reforça a ideia de que a mensagem divina é uma corrente ininterrupta.'
  },
  {
    id: 'yunus',
    ar: 'Yūnus',
    pt: 'Jonas',
    description:
      'Após deixar seu povo, clamou a Deus de dentro do ventre do peixe. É símbolo de arrependimento e retorno humilde ao Criador.'
  },
  {
    id: 'zakariya',
    ar: 'Zakariyyā',
    pt: 'Zacarias',
    description:
      'Idoso e sem filhos, pediu a Deus um herdeiro espiritual. Recebeu Yahya como resposta à sua súplica sincera.'
  },
  {
    id: 'yahya',
    ar: 'Yaḥyā',
    pt: 'João Batista',
    description:
      'Profeta de caráter puro, conhecido por sua firmeza moral e convite ao arrependimento verdadeiro.'
  },
  {
    id: 'isa',
    ar: 'ʿĪsā',
    pt: 'Jesus',
    description:
      'Nasceu de Maria por milagre divino, chamou à adoração de Deus e realizou sinais com Sua permissão. No Islam, é um dos maiores profetas.'
  },
  {
    id: 'muhammad',
    ar: 'Muḥammad',
    pt: 'Muhammad',
    description:
      'Último mensageiro, enviado como misericórdia para toda a humanidade. Sua missão confirma e conclui a mensagem de todos os profetas anteriores.'
  }
];

const ConhecaIslam = () => {
  const [activeProphetId, setActiveProphetId] = useState('adam');
  const timelineTrackRef = useRef(null);

  const sectionLinks = [
    { id: 'conceito-de-deus', label: 'Conceito de Deus' },
    { id: 'quem-e-allah', label: 'Quem é Allah?' },
    { id: 'proposito-da-vida', label: 'Propósito da vida' },
    { id: 'vida-apos-a-morte', label: 'Vida após a morte' },
    { id: 'mensagem-dos-profetas', label: 'Mensagem dos profetas' },
    { id: 'pilares-do-islam', label: 'Pilares do Islam' },
    { id: 'pilares-da-fe', label: 'Pilares da fé' }
  ];

  const handleTimelineScroll = (direction) => {
    const track = timelineTrackRef.current;
    if (!track) return;
    const cardWidth = 240; // px aproximado de um card
    track.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  };

  const handleProphetClick = (id) => {
    setActiveProphetId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageVideoHero
        title="Conheça o Islam"
        subtitle="Uma introdução organizada aos fundamentos da fé islâmica, baseada em fontes clássicas e acessível a quem está começando."
        /* Vídeo de fundo da página Conheça o Islam (Pexels) */
        videoUrl="public/videos/hero/video-hero03.mp4"
      />

      <main className="ccib-page">
        <div className="ccib-container">
          {/* Navegação de seções */}
          <nav aria-label="Seções desta página" className="ccib-page-chip-nav">
            {sectionLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="ccib-chip-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CONCEITO DE DEUS */}
        <AlternatingSection
          id="conceito-de-deus"
          title="Conceito de Deus no Islam"
          imageUrl="https://images.pexels.com/photos/2608353/pexels-photo-2608353.jpeg"
          badge="Unicidade e transcendência"
        >
          <p>
            No Islam, Deus é único, absoluto e sem parceiros. Ele não se confunde com a criação, não
            tem início nem fim, não gera nem é gerado, e nada se compara a Ele. O nome usado em árabe
            é <strong>Allah</strong>, termo que não possui plural nem gênero, reforçando a ideia de
            unicidade e transcendência.
          </p>
          <p>
            Deus é o Criador e Sustentador de tudo o que existe, ao mesmo tempo justo e
            misericordioso. A misericórdia divina não é oposta à justiça: quem age com retidão e
            paciência não é igual, diante de Deus, àquele que oprime e corrompe.
          </p>
          <p>
            Crer nesse Deus único significa reconhecê-Lo acima de qualquer limitação humana e, ao
            mesmo tempo, próximo, atento às súplicas e conhecedor das intenções mais profundas.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* QUEM É ALLAH */}
        <AlternatingSection
          id="quem-e-allah"
          title="Quem é Allah?"
          reverse
          imageUrl="https://images.pexels.com/photos/19988546/pexels-photo-19988546.jpeg"
          badge="Deus Único"
        >
          <p>
            Há um equívoco comum de que “Allah” seria um deus diferente ou exclusivo dos árabes. Na
            realidade, <strong>“Allah” é simplesmente a palavra árabe para “Deus”</strong>. Cristãos
            árabes utilizam essa mesma palavra em suas Bíblias e em suas orações.
          </p>
          <p>
            Quando um muçulmano diz “creio em Allah”, está afirmando sua fé no mesmo Deus criador de
            Abraão, de Moisés, de Jesus e de todos os profetas. Não se trata de uma divindade étnica
            ou regional, mas do Deus único, Senhor dos céus e da terra.
          </p>
          <p>
            O Islam rejeita a ideia de que Deus pertença a um povo específico. Todos os seres
            humanos, independentemente de origem, língua ou cultura, podem voltar-se a Ele e
            invocá-Lo com sinceridade.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* PROPÓSITO DA VIDA */}
        <AlternatingSection
          id="proposito-da-vida"
          title="O propósito da vida"
          imageUrl="https://images.pexels.com/photos/7129744/pexels-photo-7129744.jpeg"
          badge="Sentido e responsabilidade"
        >
          <p>
            Em algum momento, todo ser humano se pergunta: <em>“Por que existo?”</em>. Para o Islam,
            essa resposta não depende apenas de teorias humanas. Deus, que criou a vida com
            sabedoria, revelou nas escrituras e através dos profetas o sentido da existência.
          </p>
          <p>
            A vida não é fruto do acaso. Ela é uma oportunidade de conhecer Deus, adorá-Lo
            conscientemente e agir com justiça, gratidão e responsabilidade. Quando esse propósito é
            esquecido, a existência se reduz a consumir, acumular e buscar prazeres imediatos.
          </p>
          <p>
            Viver com propósito, na perspectiva islâmica, significa orientar todas as dimensões da
            vida – família, estudo, trabalho e espiritualidade – para o bem e para a proximidade com
            o Criador.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* VIDA APÓS A MORTE */}
        <AlternatingSection
          id="vida-apos-a-morte"
          title="Vida após a morte"
          reverse
          imageUrl="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg"
          badge="Perspectiva eterna"
        >
          <p>
            A crença na vida após a morte é central no Islam. Este mundo é entendido como um período
            de prova e preparação para uma existência definitiva. A vida terrena é limitada; a vida
            futura, eterna.
          </p>
          <p>
            Essa crença aprofunda a noção de justiça: nem todo bem é plenamente recompensado aqui, e
            nem todo mal recebe, neste mundo, a resposta que merece. A justiça de Deus se manifesta
            de maneira completa na outra vida.
          </p>
          <p>
            Para quem crê, isso traz equilíbrio entre responsabilidade e esperança: ninguém está
            isento de prestar contas, mas nenhuma boa ação é esquecida por Deus.
          </p>
        </AlternatingSection>

        {/* PARALLAX TRANSIÇÃO */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“Islam” significa entrega consciente a Deus.</h2>
                <p>
                  Essa entrega não é passiva. É um compromisso ativo com a verdade, a justiça e a
                  misericórdia, guiado pela revelação e exercido no cotidiano: na família, na vida
                  profissional e na relação com a sociedade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MENSAGEM DOS PROFETAS – VERSO + LINHA DO TEMPO */}
        <section id="mensagem-dos-profetas" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Uma só mensagem ao longo da história</h2>
              <p className="ccib-section-description">
                O Alcorão ensina que Deus enviou mensageiros a diferentes povos e épocas, todos
                convidando à mesma essência: crer em um Deus único e viver com justiça e
                misericórdia.
              </p>
            </header>

            {/* Verso do Alcorão */}
            <div className="ccib-verse-callout">
              <p className="ccib-verse-ar">
                وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًا لَّمْ نَقْصُصْهُمْ عَلَيْكَ ۚ
                وَكَلَّمَ ٱللَّهُ مُوسَىٰ تَكْلِيمًا
              </p>
              <p className="ccib-verse-tr">
                “Enviamos mensageiros de que, com efeito, te mencionamos antes, e mensageiros de que
                não te fizemos menção; e Allah falou a Moisés de modo direto.”
              </p>
              <a
                href="https://quran.com/pt/4/164"
                className="ccib-verse-ref"
                target="_blank"
                rel="noreferrer"
              >
                Alcorão 4:164 &mdash; Surah An-Nisā’
              </a>
            </div>

            {/* Linha do tempo dos 25 profetas */}
            <div
              className="ccib-timeline"
              aria-label="Linha do tempo dos profetas mencionados no Alcorão"
            >
              <button
                type="button"
                className="ccib-timeline-nav ccib-timeline-nav--left"
                aria-label="Rolagem para a esquerda"
                onClick={() => handleTimelineScroll(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="ccib-timeline-nav ccib-timeline-nav--right"
                aria-label="Rolagem para a direita"
                onClick={() => handleTimelineScroll(1)}
              >
                ›
              </button>

              <div ref={timelineTrackRef} className="ccib-timeline-track">
                {prophetsTimeline.map((profeta, index) => {
                  const isActive = activeProphetId === profeta.id;
                  const imgSrc = `/images/prophets/${profeta.id}.png`; // ajuste os nomes se necessário

                  return (
                    <div
                      key={profeta.id}
                      className={`ccib-timeline-item ${
                        isActive ? 'ccib-timeline-item--active' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="ccib-timeline-card-hit"
                        onClick={() => handleProphetClick(profeta.id)}
                      >
                        {/* Círculo com imagem em árabe */}
                        <div className="ccib-timeline-badge">
                          <img
                            src={imgSrc}
                            alt={`Nome de ${profeta.pt} em árabe`}
                            className="ccib-timeline-badge-img"
                          />
                        </div>

                        {/* Card com flip */}
                        <div className="ccib-timeline-card-inner">
                          <div className="ccib-timeline-card-face ccib-timeline-card-front">
                            <span className="ccib-timeline-order">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="ccib-timeline-name-main">{profeta.ar}</h3>
                            <p className="ccib-timeline-name-secondary">{profeta.pt}</p>
                          </div>
                          <div className="ccib-timeline-card-face ccib-timeline-card-back">
                            <p className="ccib-timeline-text">{profeta.description}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="ccib-timeline-hint">
                Clique em um profeta para ver um resumo. Use as setas laterais ou arraste para
                percorrer a linha do tempo.
              </p>
            </div>
          </div>
        </section>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* PILARES DO ISLAM – 3 EM CIMA, 2 CENTRALIZADOS EMBAIXO */}
        <section id="pilares-do-islam" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Os cinco pilares do Islam</h2>
              <p className="ccib-section-description">
                São atos fundamentais de adoração que estruturam a prática diária do muçulmano. Não
                esgotam a religião, mas funcionam como sua base, como pilares sustentando um
                edifício.
              </p>
            </header>

            <div className="ccib-pillar-layout">
              <div className="ccib-pillar-row ccib-pillar-row--top">
                {/* 1 */}
                <article className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">1º pilar</div>
                      <h3 className="ccib-pillar-title">Testemunho de fé (Shahada)</h3>
                      <p className="ccib-pillar-highlight">
                        Afirmar que não há divindade além de Allah e que Muhammad é Seu mensageiro.
                      </p>
                      <p className="ccib-pillar-text">
                        Essa declaração sintetiza o monoteísmo islâmico e a crença na missão final do
                        Profeta Muhammad.
                      </p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">
                        A Shahada não é apenas uma frase repetida; é um compromisso diário de colocar
                        Deus no centro da vida, rejeitando qualquer forma de idolatria – seja a
                        adoração de outros seres, seja o culto ao ego, ao status ou ao consumo.
                      </p>
                    </div>
                  </div>
                </article>

                {/* 2 */}
                <article className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">2º pilar</div>
                      <h3 className="ccib-pillar-title">Oração (Salat)</h3>
                      <p className="ccib-pillar-highlight">
                        Cinco orações diárias, em horários distribuídos ao longo do dia.
                      </p>
                      <p className="ccib-pillar-text">
                        Elas criam uma rotina de contato com Deus, lembrando que a espiritualidade
                        não é desconectada do cotidiano.
                      </p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">
                        A oração envolve corpo, mente e coração: gestos humildes, recitação do
                        Alcorão e súplicas pessoais. Cada ciclo de oração é um convite para pausar,
                        respirar e reposicionar a vida na direção certa.
                      </p>
                    </div>
                  </div>
                </article>

                {/* 3 */}
                <article className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">3º pilar</div>
                      <h3 className="ccib-pillar-title">Caridade obrigatória (Zakat)</h3>
                      <p className="ccib-pillar-highlight">
                        Destinar parte do patrimônio a quem necessita, quando se atinge certo nível
                        de riqueza.
                      </p>
                      <p className="ccib-pillar-text">
                        A Zakat purifica o coração do apego exagerado aos bens e fortalece a justiça
                        social.
                      </p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">
                        A caridade, na perspectiva islâmica, não é apenas benevolência privada: é um
                        direito dos vulneráveis. Ao reconhecer esse direito, a comunidade se torna
                        mais solidária e equilibrada.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="ccib-pillar-row ccib-pillar-row--bottom">
                {/* 4 */}
                <article className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">4º pilar</div>
                      <h3 className="ccib-pillar-title">Jejum no mês de Ramadan (Sawm)</h3>
                      <p className="ccib-pillar-highlight">
                        Abstinência de alimento, bebida e relações conjugais, do amanhecer ao pôr do
                        sol.
                      </p>
                      <p className="ccib-pillar-text">
                        O jejum educa o corpo e o coração, reforçando o autocontrole e a empatia com
                        quem passa necessidade.
                      </p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">
                        Ramadan é também um mês de intensificação espiritual: leitura do Alcorão,
                        oração noturna, caridade ampliada e reconciliação. É um laboratório anual de
                        transformação interior.
                      </p>
                    </div>
                  </div>
                </article>

                {/* 5 */}
                <article className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">5º pilar</div>
                      <h3 className="ccib-pillar-title">Peregrinação a Meca (Hajj)</h3>
                      <p className="ccib-pillar-highlight">
                        Realizada ao menos uma vez na vida, para quem tem condições físicas e
                        financeiras.
                      </p>
                      <p className="ccib-pillar-text">
                        Milhões de pessoas se reúnem vestidas de forma simples, lembrando a igualdade
                        de todos diante de Deus.
                      </p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">
                        A peregrinação retoma os passos do Profeta Abraão e de sua família. É uma
                        experiência intensa de memória histórica, humildade e renovação de
                        compromissos espirituais.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* PILARES DA FÉ */}
        <section id="pilares-da-fe" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Os seis pilares da fé</h2>
              <p className="ccib-section-description">
                Enquanto os pilares do Islam estruturam a prática, os pilares da fé descrevem no que
                o muçulmano acredita. Juntos, formam a base da visão de mundo islâmica.
              </p>
            </header>

            <div className="ccib-flip-grid">
              {[
                {
                  label: '1º PILAR',
                  title: 'Crer em Deus único',
                  front: 'Afirmar que Deus é único, sem parceiros, e que tudo depende dEle.',
                  back: 'Essa crença é o coração da fé islâmica: reconhecer a soberania absoluta de Deus em todos os aspectos da vida.'
                },
                {
                  label: '2º PILAR',
                  title: 'Crer nos anjos',
                  front:
                    'Seres criados por Deus, que cumprem funções específicas e sempre obedecem a Ele.',
                  back: 'Eles registram ações, transmitem revelações e executam ordens divinas, mesmo não sendo percebidos pelos sentidos humanos.'
                },
                {
                  label: '3º PILAR',
                  title: 'Crer nos livros revelados',
                  front: 'Torá, Evangelho e, por fim, o Alcorão, enviados por Deus como orientação.',
                  back: 'O muçulmano respeita as revelações anteriores e vê o Alcorão como confirmação e preservação definitiva da mensagem.'
                },
                {
                  label: '4º PILAR',
                  title: 'Crer nos profetas',
                  front: 'Crer que Deus enviou mensageiros a diversos povos ao longo da história.',
                  back: 'Inclui Noé, Abraão, Moisés, Jesus e Muhammad, entre outros, todos chamando à mesma essência: adorar apenas a Deus e viver com retidão.'
                },
                {
                  label: '5º PILAR',
                  title: 'Crer no Dia do Julgamento',
                  front: 'A certeza de que todos serão ressuscitados e julgados por Deus.',
                  back: 'Essa crença dá profundidade à noção de justiça e responsabilidade, lembrando que cada ato tem peso perante o Criador.'
                },
                {
                  label: '6º PILAR',
                  title: 'Crer no decreto divino',
                  front:
                    'Reconhecer que nada escapa ao conhecimento e à sabedoria de Deus.',
                  back: 'Isso não elimina a liberdade humana, mas lembra que a história se desenrola dentro de um plano conhecido pelo Criador, que é justo e sábio.'
                }
              ].map((pillar) => (
                <article key={pillar.title} className="ccib-flip-card" tabIndex="0">
                  <div className="ccib-flip-inner">
                    <div className="ccib-flip-front">
                      <div className="ccib-pillar-label">{pillar.label}</div>
                      <h3 className="ccib-pillar-title">{pillar.title}</h3>
                      <p className="ccib-pillar-highlight">{pillar.front}</p>
                    </div>
                    <div className="ccib-flip-back">
                      <p className="ccib-pillar-text">{pillar.back}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ConhecaIslam;
