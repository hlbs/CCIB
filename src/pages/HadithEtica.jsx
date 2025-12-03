import React from 'react';
import PageVideoHero from '@components/ui/PageVideoHero.jsx';
import AlternatingSection from '@components/ui/AlternatingSection.jsx';

const temasEticos = [
  {
    id: 'intencao',
    titulo: 'Intenção e sinceridade',
    resumo:
      'O primeiro hadith da coleção de An-Nawawi lembra que o valor real das ações está nas intenções. Uma mesma ação pode ter pesos espirituais diferentes, a depender do que se busca com ela.',
    destaque:
      '“As ações são (julgadas) pelas intenções, e cada pessoa terá apenas o que intencionou.”'
  },
  {
    id: 'islam-fe-excelencia',
    titulo: 'Islam, fé e excelência (ihsān)',
    resumo:
      'Um hadith famoso apresenta três camadas da vida espiritual: Islam (prática visível), imān (crenças) e ihsān (adorar a Deus como se O víssemos). Ética islâmica é mais que cumprir regras: é qualidade interior.',
    destaque:
      'Ser ético é agir certo, crer corretamente e buscar excelência na relação com Deus e com as pessoas.'
  },
  {
    id: 'halal-haram',
    titulo: 'Lícito, ilícito e zonas cinzentas',
    resumo:
      'Alguns hadiths explicam que o lícito (halal) é claro e o ilícito (haram) também, mas existem assuntos duvidosos. Quem se afasta dessas zonas cinzentas protege sua fé e sua honra.',
    destaque:
      'Cuidado com o “jeitinho”: procurar brechas pode afastar o coração daquilo que agrada a Deus.'
  },
  {
    id: 'proximo',
    titulo: 'Cuidado com o próximo',
    resumo:
      'Entre os hadiths mais conhecidos está o que diz que ninguém crê plenamente até amar para o seu irmão o que ama para si mesmo. Ética no Islam inclui empatia, justiça e compaixão ativa.',
    destaque:
      'É contraditório buscar a proximidade de Deus e, ao mesmo tempo, ser indiferente ao sofrimento do outro.'
  },
  {
    id: 'responsabilidade',
    titulo: 'Responsabilidade e prestação de contas',
    resumo:
      'Vários ditos lembram que cada pessoa é guardiã de algo: família, conhecimento, recursos, tempo. O senso de prestação de contas organiza prioridades e impede abusos de poder.',
    destaque:
      'Liderança, no Islam, é serviço responsável — não privilégio para explorar os outros.'
  },
  {
    id: 'carater',
    titulo: 'Bom caráter acima de formalismos',
    resumo:
      'O Profeta ensinou que as pessoas mais amadas por Deus são as de melhor caráter. A prática ritual perde sentido se não se traduz em honestidade, humildade e respeito.',
    destaque:
      'Religião não é apenas o que se faz em público, mas o que somos quando ninguém está olhando.'
  }
];

const HadithEtica = () => {
  return (
    <>
      <PageVideoHero
        title="Hadith & Ética"
        subtitle="Como os ensinamentos proféticos moldam uma ética viva: intenções, responsabilidade, compaixão e justiça."
        badge="Os Quarenta Hadith"
        videoUrl="public/videos/hero/video-hero09.mp4"
      />

      <main className="ccib-page">
        <div className="ccib-container">
          <nav aria-label="Seções desta página" className="ccib-page-chip-nav">
            <a href="#introducao" className="ccib-chip-link">
              Introdução
            </a>
            <a href="#alcorao-hadith" className="ccib-chip-link">
              Alcorão &amp; Hadith
            </a>
            <a href="#fundamentos" className="ccib-chip-link">
              Fundamentos éticos
            </a>
            <a href="#temas" className="ccib-chip-link">
              Temas em destaque
            </a>
          </nav>
        </div>

        {/* 1. INTRODUÇÃO */}
        <AlternatingSection
          id="introducao"
          title="Os Quarenta Hadith de An-Nawawi"
          imageUrl="https://images.pexels.com/photos/159872/book-open-pages-literature-159872.jpeg"
          badge="Síntese da tradição"
        >
          <p>
            A coletânea conhecida como “Os Quarenta Hadith” reúne ditos do Profeta Muhammad que
            sintetizam os pilares da fé, da prática e da espiritualidade islâmica em poucos textos,
            fáceis de memorizar e de aplicar na vida diária.
          </p>
          <p>
            Logo no início, aparecem hadiths sobre intenção, sobre o que é Islam e o que é fé, sobre
            excelência espiritual e sobre como distinguir o lícito do ilícito. A partir deles, é
            possível desenhar um mapa ético que vai do coração às ações públicas.
          </p>
          <p>
            Esta página oferece uma porta de entrada para quem deseja compreender como essas
            palavras moldam caráter, escolhas e prioridades, sem substituir o estudo direto da obra
            nem o acompanhamento de pessoas de conhecimento.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 1.2 ALCORÃO & HADITH */}
        <AlternatingSection
          id="alcorao-hadith"
          title="Alcorão e Hadith: texto sagrado e relatos proféticos"
          reverse
          imageUrl="https://images.pexels.com/photos/159711/books-book-pages-read-literature-159711.jpeg"
          badge="Fontes da fé"
        >
          <p>
            Para entender o lugar dos hadiths na ética islâmica, é importante distinguir duas
            fontes principais: o <strong>Alcorão</strong> e o <strong>Hadith</strong>.
          </p>
          <p>
            O Alcorão é, para os muçulmanos, a palavra de Deus revelada literalmente ao Profeta
            Muhammad por intermédio do anjo Gabriel. É recitado em árabe na oração, preservado
            letra por letra, e ocupa o nível mais alto de autoridade religiosa.
          </p>
          <p>
            Já os hadiths são <strong>relatos</strong> sobre o que o Profeta disse, fez ou aprovou.
            Eles explicam, detalham e exemplificam o que o Alcorão ensina. Por serem relatos
            transmitidos por pessoas ao longo de gerações, precisam ser estudados com método e
            critérios rigorosos.
          </p>
          <p>
            O estudo de Hadith analisa dois componentes principais:
          </p>
          <ul className="ccib-list">
            <li>
              <strong>Isnād (cadeia de transmissão):</strong> a sequência de narradores que
              transmitiu o relato, de geração em geração;
            </li>
            <li>
              <strong>Matn (texto):</strong> o conteúdo do hadith — a frase, ensinamento ou
              descrição em si.
            </li>
          </ul>
          <p>
            Os estudiosos verificam a confiabilidade dos narradores, a continuidade da cadeia, a
            coerência do texto com o Alcorão e com outros hadiths autênticos. A partir disso,
            classificam os relatos em graus distintos, como:
          </p>
          <ul className="ccib-list">
            <li>
              <strong>ṣaḥīḥ (autêntico):</strong> cadeia contínua, narradores confiáveis e texto sem
              problemas;
            </li>
            <li>
              <strong>ḥasan (bom):</strong> semelhante ao ṣaḥīḥ, mas com leve fragilidade em algum
              narrador, ainda aceito para orientações práticas e éticas;
            </li>
            <li>
              <strong>ḍaʿīf (fraco):</strong> com problemas na cadeia ou nos narradores, usado com
              muita cautela e, em geral, não como base para regras;
            </li>
            <li>
              <strong>mawḍūʿ (fabricado/forjado):</strong> relato inventado, atribuído
              injustamente ao Profeta, e que deve ser rejeitado.
            </li>
          </ul>
          <p>
            A coleção de An-Nawawi privilegia hadiths autênticos ou bons, justamente para oferecer
            um núcleo confiável de ensinamentos que servem como base para a ética e a espiritualidade
            do muçulmano.
          </p>
        </AlternatingSection>

        {/* DIVISOR */}
        <div className="ccib-section-divider" aria-hidden="true">
          <span className="ccib-section-divider-icon" />
        </div>

        {/* 2. FUNDAMENTOS ÉTICOS */}
        <AlternatingSection
          id="fundamentos"
          title="Quatro eixos da ética profética"
          reverse
          imageUrl="https://images.pexels.com/photos/3823487/pexels-photo-3823487.jpeg"
          badge="Do coração à ação"
        >
          <p>
            Lendo os hadiths em conjunto, é possível identificar alguns eixos centrais da ética
            islâmica:
          </p>
          <ul className="ccib-list">
            <li>
              <strong>Intenção correta:</strong> agir buscando o agrado de Deus e o bem real, não
              apenas reconhecimento social ou vantagem pessoal.
            </li>
            <li>
              <strong>Coerência entre fé e prática:</strong> língua, coração e gestos precisam
              apontar na mesma direção.
            </li>
            <li>
              <strong>Cuidado com o outro:</strong> não prejudicar é mínimo; o ideal é ser fonte de
              benefício, segurança e conforto para as pessoas ao redor.
            </li>
            <li>
              <strong>Responsabilidade diante de Deus:</strong> tempo, saúde, inteligência, recursos
              e posições são depósitos pelos quais cada um prestará contas.
            </li>
          </ul>
          <p>
            Dessa forma, a ética deixa de ser apenas teoria e se torna campo concreto em que se
            revela o valor real da fé e da adoração.
          </p>
        </AlternatingSection>

        {/* PARALLAX */}
        <section className="ccib-parallax-slice">
          <div className="ccib-parallax-overlay">
            <div className="ccib-container">
              <div className="ccib-parallax-text">
                <h2>“A fé mais completa é a de melhor caráter.”</h2>
                <p>
                  A tradição profética insiste que boas maneiras, honestidade, humildade e justiça
                  são parte essencial da religião — não apenas detalhes de etiqueta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TEMAS EM DESTAQUE */}
        <section id="temas" className="ccib-section">
          <div className="ccib-container">
            <header className="ccib-section-header">
              <h2 className="ccib-section-title">Temas éticos inspirados pelos hadiths</h2>
              <p className="ccib-section-description">
                Abaixo, alguns eixos temáticos presentes na coletânea, em linguagem acessível para
                estudo individual ou em grupo.
              </p>
            </header>

            <div className="ccib-feature-grid">
              {temasEticos.map((tema) => (
                <article key={tema.id} className="ccib-feature-card">
                  <h3 className="ccib-feature-title">{tema.titulo}</h3>
                  <p className="ccib-feature-text">{tema.resumo}</p>
                  <p className="ccib-feature-highlight">• {tema.destaque}</p>
                </article>
              ))}
            </div>

            <p className="ccib-section-footer-text">
              Para aprofundar, vale a pena estudar os “Quarenta Hadith” com acompanhamento de
              professores qualificados ou em círculos de estudo, observando a cadeia de transmissão,
              o contexto de cada dito e a forma como os estudiosos avaliaram sua autenticidade.
              Assim, a ética se torna compromisso concreto com Deus, consigo mesmo e com a sociedade.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HadithEtica;
