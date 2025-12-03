// src/components/Header.jsx
import React, { useState, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function getInitials(displayName, email) {
  const ref = displayName && displayName.trim().length > 0 ? displayName : email || '';
  if (!ref) return '?';

  const parts = ref.split('@')[0].split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 1) {
    const s = parts[0];
    if (s.length === 1) return s.toUpperCase();
    return (s[0] + s[s.length - 1]).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getAvatarColor(seed) {
  const palette = [
    '#c9a14a', // dourado
    '#176b4a', // verde
    '#4a6f8f', // azul acinzentado
    '#8c4a7f', // roxo
    '#b3593b', // terracota
    '#2f6f5c', // teal
  ];
  const str = seed || 'ccib';
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIslamDropdownOpen, setIslamDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setLibraryDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => {
    setMobileOpen(false);
    setIslamDropdownOpen(false);
    setLibraryDropdownOpen(false);
  };

  const islamSectionPaths = [
    '/conheca-o-islam',
    '/profeta-muhammad',
    '/mulher-no-islam',
    '/jesus-no-islam',
    '/hadith-e-etica',
  ];
  const isIslamSectionActive = islamSectionPaths.includes(location.pathname);

  const librarySectionPaths = [
    '/literatura-islamica',
    '/alcorao-audio',
    '/alcorao-leitura',
  ];
  const isLibrarySectionActive = librarySectionPaths.includes(location.pathname);

  const avatarData = useMemo(() => {
    if (!user) return null;
    const initials = getInitials(user.displayName, user.email);
    const color = getAvatarColor(user.email || user.displayName || 'ccib');
    return { initials, color };
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  return (
    <header className="ccib-header">
      <div className="ccib-container ccib-header-inner">
        <NavLink to="/" className="ccib-logo" onClick={closeMobile}>
          <span className="ccib-logo-main">Centro Cultural Islâmico</span>
          <span className="ccib-logo-sub">da Bahia</span>
        </NavLink>

        <button
          type="button"
          className="ccib-nav-toggle"
          onClick={toggleMobile}
          aria-label="Abrir/fechar navegação"
          aria-expanded={mobileOpen}
        >
          <span className="ccib-nav-toggle-line" />
        </button>

        <nav className="ccib-nav" aria-label="Navegação principal">
          <ul className="ccib-nav-list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `ccib-nav-link ${isActive ? 'ccib-nav-link-active' : ''}`
                }
              >
                Início
              </NavLink>
            </li>

            {/* CONHEÇA O ISLAM – dropdown estável, clique não navega */}
            <li
              className={`ccib-nav-item--has-dropdown ${
                isIslamDropdownOpen ? 'ccib-nav-item--open' : ''
              }`}
              onMouseEnter={() => setIslamDropdownOpen(true)}
              onMouseLeave={() => setIslamDropdownOpen(false)}
            >
              <div className="ccib-dropdown-toggle">
                <NavLink
                  to="/conheca-o-islam"
                  className={`ccib-nav-link ${
                    isIslamSectionActive ? 'ccib-nav-link-active' : ''
                  }`}
                  onClick={(e) => {
                    // Não navega ao clicar; apenas abre/fecha o menu
                    e.preventDefault();
                    setIslamDropdownOpen((prev) => !prev);
                  }}
                >
                  Conheça o Islam
                </NavLink>

                <button
                  type="button"
                  className="ccib-dropdown-caret-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIslamDropdownOpen((prev) => !prev);
                  }}
                  aria-label="Abrir submenu Conheça o Islam"
                >
                  <span
                    className={`ccib-dropdown-caret-icon ${
                      isIslamDropdownOpen ? 'ccib-dropdown-caret-icon--active' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div
                className={`ccib-nav-dropdown ${
                  isIslamDropdownOpen ? 'ccib-nav-dropdown--open' : ''
                }`}
                role="menu"
              >
                <NavLink
                  to="/conheca-o-islam"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setIslamDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Introdução
                </NavLink>
                <NavLink
                  to="/profeta-muhammad"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setIslamDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Profeta Muhammad
                </NavLink>
                <NavLink
                  to="/mulher-no-islam"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setIslamDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Mulher no Islam
                </NavLink>
                <NavLink
                  to="/jesus-no-islam"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setIslamDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Jesus no Islam
                </NavLink>
                <NavLink
                  to="/hadith-e-etica"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setIslamDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Hadith &amp; Ética
                </NavLink>
              </div>
            </li>

            {/* BIBLIOTECA CCIB – novo dropdown */}
            <li
              className={`ccib-nav-item--has-dropdown ${
                isLibraryDropdownOpen ? 'ccib-nav-item--open' : ''
              }`}
              onMouseEnter={() => setLibraryDropdownOpen(true)}
              onMouseLeave={() => setLibraryDropdownOpen(false)}
            >
              <div className="ccib-dropdown-toggle">
                <NavLink
                  to="/literatura-islamica"
                  className={`ccib-nav-link ${
                    isLibrarySectionActive ? 'ccib-nav-link-active' : ''
                  }`}
                  onClick={(e) => {
                    // Clique abre/fecha o dropdown, não navega direto
                    e.preventDefault();
                    setLibraryDropdownOpen((prev) => !prev);
                  }}
                >
                  Biblioteca CCIB
                </NavLink>

                <button
                  type="button"
                  className="ccib-dropdown-caret-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setLibraryDropdownOpen((prev) => !prev);
                  }}
                  aria-label="Abrir submenu Biblioteca CCIB"
                >
                  <span
                    className={`ccib-dropdown-caret-icon ${
                      isLibraryDropdownOpen ? 'ccib-dropdown-caret-icon--active' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div
                className={`ccib-nav-dropdown ${
                  isLibraryDropdownOpen ? 'ccib-nav-dropdown--open' : ''
                }`}
                role="menu"
              >
                <NavLink
                  to="/literatura-islamica"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setLibraryDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Literatura islâmica
                </NavLink>
                <NavLink
                  to="/alcorao-audio"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setLibraryDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Alcorão (áudio)
                </NavLink>
                <NavLink
                  to="/alcorao-leitura"
                  className="ccib-nav-dropdown-link"
                  onClick={() => {
                    setLibraryDropdownOpen(false);
                    closeMobile();
                  }}
                >
                  Alcorão (leitura)
                </NavLink>
              </div>
            </li>

            <li>
              <NavLink
                to="/sobre-ccib"
                className={({ isActive }) =>
                  `ccib-nav-link ${isActive ? 'ccib-nav-link-active' : ''}`
                }
              >
                Sobre o CCIB
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/noticias-e-eventos"
                className={({ isActive }) =>
                  `ccib-nav-link ${isActive ? 'ccib-nav-link-active' : ''}`
                }
              >
                Notícias &amp; Eventos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contato"
                className={({ isActive }) =>
                  `ccib-nav-link ${isActive ? 'ccib-nav-link-active' : ''}`
                }
              >
                Contato
              </NavLink>
            </li>

            {/* ÁREA DE AUTENTICAÇÃO / AVATAR – mantida da sua versão */}
            <li className="ccib-nav-auth">
              {user && avatarData ? (
                <div className="ccib-nav-user">
                  <button
                    type="button"
                    className="ccib-avatar"
                    style={{ backgroundColor: avatarData.color }}
                    onClick={() => navigate('/minha-conta')}
                    title="Ver meu perfil"
                  >
                    {avatarData.initials}
                  </button>
                  <button
                    type="button"
                    className="ccib-nav-user-logout"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/acesso-restrito"
                  className="ccib-nav-link ccib-nav-link--cta"
                >
                  Acesso restrito
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* NAV MOBILE */}
      {mobileOpen && (
        <div
          className="ccib-container ccib-nav-mobile"
          aria-label="Navegação principal móvel"
        >
          <ul className="ccib-nav-list-mobile">
            <li>
              <NavLink to="/" end className="ccib-nav-link" onClick={closeMobile}>
                Início
              </NavLink>
            </li>

            {/* Conheça o Islam – mobile */}
            <li>
              <NavLink
                to="/conheca-o-islam"
                className="ccib-nav-link"
                onClick={closeMobile}
              >
                Conheça o Islam
              </NavLink>
              <ul className="ccib-nav-mobile-sub-list">
                <li>
                  <NavLink
                    to="/profeta-muhammad"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Profeta Muhammad
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mulher-no-islam"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Mulher no Islam
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jesus-no-islam"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Jesus no Islam
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/hadith-e-etica"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Hadith &amp; Ética
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Biblioteca CCIB – mobile */}
            <li>
              <NavLink
                to="/literatura-islamica"
                className="ccib-nav-link"
                onClick={closeMobile}
              >
                Biblioteca CCIB
              </NavLink>
              <ul className="ccib-nav-mobile-sub-list">
                <li>
                  <NavLink
                    to="/literatura-islamica"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Literatura islâmica
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/alcorao-audio"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Alcorão (áudio)
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/alcorao-leitura"
                    className="ccib-nav-mobile-sub-link"
                    onClick={closeMobile}
                  >
                    Alcorão (leitura)
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/sobre-o-ccib"
                className="ccib-nav-link"
                onClick={closeMobile}
              >
                Sobre o CCIB
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/noticias-e-eventos"
                className="ccib-nav-link"
                onClick={closeMobile}
              >
                Notícias &amp; Eventos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contato"
                className="ccib-nav-link"
                onClick={closeMobile}
              >
                Contato
              </NavLink>
            </li>

            <li>
              {user && avatarData ? (
                <>
                  <button
                    type="button"
                    className="ccib-nav-link"
                    onClick={() => {
                      navigate('/perfil');
                      closeMobile();
                    }}
                  >
                    Meu perfil
                  </button>
                  <button
                    type="button"
                    className="ccib-nav-link"
                    onClick={() => {
                      handleLogout();
                      closeMobile();
                    }}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="ccib-nav-link"
                  onClick={closeMobile}
                >
                  Acesso restrito
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
