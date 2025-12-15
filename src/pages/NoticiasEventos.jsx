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

import DOMPurify from 'dompurify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Extension } from '@tiptap/core';

// -----------------------------
// Utilitários (YouTube / HTML)
// -----------------------------
const extractYouTubeId = (rawUrl) => {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl.trim());

    // youtu.be/VIDEO_ID
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && id.length === 11 ? id : null;
    }

    // youtube.com/*
    if (url.hostname.includes('youtube.com')) {
      // youtube.com/watch?v=VIDEO_ID
      if (url.pathname === '/watch') {
        const id = url.searchParams.get('v');
        return id && id.length === 11 ? id : null;
      }

      // youtube.com/embed/VIDEO_ID
      if (url.pathname.startsWith('/embed/')) {
        const id = url.pathname.split('/')[2];
        return id && id.length === 11 ? id : null;
      }

      // youtube.com/shorts/VIDEO_ID
      if (url.pathname.startsWith('/shorts/')) {
        const id = url.pathname.split('/')[2];
        return id && id.length === 11 ? id : null;
      }
    }

    return null;
  } catch {
    return null;
  }
};

const normalizeYouTubeEmbedUrl = (rawUrl) => {
  const id = extractYouTubeId(rawUrl);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}`;
};

const stripHtml = (html) => {
  if (!html) return '';
  try {
    const doc = new DOMParser().parseFromString(String(html), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  } catch {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
};

const toSafeHtml = (content) => {
  if (!content) return '';
  // Sanitiza para evitar XSS
  return DOMPurify.sanitize(String(content), {
    USE_PROFILES: { html: true },
  });
};

// -----------------------------
// TipTap: extensão de Font Size
// -----------------------------
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).run(),
    };
  },
});

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

  // filtro / paginação
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  // modal "Leia mais"
  const [activePost, setActivePost] = useState(null);

  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
    ],
    content: formConteudo || '',
    onUpdate: ({ editor }) => {
      setFormConteudo(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'ccib-rich-editor-content',
        spellcheck: 'true',
      },
    },
  });

  // Sincroniza conteúdo no editor quando abrir o formulário ou trocar o item editado
  useEffect(() => {
    if (!editor) return;
    if (!showForm) return;
    editor.commands.setContent(formConteudo || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, showForm, editingPostId]);

  // Carrega posts em tempo real
  useEffect(() => {
    const q = query(
      collection(db, 'ccib_posts'),
      orderBy('createdAt', 'desc'),
      limit(200)
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
      (err) => {
        console.error('Erro ao carregar posts:', err);
        setLoadingPosts(false);
      }
    );

    return () => unsub();
  }, []);

  // Lista filtrada e paginação em memória
  const filteredPosts = posts.filter((post) => {
    if (!searchTerm.trim()) return true;
    const title = (post.title || '').toLowerCase();
    return title.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  // Garante que a página atual não ultrapasse o total
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // Quando o termo de busca mudar, volte para a página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const buildPreview = (post) => {
    const resumo = (post.resumo || '').trim();
    const conteudoText = stripHtml(post.conteudo || '');
    const base = resumo || conteudoText || '';
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

    if (editor) {
      editor.commands.setContent('');
    }
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setFormTitle(post.title || '');
    setFormResumo(post.resumo || '');
    setFormConteudo(post.conteudo || '');
    setFormTipo(post.tipo || 'noticia');
    setFormImageUrl(post.imageUrl || '');
    // se já estiver embed, mantém; se for watch/shorts/youtu.be, vai normalizar ao salvar
    setFormVideoUrl(post.videoUrl || '');
    setFormStatus(null);
    setShowForm(true);

    if (editor) {
      editor.commands.setContent(post.conteudo || '');
    }
  };

  const handleDeleteClick = async (postId) => {
    if (!user) return;
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta postagem?'
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'ccib_posts', postId));
    } catch (err) {
      console.error('Erro ao excluir post:', err);
      alert('Não foi possível excluir. Tente novamente.');
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
      // (1) Normaliza YouTube para embed
      const videoNormalized = formVideoUrl.trim()
        ? normalizeYouTubeEmbedUrl(formVideoUrl)
        : '';

      if (formVideoUrl.trim() && !videoNormalized) {
        setFormStatus({
          type: 'error',
          message:
            'URL de vídeo inválida. Cole um link do YouTube (watch, youtu.be, shorts ou embed).',
        });
        setSaving(false);
        return;
      }

      // (2) Conteúdo HTML do editor (se vazio, salva string vazia)
      const rawHtml = editor ? editor.getHTML() : formConteudo;
      const textOnly = stripHtml(rawHtml);
      const conteudoToSave = textOnly ? String(rawHtml || '').trim() : '';

      const payload = {
        title: formTitle.trim(),
        resumo: formResumo.trim(),
        conteudo: conteudoToSave,
        tipo: formTipo,
        imageUrl: formImageUrl.trim() || '',
        videoUrl: videoNormalized,
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
          authorName: user.displayName || user.email || 'Equipe CCIB',
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
          'Não foi possível salvar a postagem. Verifique sua conexão e tente novamente.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="ccib-page">
      <Section
        id="noticias-eventos"
        title="Notícias & Eventos"
        description="Acompanhe aqui os principais comunicados, atividades e eventos especiais da comunidade do Centro Cultural Islâmico da Bahia."
      >
        <div className="ccib-news-intro">
          <p>
            Esta página reúne anúncios das orações em congregação, cursos e
            círculos de estudo, visitas guiadas, ações sociais, eventos
            culturais e demais novidades do CCIB.
          </p>
        </div>

        {user && (
          <div className="ccib-news-actions">
            <div className="ccib-news-actions-info">
              <span className="ccib-pillar-label ccib-pillar-label--soft">
                Área do publicador
              </span>
              <p>
                Autenticado como <strong>{user.displayName || user.email}</strong>.
                Você pode criar, editar ou excluir publicações.
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

        {user && showForm && (
          <div className="ccib-card ccib-news-form-wrapper">
            <div className="ccib-card-body">
              <h2 className="ccib-card-title">
                {editingPostId ? 'Editar publicação' : 'Criar nova publicação'}
              </h2>
              <p className="ccib-card-description">
                Preencha os campos e clique em <strong>{editingPostId ? 'Atualizar' : 'Publicar'}</strong>.
              </p>
            </div>

            <div className="ccib-card-body">
              {formStatus && (
                <div
                  className={`ccib-news-form-status ccib-news-form-status--${formStatus.type}`}
                >
                  {formStatus.message}
                </div>
              )}

              <form className="ccib-news-form" onSubmit={handleCreateOrUpdatePost}>
                <div className="ccib-form-group">
                  <label className="ccib-form-label" htmlFor="tipo">
                    Tipo
                  </label>
                  <select
                    id="tipo"
                    className="ccib-form-select"
                    value={formTipo}
                    onChange={(e) => setFormTipo(e.target.value)}
                  >
                    <option value="noticia">Notícia</option>
                    <option value="evento">Evento</option>
                  </select>
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label" htmlFor="title">
                    Título *
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="ccib-form-input"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label" htmlFor="resumo">
                    Resumo curto *
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
                    Conteúdo (editor)
                  </label>

                  <div className="ccib-rich-editor" id="conteudo">
                    <div className="ccib-rich-toolbar">
                      <button
                        type="button"
                        className={`ccib-rich-btn ${editor?.isActive('bold') ? 'is-active' : ''}`}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        title="Negrito"
                        aria-label="Negrito"
                      >
                        <strong>B</strong>
                      </button>

                      <button
                        type="button"
                        className={`ccib-rich-btn ${editor?.isActive('italic') ? 'is-active' : ''}`}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        title="Itálico"
                        aria-label="Itálico"
                      >
                        <em>I</em>
                      </button>

                      <button
                        type="button"
                        className={`ccib-rich-btn ${editor?.isActive('underline') ? 'is-active' : ''}`}
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        title="Sublinhado"
                        aria-label="Sublinhado"
                      >
                        <span style={{ textDecoration: 'underline' }}>U</span>
                      </button>

                      <span className="ccib-rich-sep" />

                      <label className="ccib-rich-label">
                        Tamanho
                        <select
                          className="ccib-rich-select"
                          defaultValue=""
                          onChange={(e) => {
                            const v = e.target.value;
                            if (!editor) return;
                            if (!v) editor.chain().focus().unsetFontSize().run();
                            else editor.chain().focus().setFontSize(v).run();
                          }}
                          title="Tamanho da fonte"
                          aria-label="Tamanho da fonte"
                        >
                          <option value="">Padrão</option>
                          <option value="12px">12</option>
                          <option value="14px">14</option>
                          <option value="16px">16</option>
                          <option value="18px">18</option>
                          <option value="20px">20</option>
                          <option value="24px">24</option>
                          <option value="28px">28</option>
                          <option value="32px">32</option>
                        </select>
                      </label>

                      <label className="ccib-rich-label">
                        Cor
                        <input
                          type="color"
                          className="ccib-rich-color"
                          defaultValue="#1a1a1a"
                          onChange={(e) => {
                            if (!editor) return;
                            editor.chain().focus().setColor(e.target.value).run();
                          }}
                          title="Cor do texto"
                          aria-label="Cor do texto"
                        />
                      </label>

                      <span className="ccib-rich-sep" />

                      <button
                        type="button"
                        className="ccib-rich-btn"
                        onClick={() => {
                          if (!editor) return;
                          editor.chain().focus().unsetAllMarks().run();
                          editor.chain().focus().clearNodes().run();
                        }}
                        title="Limpar formatação"
                        aria-label="Limpar formatação"
                      >
                        Limpar
                      </button>
                    </div>

                    <div className="ccib-form-textarea ccib-rich-surface">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label" htmlFor="imageUrl">
                    URL da imagem (opcional)
                  </label>
                  <input
                    id="imageUrl"
                    type="url"
                    className="ccib-form-input"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                  />
                </div>

                <div className="ccib-form-group">
                  <label className="ccib-form-label" htmlFor="videoUrl">
                    URL do YouTube (opcional)
                  </label>
                  <input
                    id="videoUrl"
                    type="url"
                    className="ccib-form-input"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="watch / youtu.be / shorts / embed"
                  />
                </div>

                <div className="ccib-news-form-actions">
                  <button type="submit" className="ccib-news-btn" disabled={saving}>
                    {saving ? 'Salvando...' : editingPostId ? 'Atualizar' : 'Publicar notícia'}
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
        )}

        <div className="ccib-news-search">
          <label htmlFor="news-search" className="ccib-news-search-label">
            Buscar notícias por título
          </label>
          <input
            id="news-search"
            type="text"
            className="ccib-news-search-input"
            placeholder="Digite um termo do título (ex: Ramadã, palestra, visita...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
            Ainda não há notícias cadastradas. Assim que a equipe publicar conteúdos,
            eles aparecerão aqui em ordem cronológica.
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className="ccib-prayer-status">
            Nenhuma notícia encontrada para o termo pesquisado.
          </p>
        ) : (
          <>
            <div className="ccib-news-list">
              {paginatedPosts.map((post) => {
                const canManage = !!user;
                const preview = buildPreview(post);
                const hasMore = !!(post.conteudo && stripHtml(post.conteudo).length > 0);

                return (
                  <article key={post.id} className="ccib-card">
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

                      {preview && <p className="ccib-news-item-summary">{preview}</p>}

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

            {totalPages > 1 && (
              <div className="ccib-pagination">
                <button
                  type="button"
                  className="ccib-pagination-btn"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`ccib-pagination-btn ${
                        page === safePage ? 'ccib-pagination-btn--active' : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="ccib-pagination-btn"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </Section>

      {activePost && (
        <div
          className="ccib-news-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePost(null)}
        >
          <div className="ccib-news-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ccib-news-modal-close"
              onClick={() => setActivePost(null)}
              aria-label="Fechar"
            >
              ✕
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
              <div
                className="ccib-news-modal-text ccib-news-modal-rich"
                dangerouslySetInnerHTML={{ __html: toSafeHtml(activePost.conteudo) }}
              />
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
