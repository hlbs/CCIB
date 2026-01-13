import React from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

const JesusNoIslam = () => {
  return (
    <>
      <PageVideoHero
        title="Jesus (ʿĪsā) no Islam"
        subtitle="Como o Islam vê Jesus: profeta, Messias, servo de Deus e elo em uma única mensagem de monoteísmo."
        badge="Respeito e clareza"
        videoUrl="videos/hero/video-hero06.mp4"
      />

      <main className="ccib-page">

        {/* 1. UMA SÓ MENSAGEM */}
        <AlternatingSection
          id="uma-so-mensagem"
          title="Uma só mensagem ao longo da história"
          imageUrl="https://images.pexels.com/photos/8164516/pexels-photo-8164516.jpeg"
          badge="Monoteísmo puro"
        >
          <p>
            O Islam entende que todos os profetas — de Adão a Noé, Abraão, Moisés, Jesus e
            Muhammad — foram enviados pelo mesmo Deus, com a mesma mensagem essencial: adorar
            apenas a Ele e viver com justiça e misericórdia.
          </p>
          <p>
            Nesse sentido, Jesus não inaugurou uma religião totalmente desconectada das anteriores,
            mas renovou o chamado ao monoteísmo e à retidão, chamando as pessoas de seu tempo a
            voltar ao espírito da lei, e não apenas à sua letra.
          </p>
          <p>
            O Alcorão situa Jesus dentro dessa corrente única de profetas, corrigindo excessos e
            distorções posteriores, sem negar sua grandeza espiritual nem sua importância para
            a história da humanidade.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 2. QUEM É JESUS */}
        <AlternatingSection
          id="quem-e-jesus"
          title="Quem é Jesus para os muçulmanos"
          reverse
          imageUrl="/images/prophets/isa.png"
          badge="Profeta e Messias"
        >
          <p>
            Para os muçulmanos, Jesus (ʿĪsā) é um dos maiores profetas de Deus. Ele nasceu de
            Maria (Maryam) por milagre, sem pai biológico, falou da parte de Deus, realizou sinais
            extraordinários com Sua permissão e chamou seu povo a retornar à adoração sincera
            do Criador.
          </p>
          <p>
            O Islam reconhece Jesus como Messias, palavra de Deus dirigida a Maria, mas rejeita
            a ideia de que ele seja Deus ou “filho literal de Deus”. Ele é servo e mensageiro,
            honrado e especial, mas em plena submissão ao Senhor dos mundos.
          </p>
          <p>
            Amar Jesus, na perspectiva islâmica, significa crer em sua missão, respeitar seu
            exemplo de fé, seguir seus ensinamentos autênticos e recusar exageros que o
            transformem em divindade.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 3. FONTES */}
        <AlternatingSection
          id="fontes"
          title="Jesus na Bíblia, no Alcorão e na tradição islâmica"
          imageUrl="https://images.pexels.com/photos/4242107/pexels-photo-4242107.jpeg"
          badge="Fontes em diálogo"
        >
          <p>
            Os Evangelhos que chegaram até nós foram escritos algumas décadas após a missão de
            Jesus, em contextos marcados por debates teológicos e influências filosóficas. Ao longo
            do tempo, surgiram formulações como a da Trindade e da encarnação, hoje centrais para
            muitas comunidades cristãs.
          </p>
          <p>
            O Alcorão, por sua vez, retoma Jesus como profeta e Messias, enfatizando sua humanidade
            e seu papel de mensageiro. Ele confirma a Torá e anuncia boas novas, mas sempre como
            servo que aponta para Deus, e não para si mesmo como divindade.
          </p>
          <p>
            A tradição islâmica relata, ainda, que Jesus retornará no fim dos tempos como sinal da
            proximidade do Dia do Juízo, reafirmando a verdade e corrigindo distorções, antes que
            a história humana chegue ao seu desfecho.
          </p>
        </AlternatingSection>

        {/* PARALLAX */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“Jesus (عَلَیهِ‌السَّلام), um Profeta de Deus”</h2>
                <p>
                  ¹⁰ E, entrando ele em Jerusalém, toda a cidade se alvoroçou, dizendo: <b>Quem é este?</b><br/>
                  ¹¹ E a multidão dizia: Este é <b>Jesus, o profeta de Nazaré da Galileia</b>.<br/>

                  Mateus 21:10,11
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PONTES DE DIÁLOGO */}
        <section id="dialogo" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Pontes de diálogo com cristãos</h2>
              <p className="ccib-section-description">
                Falar de Jesus a partir do Islam não é atacar a fé de ninguém, mas explicar com
                clareza uma visão que pode servir de base para encontros respeitosos e produtivos.
              </p>
            </header>

            <div className="ccib-feature-grid">
              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">Amor comum por Jesus</h3>
                <p className="ccib-feature-text">
                  Muçulmanos e cristãos compartilham admiração e carinho por Jesus e por Maria.
                  Esse amor comum pode ser ponto de partida para conversas sinceras sobre quem
                  ele foi e o que ensinou.
                </p>
              </article>

              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">Maria (Maryam), exemplo de fé</h3>
                <p className="ccib-feature-text">
                  O Alcorão destaca Maryam como modelo de pureza, confiança em Deus e coragem
                  espiritual. O respeito por ela aproxima muçulmanos de muitos cristãos que
                  também a amam profundamente.
                </p>
              </article>

              <article className="ccib-feature-card">
                <h3 className="ccib-feature-title">Monoteísmo como base comum</h3>
                <p className="ccib-feature-text">
                  Quando se olha para os primeiros discípulos que enfatizavam a unicidade de Deus,
                  fica mais fácil compreender a proposta islâmica: colocar o foco na adoração
                  exclusiva ao Criador, sem intermediários divinizados.
                </p>
              </article>
            </div>

            <p className="ccib-section-footer-text">
              Conhecer Jesus pela perspectiva islâmica não exige apagar a própria história
              religiosa, mas permite ver como diferentes tradições tentam responder à mesma
              pergunta: quem foi esse mensageiro extraordinário e que vida ele nos convida a viver?
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default JesusNoIslam;
