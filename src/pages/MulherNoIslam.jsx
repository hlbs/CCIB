import React from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

const MulherNoIslam = () => {
  return (
    <>
      <PageVideoHero
        title="A Mulher no Islam"
        subtitle="Dignidade, direitos e espiritualidade: como o Islam elevou a condição da mulher em todos os níveis da vida."
        badge="Dignidade e direitos"
        videoUrl="videos/hero/video-hero05.mp4"
      />

      <main className="ccib-page">

        {/* 1. VISÃO GERAL */}
        <AlternatingSection
          id="visao-geral"
          title="Antes e depois do Islam"
          imageUrl="https://images.pexels.com/photos/12452728/pexels-photo-12452728.jpeg"
          badge="Mudança de paradigma"
        >
          <p>
            Em muitas culturas antigas, a mulher foi tratada como ser inferior ou secundário, tendo
            sua voz e seus direitos reduzidos. Em certos contextos, chegava a ser vista como
            propriedade do pai ou do marido, com pouca autonomia sobre sua própria vida.
          </p>
          <p>
            O Islam rompe com essa lógica ao apresentar a mulher como ser humano completo,
            responsável e digno, cuja honra é protegida pela revelação divina. A elevação da
            condição feminina começa pela forma como ela é compreendida diante de Deus: alguém que
            pensa, decide, crê e responde por suas escolhas.
          </p>
          <p>
            Essa mudança de perspectiva não é apenas teórica. Ela se traduz em direitos espirituais,
            sociais e econômicos bem definidos, que não dependem de vontades políticas
            passageiras, mas fazem parte do próprio corpo da religião.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 2. IGUALDADE ESPIRITUAL */}
        <AlternatingSection
          id="igualdade-espiritual"
          title="Igualdade espiritual e mérito diante de Deus"
          reverse
          imageUrl="https://images.pexels.com/photos/34407257/pexels-photo-34407257.jpeg"
          badge="Diante do Criador"
        >
          <p>
            No Islam, homens e mulheres compartilham o mesmo chamado à fé e à retidão. Ambos foram
            criados a partir de uma mesma origem e serão julgados pelo Criador com base em suas
            intenções e ações, não pelo gênero.
          </p>
          <p>
            A mulher não é descrita como fonte de pecado ou maldição, mas como parceira na
            construção da família e da sociedade. Ela é convidada a orar, jejuar, praticar
            caridade, buscar conhecimento e desenvolver seu caráter, exatamente como o homem.
          </p>
          <p>
            Isso significa que o caminho para a proximidade com Deus está igualmente aberto para
            os dois. O que diferencia espiritualmente não é ser homem ou mulher, mas o quanto cada
            pessoa se esforça sinceramente na obediência, na paciência e na bondade.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 3. DIREITOS SOCIAIS E ECONÔMICOS */}
        <AlternatingSection
          id="direitos-sociais"
          title="Direitos sociais, familiares e econômicos"
          imageUrl="https://images.pexels.com/photos/8154339/pexels-photo-8154339.jpeg"
          badge="Na vida concreta"
        >
          <p>
            A elevação da mulher no Islam passa também pela garantia de direitos muito práticos.
            Entre eles, estão:
          </p>
          <ul className="ccib-list">
            <li>Direito à propriedade independente e à administração de seus bens;</li>
            <li>Direito ao dote (mahr), que pertence à mulher e não à família ou ao marido;</li>
            <li>Direito de aceitar ou recusar um casamento;</li>
            <li>Direito à herança, em proporções definidas pela lei islâmica;</li>
            <li>Direito de buscar conhecimento útil e participar da vida comunitária.</li>
          </ul>
          <p>
            Ao mesmo tempo, a responsabilidade financeira principal recai sobre os homens, o que
            significa que a mulher, em princípio, não é obrigada a gastar de seus bens pessoais para
            se sustentar. Quando contribui, faz isso como ato de generosidade, não por imposição.
          </p>
        </AlternatingSection>

        {/* PARALLAX */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“Honrada pela fé, protegida pela justiça.”</h2>
                <p>
                  A proposta islâmica é que a mulher viva com segurança, dignidade e espaço para
                  desenvolver todo o seu potencial humano e espiritual, sem ser reduzida a objeto
                  ou símbolo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MITOS X REALIDADE */}
        <section id="mitos-realidade" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Mitos e realidade sobre a mulher muçulmana</h2>
              <p className="ccib-section-description">
                Muitas críticas ao Islam partem de práticas culturais injustas ou de imagens
                estereotipadas. Aqui, a intenção é separar abusos humanos daquilo que a fé
                realmente ensina.
              </p>
            </header>

            <div className="ccib-feature-grid">
              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">“Mulher não tem voz”?</h3>
                <p className="ccib-feature-text">
                  A história islâmica registra mulheres que ensinaram religião, aconselharam
                  governantes, participaram de decisões comunitárias e transmitiram conhecimento.
                  Quando a voz feminina é apagada, o problema está na cultura ou na ignorância,
                  não na fé.
                </p>
              </article>

              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">“Hijab é opressão”?</h3>
                <p className="ccib-feature-text">
                  O recato, para homens e mulheres, é uma forma de proteger o coração, a dignidade
                  e as relações. O hijab, quando usado por convicção, é expressão de identidade e 
                  devoção, não de inferioridade. Mas o recato não se resume a um tecido: ele também
                  aparece nas atitudes, na fala respeitosa, no olhar, no comportamento e na postura 
                  ética no dia a dia. A opressão está em impor ou proibir, não em uma mulher escolher
                  se vestir por fé.
                </p>
              </article>

              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">Abusos não são religião</h3>
                <p className="ccib-feature-text">
                  Onde há violência doméstica, casamento forçado, negação arbitrária de estudo
                  ou de trabalho digno, há violação de princípios básicos da lei islâmica. A
                  tarefa das comunidades é combater esses abusos à luz da própria religião, e
                  não em nome dela.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MulherNoIslam;
