/* ===========================
   CarreiraMais — Home Page
   =========================== */

function pageHome() {
  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge"><i class="fa-solid fa-star"></i> Plataforma gratuita de impacto social</div>
      <h1>Descubra cursos ideais para o seu perfil e conecte-se ao mercado</h1>
      <p>Recomendações personalizadas de cursos, conexão com empresas e vagas compatíveis com seu perfil — tudo em um só lugar, de graça.</p>
      <div class="hero-cta">
        <button class="btn btn-white btn-lg" onclick="window.location.hash='cadastro'">
          <i class="fa-solid fa-user-graduate"></i> Sou Estudante / Profissional
        </button>
        <button class="btn btn-outline-white btn-lg" onclick="window.location.hash='empresa'">
          <i class="fa-solid fa-building"></i> Sou Empresa
        </button>
      </div>
      <div class="hero-stats">
        <div class="hero-stat-item">
          <div class="number" data-counter="1200" data-suffix="+">0</div>
          <div class="label">Cursos recomendados</div>
        </div>
        <div class="hero-stat-item">
          <div class="number" data-counter="340" data-suffix="+">0</div>
          <div class="label">Empresas parceiras</div>
        </div>
        <div class="hero-stat-item">
          <div class="number" data-counter="8500" data-suffix="+">0</div>
          <div class="label">Usuários ativos</div>
        </div>
        <div class="hero-stat-item">
          <div class="number" data-counter="${AREAS.length}" data-suffix="">0</div>
          <div class="label">Áreas de atuação</div>
        </div>
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section class="section how-it-works">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Como funciona</h2>
        <p class="section-subtitle">Em três passos simples você já tem acesso a recomendações e oportunidades personalizadas.</p>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon"><i class="fa-solid fa-user-pen"></i></div>
          <h3>Crie seu perfil</h3>
          <p>Informe suas habilidades, formação e área de interesse. Quanto mais completo, melhor as recomendações.</p>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <h3>Receba recomendações</h3>
          <p>Nossa plataforma analisa seu perfil e sugere os cursos mais relevantes de Alura, Coursera, SENAI e mais.</p>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon"><i class="fa-solid fa-handshake"></i></div>
          <h3>Conecte-se ao mercado</h3>
          <p>Acesse vagas compatíveis com seu perfil e candidate-se diretamente pelas empresas parceiras.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <i class="fa-solid fa-book-open"></i>
          <div class="stat-number" data-counter="${CURSOS.length}" data-suffix="">0</div>
          <div class="stat-label">Cursos no catálogo</div>
        </div>
        <div class="stat-item">
          <i class="fa-solid fa-graduation-cap"></i>
          <div class="stat-number" data-counter="95" data-suffix="%">0</div>
          <div class="stat-label">Taxa de satisfação dos usuários</div>
        </div>
        <div class="stat-item">
          <i class="fa-solid fa-briefcase"></i>
          <div class="stat-number" data-counter="${VAGAS.length}" data-suffix="+">0</div>
          <div class="stat-label">Vagas no radar agora</div>
        </div>
        <div class="stat-item">
          <i class="fa-solid fa-heart"></i>
          <div class="stat-number" data-counter="100" data-suffix="%">0</div>
          <div class="stat-label">Gratuito para usuários</div>
        </div>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="section testimonials">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">O que dizem nossos usuários</h2>
        <p class="section-subtitle">Histórias reais de quem transformou sua carreira com o CarreiraMais.</p>
      </div>
      <div class="testimonials-grid">
        <div class="card testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"O CarreiraMais me indicou um curso de Python no Coursera que mudou minha carreira. Em 6 meses migrei de auxiliar administrativo para analista de dados. A plataforma entendeu exatamente o que eu precisava."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" style="background:#7c3aed">LM</div>
            <div>
              <div class="testimonial-name">Lucas Mendonça</div>
              <div class="testimonial-role">Analista de Dados Jr · Ex-auxiliar administrativo</div>
            </div>
          </div>
        </div>
        <div class="card testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Estava em transição de carreira há 8 meses e não sabia por onde começar. A plataforma mapeou minhas habilidades de enfermagem e me conectou com vagas perfeitas. Consegui emprego em 3 semanas!"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" style="background:#059669">AF</div>
            <div>
              <div class="testimonial-name">Ana Ferreira</div>
              <div class="testimonial-role">Técnica de Enfermagem · Fortaleza - CE</div>
            </div>
          </div>
        </div>
        <div class="card testimonial-card">
          <div class="testimonial-stars">★★★★☆</div>
          <p class="testimonial-text">"Como recém-formado em Administração, o CarreiraMais me ajudou a identificar que precisava aprender Power BI para me destacar. Fiz o curso gratuito da Microsoft e já estou no meu primeiro emprego."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" style="background:#dc2626">RP</div>
            <div>
              <div class="testimonial-name">Rafael Pereira</div>
              <div class="testimonial-role">Trainee Financeiro · Campinas - SP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ODS -->
  <section class="section ods-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Compromisso com os ODS da ONU</h2>
        <p class="section-subtitle">O CarreiraMais está alinhado com os Objetivos de Desenvolvimento Sustentável da ONU.</p>
      </div>
      <div class="ods-grid">
        <div class="ods-card ods4">
          <div class="ods-icon">
            <span>ODS</span>4
          </div>
          <div class="ods-body">
            <h3>Educação de Qualidade</h3>
            <p>Garantir educação inclusiva, equitativa e de qualidade, promovendo oportunidades de aprendizagem ao longo da vida para todos. O CarreiraMais democratiza o acesso a cursos de plataformas renomadas, independentemente de classe social ou localização.</p>
          </div>
        </div>
        <div class="ods-card ods8">
          <div class="ods-icon">
            <span>ODS</span>8
          </div>
          <div class="ods-body">
            <h3>Trabalho Decente e Crescimento</h3>
            <p>Promover o crescimento econômico inclusivo, o emprego pleno e produtivo e o trabalho decente para todos. Conectamos pessoas qualificadas a oportunidades reais de emprego, reduzindo o descompasso entre formação e mercado de trabalho.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="section container">
    <div class="jobs-cta-banner">
      <h2>Pronto para transformar sua carreira?</h2>
      <p>Junte-se a mais de 8.500 profissionais que já estão se desenvolvendo com o CarreiraMais.</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:20px;">
        <button class="btn btn-primary btn-lg" onclick="window.location.hash='cadastro'">
          <i class="fa-solid fa-rocket"></i> Criar minha conta grátis
        </button>
        <button class="btn btn-outline btn-lg" onclick="window.location.hash='cursos'">
          <i class="fa-solid fa-magnifying-glass"></i> Explorar cursos
        </button>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#home" class="nav-logo"><i class="fa-solid fa-rocket"></i> CarreiraMais</a>
          <p>Plataforma gratuita de recomendação de cursos e conexão profissional. Conectando formação, habilidades e oportunidades.</p>
          <div class="footer-social">
            <a href="#" class="social-icon" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" class="social-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-icon" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" class="social-icon" title="GitHub"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#cursos">Cursos</a></li>
            <li><a href="#vagas">Vagas</a></li>
            <li><a href="#sobre">Sobre</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Acesso</h4>
          <ul>
            <li><a href="#cadastro">Criar conta</a></li>
            <li><a href="#login">Entrar</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#empresa">Para empresas</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <ul>
            <li><a href="#">contato@carreiramais.com.br</a></li>
            <li><a href="#">Suporte</a></li>
            <li><a href="#">Privacidade</a></li>
            <li><a href="#">Termos de uso</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 CarreiraMais · Plataforma gratuita · Desenvolvida para impacto social</p>
        <div class="badges">
          <span class="footer-badge">ODS 4</span>
          <span class="footer-badge">ODS 8</span>
          <span class="footer-badge">Open Access</span>
        </div>
      </div>
    </div>
  </footer>
  `;
}

function initHome() {
  // Counter animation
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('pt-BR') + suffix;
      if (current >= target) clearInterval(interval);
    }, 20);
  });
}
