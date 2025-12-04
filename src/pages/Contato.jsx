// src/pages/Contato.jsx
import React from 'react';
import Section from '@components/ui/Section.jsx';

const Contato = () => {
  return (
    <main className="ccib-page">
      <Section
        id="contato"
        title="Fale conosco"
        description="Entre em contato com o Centro Cultural Islâmico da Bahia. Envie sua mensagem, tire dúvidas ou agende uma visita. Será um prazer falar com você."
      >
        <div className="ccib-contact-layout">
          {/* COLUNA ESQUERDA – FORMULÁRIO */}
          <div className="ccib-contact-card ccib-contact-card--form">
            <h2 className="ccib-contact-card-title">Formulário de contato</h2>
            <p className="ccib-contact-card-subtitle">
              Preencha os campos abaixo e retornaremos o mais breve possível.
            </p>

            <form
              className="ccib-contact-form"
              action="https://formsubmit.co/hermesbarros.eng@gmail.com"
              method="POST"
            >
              {/* Configurações extras do FormSubmit */}
              <input
                type="hidden"
                name="_subject"
                value="Novo contato via site do CCIB"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              {/* Se quiser redirecionar para uma página de obrigado:
              <input type="hidden" name="_next" value="https://seusite.com/obrigado" />
              */}

              <div className="ccib-contact-form-grid">
                <div className="ccib-contact-form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    type="text"
                    id="nome"
                    name="Nome"
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="ccib-contact-form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    required
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="ccib-contact-form-group">
                  <label htmlFor="telefone">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="Telefone"
                    placeholder="(71) 9 0000-0000"
                  />
                </div>

                <div className="ccib-contact-form-group">
                  <label htmlFor="assunto">Assunto</label>
                  <select id="assunto" name="Assunto" defaultValue="">
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    <option value="Duvida geral">Dúvida geral</option>
                    <option value="Visita guiada">Visita guiada</option>
                    <option value="Atividades e cursos">
                      Atividades e cursos
                    </option>
                    <option value="Parcerias e apoio institucional">
                      Parcerias e apoio institucional
                    </option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="ccib-contact-form-group ccib-contact-form-group--full">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="Mensagem"
                    rows={5}
                    required
                    placeholder="Escreva aqui sua mensagem, dúvida ou solicitação."
                  />
                </div>
              </div>

              <button type="submit" className="ccib-contact-submit-btn">
                Enviar mensagem
              </button>

              <p className="ccib-contact-privacy">
                Ao enviar este formulário, você concorda em ser contatado pela
                equipe do Centro Cultural Islâmico da Bahia para tratarmos do
                seu pedido.
              </p>
            </form>
          </div>

          {/* COLUNA DIREITA – MAPA + REDES SOCIAIS */}
          <div className="ccib-contact-card ccib-contact-card--map">
            <h2 className="ccib-contact-card-title">Nossa localização</h2>
            <p className="ccib-contact-card-subtitle">
              Centro Cultural Islâmico da Bahia – CCIB
              <br />
              {/* Substitua pelo endereço real */}
              Rua Exemplo, 123 – Bairro Tal – Salvador/BA
            </p>

            <div className="ccib-contact-map-wrapper">
              {/* Substitua o src abaixo pelo código de embed do Google Maps do CCIB */}
              <iframe
                title="Mapa de localização do Centro Cultural Islâmico da Bahia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.103947145734!2d-38.500871599999996!3d-12.973462600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71604dc98414415%3A0xd7560e8d0d25fa8a!2zQ2VudHJvIEN1bHR1cmFsIElzbMOibWljbyBkYSBCYWhpYSDZhdiz2KzYrw!5e1!3m2!1spt-BR!2sbr!4v1764859014307!5m2!1spt-BR!2sbr"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="ccib-contact-social">
              <h3 className="ccib-contact-social-title">
                Conecte-se com o CCIB
              </h3>
              <p className="ccib-contact-social-subtitle">
                Acompanhe nossas atividades, eventos e conteúdos nas redes
                sociais.
              </p>

              <div className="ccib-contact-social-icons">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccib-contact-social-icon-circle ccib-contact-social-icon-circle--youtube"
                  aria-label="Canal do CCIB no YouTube"
                >
                  <i className="fa-brands fa-youtube" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/55SEUNUMEROAQUI"
                  target="_blank"
                  rel="noreferrer"
                  className="ccib-contact-social-icon-circle ccib-contact-social-icon-circle--whatsapp"
                  aria-label="WhatsApp do CCIB"
                >
                  <i className="fa-brands fa-whatsapp" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="ccib-contact-social-icon-circle ccib-contact-social-icon-circle--instagram"
                  aria-label="Instagram do CCIB"
                >
                  <i className="fa-brands fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Contato;
