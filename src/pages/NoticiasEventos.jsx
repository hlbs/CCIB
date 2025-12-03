// src/pages/NoticiasEventos.jsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import Section from '@components/ui/Section.jsx';

const NoticiasEventos = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // form (criar/editar)
  const [formTitle, setFormTitle] = useState('');
  const [formResumo, setFormResumo] = useState('');
  const [formTipo, setFormTipo] = useState('noticia');
  const [formConteudo, setFormConteudo] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // modal "Leia mais"
  const [activePost, setActivePost] = useState(null);

  // Carrega posts em tempo real
  useEffect(() => {
    const q = query(
      collection(db, 'ccib_posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setPosts(docs);
        setLoadingPosts(false);
      },
      (error) => {
        console.error('Erro ao carregar notícias:', error);
        setLoadingPosts(false);
      }
    );

    return () => unsub();
  }, []);

  const formatDateTime = (ts) => {
    if (!ts || !ts.toDate) return 'Data pendente';
    const date = ts.toDate();
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Preview curto para não quebrar o layout
  const buildPreview = (post) => {
    const base = post.resumo || post.conteudo || '';
    if (!base) return '';
    const maxLen = 260;
    if (base.length <= maxLen) return base;
    return base.slice(0, maxLen) + '…';
  };

  const resetForm = () => {
    setFormTitle('');
    setFormResumo('');
    setFormConteudo('');
    setFormTipo('noticia');
    setFormImageUrl('');
    setFormVideoUrl('');
    setEditingPostId(null);
    setFormStatus(null);
    setShowForm(false);
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setFormTitle(post.title || '');
    setFormResumo(post.resumo || '');
    setFormConteudo(post.conteudo || '');
    setFormTipo(post.tipo || 'noticia');
    setFormImageUrl(post.imageUrl || '');
    setFormVideoUrl(post.videoUrl || '');
    setFormStatus(null);
    setShowForm(true);
  };

  const handleDeleteClick = async (postId) => {
    if (!user) return;
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta postagem?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'ccib_posts', postId));
    } catch (err) {
      console.error('Erro ao excluir postagem:', err);
      alert('Não foi possível excluir a postagem neste momento.');
    }
  };

  const handleCreateOrUpdatePost = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!formTitle.trim() || !formResumo.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Título e resumo são campos obrigatórios.',
      });
      return;
    }

    setSaving(true);
    setFormStatus(null);

    try {
      const payload = {
        title: formTitle.trim(),
        resumo: formResumo.trim(),
        conteudo: formConteudo.trim(),
        tipo: formTipo,
        imageUrl: formImageUrl.trim() || '',
        videoUrl: formVideoUrl.trim() || '',
      };

      if (editingPostId) {
        await updateDoc(doc(db, 'ccib_posts', editingPostId), payload);
        setFormStatus({
          type: 'success',
          message: 'Postagem atualizada com sucesso.',
        });
      } else {
        await addDoc(collection(db, 'ccib_posts'), {
          ...payload,
          authorId: user.uid,
          authorName: user.displayName || user.email || 'Usuário do CCIB',
          createdAt: serverTimestamp(),
        });
        setFormStatus({
          type: 'success',
          message: 'Postagem publicada com sucesso.',
        });
      }

      resetForm();
    } catch (err) {
      console.error('Erro ao salvar postagem:', err);
      setFormStatus({
        type: 'error',
        message:
          'Não foi possível salvar a postagem neste momento. Tente novamente mais tarde.',
      });
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => setActivePost(null);

  return (
    <main className="ccib-page">
      <Section
        id="noticias-eventos"
        title="Notícias & Eventos"
        description="Acompanhe aqui os principais comunicados, atividades e momentos especiais da comunidade do Centro Cultural Islâmico da Bahia."
      >
        {/* Introdução engajadora */}
        <div className="ccib-news-intro">
          <p>
            Esta página reúne anúncios das orações em congregação, cursos e círculos de estudo,
            visitas guiadas, ações sociais, eventos culturais e demais novidades do CCIB. A
            intenção é que você possa se organizar, participar e compartilhar estes momentos
            com outras pessoas.
          </p>
          <p>
            As postagens são feitas pela equipe autorizada do Centro, e cada notícia traz a data,
            o horário e o nome de quem publicou, reforçando a transparência e a proximidade com
            a nossa comunidade.
          </p>
        </div>

        {/* Barra de ações para usuários autenticados */}
        {user && (
          <div className="ccib-news-actions">
            <div className="ccib-news-actions-info">
              <span className="ccib-pillar-label ccib-pillar-label--soft">
                Área do publicador
              </span>
              <p>
                Autenticado como <strong>{user.displayName || user.email}</strong>. Utilize o
                botão ao lado para criar uma nova postagem ou editar notícias existentes.
              </p>
            </div>
            <button
              type="button"
              className="ccib-modal-btn"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? 'Fechar formulário' : 'Nova publicação'}
            </button>
          </div>
        )}

        <div className="ccib-page-two-columns">
          {/* Coluna 1 – Lista de posts */}
          <div className="ccib-news-column">
            {loadingPosts ? (
              <div className="ccib-news-skeleton-list">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="ccib-skeleton-card">
                    <div className="ccib-skeleton-line ccib-skeleton-line--small" />
                    <div className="ccib-skeleton-line ccib-skeleton-line--title" />
                    <div className="ccib-skeleton-line" />
                    <div className="ccib-skeleton-line ccib-skeleton-line--short" />
                    <div className="ccib-skeleton-shimmer" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <p className="ccib-prayer-status">
                Ainda não há notícias cadastradas. Assim que a equipe publicar conteúdos, eles
                aparecerão aqui em ordem cronológica.
              </p>
            ) : (
              <div className="ccib-news-list">
                {posts.map((post) => {
                  const canManage = !!user; // qualquer logado pode editar/excluir
                  const preview = buildPreview(post);
                  const hasMore =
                    (post.conteudo && post.conteudo.length > 260) ||
                    (post.resumo && post.resumo.length > 260);

                  return (
                    <article key={post.id} className="ccib-card ccib-animate-in">
                      {post.imageUrl && (
                        <div className="ccib-news-card-media">
                          <img src={post.imageUrl} alt="" />
                        </div>
                      )}
                      <div className="ccib-card-body">
                        <p className="ccib-pillar-label">
                          {post.tipo === 'evento' ? 'Evento' : 'Notícia'}
                        </p>
                        <h2 className="ccib-news-item-title">{post.title}</h2>
                        <p className="ccib-news-item-meta">
                          Publicado em {formatDateTime(post.createdAt)} por{' '}
                          <strong>{post.authorName}</strong>
                        </p>
                        {preview && (
                          <p className="ccib-news-item-summary">{preview}</p>
                        )}

                        <div className="ccib-news-item-footer">
                          {hasMore && (
                            <button
                              type="button"
                              className="ccib-news-btn"
                              onClick={() => setActivePost(post)}
                            >
                              Leia mais
                            </button>
                          )}
                          {canManage && (
                            <div className="ccib-news-item-actions">
                              <button
                                type="button"
                                className="ccib-news-btn ccib-news-btn--ghost"
                                onClick={() => handleEditClick(post)}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="ccib-news-btn ccib-news-btn--danger"
                                onClick={() => handleDeleteClick(post.id)}
                              >
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>

                        {post.videoUrl && (
                          <div className="ccib-news-card-video">
                            <iframe
                              src={post.videoUrl}
                              title={post.title || 'Vídeo'}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coluna 2 – Formulário (somente logados) */}
          {user && showForm && (
            <aside className="ccib-news-form-column">
              <div className="ccib-card">
                <div className="ccib-card-body">
                  <h2 className="ccib-card-title">
                    {editingPostId ? 'Editar postagem' : 'Nova publicação'}
                  </h2>

                  <form className="ccib-news-form" onSubmit={handleCreateOrUpdatePost}>
                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="tipo">
                        Tipo de postagem
                      </label>
                      <select
                        id="tipo"
                        className="ccib-form-input"
                        value={formTipo}
                        onChange={(e) => setFormTipo(e.target.value)}
                      >
                        <option value="noticia">Notícia</option>
                        <option value="evento">Evento</option>
                      </select>
                    </div>

                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="titulo">
                        Título
                      </label>
                      <input
                        id="titulo"
                        type="text"
                        className="ccib-form-input"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="resumo">
                        Resumo curto
                      </label>
                      <textarea
                        id="resumo"
                        className="ccib-form-textarea"
                        rows={3}
                        value={formResumo}
                        onChange={(e) => setFormResumo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="conteudo">
                        Conteúdo detalhado (opcional)
                      </label>
                      <textarea
                        id="conteudo"
                        className="ccib-form-textarea"
                        rows={5}
                        value={formConteudo}
                        onChange={(e) => setFormConteudo(e.target.value)}
                      />
                    </div>

                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="imageUrl">
                        URL de imagem (opcional)
                      </label>
                      <input
                        id="imageUrl"
                        type="url"
                        className="ccib-form-input"
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>

                    <div className="ccib-form-group">
                      <label className="ccib-form-label" htmlFor="videoUrl">
                        URL de vídeo (YouTube, opcional)
                      </label>
                      <input
                        id="videoUrl"
                        type="url"
                        className="ccib-form-input"
                        value={formVideoUrl}
                        onChange={(e) => setFormVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>

                    {formStatus && (
                      <p
                        className={`ccib-auth-status ${
                          formStatus.type === 'error'
                            ? 'ccib-auth-status--error'
                            : 'ccib-auth-status--success'
                        }`}
                      >
                        {formStatus.message}
                      </p>
                    )}

                    <div className="ccib-news-form-actions">
                      <button
                        type="submit"
                        className="ccib-modal-btn"
                        disabled={saving}
                      >
                        {saving
                          ? editingPostId
                            ? 'Atualizando…'
                            : 'Publicando…'
                          : editingPostId
                          ? 'Salvar alterações'
                          : 'Publicar'}
                      </button>

                      {editingPostId && (
                        <button
                          type="button"
                          className="ccib-news-btn ccib-news-btn--ghost"
                          onClick={resetForm}
                        >
                          Cancelar edição
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </aside>
          )}
        </div>
      </Section>

      {/* Modal "Leia mais" */}
      {activePost && (
        <div className="ccib-news-modal-backdrop" onClick={closeModal}>
          <div
            className="ccib-news-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ccib-news-modal-close"
              onClick={closeModal}
              aria-label="Fechar"
            >
              ×
            </button>
            <p className="ccib-pillar-label">
              {activePost.tipo === 'evento' ? 'Evento' : 'Notícia'}
            </p>
            <h2 className="ccib-news-modal-title">{activePost.title}</h2>
            <p className="ccib-news-item-meta">
              Publicado em {formatDateTime(activePost.createdAt)} por{' '}
              <strong>{activePost.authorName}</strong>
            </p>
            {activePost.imageUrl && (
              <div className="ccib-news-modal-media">
                <img src={activePost.imageUrl} alt="" />
              </div>
            )}
            {activePost.resumo && (
              <p className="ccib-news-modal-text">{activePost.resumo}</p>
            )}
            {activePost.conteudo && (
              <p className="ccib-news-modal-text">{activePost.conteudo}</p>
            )}
            {activePost.videoUrl && (
              <div className="ccib-news-modal-video">
                <iframe
                  src={activePost.videoUrl}
                  title={activePost.title || 'Vídeo'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default NoticiasEventos;
