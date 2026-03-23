/* ===========================
   CarreiraMais — App Init
   Auth helpers, dark mode, toast, navbar
   =========================== */

// ---- Auth helpers ----
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('cm_session'))?.user || null;
  }
  catch { return null; }
}

function getUserSession() {
  try {
    return JSON.parse(localStorage.getItem('cm_session'));
  }
  catch {
    return null;
  }
}

function saveUserSession(userId, user) {
  localStorage.setItem('cm_session', JSON.stringify({ userId, user }));
}

async function logoutUser() {
  try {
    await signOutUser();
    toast('Até logo! Sessão encerrada.', 'success');
    window.location.hash = 'home';
  } catch (error) {
    toast(error.message || 'Não foi possível encerrar a sessão.', 'error');
  }
}

// ---- Toast ----
function toast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px">
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'}"
         style="color:${type === 'success' ? 'var(--secondary)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'}"></i>
      <span>${message}</span>
    </div>
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---- Dark mode ----
function initDarkMode() {
  const saved = localStorage.getItem('cm_theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  updateDarkIcon(saved);
}

function toggleDark() {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('cm_theme', next);
  updateDarkIcon(next);
}

function updateDarkIcon(theme) {
  document.querySelectorAll('.dark-toggle i').forEach(i => {
    i.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

// ---- Navbar ----
function initNavbar() {
  updateNavbarAuth();
}

function updateNavbarAuth() {
  const user = getUser();
  const authEl   = document.getElementById('nav-auth');
  const mAuthEl  = document.getElementById('nav-mobile-auth');

  if (user) {
    const initials = (user.nome || 'U').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
    const html = `
      <div class="nav-user">
        <div class="nav-avatar" title="${user.nome}" onclick="window.location.hash='dashboard'">${initials}</div>
        <button class="btn btn-ghost btn-sm" onclick="logoutUser()">Sair</button>
      </div>`;
    if (authEl)  authEl.innerHTML = html;
    if (mAuthEl) mAuthEl.innerHTML = `<button class="btn btn-ghost btn-block" onclick="logoutUser()"><i class="fa-solid fa-right-from-bracket"></i> Sair</button>`;
  } else {
    const html = `
      <button class="btn btn-ghost btn-sm" onclick="window.location.hash='login'">
        <i class="fa-solid fa-right-to-bracket"></i> Login
      </button>
      <button class="btn btn-primary btn-sm" onclick="window.location.hash='cadastro'">
        <i class="fa-solid fa-user-plus"></i> Cadastrar
      </button>`;
    if (authEl)  authEl.innerHTML = html;
    if (mAuthEl) mAuthEl.innerHTML = `
      <button class="btn btn-ghost btn-block" onclick="closeMenu();window.location.hash='login'">Login</button>
      <button class="btn btn-primary btn-block" onclick="closeMenu();window.location.hash='cadastro'">Cadastrar</button>`;
  }
}

// ---- Mobile menu ----
function toggleMenu() {
  const menu = document.getElementById('nav-mobile');
  const burger = document.getElementById('hamburger');
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
}

function closeMenu() {
  document.getElementById('nav-mobile')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');
}

// Close menu when clicking outside
document.addEventListener('click', e => {
  const menu   = document.getElementById('nav-mobile');
  const burger = document.getElementById('hamburger');
  if (menu && !menu.contains(e.target) && !burger?.contains(e.target)) closeMenu();
});

// ---- Utility: validate email ----
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Utility: render skills tags ----
function renderSkillTags(skills = [], removable = false, onRemove) {
  if (!skills.length) return '<span style="color:var(--text-muted);font-size:.875rem">Nenhuma habilidade adicionada.</span>';
  return skills.map(s => `
    <span class="tag ${removable ? 'removable' : ''}" style="cursor:${removable ? 'default' : 'pointer'}">
      ${s}
      ${removable ? `<button class="remove-btn" onclick="${onRemove}('${s.replace(/'/g, "\\'")}')"><i class="fa-solid fa-xmark"></i></button>` : ''}
    </span>
  `).join('');
}

// ---- Utility: nivel badge color ----
function nivelBadge(nivel) {
  const map = { 'Iniciante': 'badge-green', 'Intermediário': 'badge-blue', 'Avançado': 'badge-red' };
  return map[nivel] || 'badge-gray';
}

// ---- Utility: tipo badge color ----
function tipoBadge(tipo) {
  const map = { CLT: 'badge-blue', Estágio: 'badge-green', PJ: 'badge-yellow', Trainee: 'badge-purple', Freelance: 'badge-gray' };
  return map[tipo] || 'badge-gray';
}

// ---- Utility: modalidade icon ----
function modalidadeIcon(mod) {
  const map = { Remoto: 'fa-wifi', Presencial: 'fa-building', Híbrido: 'fa-shuffle' };
  return map[mod] || 'fa-briefcase';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  initDarkMode();
  initNavbar();
});

// Re-update navbar auth after navigation (called by pages)
function refreshNavbar() {
  updateNavbarAuth();
}
