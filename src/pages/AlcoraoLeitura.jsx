// src/pages/AlcoraoLeitura.jsx
import React, { useEffect, useState } from 'react';
import Section from '@components/ui/Section.jsx';

// Tradução Helmi Nasr via QuranEnc
const TRANSLATION_KEY = 'portuguese_nasr';
const API_BASE = 'https://quranenc.com/api/v1/translation/sura';

// Texto árabe (sem tajweed) via AlQuran.cloud
const ARABIC_API_BASE = 'https://api.alquran.cloud/v1/surah';

const SURA_LIST = [
  { number: 1, arabic: 'الفاتحة', translit: 'Al-Fátiḥah', portuguese: 'A Abertura' },
  { number: 2, arabic: 'البقرة', translit: 'Al-Báqarah', portuguese: 'A Vaca' },
  { number: 3, arabic: 'آل عمران', translit: 'Āl ʿImrān', portuguese: 'A Família de Imran' },
  { number: 4, arabic: 'النساء', translit: 'An-Nisāʼ', portuguese: 'As Mulheres' },
  { number: 5, arabic: 'المائدة', translit: 'Al-Māʼidah', portuguese: 'A Mesa Servida' },
  { number: 6, arabic: 'الأنعام', translit: 'Al-Anʻām', portuguese: 'Os Rebanhos' },
  { number: 7, arabic: 'الأعراف', translit: 'Al-Aʻrāf', portuguese: 'As Alturas' },
  { number: 8, arabic: 'الأنفال', translit: 'Al-Anfāl', portuguese: 'O Espólio' },
  { number: 9, arabic: 'التوبة', translit: 'At-Tawbah', portuguese: 'O Arrependimento' },
  { number: 10, arabic: 'يونس', translit: 'Yūnus', portuguese: 'Jonas' },
  { number: 11, arabic: 'هود', translit: 'Hūd', portuguese: 'Hud' },
  { number: 12, arabic: 'يوسف', translit: 'Yūsuf', portuguese: 'José' },
  { number: 13, arabic: 'الرعد', translit: 'Ar-Raʻd', portuguese: 'O Trovão' },
  { number: 14, arabic: 'إبراهيم', translit: 'Ibrāhīm', portuguese: 'Abraão' },
  { number: 15, arabic: 'الحجر', translit: 'Al-Ḥijr', portuguese: 'Al-Hijr' },
  { number: 16, arabic: 'النحل', translit: 'An-Naḥl', portuguese: 'As Abelhas' },
  { number: 17, arabic: 'الإسراء', translit: 'Al-Isrāʼ', portuguese: 'A Viagem Noturna' },
  { number: 18, arabic: 'الكهف', translit: 'Al-Kahf', portuguese: 'A Caverna' },
  { number: 19, arabic: 'مريم', translit: 'Maryam', portuguese: 'Maria' },
  { number: 20, arabic: 'طه', translit: 'Ṭā-Hā', portuguese: 'Ta-Ha' },
  { number: 21, arabic: 'الأنبياء', translit: 'Al-Anbiyāʼ', portuguese: 'Os Profetas' },
  { number: 22, arabic: 'الحج', translit: 'Al-Ḥajj', portuguese: 'A Peregrinação' },
  { number: 23, arabic: 'المؤمنون', translit: 'Al-Muʼminūn', portuguese: 'Os Crentes' },
  { number: 24, arabic: 'النور', translit: 'An-Nūr', portuguese: 'A Luz' },
  { number: 25, arabic: 'الفرقان', translit: 'Al-Furqān', portuguese: 'O Discernimento' },
  { number: 26, arabic: 'الشعراء', translit: 'Ash-Shuʿarāʼ', portuguese: 'Os Poetas' },
  { number: 27, arabic: 'النمل', translit: 'An-Naml', portuguese: 'As Formigas' },
  { number: 28, arabic: 'القصص', translit: 'Al-Qaṣaṣ', portuguese: 'Os Relatos' },
  { number: 29, arabic: 'العنكبوت', translit: 'Al-ʻAnkabūt', portuguese: 'A Aranha' },
  { number: 30, arabic: 'الروم', translit: 'Ar-Rūm', portuguese: 'Os Bizantinos' },
  { number: 31, arabic: 'لقمان', translit: 'Luqmān', portuguese: 'Luqmān' },
  { number: 32, arabic: 'السجدة', translit: 'As-Sajdah', portuguese: 'A Prostração' },
  { number: 33, arabic: 'الأحزاب', translit: 'Al-Aḥzāb', portuguese: 'Os Aliados' },
  { number: 34, arabic: 'سبإ', translit: 'Sabaʼ', portuguese: 'Sabá' },
  { number: 35, arabic: 'فاطر', translit: 'Fāṭir', portuguese: 'O Originador' },
  { number: 36, arabic: 'يس', translit: 'Yā-Sīn', portuguese: 'Ya-Sin' },
  { number: 37, arabic: 'الصافات', translit: 'Aṣ-Ṣāffāt', portuguese: 'Os que se Alinham' },
  { number: 38, arabic: 'ص', translit: 'Ṣād', portuguese: 'Sad' },
  { number: 39, arabic: 'الزمر', translit: 'Az-Zumar', portuguese: 'Os Grupos' },
  { number: 40, arabic: 'غافر', translit: 'Ghāfir', portuguese: 'O Perdoador' },
  { number: 41, arabic: 'فصلت', translit: 'Fuşşilat', portuguese: 'Explicada em Detalhes' },
  { number: 42, arabic: 'الشورى', translit: 'Ash-Shūrā', portuguese: 'A Consulta' },
  { number: 43, arabic: 'الزخرف', translit: 'Az-Zukhruf', portuguese: 'Os Ornamentos de Ouro' },
  { number: 44, arabic: 'الدخان', translit: 'Ad-Dukhān', portuguese: 'A Fumaça' },
  { number: 45, arabic: 'الجاثية', translit: 'Al-Jāthiyah', portuguese: 'Prostrada' },
  { number: 46, arabic: 'الأحقاف', translit: 'Al-Aḥqāf', portuguese: 'As Dunas' },
  { number: 47, arabic: 'محمد', translit: 'Muḥammad', portuguese: 'Muhammad' },
  { number: 48, arabic: 'الفتح', translit: 'Al-Fatḥ', portuguese: 'A Vitória' },
  { number: 49, arabic: 'الحجرات', translit: 'Al-Ḥujurāt', portuguese: 'Os Aposentos' },
  { number: 50, arabic: 'ق', translit: 'Qāf', portuguese: 'Qaf' },
  { number: 51, arabic: 'الذاريات', translit: 'Adh-Dhāriyāt', portuguese: 'Os que Espalham' },
  { number: 52, arabic: 'الطور', translit: 'Aṭ-Ṭūr', portuguese: 'O Monte' },
  { number: 53, arabic: 'النجم', translit: 'An-Najm', portuguese: 'A Estrela' },
  { number: 54, arabic: 'القمر', translit: 'Al-Qamar', portuguese: 'A Lua' },
  { number: 55, arabic: 'الرحمن', translit: 'Ar-Raḥmān', portuguese: 'O Clemente' },
  { number: 56, arabic: 'الواقعة', translit: 'Al-Wāqiʿah', portuguese: 'O Evento' },
  { number: 57, arabic: 'الحديد', translit: 'Al-Ḥadīd', portuguese: 'O Ferro' },
  { number: 58, arabic: 'المجادلة', translit: 'Al-Mujādilah', portuguese: 'A Debatedora' },
  { number: 59, arabic: 'الحشر', translit: 'Al-Ḥashr', portuguese: 'A Reunião' },
  { number: 60, arabic: 'الممتحنة', translit: 'Al-Mumtaḥanah', portuguese: 'A Provada' },
  { number: 61, arabic: 'الصف', translit: 'Aṣ-Ṣaff', portuguese: 'As Fileiras' },
  { number: 62, arabic: 'الجمعة', translit: 'Al-Jumuʿah', portuguese: 'A Congregação' },
  { number: 63, arabic: 'المنافقون', translit: 'Al-Munāfiqūn', portuguese: 'Os Hipócritas' },
  { number: 64, arabic: 'التغابن', translit: 'At-Taghābun', portuguese: 'Perda e Lucro' },
  { number: 65, arabic: 'الطلاق', translit: 'Aṭ-Ṭalāq', portuguese: 'O Divórcio' },
  { number: 66, arabic: 'التحريم', translit: 'At-Taḥrīm', portuguese: 'A Proibição' },
  { number: 67, arabic: 'الملك', translit: 'Al-Mulk', portuguese: 'A Soberania' },
  { number: 68, arabic: 'القلم', translit: 'Al-Qalam', portuguese: 'A Caneta' },
  { number: 69, arabic: 'الحاقة', translit: 'Al-Ḥāqqah', portuguese: 'A Verdadeira' },
  { number: 70, arabic: 'المعارج', translit: 'Al-Maʿārij', portuguese: 'As Ascensões' },
  { number: 71, arabic: 'نوح', translit: 'Nūḥ', portuguese: 'Noé' },
  { number: 72, arabic: 'الجن', translit: 'Al-Jinn', portuguese: 'Os Jinn' },
  { number: 73, arabic: 'المزمل', translit: 'Al-Muzzammil', portuguese: 'O Envolto' },
  { number: 74, arabic: 'المدثر', translit: 'Al-Muddaththir', portuguese: 'O Coberto' },
  { number: 75, arabic: 'القيامة', translit: 'Al-Qiyāmah', portuguese: 'A Ressurreição' },
  { number: 76, arabic: 'الإنسان', translit: 'Al-Insān', portuguese: 'O Ser Humano' },
  { number: 77, arabic: 'المرسلات', translit: 'Al-Mursalāt', portuguese: 'Os Enviados' },
  { number: 78, arabic: 'النبإ', translit: 'An-Nabaʼ', portuguese: 'A Notícia' },
  { number: 79, arabic: 'النازعات', translit: 'An-Nāziʻāt', portuguese: 'Os que Arrancam' },
  { number: 80, arabic: 'عبس', translit: 'ʿAbasa', portuguese: 'Ele Franziu' },
  { number: 81, arabic: 'التكوير', translit: 'At-Takwīr', portuguese: 'O Enrolar' },
  { number: 82, arabic: 'الإنفطار', translit: 'Al-Infiṭār', portuguese: 'O Fender' },
  { number: 83, arabic: 'المطففين', translit: 'Al-Muṭaffifīn', portuguese: 'Os Defraudadores' },
  { number: 84, arabic: 'الإنشقاق', translit: 'Al-Inshiqqāq', portuguese: 'O Rompimento' },
  { number: 85, arabic: 'البروج', translit: 'Al-Burūj', portuguese: 'As Constelações' },
  { number: 86, arabic: 'الطارق', translit: 'Aṭ-Ṭāriq', portuguese: 'O Astro Noturno' },
  { number: 87, arabic: 'الأعلى', translit: 'Al-Aʿlā', portuguese: 'O Altíssimo' },
  { number: 88, arabic: 'الغاشية', translit: 'Al-Ghāshiyah', portuguese: 'A Cobertura' },
  { number: 89, arabic: 'الفجر', translit: 'Al-Fajr', portuguese: 'A Aurora' },
  { number: 90, arabic: 'البلد', translit: 'Al-Balad', portuguese: 'A Cidade' },
  { number: 91, arabic: 'الشمس', translit: 'Ash-Shams', portuguese: 'O Sol' },
  { number: 92, arabic: 'الليل', translit: 'Al-Layl', portuguese: 'A Noite' },
  { number: 93, arabic: 'الضحى', translit: 'Aḍ-Ḍuḥā', portuguese: 'O Alvorecer' },
  { number: 94, arabic: 'الشرح', translit: 'Ash-Sharḥ', portuguese: 'A Abertura' },
  { number: 95, arabic: 'التين', translit: 'At-Tīn', portuguese: 'O Figo' },
  { number: 96, arabic: 'العلق', translit: 'Al-ʿAlaq', portuguese: 'O Coágulo' },
  { number: 97, arabic: 'القدر', translit: 'Al-Qadr', portuguese: 'O Decreto' },
  { number: 98, arabic: 'البينة', translit: 'Al-Bayyinah', portuguese: 'A Prova' },
  { number: 99, arabic: 'الزلزلة', translit: 'Az-Zalzalah', portuguese: 'O Tremor' },
  { number: 100, arabic: 'العاديات', translit: 'Al-ʿĀdiyāt', portuguese: 'Os Corcéis' },
  { number: 101, arabic: 'القارعة', translit: 'Al-Qāriʿah', portuguese: 'A Calamidade' },
  { number: 102, arabic: 'التكاثر', translit: 'At-Takāthur', portuguese: 'A Competição' },
  { number: 103, arabic: 'العصر', translit: 'Al-ʿAṣr', portuguese: 'O Tempo' },
  { number: 104, arabic: 'الهمزة', translit: 'Al-Humazah', portuguese: 'O Difamador' },
  { number: 105, arabic: 'الفيل', translit: 'Al-Fīl', portuguese: 'O Elefante' },
  { number: 106, arabic: 'قريش', translit: 'Quraysh', portuguese: 'Quraysh' },
  { number: 107, arabic: 'الماعون', translit: 'Al-Māʻūn', portuguese: 'A Assistência' },
  { number: 108, arabic: 'الكوثر', translit: 'Al-Kawthar', portuguese: 'A Abundância' },
  { number: 109, arabic: 'الكافرون', translit: 'Al-Kāfirūn', portuguese: 'Os Incrédulos' },
  { number: 110, arabic: 'النصر', translit: 'An-Naṣr', portuguese: 'O Socorro' },
  { number: 111, arabic: 'المسد', translit: 'Al-Masad', portuguese: 'A Corda de Fibra' },
  { number: 112, arabic: 'الإخلاص', translit: 'Al-Ikhlāṣ', portuguese: 'A Sinceridade' },
  { number: 113, arabic: 'الفلق', translit: 'Al-Falaq', portuguese: 'A Alvorada' },
  { number: 114, arabic: 'الناس', translit: 'An-Nās', portuguese: 'A Humanidade' },
];

const AlcoraoLeitura = () => {
  const [currentSura, setCurrentSura] = useState(1);
  const [verses, setVerses] = useState([]);
  const [arabicVerses, setArabicVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFootnotes, setShowFootnotes] = useState(false);
  const [displayMode, setDisplayMode] = useState('both'); // 'pt' | 'ar' | 'both'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAyah, setSelectedAyah] = useState(null);

  const suraMeta =
    SURA_LIST.find((s) => s.number === currentSura) || SURA_LIST[0];

  const fetchSura = async (suraNumber) => {
    setLoading(true);
    setError('');
    try {
      // 1) Tradução em português – QuranEnc (somente texto + notas)
      const translationUrl = `${API_BASE}/${TRANSLATION_KEY}/${suraNumber}`;
      const translationRes = await fetch(translationUrl);
      if (!translationRes.ok) {
        throw new Error(
          `Erro ao carregar tradução (código ${translationRes.status})`
        );
      }
      const translationJson = await translationRes.json();
      const translationArray = Array.isArray(translationJson)
        ? translationJson
        : translationJson.result || [];

      setVerses(translationArray);

      // 2) Texto em árabe – AlQuran.cloud
      try {
        const arabicUrl = `${ARABIC_API_BASE}/${suraNumber}`;
        const arabicRes = await fetch(arabicUrl);
        if (arabicRes.ok) {
          const arabicJson = await arabicRes.json();
          const ayahs = arabicJson?.data?.ayahs || [];
          setArabicVerses(ayahs);
        } else {
          console.warn(
            'Não foi possível carregar o texto em árabe (status:',
            arabicRes.status,
          );
          setArabicVerses([]);
        }
      } catch (arabicErr) {
        console.warn('Erro ao carregar texto em árabe:', arabicErr);
        setArabicVerses([]);
      }
    } catch (err) {
      console.error(err);
      setError(
        'Não foi possível carregar este capítulo agora. Tente novamente em alguns instantes.',
      );
      setVerses([]);
      setArabicVerses([]);
    } finally {
      setLoading(false);
      setSelectedAyah(null);
    }
  };

  useEffect(() => {
    fetchSura(currentSura);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSura]);

  const handlePrev = () => {
    setCurrentSura((prev) => (prev === 1 ? 114 : prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentSura((prev) => (prev === 114 ? 1 : prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSura = (number) => {
    setCurrentSura(number);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAyah = (ayaNumber) => {
    setSelectedAyah(ayaNumber);
    const el = document.getElementById(`ayah-${ayaNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getArabicForAyah = (ayaNumber) => {
    const numeric = Number(ayaNumber);
    const match = arabicVerses.find(
      (a) => a.numberInSurah === numeric || a.aya === numeric,
    );
    return match?.text || '';
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredSuras = normalizedSearch
    ? SURA_LIST.filter((s) => {
        const nomePt = s.portuguese.toLowerCase();
        const translit = s.translit.toLowerCase();
        const numStr = String(s.number);
        return (
          nomePt.includes(normalizedSearch) ||
          translit.includes(normalizedSearch) ||
          numStr.includes(normalizedSearch)
        );
      })
    : SURA_LIST;

  const maxAyah = verses.length;

  return (
    <main className="ccib-page">
      <Section
        id="alcorao-leitura"
        title="Alcorão para leitura"
        description="Leia o Alcorão capítulo a capítulo, com texto em árabe e tradução para o português (Helmi Nasr). Escolha se deseja visualizar apenas em português, apenas em árabe ou em ambos."
      >
        <div className="ccib-quran-read-layout">
          {/* ==== SIDEBAR ESQUERDA – LISTA DE CAPÍTULOS + VERSÍCULOS ==== */}
          <aside
            className="ccib-quran-read-sidebar"
            aria-label="Capítulos do Alcorão"
          >
            <div className="ccib-quran-read-sidebar-header">
              <h3 className="ccib-quran-read-sidebar-title">Capítulos</h3>
              <p className="ccib-quran-read-sidebar-subtitle">
                Navegue pelas 114 suratas.
              </p>
            </div>

            <div className="ccib-quran-read-sidebar-search">
              <input
                type="text"
                placeholder="Buscar por nome ou número…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="ccib-quran-read-sidebar-list">
              {filteredSuras.map((sura) => {
                const isActive = sura.number === currentSura;
                return (
                  <button
                    key={sura.number}
                    type="button"
                    className={`ccib-quran-read-sidebar-item ${
                      isActive ? 'ccib-quran-read-sidebar-item--active' : ''
                    }`}
                    onClick={() => handleSelectSura(sura.number)}
                  >
                    <span className="ccib-quran-read-sidebar-number">
                      {sura.number}
                    </span>
                    <span className="ccib-quran-read-sidebar-texts">
                      <span className="ccib-quran-read-sidebar-name-pt">
                        {sura.portuguese}
                      </span>
                      <span className="ccib-quran-read-sidebar-name-ar">
                        {sura.arabic}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lista de versículos da surata atual */}
            {maxAyah > 0 && (
              <div className="ccib-quran-read-sidebar-ayahs">
                <div className="ccib-quran-read-sidebar-ayahs-header">
                  <span className="ccib-quran-read-sidebar-ayahs-title">
                    Versículos deste capítulo
                  </span>
                  <span className="ccib-quran-read-sidebar-ayahs-count">
                    {maxAyah} versículos
                  </span>
                </div>
                <div className="ccib-quran-read-sidebar-ayahs-list">
                  {verses.map((v) => {
                    const isSelected = selectedAyah === v.aya;
                    return (
                      <button
                        key={v.aya}
                        type="button"
                        className={`ccib-quran-read-sidebar-ayah-chip ${
                          isSelected
                            ? 'ccib-quran-read-sidebar-ayah-chip--active'
                            : ''
                        }`}
                        onClick={() => handleSelectAyah(v.aya)}
                      >
                        {v.aya}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* ==== ÁREA PRINCIPAL – CABEÇALHO + VERSÍCULOS ==== */}
          <div className="ccib-quran-read-main">
            <div className="ccib-quran-read">
              {/* CARD PRINCIPAL DO CAPÍTULO */}
              <div className="ccib-quran-read-header-card">
                <div className="ccib-quran-read-header-main">
                  <span className="ccib-quran-read-badge">
                    Surata {String(suraMeta.number).padStart(3, '0')}
                  </span>
                  <h2 className="ccib-quran-read-title">
                    {suraMeta.portuguese}
                  </h2>

                  <div className="ccib-quran-read-title-row">
                    <span className="ccib-quran-read-title-arabic">
                      {suraMeta.arabic}
                    </span>
                    <span className="ccib-quran-read-title-translit">
                      {suraMeta.translit}
                    </span>
                  </div>

                  <p className="ccib-quran-read-helper">
                    Use as setas ou o menu lateral para navegar entre as
                    suratas. Cada versículo pode ser exibido em árabe, em
                    português ou em ambos. Quando houver notas explicativas na
                    tradução, você pode habilitá-las no botão de notas.
                  </p>

                  <div className="ccib-quran-read-header-actions">
                    <button
                      type="button"
                      className="ccib-quran-read-ctrl ccib-quran-read-ctrl--secondary"
                      onClick={handlePrev}
                    >
                      ‹ Anterior
                    </button>
                    <button
                      type="button"
                      className="ccib-quran-read-ctrl ccib-quran-read-ctrl--secondary"
                      onClick={handleNext}
                    >
                      Próxima ›
                    </button>
                    <button
                      type="button"
                      className={`ccib-quran-read-ctrl ccib-quran-read-ctrl--primary ${
                        showFootnotes ? 'ccib-quran-read-ctrl--primary-on' : ''
                      }`}
                      onClick={() => setShowFootnotes((prev) => !prev)}
                    >
                      {showFootnotes ? 'Ocultar notas' : 'Mostrar notas'}
                    </button>
                  </div>

                  {/* CONTROLE DE MODO DE VISUALIZAÇÃO */}
                  <div className="ccib-quran-read-mode-actions">
                    <span className="ccib-quran-read-mode-label">
                      Modo de visualização:
                    </span>
                    <div className="ccib-quran-read-mode-buttons">
                      <button
                        type="button"
                        className={`ccib-quran-read-mode-btn ${
                          displayMode === 'pt'
                            ? 'ccib-quran-read-mode-btn--active'
                            : ''
                        }`}
                        onClick={() => setDisplayMode('pt')}
                      >
                        Apenas português
                      </button>
                      <button
                        type="button"
                        className={`ccib-quran-read-mode-btn ${
                          displayMode === 'ar'
                            ? 'ccib-quran-read-mode-btn--active'
                            : ''
                        }`}
                        onClick={() => setDisplayMode('ar')}
                      >
                        Apenas árabe
                      </button>
                      <button
                        type="button"
                        className={`ccib-quran-read-mode-btn ${
                          displayMode === 'both'
                            ? 'ccib-quran-read-mode-btn--active'
                            : ''
                        }`}
                        onClick={() => setDisplayMode('both')}
                      >
                        Árabe + português
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* LISTA DE VERSÍCULOS */}
              <div className="ccib-quran-read-body">
                {loading && (
                  <div className="ccib-quran-read-state">
                    <div className="ccib-quran-read-loader" />
                    <p>Carregando versículos…</p>
                  </div>
                )}

                {error && !loading && (
                  <div className="ccib-quran-read-state ccib-quran-read-state--error">
                    <p>{error}</p>
                  </div>
                )}

                {!loading && !error && verses.length === 0 && (
                  <div className="ccib-quran-read-state">
                    <p>Não encontramos versículos para este capítulo.</p>
                  </div>
                )}

                {!loading && !error && verses.length > 0 && (
                  <div className="ccib-quran-read-ayah-list">
                    {verses.map((item) => {
                      const arabicText = getArabicForAyah(item.aya);
                      const showArabic =
                        displayMode === 'ar' || displayMode === 'both';
                      const showPortuguese =
                        displayMode === 'pt' || displayMode === 'both';
                      const isHighlighted = selectedAyah === item.aya;

                      return (
                        <article
                          key={`${item.sura}-${item.aya}`}
                          id={`ayah-${item.aya}`}
                          className={`ccib-quran-read-ayah-card ${
                            isHighlighted
                              ? 'ccib-quran-read-ayah-card--highlight'
                              : ''
                          }`}
                        >
                          <div className="ccib-quran-read-ayah-number">
                            {item.aya}
                          </div>
                          <div className="ccib-quran-read-ayah-content">
                            {showArabic && arabicText && (
                              <p className="ccib-quran-read-ayah-arabic">
                                {arabicText}
                              </p>
                            )}

                            {showPortuguese && (
                              <p className="ccib-quran-read-ayah-translation">
                                {item.translation}
                              </p>
                            )}

                            {showFootnotes &&
                              item.footnotes &&
                              item.footnotes.trim() !== '' && (
                                <p className="ccib-quran-read-ayah-footnote">
                                  {item.footnotes}
                                </p>
                              )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default AlcoraoLeitura;