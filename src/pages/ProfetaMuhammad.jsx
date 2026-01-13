import React from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

const ProfetaMuhammad = () => {
  return (
    <>
      <PageVideoHero
        title="O Profeta Muhammad (ﷺ)"
        subtitle="Último mensageiro, o selo dos profetas, exemplo de misericórdia, justiça e equilíbrio espiritual."
        badge="Biografia e exemplo"
        videoUrl="videos/hero/video-hero04.mp4"
      />

      <main className="ccib-page">
        {/* BLOCO 1 – QUEM ELE É PARA OS MUÇULMANOS */}
        <AlternatingSection
          id="quem-ele-e"
          title="Quem é Muhammad para os muçulmanos"
          imageUrl="https://images.pexels.com/photos/9606990/pexels-photo-9606990.jpeg"
          badge="Servo e mensageiro"
        >
          <p>
            Para mais de um bilhão de muçulmanos, Muhammad (ﷺ) não é uma figura distante do passado.
            Ele é o mensageiro final de Deus, aquele por meio do qual o Alcorão foi revelado e
            cujo exemplo orienta a fé, a espiritualidade e a ética no dia a dia.
          </p>
          <p>
            Crer em Muhammad (ﷺ) como mensageiro faz parte da própria declaração de fé islâmica, junto
            com a crença em Deus único. Ao ouvir seu nome, os muçulmanos costumam dizer:
            <em> “que a paz e as bênçãos de Deus estejam com ele”</em>, como expressão de amor,
            respeito e gratidão, em árabe é expresso por (ﷺ).
          </p>
          <p>
            Ao mesmo tempo, o próprio Profeta deixou claro que não deve ser adorado. Ele é
            compreendido como servo de Deus, escolhido para transmitir e viver a mensagem divina,
            e não como divindade.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* BLOCO 2 – BIOGRAFIA SINTÉTICA */}
        <AlternatingSection
          id="biografia"
          title="Uma biografia de confiança e perseverança"
          reverse
          imageUrl="https://images.pexels.com/photos/34642006/pexels-photo-34642006.jpeg"
          badge="Da Meca à Medina"
        >
          <p>
            Muhammad (ﷺ) nasceu em Meca, no século VII, em um contexto marcado por tribalismo,
            desigualdade e práticas religiosas fragmentadas. Ainda jovem, ganhou a reputação de
            ser honesto e confiável, a ponto de ser conhecido como <em>Al-Amín</em>, “o digno de
            confiança”.
          </p>
          <p>
            Aos 40 anos, em um momento de retiro e reflexão, recebeu a primeira revelação do
            Alcorão. A partir daí, dedicou o restante da vida a transmitir essa mensagem, enfrentando
            perseguições, boicotes econômicos e agressões físicas, mas respondendo com paciência,
            perseverança e estratégia.
          </p>
          <p>
            Depois de anos de hostilidade em Meca, emigrou para Medina, onde estabeleceu uma
            comunidade baseada em fé, justiça, solidariedade e respeito aos pactos. Essa etapa
            mostra Muhammad (ﷺ) não apenas como líder espiritual, mas também como mediador, estadista
            e educador social.
          </p>
        </AlternatingSection>

        {/* DIVISOR VISUAL */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* BLOCO 3 – CARÁTER E MISERICÓRDIA */}
        <AlternatingSection
          id="carater"
          title="Caráter, misericórdia e ética prática"
          imageUrl="https://images.pexels.com/photos/9127603/pexels-photo-9127603.jpeg"
          badge="Misericórdia em ação"
        >
          <p>
            Os relatos autênticos descrevem Muhammad (ﷺ) como alguém que unia firmeza de princípios e
            profunda compaixão. Ele defendia os órfãos, viúvas e pobres, denunciava injustiças e
            alertava contra qualquer forma de arrogância.
          </p>
          <p>
            Seu tratamento com a família era marcado por gentileza e atenção. Ele ajudava nas
            tarefas de casa, ouvia as crianças, valorizava as mulheres como educadoras de
            gerações e como participantes ativas da comunidade.
          </p>
          <p>
            Para os muçulmanos, seguir o Profeta significa transformar essas qualidades em
            atitudes concretas: ser honesto nos negócios, justo em posições de liderança,
            paciente em conflitos e sensível ao sofrimento alheio.
          </p>
        </AlternatingSection>

        {/* PARALLAX CURTO SOBRE MISERICÓRDIA */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“Fui enviado apenas como misericórdia”</h2>
                <p>
                  É assim que Muhammad (ﷺ) é descrito em diversas tradições: como mensageiro que convida
                  à reconciliação com Deus, ao cuidado com o próximo e ao combate à injustiça por
                  meios éticos e responsáveis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCO 4 – MENSAGEM UNIVERSAL */}
        <section className="ccib-section">
          <div className="ccib-container">
            <h2 className="ccib-section-title">Mensagem universal para todas as épocas</h2>
            <p>
              O Islam ensina que, antes de Muhammad (ﷺ), muitos profetas foram enviados a povos
              específicos em tempos diferentes. Muhammad (ﷺ), porém, é descrito como mensageiro
              enviado para toda a humanidade, com uma mensagem universal de fé em Deus único,
              justiça, responsabilidade e misericórdia.
            </p>
            <p>
              O Alcorão o apresenta como “misericórdia para os mundos”, expressão que indica que
              seu legado ético e espiritual não se limita a uma região, etnia ou período histórico.
              Seus ensinamentos dialogam com questões que continuam atuais: desigualdade,
              violência, crise de sentido, relações familiares e convivência entre culturas.
            </p>
            <p>
              Amar o Profeta, para o muçulmano, é estudar sua vida, compreender seus valores e
              buscar traduzi-los em atitudes: falar com honestidade, cumprir compromissos,
              proteger os vulneráveis e tratar todos com dignidade, mesmo quando há divergências.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfetaMuhammad;
