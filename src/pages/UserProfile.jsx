// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';

// Helpers para avatar (mesmos do Header)
function getInitials(displayName, email) {
  const ref = displayName && displayName.trim().length > 0 ? displayName : email || '';
  if (!ref) return '?';

  const parts = ref
    .split('@')[0]
    .split(/[\s._-]+/)
    .filter(Boolean);

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

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, 'ccib_users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setDisplayName(data.displayName || user.displayName || '');
          setRole(data.role || '');
          setBirthDate(data.birthDate || '');
          setPhone(data.phone || '');
          setAddressLine(data.addressLine || '');
          setAddressCity(data.addressCity || '');
          setAddressState(data.addressState || '');
          setAddressZip(data.addressZip || '');
          setAbout(data.about || '');
        } else {
          setDisplayName(user.displayName || '');
        }
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setStatus({
          type: 'error',
          message: 'Não foi possível carregar seu perfil. Tente novamente mais tarde.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setStatus(null);

    try {
      const ref = doc(db, 'ccib_users', user.uid);
      await setDoc(
        ref,
        {
          displayName: displayName.trim(),
          role: role.trim(),
          birthDate: birthDate || '',
          phone: phone.trim(),
          addressLine: addressLine.trim(),
          addressCity: addressCity.trim(),
          addressState: addressState.trim(),
          addressZip: addressZip.trim(),
          about: about.trim(),
          email: user.email,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(), // se já existir, o Firestore mantém o antigo
        },
        { merge: true }
      );

      // Atualiza o displayName também no Firebase Auth (se o contexto expuser essa função)
      if (updateUserProfile && displayName.trim()) {
        await updateUserProfile(displayName.trim());
      }

      setStatus({
        type: 'success',
        message: 'Perfil atualizado com sucesso.',
      });
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      setStatus({
        type: 'error',
        message: 'Não foi possível salvar seu perfil. Tente novamente mais tarde.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <main className="ccib-page">
        <div className="ccib-container">
          <div className="ccib-auth-layout" style={{ paddingBlock: '2rem' }}>
            <div className="ccib-auth-card">
              <h1 className="ccib-auth-title">Minha conta</h1>
              <p className="ccib-auth-subtitle">
                Para acessar seu perfil, faça login com sua conta autorizada pelo CCIB.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const avatarColor = getAvatarColor(user.email || user.displayName || 'ccib');
  const avatarInitials = getInitials(displayName || user.displayName, user.email);

  return (
    <main className="ccib-page">
      <div className="ccib-container">
        <div className="ccib-auth-layout">
          {/* COLUNA PRINCIPAL */}
          <div className="ccib-auth-card">
            {/* Avatar + identificação */}
            <div
              style={{
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
              }}
            >
              <div
                className="ccib-avatar ccib-avatar--lg"
                style={{ backgroundColor: avatarColor }}
              >
                {avatarInitials}
              </div>
              <div>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#777',
                    marginBottom: '0.1rem',
                  }}
                >
                  Perfil de
                </p>
                <strong>{displayName || user.displayName || user.email}</strong>
                <p style={{ fontSize: '0.8rem', color: '#999' }}>{user.email}</p>
              </div>
            </div>

            <h1 className="ccib-auth-title">Meu perfil</h1>
            <p className="ccib-auth-subtitle">
              Atualize suas informações de contato e perfil para que a comunidade saiba quem está
              por trás das comunicações oficiais do CCIB.
            </p>

            {loading ? (
              <p className="ccib-prayer-status">Carregando dados do perfil…</p>
            ) : (
              <form className="ccib-auth-form" onSubmit={handleSubmit}>
                <div className="ccib-form-group">
                  <label className="ccib-form-label">E-mail (login)</label>
                  <input
                    type="email"
                    className="ccib-form-input"
                    value={user.email || ''}
                    disabled
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Nome completo</label>
                  <input
                    type="text"
                    className="ccib-form-input"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Cargo / função no CCIB</label>
                  <input
                    type="text"
                    className="ccib-form-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex.: Comunicação, Ação Social, Ensino..."
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Data de nascimento</label>
                  <input
                    type="date"
                    className="ccib-form-input"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    className="ccib-form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(71) 9 0000-0000"
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Endereço (linha principal)</label>
                  <input
                    type="text"
                    className="ccib-form-input"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div className="ccib-form-group-row">
                  <div className="ccib-form-group">
                    <label className="ccib-form-label">Cidade</label>
                    <input
                      type="text"
                      className="ccib-form-input"
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                    />
                  </div>
                  <div className="ccib-form-group">
                    <label className="ccib-form-label">Estado</label>
                    <input
                      type="text"
                      className="ccib-form-input"
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                      placeholder="BA"
                    />
                  </div>
                  <div className="ccib-form-group">
                    <label className="ccib-form-label">CEP</label>
                    <input
                      type="text"
                      className="ccib-form-input"
                      value={addressZip}
                      onChange={(e) => setAddressZip(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label">Sobre você</label>
                  <textarea
                    className="ccib-form-textarea"
                    rows={4}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Breve descrição sobre sua atuação no CCIB ou outros detalhes relevantes."
                  />
                </div>

                {status && (
                  <p
                    className={`ccib-auth-status ${
                      status.type === 'error'
                        ? 'ccib-auth-status--error'
                        : 'ccib-auth-status--success'
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <div className="ccib-news-form-actions">
                  <button
                    type="submit"
                    className="ccib-modal-btn"
                    disabled={saving}
                  >
                    {saving ? 'Salvando…' : 'Salvar alterações'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* COLUNA LATERAL */}
          <aside className="ccib-auth-info">
            <h2>Por que manter o perfil atualizado?</h2>
            <p>
              As postagens em Notícias &amp; Eventos são visíveis para toda a comunidade. Ter um
              perfil atualizado ajuda a dar transparência sobre quem está comunicando em nome
              do Centro Cultural Islâmico da Bahia.
            </p>
            <p>
              As informações aqui cadastradas são utilizadas apenas para fins internos e para
              identificação básica nas comunicações oficiais. Elas podem ser atualizadas a
              qualquer momento por você.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
