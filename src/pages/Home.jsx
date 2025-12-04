// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Hero from '@components/ui/Hero.jsx';
import Section from '@components/ui/Section.jsx';
import InfoCard from '@components/ui/InfoCard.jsx';
import Button from '@components/ui/Button.jsx';
import IslamicCalendarSection from '@components/ui/IslamicCalendarSection.jsx';
import { exportMonthlyPrayerTimesToPDF } from '@components/ui/exportMonthlyPrayerTimesToPDF';
import { db } from '../services/firebase.js';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';


// Rótulos em português para as orações principais
const PRAYER_LABELS = {
  Fajr: 'Fajr (Aurora)',
  Dhuhr: 'Dhuhr (Meio-dia)',
  Asr: 'Asr (Tarde)',
  Maghrib: 'Maghrib (Pôr do sol)',
  Isha: 'Isha (Noite)',
};

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const Home = () => {
  // Horários de oração
  const [todayTimings, setTodayTimings] = useState(null);
  const [monthData, setMonthData] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [prayerError, setPrayerError] = useState(null);

  // Navegação visual do calendário (gregoriano / hijri)
  const [calendarMode, setCalendarMode] = useState('gregorian');

  // Modal da tabela mensal
  const [showMonthModal, setShowMonthModal] = useState(false);

  // Notícias & Eventos (Home) – últimas postagens
  const [latestPosts, setLatestPosts] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const formatPostDateTime = (ts) => {
    if (!ts || !ts.toDate) return '';
    const date = ts.toDate();
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  // Carrega horários de oração via Aladhan (Muslim World League – método 3)
  useEffect(() => {
    const controller = new AbortController();

    async function loadPrayerTimes() {
      try {
        setPrayerLoading(true);
        setPrayerError(null);

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        // Salvador (BA): -12.9777, -38.5016
        const url = `https://api.aladhan.com/v1/calendar?latitude=-12.9777&longitude=-38.5016&method=3&month=${month}&year=${year}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error('Falha ao carregar horários de oração.');
        }

        const json = await res.json();

        if (!json || json.code !== 200 || !Array.isArray(json.data)) {
          throw new Error('Resposta inesperada da API de oração.');
        }

        const data = json.data;
        setMonthData(data);

        const dayIndex = now.getDate() - 1;
        const safeIndex = Math.min(Math.max(dayIndex, 0), data.length - 1);

        if (data[safeIndex]) {
          setTodayTimings({
            date: data[safeIndex].date,
            timings: data[safeIndex].timings,
          });
          setSelectedDateIndex(safeIndex);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setPrayerError(
            'Não foi possível carregar os horários de oração no momento. Tente novamente mais tarde.'
          );
        }
      } finally {
        setPrayerLoading(false);
      }
    }

    loadPrayerTimes();

    return () => controller.abort();
  }, []);

  // Carrega as últimas notícias/eventos do Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'ccib_posts'),
      orderBy('createdAt', 'desc'),
      limit(4)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestPosts(docs);
        setNewsLoading(false);
      },
      (error) => {
        console.error('Erro ao carregar últimas notícias:', error);
        setNewsLoading(false);
      }
    );

    return () => unsub();
  }, []);


  const handleSelectDay = (index) => {
    if (!monthData[index]) return;
    setSelectedDateIndex(index);
    setTodayTimings({
      date: monthData[index].date,
      timings: monthData[index].timings,
    });
  };

  const handleExportMonthPdf = () => {
    if (!monthData || monthData.length === 0) return;
    exportMonthlyPrayerTimesToPDF(monthData);
  };

  const selectedGregorianDate =
    todayTimings?.date?.gregorian?.date || 'Data não disponível';
  const selectedHijriDate =
    todayTimings?.date?.hijri?.date || 'Data hijri não disponível';

  return (
    <>
      {/* HERO COM VÍDEO DE FUNDO EM LOOPING */}
      <Hero />

      {/* NOTÍCIAS & EVENTOS – PLACEHOLDER (será alimentado via admin) */}
      <Section
        id="noticias"
        title="Notícias & Eventos"
        description="Veja as últimas atualizações do Centro Cultural Islâmico da Bahia. Para a lista completa, acesse a página de notícias."
      >
        {newsLoading ? (
          <p className="ccib-prayer-status">Carregando notícias…</p>
        ) : latestPosts.length === 0 ? (
          <p className="ccib-prayer-status">
            Ainda não há notícias publicadas. Assim que a equipe começar a
            publicar, as últimas atualizações aparecerão aqui.
          </p>
        ) : (
          <div className="ccib-news-list">
            {latestPosts.map((post) => (
              <article key={post.id} className="ccib-card">
                <div className="ccib-card-body">
                  <p className="ccib-pillar-label">
                    {post.tipo === 'evento' ? 'Evento' : 'Notícia'}
                  </p>
                  <h3 className="ccib-news-item-title">{post.title}</h3>
                  {post.resumo && (
                    <p className="ccib-news-item-summary">{post.resumo}</p>
                  )}
                  {post.authorName && (
                    <p className="ccib-news-item-meta">
                      Publicado em {formatPostDateTime(post.createdAt)} por{' '}
                      <strong>{post.authorName}</strong>
                    </p>
                  )}

                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          <Button to="/noticias-e-eventos" variant="outline">
            Ver todas as notícias &amp; eventos
          </Button>
        </div>
      </Section>

      {/* Divisor visual */}
      <div className="ccib-section-divider" aria-hidden="true">
        <span className="ccib-section-divider-icon" />
      </div>

      {/* HORÁRIOS DE ORAÇÃO */}
      <Section
        id="oracao"
        title="Horários de oração em Salvador (BA)"
        description="Consulte os horários diários das cinco orações obrigatórias e visualize o calendário mensal para a cidade de Salvador."
      >

        {/* Verso do Alcorão */}
        <div className="ccib-verse-callout">
          <p className="ccib-verse-ar">

            فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَـٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا ١٠٣

          </p>
          <p className="ccib-verse-tr">
            “E, quando houverdes encerrado a oração, lembrai-vos de Allah, estando de pé ou assentados ou deitados.
            E, quando estiverdes em segurança, cumpri a oração. Por certo, a oração, para os crentes, é prescrição com tempos marcados.”
          </p>
          <a
            href="https://quran.com/4/103"
            className="ccib-verse-ref"
            target="_blank"
            rel="noreferrer"
          >
            Alcorão 4:103 &mdash; Surah An-Nisā’
          </a>
        </div>

        <div className="ccib-prayer-layout">
          {/* Card principal com horários do dia selecionado */}
          <div className="ccib-prayer-card-main">
            {prayerLoading && (
              <p className="ccib-prayer-status">Carregando horários…</p>
            )}

            {!prayerLoading && prayerError && (
              <p className="ccib-prayer-status ccib-prayer-status--error">
                {prayerError}
              </p>
            )}

            {!prayerLoading && !prayerError && todayTimings && (
              <>
                <div className="ccib-prayer-header">
                  <div>
                    <p className="ccib-prayer-date-label">Dia selecionado</p>
                    <p className="ccib-prayer-date-main">
                      {selectedGregorianDate}
                    </p>
                    <p className="ccib-prayer-date-sub">
                      {selectedHijriDate} (calendário hijri)
                    </p>
                  </div>

                  <div className="ccib-prayer-header-actions">
                    <button
                      type="button"
                      className="ccib-prayer-toggle"
                      onClick={() => setShowMonthModal(true)}
                    >
                      Ver tabela do mês
                    </button>
                  </div>
                </div>

                <table className="ccib-prayer-table">
                  <tbody>
                    {PRAYER_KEYS.map((key) => {
                      const raw = todayTimings.timings[key] || '';
                      const clean = raw.split(' ')[0]; // remove fuso horário
                      return (
                        <tr key={key}>
                          <td className="ccib-prayer-label">
                            {PRAYER_LABELS[key] || key}
                          </td>
                          <td className="ccib-prayer-time">{clean}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <p className="ccib-prayer-note">
                  Horários aproximados para Salvador (BA), calculados pelo
                  método astronômico da Muslim World League (Aladhan API,
                  método 3). Recomenda-se sempre seguir a orientação da
                  comunidade local.
                </p>
              </>
            )}
          </div>

          {/* Navegação mensal / mini-calendário */}
          <aside className="ccib-prayer-calendar">
            <h3 className="ccib-prayer-calendar-title">
              Tabela mensal de horários
            </h3>
            <p className="ccib-prayer-calendar-text">
              Clique em um dia para ver os horários detalhados ao lado.
            </p>

            {/* Toggle entre visualização gregoriana e hijri */}
            <div className="ccib-prayer-calendar-toggle">
              <button
                type="button"
                className={`ccib-prayer-calendar-toggle-btn ${calendarMode === 'gregorian'
                  ? 'ccib-prayer-calendar-toggle-btn--active'
                  : ''
                  }`}
                onClick={() => setCalendarMode('gregorian')}
              >
                <span className="ccib-prayer-calendar-toggle-label">
                  Gregoriano
                </span>
              </button>

              <button
                type="button"
                className={`ccib-prayer-calendar-toggle-btn ${calendarMode === 'hijri'
                  ? 'ccib-prayer-calendar-toggle-btn--active'
                  : ''
                  }`}
                onClick={() => setCalendarMode('hijri')}
              >
                <span className="ccib-prayer-calendar-toggle-label">
                  Hijri
                </span>
              </button>
            </div>

            <div className="ccib-prayer-calendar-grid">
              {monthData.map((day, index) => {
                const greg = day.date.gregorian;
                const hijri = day.date.hijri;

                const primary =
                  calendarMode === 'gregorian' ? greg.day : hijri.day;

                const secondary =
                  calendarMode === 'gregorian'
                    ? `${greg.month.number}/${greg.year
                      .toString()
                      .slice(-2)}`
                    : `${hijri.month.number}/${hijri.year
                      .toString()
                      .slice(-2)}`;

                return (
                  <button
                    key={greg.date + index}
                    type="button"
                    className={`ccib-prayer-calendar-day ${selectedDateIndex === index
                      ? 'ccib-prayer-calendar-day--active'
                      : ''
                      }`}
                    onClick={() => handleSelectDay(index)}
                  >
                    <span className="ccib-prayer-calendar-day-number">
                      {primary}
                    </span>
                    <span className="ccib-prayer-calendar-day-label">
                      {secondary}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </Section>

      {/* Divisor visual */}
      <div className="ccib-section-divider" aria-hidden="true">
        <span className="ccib-section-divider-icon" />
      </div>

      {/* CALENDÁRIO ISLÂMICO – DATAS DESTAQUE (via API) */}
      <IslamicCalendarSection />

      {/* Divisor visual */}
      <div className="ccib-section-divider" aria-hidden="true">
        <span className="ccib-section-divider-icon" />
      </div>

      {/* CONTEÚDOS EM DESTAQUE */}
      <Section
        id="temas"
        title="Conteúdos em destaque"
        description="Explore temas centrais da fé islâmica e da atuação do CCIB, apresentados em linguagem clara e acessível."
      >

        {/* Verso do Alcorão */}
        <div className="ccib-verse-callout">
          <p className="ccib-verse-ar">

            فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَـٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَـٰبًۭا مَّوْقُوتًۭا ١٠٣

          </p>
          <p className="ccib-verse-tr">
            “E que seja formada de vós uma comunidade, que convoque ao bem, e ordene o conveniente, e coíba o reprovável. 
            E esses são os bem-aventurados.”
          </p>
          <a
            href="https://quran.com/3/104"
            className="ccib-verse-ref"
            target="_blank"
            rel="noreferrer"
          >
            Alcorão 3:104 &mdash; Surah Ali'Imran
          </a>
        </div>

        <div className="ccib-card-grid">
          <InfoCard
            title="Conheça o Islam"
            description="Uma visão geral sobre a crença em um Deus único, o propósito da vida e a continuidade da mensagem dos profetas."
            to="/conheca-o-islam"
          />
          <InfoCard
            title="O Profeta Muhammad"
            description="Breve biografia, traços de caráter e exemplo ético do Profeta Muhammad (que a paz esteja com ele)."
            to="/profeta-muhammad"
          />
          <InfoCard
            title="A Mulher no Islam"
            description="Uma abordagem sobre a dignidade, os direitos e o papel da mulher na perspectiva islâmica."
            to="/mulher-no-islam"
          />
          <InfoCard
            title="Jesus no Islam"
            description="Entenda como o Islam reconhece Jesus como um profeta de Deus e honra Maria, sua mãe."
            to="/jesus-no-islam"
          />
          <InfoCard
            title="Hadith & Ética"
            description="Reflexões sobre ética, intenção, sinceridade e responsabilidade, a partir de hadiths autênticos."
            to="/hadith-e-etica"
          />
          <InfoCard
            title="Notícias & Eventos"
            description="Acompanhe atividades, palestras, cursos e ações comunitárias organizadas pelo CCIB."
            to="/noticias-e-eventos"
          />
        </div>
      </Section>

      {/* MODAL DA TABELA MENSAL DE HORÁRIOS */}
      {showMonthModal && (
        <div
          className="ccib-modal-overlay"
          onClick={() => setShowMonthModal(false)}
        >
          <div className="ccib-modal" onClick={(e) => e.stopPropagation()}>
            <header className="ccib-modal-header">
              <div>
                <h2 className="ccib-modal-title">
                  Tabela mensal de horários – Salvador (BA)
                </h2>
                <p className="ccib-modal-subtitle">
                  Horários aproximados para o mês atual. Para salvar em PDF,<b>
                    utilize o botão “Imprimir / Salvar em PDF” abaixo.</b>
                </p>
              </div>
              <button
                type="button"
                className="ccib-modal-close"
                onClick={() => setShowMonthModal(false)}
              >
                ×
              </button>
            </header>

            <div className="ccib-modal-body">
              <div className="ccib-prayer-month-table-wrapper">
                <table className="ccib-prayer-month-table">
                  <thead>
                    <tr>
                      <th>Dia (greg.)</th>
                      <th>Dia (hijri)</th>
                      <th>Fajr</th>
                      <th>Dhuhr</th>
                      <th>Asr</th>
                      <th>Maghrib</th>
                      <th>Isha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthData.map((day, index) => {
                      const t = day.timings;
                      const g = day.date.gregorian;
                      const h = day.date.hijri;

                      return (
                        <tr key={g.date + '-row-' + index}>
                          <td>{g.date.replace(/-/g, '/')}</td>
                          <td>{`${h.date} (${h.month.en})`}</td>
                          <td>{(t.Fajr || '').split(' ')[0]}</td>
                          <td>{(t.Dhuhr || '').split(' ')[0]}</td>
                          <td>{(t.Asr || '').split(' ')[0]}</td>
                          <td>{(t.Maghrib || '').split(' ')[0]}</td>
                          <td>{(t.Isha || '').split(' ')[0]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <footer className="ccib-modal-footer">
              <div className="ccib-modal-actions">
                <button
                  type="button"
                  className="ccib-modal-btn"
                  onClick={handleExportMonthPdf}
                >
                  Imprimir / Salvar em PDF
                </button>
                <button
                  type="button"
                  className="ccib-modal-btn ccib-modal-btn--ghost"
                  onClick={() => setShowMonthModal(false)}
                >
                  Fechar
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
