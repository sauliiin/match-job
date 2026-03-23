/* ===========================
   CarreiraMais — SPA Router
   =========================== */

const ROUTES = {
  '':          { render: pageHome,      init: initHome,      title: 'Home' },
  'home':      { render: pageHome,      init: initHome,      title: 'Home' },
  'login':     { render: pageLogin,     init: initLogin,     title: 'Login' },
  'cadastro':  { render: pageCadastro,  init: initCadastro,  title: 'Cadastro' },
  'dashboard': { render: pageDashboard, init: initDashboard, title: 'Dashboard', protected: true },
  'empresa':   { render: pageEmpresa,   init: initEmpresa,   title: 'Para Empresas' },
  'cursos':    { render: pageCursos,    init: initCursos,    title: 'Cursos' },
  'vagas':     { render: pageVagas,     init: initVagas,     title: 'Vagas' },
  'sobre':     { render: pageSobre,     init: initSobre,     title: 'Sobre' }
};

function navigate(rawHash) {
  const hash = (rawHash || '').replace(/^#/, '').split('?')[0].trim();
  const route = ROUTES[hash] || ROUTES[''];

  // Guard: protected routes require login
  if (route.protected && !getUser()) {
    toast('Faça login para acessar o dashboard.', 'error');
    window.location.hash = 'login';
    return;
  }

  // Redirect logged-in users away from login/cadastro
  if ((hash === 'login' || hash === 'cadastro') && getUser()) {
    window.location.hash = 'dashboard';
    return;
  }

  const container = document.getElementById('page-container');
  container.innerHTML = '<div style="display:flex;justify-content:center;padding:80px"><div class="spinner" style="width:36px;height:36px;border-width:3px"></div></div>';

  // Tiny delay to allow spinner to show, then render
  requestAnimationFrame(() => {
    container.innerHTML = route.render();
    document.title = `CarreiraMais — ${route.title}`;
    updateNavActive(hash || 'home');
    if (route.init) route.init();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateNavActive(hash) {
  const navMap = {
    '': 'home', 'home': 'home',
    'cursos': 'cursos', 'vagas': 'vagas',
    'sobre': 'sobre', 'dashboard': 'dashboard'
  };
  const active = navMap[hash] || '';

  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === active);
  });
}

window.addEventListener('hashchange', () => navigate(window.location.hash));
window.addEventListener('load', () => navigate(window.location.hash || '#home'));
