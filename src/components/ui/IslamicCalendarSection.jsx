// src/components/ui/IslamicCalendarSection.jsx
import React, { useEffect, useState } from 'react';
import Section from '@components/ui/Section.jsx';

const BASE_ISLAMIC_EVENTS = [
  {
    id: 'ramadan',
    name: 'Ramadã',
    hijriMonth: 9,
    hijriDay: 1,
    shortTagline: 'Mês do jejum obrigatório.',
    description:
      'Mês em que o jejum de Ramadã foi prescrito. Os muçulmanos jejuam do amanhecer ao pôr do sol, buscando purificar o coração, fortalecer a consciência de Deus e aumentar atos de caridade e misericórdia.'
  },
  {
    id: 'laylatul-qadr',
    name: 'Noite do Decreto (Laylatul Qadr)',
    hijriMonth: 9,
    hijriDay: 27, // aproximação – varia nas noites ímpares dos últimos 10 dias
    shortTagline: 'Noite descrita como “melhor do que mil meses”.',
    description:
      'Noite em que o Alcorão começou a ser revelado. É uma oportunidade singular de súplica, reflexão e perdão, especialmente nas últimas noites ímpares de Ramadã.'
  },
  {
    id: 'eid-al-fitr',
    name: 'Eid al-Fitr',
    hijriMonth: 10,
    hijriDay: 1,
    shortTagline: 'Celebração após o término do jejum de Ramadã.',
    description:
      'Data que marca o fim do jejum de Ramadã. Envolve oração comunitária, caridade obrigatória (Zakat al-Fitr) e momentos de confraternização com família, amigos e a comunidade.'
  },
  {
    id: 'arafah',
    name: 'Dia de Arafah',
    hijriMonth: 12,
    hijriDay: 9,
    shortTagline: 'Dia de súplica intensa e arrependimento.',
    description:
      'Dia em que os peregrinos se reúnem no Monte Arafah, durante o Hajj. Para quem não está na peregrinação, é recomendado jejum e súplicas especiais, buscando perdão e renovação espiritual.'
  },
  {
    id: 'eid-al-adha',
    name: 'Eid al-Adha',
    hijriMonth: 12,
    hijriDay: 10,
    shortTagline: 'Festa do sacrifício ligada ao profeta Ibrahim (Abraão).',
    description:
      'Festa associada à história do profeta Ibrahim (Abraão), lembrando a disposição de obedecer a Deus acima de qualquer apego. Coincide com o período da peregrinação a Meca.'
  },
  {
    id: 'islamic-new-year',
    name: 'Ano novo islâmico (1º de Muharram)',
    hijriMonth: 1,
    hijriDay: 1,
    shortTagline: 'Início de um novo ano no calendário hijri.',
    description:
      'Marca o início de um novo ano no calendário hijri, lembrando a migração (Hijrah) do Profeta Muhammad de Meca para Medina e convidando à reflexão sobre propósito, ética e responsabilidade.'
  }
];

// Converte "DD-MM-YYYY" em Date
const parseDMYToDate = (dmy) => {
  const [day, month, year] = dmy.split('-').map((v) => parseInt(v, 10));
  return new Date(year, month - 1, day);
};

// Formata Date para "DD/MM/YYYY"
const formatDateBR = (date) =>
  date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

// Consulta Aladhan: hijri -> gregoriano
const fetchGregorianFromHijri = async (day, month, year) => {
  const response = await fetch(
    `https://api.aladhan.com/v1/hToG?date=${day}-${month}-${year}`
  );
  const json = await response.json();
  if (json.code !== 200 || !json.data?.gregorian?.date) {
    throw new Error('Falha ao converter data hijri para gregoriano');
  }
  return json.data.gregorian.date; // "DD-MM-YYYY"
};

// Consulta Aladhan para obter o ano hijri atual (a partir de hoje)
const fetchCurrentHijriYear = async () => {
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${today.getFullYear()}`;

  const response = await fetch(
    `https://api.aladhan.com/v1/gToH?date=${todayStr}`
  );
  const json = await response.json();

  if (json.code !== 200 || !json.data?.hijri?.year) {
    throw new Error('Falha ao obter ano hijri atual');
  }

  return parseInt(json.data.hijri.year, 10);
};

const IslamicCalendarSection = () => {
  const [events, setEvents] = useState(BASE_ISLAMIC_EVENTS);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Monta datas via API
  useEffect(() => {
    const buildEvents = async () => {
      try {
        const hijriYear = await fetchCurrentHijriYear();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const enriched = await Promise.all(
          BASE_ISLAMIC_EVENTS.map(async (item) => {
            let yearToUse = hijriYear;

            let gregorianDMY = await fetchGregorianFromHijri(
              item.hijriDay,
              item.hijriMonth,
              yearToUse
            );
            let gregorianDate = parseDMYToDate(gregorianDMY);

            // se já passou, pega próximo ano hijri
            if (gregorianDate < today) {
              yearToUse = hijriYear + 1;
              gregorianDMY = await fetchGregorianFromHijri(
                item.hijriDay,
                item.hijriMonth,
                yearToUse
              );
              gregorianDate = parseDMYToDate(gregorianDMY);
            }

            return {
              ...item,
              gregorianDateFormatted: formatDateBR(gregorianDate),
              hijriDateFormatted: `${String(item.hijriDay).padStart(
                2,
                '0'
              )}/${String(item.hijriMonth).padStart(
                2,
                '0'
              )}/${yearToUse} H`
            };
          })
        );

        setEvents(enriched);
      } catch (error) {
        console.error('Erro ao montar calendário islâmico:', error);
        setEvents(BASE_ISLAMIC_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    buildEvents();
  }, []);

  // Fecha modal com ESC
  useEffect(() => {
    if (!selectedEvent) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedEvent]);

  const openDetails = (eventItem) => {
    setSelectedEvent(eventItem);
  };

  const closeDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <Section
      id="calendario-islamico"
      title="Calendário islâmico – datas de destaque"
      description="Principais datas previstas a partir do ano hijri atual e seguintes. As datas podem variar um pouco conforme a observação da lua em cada região."
    >
      {loading && (
        <p className="ccib-calendar-loading">
          Carregando datas aproximadas do calendário islâmico…
        </p>
      )}

      {!loading && (
        <>
          <div className="ccib-calendar-grid">
            {events.map((item) => (
              <article key={item.id} className="ccib-calendar-card">
                <div className="ccib-calendar-card-header">
                  <h3 className="ccib-card-title">{item.name}</h3>

                  {item.gregorianDateFormatted &&
                    item.hijriDateFormatted && (
                      <div className="ccib-calendar-date-block">
                        <p className="ccib-calendar-date-label">
                          Próxima ocorrência
                        </p>
                        <p className="ccib-calendar-date-main">
                          {item.gregorianDateFormatted}
                        </p>
                        <p className="ccib-calendar-date-sub">
                          {item.hijriDateFormatted}
                        </p>
                      </div>
                    )}

                  {item.shortTagline && (
                    <p className="ccib-calendar-tagline">
                      {item.shortTagline}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="ccib-calendar-toggle"
                  onClick={() => openDetails(item)}
                >
                  <span>Ver mais detalhes</span>
                  <span className="ccib-calendar-toggle-icon">▾</span>
                </button>
              </article>
            ))}

            {/* CARD DE IMAGEM PARA FECHAR O GRID */}
            <article className="ccib-calendar-image-card">
              <div className="ccib-calendar-image-overlay">
                <h3 className="ccib-calendar-image-title">
                  Memórias de fé e peregrinação
                </h3>
                <p className="ccib-calendar-image-text">
                  Um lembrete visual de que cada data do calendário islâmico
                  está ligada a histórias, pessoas e jornadas reais.
                </p>
              </div>
            </article>
          </div>

          <p className="ccib-calendar-disclaimer">
            As datas gregorianas indicadas para cada evento são aproximações
            calculadas automaticamente a partir do calendário lunar. Podem haver
            variações de um dia, para mais ou para menos, conforme a observação
            da lua e os critérios adotados pela comunidade local.
          </p>
        </>
      )}

      {/* MODAL / ALERT DE DETALHES */}
      {selectedEvent && (
        <div
          className="ccib-calendar-modal-backdrop"
          onClick={closeDetails}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="ccib-calendar-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ccib-calendar-modal-close"
              onClick={closeDetails}
              aria-label="Fechar detalhes"
            >
              ✕
            </button>

            <h3 className="ccib-calendar-modal-title">
              {selectedEvent.name}
            </h3>

            {selectedEvent.gregorianDateFormatted &&
              selectedEvent.hijriDateFormatted && (
                <div className="ccib-calendar-modal-dates">
                  <p className="ccib-calendar-date-label">
                    Próxima ocorrência
                  </p>
                  <p className="ccib-calendar-date-main">
                    {selectedEvent.gregorianDateFormatted}
                  </p>
                  <p className="ccib-calendar-date-sub">
                    {selectedEvent.hijriDateFormatted}
                  </p>
                </div>
              )}

            {selectedEvent.shortTagline && (
              <p className="ccib-calendar-modal-tagline">
                {selectedEvent.shortTagline}
              </p>
            )}

            <p className="ccib-calendar-modal-description">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

export default IslamicCalendarSection;
