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
  const [activeProphetId, setActiveProphetId] = useState();
  const timelineTrackRef = useRef(null);


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
        videoUrl="videos/hero/video-hero03.mp4"
      />

      <main className="ccib-page">

        {/* CONCEITO DE ISLAM */}
        <AlternatingSection
          id="conceito-de-islam"
          title="O que é o Islam?"
          imageUrl="https://images.pexels.com/photos/2608353/pexels-photo-2608353.jpeg"
          badge="Submissão a vontade de Deus"
        >
          <p>
            A palavra “Islam”, de origem árabe, é a forma nominal de “Aslama” e significa <strong>“submissão
              total e voluntária à vontade de Deus”</strong>. Essa palavra deriva da raiz verbal “Salam” que carrega
            o sentido de paz. Essa submissão não é vista como um fardo, mas sim como o caminho para alcançar
            a paz, tanto interior quanto exterior abrangendo aspectos espirituais, éticos, sociais e políticos.
          </p>
          <p>
            O Islam é uma das maiores religiões monoteístas do mundo, ou seja, é uma crença baseada em um único Deus.
            De acordo com o relatório <i>“How the Global Religious Landscape Changed From 2010 to 2020”</i> <b>o crescimento do
            islamismo superou o de todos os outros grupos religiosos juntos no período e, atualmente, o número de seguidores
            totaliza cerca de 2 bilhões de pessoas (o equivalente a 25,6% da população mundial)</b>
          </p>
          <p>
            O princípio fundamental do Islam é o “Tawhīd”, a crença na Unicidade e Singularidade de Deus. Para os muçulmanos,
            Deus é incomparável e único, e associar qualquer parceiro a Ele (o shirk, termo em árabe para idolatria)
            é o maior dos pecados.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* O CONCEITO DE DEUS NO ISLAM */}
        <AlternatingSection
          id="conceito-de-deus"
          title="O conceito de Deus no Islam"
          reverse
          imageUrl="https://images.pexels.com/photos/19988546/pexels-photo-19988546.jpeg"
          badge="Deus Único, absoluto, sem parceiros"
        >
          <p>
            No Islam, <strong>Deus é único, absoluto e sem parceiros</strong>. No Alcorão, a Surah Al-Ikhlāṣ
            (capítulo do monoteísmo puro) é capaz de resumir todo esse conceito:
          </p>

          {/* Verso do Alcorão */}
          <div className="ccib-verse-callout">
            <p className="ccib-verse-ar" style={{ fontSize: '1.35rem' }}>
              قُلْ هُوَ ٱللَّهُ أَحَدٌ ١<br />
              ٱللَّهُ ٱلصَّمَدُ ٢<br />
              لَمْ يَلِدْ وَلَمْ يُولَدْ ٣<br />
              وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ ٤
            </p>
            <p className="ccib-verse-tr">
              “Dize: &quot;Ele é Allah, Único.&quot;”<br />
              “Allah é O Solicitado.”<br />
              “Não gerou e não foi gerado.”<br />
              “E não há ninguém igual a Ele.”
            </p>
            <a
              href="https://quran.com/pt/112/1-4"
              className="ccib-verse-ref"
              target="_blank"
              rel="noreferrer"
            >
              Alcorão 112:1-4 &mdash; Surah Al-Ikhlāṣ
            </a>
          </div>

          <p>
            Há um equívoco comum de que “Allah” seria um deus diferente ou exclusivo dos árabes. Na realidade,
            “Allah” é simplesmente a palavra árabe para “Deus”, <strong>termo que não possui plural nem gênero, reforçando
              a ideia de unicidade e transcendência</strong>.
          </p>
          <p>Cristãos e judeus árabes utilizam essa mesma palavra. Quando um muçulmano
            diz “creio em Allah”, está afirmando sua fé no mesmo Deus criador de Abraão, de Moisés, de Jesus e de todos os
            profetas. Não se trata de uma divindade étnica ou regional, mas do Deus único, Senhor dos céus e da terra.</p>

          <p>
            O Islam rejeita a ideia de que Allah pertença a um povo específico. <strong>Todos os seres humanos, independentemente de origem,
              língua ou cultura, podem voltar-se a Ele e invocá-Lo com sinceridade</strong>.
          </p>

        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* QUEM SÃO OS MUÇULMANOS? */}
        <AlternatingSection
          id="quem-sao-os-muculmanos?"
          title="Quem são os muçulmanos?"
          reverse
          imageUrl="https://images.pexels.com/photos/7129744/pexels-photo-7129744.jpeg"
          badge="Submissos a vontade de Deus"
        >
          <p>
            A pessoa que pratica o Islam é um muçulmano (muslim é o termo em árabe), ou seja, <strong>"aquele
              que se submete à vontade de Deus."</strong>. Crer nesse Deus único significa reconhecê-Lo acima de qualquer
            limitação humana e, ao mesmo tempo, próximo, atento às súplicas e conhecedor das intenções mais profundas.
          </p>
          <p>
            Um equívoco comum para as pessoas que não conhecem o Islam é acreditar que os muçulmanos adoram
            o Profeta Muhammad (ﷺ - Que a paz e as bençãos de Deus estejam sobre ele). Adorar o Profeta Muhammad (ﷺ) ou qualquer
            outro profeta e mensageiro de Allah, ou mesmo qualquer outro aspecto da criação seja natural ou criado pelo ser
            humano é estritamente proibido no Islam pois entra em conflito com a crença em um Deus único.
          </p>
          <p>
            <strong>Ser muçulmano independe da sua etnia ou idioma</strong>, portanto, a pessoa não precisa ser árabe para ser um muçulmano.
            Os países com as maiores populações muçulmanas são, na verdade, nações não árabes localizadas na Ásia e África.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* O QUE É O ALCORÃO? */}
        <AlternatingSection
          id="o-alcorao"
          title="O que é o Alcorão?"
          imageUrl="https://images.pexels.com/photos/3360048/pexels-photo-3360048.jpeg"
          badge="Sentido e responsabilidade"
        >
          <p>
            <strong>Os muçulmanos acreditam que o Alcorão é a palavra literal e imutável de Allah</strong>, essa mensagem é um guia
            para a humanidade e veio para confirmar a verdade dos livros que já haviam sido revelados pelos profetas
            anteriores, como Jesus (O Evangelho), Davi (Os Salmos) e Moises (A Torah) (عَلَيْهِم السَّلَام – Que a paz de Deus esteja sobre eles),
            e expor as falsidades acrescentadas pelo ser humano ao longo das eras.
          </p>
          <p>
            O Alcorão foi revelado ao Profeta Muhammad (ﷺ) através do Anjo Jibril–Gabriel (عَلَیهِ‌السَّلام – Que a paz de Deus esteja com ele)
            que trazia a mensagem do Deus único.
          </p>
          <p>A primeira revelação veio na noite do decreto (Lailat Al-Qadr), o Profeta Muhammad (ﷺ)
            tinha o costume de ir a caverna de Hira para meditar e orar, quando nesta noite recebeu a visita do
            Anjo Gabriel (عَلَیهِ‌السَّلام) que lhe comandou “Iqra! – Recite!” e este o respondeu que era analfabeto. Após repetir
            o comando e o Profeta hesitar três vezes, o Anjo recitou os primeiros versos da Surah Al-Alaq (O Coágulo):</p>

          {/* Verso do Alcorão */}
          <div className="ccib-verse-callout">
            <p className="ccib-verse-ar" style={{ fontSize: '1.35rem' }}>
              ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ ١<br />
              خَلَقَ ٱلْإِنسَـٰنَ مِنْ عَلَقٍ ٢<br />
              ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ ٣<br />
              ٱلَّذِى عَلَّمَ بِٱلْقَلَمِ ٤<br />
              عَلَّمَ ٱلْإِنسَـٰنَ مَا لَمْ يَعْلَمْ ٥
            </p>
            <p className="ccib-verse-tr">
              “Lê, em nome de teu Senhor, que criou,”<br />
              “Que criou o ser humano de uma aderência.”<br />
              “Lê, e teu Senhor é O mais Generoso,”<br />
              “Que ensinou a escrever com o cálamo,”<br />
              “Ensinou ao ser humano o que ele não sabia.”
            </p>
            <a
              href="https://quran.com/pt/96/1-5"
              className="ccib-verse-ref"
              target="_blank"
              rel="noreferrer"
            >
              Alcorão 96:1-5 &mdash; Surah Al-ʻAlaq
            </a>
          </div>

          <p>
            Após essa primeira experiência, a revelação do Alcorão continuou em etapas, versículo por versículo ou bloco
            de versículos (Suras), por um período de aproximadamente 23 anos. Dada a natureza oral da cultura árabe da época,
            os versos eram memorizados assim que revelados por centenas de muçulmanos, sob a orientação do Profeta (ﷺ)
            que também o memorizava e recitava.
          </p>
          <p>Além disso, o Profeta de Deus (ﷺ) tinha escribas que registravam os
            versos em materiais disponíveis, como pedras planas, omoplatas de camelos, couro e folhas de palmeira.</p>
          <p>
            A forma compilada do Alcorão como um único livro foi realizada logo após a morte do Profeta (ﷺ),
            sob a supervisão dos primeiros califas (رَضِيَ اللَّهُ عَنْهُمْ – Que Deus esteja satisfeito com eles), garantindo a fidelidade
            e a unidade da mensagem que havia sido memorizada e escrita durante os 23 anos de revelação.
          </p>
          <p>
            Portanto, <strong>para preservar a autenticidade desta mensagem, os muçulmanos a recitam no idioma original da revelação,
              o árabe, preservando-a da forma que foi relevada até os dias atuais</strong>.
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
          imageUrl="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg"
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

        {/* PARALLAX TRANSIÇÃO */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>Islam não é só uma religião, é um modelo de vida</h2>
                <p>
                  É um compromisso ativo com a verdade, a justiça e a
                  misericórdia, guiado pela revelação do Alcorão e exercido no cotidiano: na família, na vida
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
                misericórdia. Esta é a mensagem primordial e universal de Deus entregue à humanidade desde o princípio dos tempos,
                a doutrina do Monoteísmo Absoluto (Tawhīd).
              </p>
            </header>

            {/* Verso do Alcorão */}
            <div className="ccib-verse-callout">
              <p className="ccib-verse-ar">
                وَرُسُلًۭا قَدْ قَصَصْنَـٰهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًۭا لَّمْ نَقْصُصْهُمْ عَلَيْكَ ۚ وَكَلَّمَ ٱللَّهُ مُوسَىٰ تَكْلِيمًۭا ١٦٤
              </p>
              <p className="ccib-verse-tr">
                “E enviamos Mensageiros, de que, com efeito, te fizemos menção antes e Mensageiros,
                de que não te fizemos menção; e Allah falou a Moisés efetivamente.”
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
                      className={`ccib-timeline-item ${isActive ? 'ccib-timeline-item--active' : ''
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
