// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login, resetPassword, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState(null);
  const [sendingReset, setSendingReset] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Se alguma rota protegida mandar o usuário pra cá com "state.from"
  const from = location.state?.from || '/minha-conta';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      await login(email, senha);
      setStatus({ type: 'success', message: 'Login realizado com sucesso.' });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message:
          'Não foi possível entrar. Verifique o e-mail e a senha ou tente novamente mais tarde.',
      });
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setStatus({
        type: 'error',
        message: 'Informe o e-mail antes de solicitar a recuperação de senha.',
      });
      return;
    }

    setSendingReset(true);
    setStatus(null);
    try {
      await resetPassword(email);
      setStatus({
        type: 'success',
        message:
          'Enviamos um e-mail com instruções para redefinir sua senha (verifique também a caixa de spam).',
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message:
          'Não foi possível enviar o e-mail de recuperação. Verifique o endereço e tente novamente.',
      });
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <main className="ccib-page">
      <div className="ccib-container">
        <div className="ccib-auth-layout">
          {/* COLUNA ESQUERDA – CARD DE LOGIN */}
          <div className="ccib-auth-card">
            <h1 className="ccib-auth-title">Acesso restrito</h1>
            <p className="ccib-auth-subtitle">
              Entre com seu e-mail e senha para publicar notícias e eventos do Centro Cultural
              Islâmico da Bahia.
            </p>

            {user && (
              <p className="ccib-auth-status ccib-auth-status--success" style={{ marginBottom: '0.75rem' }}>
                Você já está autenticado como <strong>{user.displayName || user.email}</strong>.
              </p>
            )}

            <form className="ccib-auth-form" onSubmit={handleSubmit}>
              <div className="ccib-form-group">
                <label className="ccib-form-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="ccib-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="ccib-form-group">
                <label className="ccib-form-label" htmlFor="senha">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  className="ccib-form-input"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {status && (
                <p
                  className={`ccib-auth-status ${status.type === 'error'
                      ? 'ccib-auth-status--error'
                      : 'ccib-auth-status--success'
                    }`}
                >
                  {status.message}
                </p>
              )}

              <div className="ccib-auth-actions">
                <button
                  type="submit"
                  className="ccib-auth-button"
                  disabled={loading}
                >
                  {loading ? 'Entrando…' : 'Entrar'}
                </button>

                <button
                  type="button"
                  className="ccib-auth-link-button"
                  onClick={handleResetPassword}
                  disabled={sendingReset}
                >
                  {sendingReset ? 'Enviando…' : 'Esqueci minha senha'}
                </button>
              </div>
            </form>

            <p className="ccib-auth-footer" style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
              Em caso de dúvidas ou problemas de acesso, entre em contato com a administração do
              CCIB pelos canais oficiais.
            </p>
          </div>

          {/* COLUNA DIREITA – IMAGEM EM TELA CHEIA NA VERTICAL */}
          <aside
            className="ccib-auth-info"
            aria-hidden="true"
            style={{
              padding: 0,
              backgroundImage: 'url("/images/auth/login-side.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 35%, rgba(0,0,0,0.00) 70%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.5rem 1.75rem',
                boxSizing: 'border-box',
                borderRadius: 'inherit',
              }}
            >
              <div style={{ maxWidth: '320px' }}>
                <h2
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '0.35rem',
                    color: '#ffffff',
                    textShadow: '0 3px 14px rgba(0,0,0,0.85)',
                  }}
                >
                  “Em nome de Allah, o Clemente, o Misericordioso”
                </h2>

                <p
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.4,
                    color: 'rgba(255,255,255,0.92)',
                    textShadow: '0 2px 12px rgba(0,0,0,0.75)',
                    margin: 0,
                  }}
                >
                  O acesso a esta área é reservado à equipe autorizada do CCIB, responsável pela
                  comunicação oficial com a comunidade.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default Login;
