// src/pages/AlcoraoAudio.jsx
import React, { useEffect, useRef, useState } from 'react';
import Section from '@components/ui/Section.jsx';

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
  { number: 29, arabic: 'العنكبوت', translit: 'Al-ʿAnkabūt', portuguese: 'A Aranha' },
  { number: 30, arabic: 'الروم', translit: 'Ar-Rūm', portuguese: 'Os Romanos' },
  { number: 31, arabic: 'لقمان', translit: 'Luqmān', portuguese: 'Luqman' },
  { number: 32, arabic: 'السجدة', translit: 'As-Sajdah', portuguese: 'A Prostração' },
  { number: 33, arabic: 'الأحزاب', translit: 'Al-Aḥzāb', portuguese: 'Os Partidos' },
  { number: 34, arabic: 'سبإ', translit: 'Sabaʼ', portuguese: 'Sabá' },
  { number: 35, arabic: 'فاطر', translit: 'Fāṭir', portuguese: 'O Criador' },
  { number: 36, arabic: 'يس', translit: 'Yā-Sīn', portuguese: 'Ya-Sin' },
  { number: 37, arabic: 'الصافات', translit: 'Aṣ-Ṣāffāt', portuguese: 'Os que se alinham' },
  { number: 38, arabic: 'ص', translit: 'Ṣād', portuguese: 'Sad' },
  { number: 39, arabic: 'الزمر', translit: 'Az-Zumar', portuguese: 'Os Grupos' },
  { number: 40, arabic: 'غافر', translit: 'Ghāfir', portuguese: 'O Perdoador' },
  { number: 41, arabic: 'فصلت', translit: 'Fussilat', portuguese: 'Detalhadas' },
  { number: 42, arabic: 'الشورى', translit: 'Ash-Shūrā', portuguese: 'A Consulta' },
  { number: 43, arabic: 'الزخرف', translit: 'Az-Zukhruf', portuguese: 'Os Adornos de Ouro' },
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
  { number: 87, arabic: 'الأعلى', translit: 'Al-Aʻlā', portuguese: 'O Altíssimo' },
  { number: 88, arabic: 'الغاشية', translit: 'Al-Ghāshiyah', portuguese: 'A Cobertura' },
  { number: 89, arabic: 'الفجر', translit: 'Al-Fajr', portuguese: 'A Alvorada' },
  { number: 90, arabic: 'البلد', translit: 'Al-Balad', portuguese: 'A Cidade' },
  { number: 91, arabic: 'الشمس', translit: 'Ash-Shams', portuguese: 'O Sol' },
  { number: 92, arabic: 'الليل', translit: 'Al-Layl', portuguese: 'A Noite' },
  { number: 93, arabic: 'الضحى', translit: 'Ad-Ḍuḥā', portuguese: 'A Manhã Clara' },
  { number: 94, arabic: 'الشرح', translit: 'Ash-Sharḥ', portuguese: 'A Abertura do Peito' },
  { number: 95, arabic: 'التين', translit: 'At-Tīn', portuguese: 'O Figo' },
  { number: 96, arabic: 'العلق', translit: 'Al-ʻAlaq', portuguese: 'O Coágulo' },
  { number: 97, arabic: 'القدر', translit: 'Al-Qadr', portuguese: 'O Decreto' },
  { number: 98, arabic: 'البينة', translit: 'Al-Bayyinah', portuguese: 'A Evidência' },
  { number: 99, arabic: 'الزلزلة', translit: 'Az-Zalzalah', portuguese: 'O Tremor' },
  { number: 100, arabic: 'العاديات', translit: 'Al-ʻĀdiyāt', portuguese: 'Os Corcéis' },
  { number: 101, arabic: 'القارعة', translit: 'Al-Qāriʻah', portuguese: 'A Calamidade' },
  { number: 102, arabic: 'التكاثر', translit: 'At-Takāthur', portuguese: 'A Competição' },
  { number: 103, arabic: 'العصر', translit: 'Al-ʻAṣr', portuguese: 'O Tempo' },
  { number: 104, arabic: 'الهمزة', translit: 'Al-Humazah', portuguese: 'O Difamador' },
  { number: 105, arabic: 'الفيل', translit: 'Al-Fīl', portuguese: 'O Elefante' },
  { number: 106, arabic: 'قريش', translit: 'Quraysh', portuguese: 'Quraysh' },
  { number: 107, arabic: 'الماعون', translit: 'Al-Māʻūn', portuguese: 'A Assistência' },
  { number: 108, arabic: 'الكوثر', translit: 'Al-Kawthar', portuguese: 'A Abundância' },
  { number: 109, arabic: 'الكافرون', translit: 'Al-Kāfirūn', portuguese: 'Os Incrédulos' },
  { number: 110, arabic: 'النصر', translit: 'An-Naṣr', portuguese: 'O Socorro' },
  { number: 111, arabic: 'المسد', translit: 'Al-Masad', portuguese: 'A Fibra de Palmeira' },
  { number: 112, arabic: 'الإخلاص', translit: 'Al-Ikhlāṣ', portuguese: 'A Sinceridade' },
  { number: 113, arabic: 'الفلق', translit: 'Al-Falaq', portuguese: 'A Alvorada' },
  { number: 114, arabic: 'الناس', translit: 'An-Nās', portuguese: 'A Humanidade' },
];

const getAudioSrc = (number) => {
  const padded = String(number).padStart(3, '0');
  // ajuste o padrão aqui se o nome do arquivo for um pouco diferente
  return `/audio_quran/alcorao_${padded}_64kb.mp3`;
};

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const AlcoraoAudio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const audioRef = useRef(null);

  const currentSurah = SURA_LIST[currentIndex];

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Erro ao reproduzir áudio:', err);
        });
    }
  };

  const handleSelectSurah = (index) => {
    setCurrentIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex === 0 ? SURA_LIST.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === SURA_LIST.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (event) => {
    if (!audioRef.current) return;
    const value = Number(event.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      // quando termina, já vai pra próxima surata
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // força o recarregamento do novo arquivo
    audio.load();
    if (isPlaying) {
      audio
        .play()
        .then(() => {})
        .catch((err) => {
          console.error('Erro ao iniciar reprodução automática:', err);
          setIsPlaying(false);
        });
    }
  }, [currentIndex, isPlaying]);

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

  return (
    <main className="ccib-page">
      <Section
        id="alcorao-audio"
        title="Alcorão em áudio"
        description="Ouça a recitação completa do Alcorão em árabe. Selecione um capítulo no menu lateral para iniciar a reprodução e use os controles do player para avançar ou retroceder."
      >
        <div className="ccib-quran-read-layout ccib-quran-audio-layout">
          {/* ==== SIDEBAR ESQUERDA – LISTA DE CAPÍTULOS ==== */}
          <aside
            className="ccib-quran-read-sidebar"
            aria-label="Capítulos do Alcorão em áudio"
          >
            <div className="ccib-quran-read-sidebar-header">
              <h3 className="ccib-quran-read-sidebar-title">
                Capítulos em áudio
              </h3>
              <p className="ccib-quran-read-sidebar-subtitle">
                Clique em uma surata para começar a ouvir.
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
                const isActive = sura.number === currentSurah.number;
                const originalIndex = SURA_LIST.findIndex(
                  (s) => s.number === sura.number,
                );

                return (
                  <button
                    key={sura.number}
                    type="button"
                    className={`ccib-quran-read-sidebar-item ${
                      isActive ? 'ccib-quran-read-sidebar-item--active' : ''
                    }`}
                    onClick={() => handleSelectSurah(originalIndex)}
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
          </aside>

          {/* ==== ÁREA PRINCIPAL – PLAYER DE ÁUDIO ==== */}
          <div className="ccib-quran-read-main">
            <div className="ccib-quran-audio">
              {/* PLAYER PRINCIPAL */}
              <div className="ccib-quran-audio-player">
                <div className="ccib-quran-audio-player-left">
                  <div className="ccib-quran-audio-disc">
                    <div className="ccib-quran-audio-disc-inner">
                      <span className="ccib-quran-audio-disc-number">
                        {currentSurah.number.toString().padStart(3, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ccib-quran-audio-player-right">
                  <span className="ccib-quran-audio-badge">
                    Capítulo em reprodução
                  </span>
                  <h2 className="ccib-quran-audio-title">
                    {currentSurah.portuguese}
                  </h2>

                  <div className="ccib-quran-audio-subtitle">
                    <span className="ccib-quran-audio-arabic">
                      {currentSurah.arabic}
                    </span>
                    <span className="ccib-quran-audio-translit">
                      {currentSurah.translit}
                    </span>
                  </div>

                  <p className="ccib-quran-audio-helper">
                    Use os controles para reproduzir, pausar ou mudar de
                    capítulo. Você pode navegar pela ordem tradicional das 114
                    suratas usando o menu lateral.
                  </p>

                  <div className="ccib-quran-audio-controls">
                    <button
                      type="button"
                      className="ccib-quran-audio-ctrl ccib-quran-audio-ctrl--secondary"
                      onClick={handlePrev}
                      aria-label="Capítulo anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="ccib-quran-audio-ctrl ccib-quran-audio-ctrl--primary"
                      onClick={handlePlayPause}
                      aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                    >
                      {isPlaying ? 'Pausar' : 'Reproduzir'}
                    </button>
                    <button
                      type="button"
                      className="ccib-quran-audio-ctrl ccib-quran-audio-ctrl--secondary"
                      onClick={handleNext}
                      aria-label="Próximo capítulo"
                    >
                      ›
                    </button>
                  </div>

                  <div className="ccib-quran-audio-progress">
                    <span className="ccib-quran-audio-time">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="ccib-quran-audio-progress-bar"
                    />
                    <span className="ccib-quran-audio-time">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Elemento de áudio “invisível” */}
                  <audio ref={audioRef}>
                    <source
                      src={getAudioSrc(currentSurah.number)}
                      type="audio/mpeg"
                    />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default AlcoraoAudio;
