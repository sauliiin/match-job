/* ===========================
   CarreiraMais — Dashboard
   =========================== */

function pageDashboard() {
  const user = getUser();
  if (!user) return '<div class="container" style="padding:80px 24px;text-align:center"><h2>Faça login para acessar o dashboard.</h2><a href="#login" class="btn btn-primary" style="margin-top:16px">Fazer login</a></div>';

  const initials = (user.nome || 'U').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  return `
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-user-avatar">${initials}</div>
        <div class="sidebar-user-name">${user.nome || 'Usuário'}</div>
        <div class="sidebar-user-role">${user.perfil || 'Perfil'} · ${user.area || ''}</div>
      </div>
      <nav class="sidebar-nav">
        <button class="sidebar-item active" data-tab="perfil" onclick="switchDashTab('perfil',this)">
          <i class="fa-solid fa-user"></i> Meu Perfil
        </button>
        <button class="sidebar-item" data-tab="cursos-rec" onclick="switchDashTab('cursos-rec',this)">
          <i class="fa-solid fa-graduation-cap"></i> Recomendações de Cursos
        </button>
        <button class="sidebar-item" data-tab="vagas-rec" onclick="switchDashTab('vagas-rec',this)">
          <i class="fa-solid fa-briefcase"></i> Vagas para Mim
        </button>
        <button class="sidebar-item" data-tab="buscar" onclick="switchDashTab('buscar',this)">
          <i class="fa-solid fa-magnifying-glass"></i> Buscar Oportunidades
        </button>
        <button class="sidebar-item disabled">
          <i class="fa-solid fa-certificate"></i> Certificados
          <span class="lock"><i class="fa-solid fa-lock"></i></span>
        </button>
        <button class="sidebar-item disabled">
          <i class="fa-solid fa-bell"></i> Notificações
          <span class="lock"><i class="fa-solid fa-lock"></i></span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="sidebar-logout" onclick="logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i> Sair
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="dashboard-content">
      <div class="dashboard-tab active" id="tab-perfil">${renderProfileTab(user)}</div>
      <div class="dashboard-tab" id="tab-cursos-rec">${renderCoursesRec(user)}</div>
      <div class="dashboard-tab" id="tab-vagas-rec">${renderJobsRec(user)}</div>
      <div class="dashboard-tab" id="tab-buscar">${renderSearchTab()}</div>
    </main>
  </div>

  <!-- Bottom nav (mobile) -->
  <nav class="bottom-nav">
    <button class="bottom-nav-item active" data-tab="perfil" onclick="switchDashTab('perfil',this)">
      <i class="fa-solid fa-user"></i> Perfil
    </button>
    <button class="bottom-nav-item" data-tab="cursos-rec" onclick="switchDashTab('cursos-rec',this)">
      <i class="fa-solid fa-graduation-cap"></i> Cursos
    </button>
    <button class="bottom-nav-item" data-tab="vagas-rec" onclick="switchDashTab('vagas-rec',this)">
      <i class="fa-solid fa-briefcase"></i> Vagas
    </button>
    <button class="bottom-nav-item" data-tab="buscar" onclick="switchDashTab('buscar',this)">
      <i class="fa-solid fa-magnifying-glass"></i> Buscar
    </button>
  </nav>
  `;
}

// ---- Profile Tab ----
function renderProfileTab(user) {
  const pct = calcProfileCompletion(user);
  const skills = user.skills || [];
  const skillsHtml = skills.length
    ? skills.map(s => `<span class="tag removable" style="cursor:default">${s}<button class="remove-btn" onclick="removeSkillFromProfile('${s.replace(/'/g,"\\'")}')"><i class="fa-solid fa-xmark"></i></button></span>`).join('')
    : '<span style="color:var(--text-muted);font-size:.875rem">Nenhuma habilidade adicionada.</span>';

  return `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
    <h1 style="font-size:1.4rem;font-weight:700">Meu Perfil</h1>
    <button class="btn btn-outline btn-sm" onclick="toggleEditProfile()">
      <i class="fa-solid fa-pen-to-square" id="edit-icon"></i>
      <span id="edit-btn-text">Editar Perfil</span>
    </button>
  </div>

  <!-- Completion -->
  <div class="profile-section" style="margin-bottom:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <span style="font-size:.875rem;font-weight:600">Completude do Perfil</span>
      <span style="font-size:.875rem;font-weight:700;color:var(--primary)">${pct}%</span>
    </div>
    <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
    <p style="font-size:.75rem;color:var(--text-muted);margin-top:6px">
      ${pct < 60 ? 'Complete seu perfil para receber melhores recomendações.' : pct < 90 ? 'Ótimo progresso! Adicione mais habilidades para melhores resultados.' : 'Perfil excelente! Você está recebendo as melhores recomendações.'}
    </p>
  </div>

  <!-- Info -->
  <div class="profile-section" id="profile-info-section">
    <div class="profile-section-title">Informações Pessoais</div>
    <div class="profile-grid" id="profile-fields">
      ${renderProfileField('Nome',       user.nome,        'edit-nome',        user.nome)}
      ${renderProfileField('E-mail',     user.email,       'edit-email',       user.email,       'email')}
      ${renderProfileField('Cidade',     user.cidade,      'edit-cidade',      user.cidade)}
      ${renderProfileField('Estado',     user.estado,      'edit-estado',      user.estado)}
      ${renderProfileField('Perfil',     user.perfil,      null,               null)}
      ${renderProfileField('Escolaridade',user.escolaridade,null,              null)}
      ${renderProfileField('Área de Interesse',user.area,  null,               null)}
      ${renderProfileField('Formação',   user.curso || '—',null,               null)}
      ${renderProfileField('Instituição',user.instituicao||'—',null,           null)}
      ${renderProfileField('Ano',        user.ano || '—',  null,               null)}
    </div>
    <div id="edit-actions" style="display:none;margin-top:20px;display:none">
      <button class="btn btn-primary btn-sm" onclick="saveProfileEdit()"><i class="fa-solid fa-floppy-disk"></i> Salvar</button>
      <button class="btn btn-ghost btn-sm" onclick="toggleEditProfile()" style="margin-left:8px">Cancelar</button>
    </div>
  </div>

  <!-- Skills -->
  <div class="profile-section">
    <div class="profile-section-title">
      Habilidades
      <button class="btn btn-outline btn-sm" onclick="showAddSkillsModal()"><i class="fa-solid fa-plus"></i> Adicionar</button>
    </div>
    <div class="tags-row" id="profile-skills">${skillsHtml}</div>
  </div>
  `;
}

function renderProfileField(label, value, editId, editValue, type = 'text') {
  return `
  <div class="profile-field">
    <label>${label}</label>
    <span>${value || '—'}</span>
    ${editId ? `<input type="${type}" id="${editId}" class="form-input" value="${editValue || ''}" style="display:none">` : ''}
  </div>`;
}

function calcProfileCompletion(user) {
  const fields = ['nome','email','cidade','estado','perfil','escolaridade','area','curso','instituicao','ano'];
  const filled  = fields.filter(f => user[f] && user[f].trim()).length;
  const skillBonus = Math.min((user.skills?.length || 0) * 2, 20);
  return Math.min(Math.round((filled / fields.length) * 80) + skillBonus, 100);
}

let editMode = false;
function toggleEditProfile() {
  editMode = !editMode;
  document.querySelectorAll('.profile-field span').forEach(el => {
    el.style.display = editMode ? 'none' : '';
  });
  document.querySelectorAll('.profile-field .form-input').forEach(el => {
    el.style.display = editMode ? 'block' : 'none';
  });
  document.getElementById('edit-actions').style.display = editMode ? 'flex' : 'none';
  document.getElementById('edit-icon').className = editMode ? 'fa-solid fa-xmark' : 'fa-solid fa-pen-to-square';
  document.getElementById('edit-btn-text').textContent = editMode ? 'Cancelar' : 'Editar Perfil';
}

async function saveProfileEdit() {
  const session = getUserSession();
  const user = session?.user;
  if (!session?.userId || !user) {
    toast('Sua sessão expirou. Faça login novamente.', 'error');
    window.location.hash = 'login';
    return;
  }

  const fields = { nome:'edit-nome', email:'edit-email', cidade:'edit-cidade', estado:'edit-estado' };
  const updates = {};

  Object.entries(fields).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) updates[key] = el.value.trim();
  });

  try {
    const updatedUser = await updateUserInFirebase(session.userId, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    saveUserSession(session.userId, updatedUser);
    toast('Perfil atualizado!', 'success');
    refreshNavbar();
    navigate('dashboard');
  } catch (error) {
    toast(error.message || 'Não foi possível atualizar seu perfil.', 'error');
  }
}

async function removeSkillFromProfile(skill) {
  const session = getUserSession();
  const user = session?.user;
  if (!session?.userId || !user) return;

  const nextSkills = (user.skills || []).filter(s => s !== skill);

  try {
    const updatedUser = await updateUserInFirebase(session.userId, {
      skills: nextSkills,
      updatedAt: new Date().toISOString()
    });
    saveUserSession(session.userId, updatedUser);
  } catch (error) {
    toast(error.message || 'Não foi possível remover a habilidade.', 'error');
    return;
  }

  const container = document.getElementById('profile-skills');
  if (container) {
    const updatedSkills = nextSkills;
    const skillsHtml = updatedSkills.length
      ? updatedSkills.map(s => `<span class="tag removable" style="cursor:default">${s}<button class="remove-btn" onclick="removeSkillFromProfile('${s.replace(/'/g,"\\'")}')"><i class="fa-solid fa-xmark"></i></button></span>`).join('')
      : '<span style="color:var(--text-muted);font-size:.875rem">Nenhuma habilidade adicionada.</span>';
    container.innerHTML = skillsHtml;
  }
  toast(`Habilidade "${skill}" removida.`, 'info');
}

function showAddSkillsModal() {
  const user = getUser();
  const allSkills = Object.values(SKILLS_CATEGORIES).flat();
  const user_skills = user.skills || [];
  const skillsHtml = allSkills.map(s => `
    <span class="tag ${user_skills.includes(s) ? 'selected' : ''}" onclick="toggleProfileSkill(this,'${s.replace(/'/g,"\\'")}")">${s}</span>
  `).join('');

  openModal(`
    <div class="modal-box modal-lg">
      <div class="modal-header">
        <h2 class="modal-title">Adicionar Habilidades</h2>
        <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div style="display:flex;flex-wrap:wrap;gap:8px;max-height:350px;overflow-y:auto">${skillsHtml}</div>
        <div class="custom-skill-row" style="margin-top:16px">
          <input type="text" id="modal-skill-input" class="form-input" placeholder="Outra habilidade...">
          <button class="btn btn-outline btn-sm" onclick="addModalCustomSkill()"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="saveModalSkills()"><i class="fa-solid fa-floppy-disk"></i> Salvar habilidades</button>
      </div>
    </div>
  `);
}

let _modalSkills = null;
function toggleProfileSkill(el, skill) {
  if (!_modalSkills) _modalSkills = [...(getUser().skills || [])];
  const idx = _modalSkills.indexOf(skill);
  if (idx === -1) { _modalSkills.push(skill); el.classList.add('selected'); }
  else             { _modalSkills.splice(idx,1); el.classList.remove('selected'); }
}
function addModalCustomSkill() {
  if (!_modalSkills) _modalSkills = [...(getUser().skills || [])];
  const val = document.getElementById('modal-skill-input')?.value.trim();
  if (val && !_modalSkills.includes(val)) { _modalSkills.push(val); toast(`"${val}" adicionada!`,'success'); }
  if (document.getElementById('modal-skill-input')) document.getElementById('modal-skill-input').value = '';
}
async function saveModalSkills() {
  if (!_modalSkills) { closeModal(); return; }
  const session = getUserSession();
  if (!session?.userId) {
    closeModal();
    toast('Sua sessão expirou. Faça login novamente.', 'error');
    window.location.hash = 'login';
    return;
  }

  try {
    const updatedUser = await updateUserInFirebase(session.userId, {
      skills: _modalSkills,
      updatedAt: new Date().toISOString()
    });
    saveUserSession(session.userId, updatedUser);
    _modalSkills = null;
    closeModal();
    toast('Habilidades salvas!', 'success');
    navigate('dashboard');
  } catch (error) {
    toast(error.message || 'Não foi possível salvar as habilidades.', 'error');
  }
}

const MATCH_STOPWORDS = new Set([
  'com','para','das','dos','uma','uns','umas','que','seu','sua','seus','suas',
  'por','mais','menos','entre','sobre','como','onde','muito','muita','curso',
  'cursos','vaga','vagas','perfil','area','areas','profissional','profissionais',
  'trabalho','mercado','ideal','ideais','seu','sua','sera','sao','nosso','nossa'
]);

const COURSE_LEVEL_FIT = {
  estudante: { iniciante: 1, intermediario: 0.78, avancado: 0.28 },
  'profissional formado': { iniciante: 0.42, intermediario: 1, avancado: 0.88 },
  'em transicao de carreira': { iniciante: 1, intermediario: 0.84, avancado: 0.34 }
};

const JOB_TYPE_FIT = {
  estudante: { estagio: 1, trainee: 0.84, clt: 0.36, pj: 0.2, freelance: 0.52 },
  'profissional formado': { estagio: 0.08, trainee: 0.36, clt: 1, pj: 0.9, freelance: 0.72 },
  'em transicao de carreira': { estagio: 0.44, trainee: 0.92, clt: 0.82, pj: 0.52, freelance: 0.56 }
};

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function canonicalValue(value = '') {
  return normalizeText(value).replace(/\s+/g, ' ');
}

function tokenizeText(value = '') {
  return [...new Set(
    normalizeText(value)
      .replace(/[^a-z0-9+#]+/g, ' ')
      .split(/\s+/)
      .filter(token => token.length >= 3 && !MATCH_STOPWORDS.has(token))
  )];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildUserMatchContext(user) {
  return {
    areaKey: canonicalValue(user.area),
    cityKey: canonicalValue(user.cidade),
    stateKey: canonicalValue(user.estado),
    profileKey: canonicalValue(user.perfil),
    skillSet: new Set((user.skills || []).map(canonicalValue).filter(Boolean)),
    tokens: new Set(tokenizeText([
      user.area,
      user.curso,
      user.perfil,
      user.escolaridade,
      user.instituicao,
      user.cidade,
      ...(user.skills || [])
    ].join(' ')))
  };
}

function computeTokenOverlap(userTokens, itemTokens) {
  if (!userTokens.size || !itemTokens.size) return 0;
  let overlap = 0;
  itemTokens.forEach(token => {
    if (userTokens.has(token)) overlap += 1;
  });
  return clamp(overlap / Math.max(1, Math.min(userTokens.size, itemTokens.size, 6)), 0, 1);
}

function computeSkillMatch(userContext, skills = []) {
  const normalizedSkills = skills.map(canonicalValue).filter(Boolean);
  const matchedSkills = normalizedSkills.filter(skill => userContext.skillSet.has(skill));
  return {
    ratio: normalizedSkills.length ? matchedSkills.length / normalizedSkills.length : 0,
    count: matchedSkills.length,
    matchedSkills
  };
}

function getCourseLevelFit(profileKey, nivel) {
  return COURSE_LEVEL_FIT[profileKey]?.[canonicalValue(nivel)] ?? 0.55;
}

function normalizeJobType(tipo = '') {
  const normalized = canonicalValue(tipo);
  if (normalized.startsWith('clt')) return 'clt';
  if (normalized.startsWith('estagio')) return 'estagio';
  if (normalized.startsWith('trainee')) return 'trainee';
  if (normalized.startsWith('pj')) return 'pj';
  if (normalized.startsWith('freelance')) return 'freelance';
  return normalized;
}

function getJobTypeFit(profileKey, tipo) {
  return JOB_TYPE_FIT[profileKey]?.[normalizeJobType(tipo)] ?? 0.55;
}

function extractStateFromLocation(location = '') {
  const match = String(location).match(/-\s*([A-Z]{2})$/);
  return canonicalValue(match?.[1] || '');
}

function getJobLocationFit(userContext, job) {
  const cidade = canonicalValue(job.cidade);
  const state = extractStateFromLocation(job.cidade);
  const modalidade = canonicalValue(job.modalidade);

  if (!userContext.cityKey && !userContext.stateKey) {
    if (modalidade === 'remoto') return 1;
    if (modalidade === 'hibrido') return 0.72;
    return 0.5;
  }

  if (modalidade === 'remoto') return 1;
  if (userContext.cityKey && cidade.includes(userContext.cityKey)) return 1;
  if (userContext.stateKey && state && state === userContext.stateKey) {
    return modalidade === 'hibrido' ? 0.86 : 0.72;
  }
  if (modalidade === 'hibrido') return 0.34;
  return 0.12;
}

function capitalize(text = '') {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function formatMatchExplanation(reasons, fallback) {
  const pickedReasons = reasons.filter(Boolean).slice(0, 3);
  if (!pickedReasons.length) return fallback;
  return `${capitalize(pickedReasons.join(' + '))}.`;
}

function getMatchTone(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'mid';
  return 'low';
}

function buildCourseMatch(course, userContext) {
  const skillMatch = computeSkillMatch(userContext, course.skills);
  const areaFit = userContext.areaKey ? (canonicalValue(course.area) === userContext.areaKey ? 1 : 0) : 0.45;
  const contextFit = computeTokenOverlap(
    userContext.tokens,
    new Set(tokenizeText([
      course.nome,
      course.plataforma,
      course.area,
      course.descricao,
      ...(course.skills || [])
    ].join(' ')))
  );
  const levelFit = getCourseLevelFit(userContext.profileKey, course.nivel);
  const score = Math.round((skillMatch.ratio * 45) + (areaFit * 20) + (contextFit * 20) + (levelFit * 15));

  const reasons = [];
  if (areaFit === 1) reasons.push('mesma area de interesse');
  if (skillMatch.count > 0) reasons.push(`${skillMatch.count} habilidade${skillMatch.count > 1 ? 's' : ''} em comum`);
  if (levelFit >= 0.8) reasons.push('nivel alinhado com seu momento');
  if (contextFit >= 0.34) reasons.push('descricao conversa com seu perfil');
  if (!reasons.length && course.gratis) reasons.push('porta de entrada leve para explorar essa trilha');

  return {
    item: course,
    score: clamp(score, 0, 100),
    tone: getMatchTone(score),
    explanation: formatMatchExplanation(reasons, 'Sugestao ampla para expandir seu radar de aprendizado.'),
    reasons,
    matchingSkills: skillMatch.count
  };
}

function buildJobMatch(job, userContext) {
  const skillMatch = computeSkillMatch(userContext, job.skills);
  const areaFit = userContext.areaKey ? (canonicalValue(job.area) === userContext.areaKey ? 1 : 0) : 0.45;
  const contextFit = computeTokenOverlap(
    userContext.tokens,
    new Set(tokenizeText([
      job.cargo,
      job.empresa,
      job.area,
      job.descricao,
      ...(job.skills || []),
      ...((job.requisitos || []))
    ].join(' ')))
  );
  const locationFit = getJobLocationFit(userContext, job);
  const typeFit = getJobTypeFit(userContext.profileKey, job.tipo);
  const score = Math.round((skillMatch.ratio * 40) + (areaFit * 20) + (contextFit * 15) + (locationFit * 15) + (typeFit * 10));

  const reasons = [];
  if (skillMatch.count > 0) reasons.push(`${skillMatch.count} habilidade${skillMatch.count > 1 ? 's' : ''} em comum`);
  if (areaFit === 1) reasons.push('mesma area de interesse');
  if (locationFit >= 0.8) reasons.push(job.modalidade === 'Remoto' ? 'vaga remota encaixa no seu contexto' : 'localizacao bem alinhada');
  if (typeFit >= 0.8) reasons.push(`tipo de vaga combina com seu momento (${job.tipo})`);
  if (contextFit >= 0.34) reasons.push('descricao e requisitos conversam com seu perfil');

  return {
    item: job,
    score: clamp(score, 0, 100),
    tone: getMatchTone(score),
    explanation: formatMatchExplanation(reasons, 'Opcao interessante para ampliar seu radar profissional.'),
    reasons,
    matchingSkills: skillMatch.count
  };
}

function getRankedCourseMatches(user, courses = CURSOS) {
  const userContext = buildUserMatchContext(user);
  return courses
    .map(course => buildCourseMatch(course, userContext))
    .sort((a, b) => b.score - a.score || a.item.nome.localeCompare(b.item.nome, 'pt-BR'));
}

function getRankedJobMatches(user, jobs = VAGAS) {
  const userContext = buildUserMatchContext(user);
  return jobs
    .map(job => buildJobMatch(job, userContext))
    .sort((a, b) => b.score - a.score || a.item.cargo.localeCompare(b.item.cargo, 'pt-BR'));
}

// ---- Courses Rec Tab ----
function renderCoursesRec(user) {
  const recommended = getRankedCourseMatches(user).slice(0, 6);
  const cards = recommended.map(renderCourseCard).join('');

  return `
  <div style="margin-bottom:24px">
    <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Recomendações de Cursos</h1>
    <p style="color:var(--text-muted);font-size:.9rem">Cursos ranqueados por um match inteligente que cruza habilidades, area, nivel e contexto do seu perfil.</p>
  </div>

  <div class="rec-filters">
    <select class="filter-select" id="rec-filter-area" onchange="filterRecCursos()">
      <option value="">Todas as áreas</option>
      ${AREAS.map(a=>`<option value="${a}">${a}</option>`).join('')}
    </select>
    <select class="filter-select" id="rec-filter-nivel" onchange="filterRecCursos()">
      <option value="">Todos os níveis</option>
      <option>Iniciante</option><option>Intermediário</option><option>Avançado</option>
    </select>
    <select class="filter-select" id="rec-filter-preco" onchange="filterRecCursos()">
      <option value="">Gratuito e pago</option>
      <option value="free">Apenas gratuitos</option>
      <option value="paid">Apenas pagos</option>
    </select>
  </div>

  <div class="grid-cards" id="rec-cursos-grid">${cards}</div>
  `;
}

function renderCourseCard(match) {
  const c = match.item;
  const skillsHtml = c.skills.map(s => `<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  return `
  <div class="card course-card">
    <div class="course-card-top"></div>
    <div class="course-card-body">
      <div class="match-pill ${match.tone}">
        <i class="fa-solid fa-sparkles"></i> ${match.score}% de match
      </div>
      <div class="course-platform">${c.plataforma}</div>
      <div class="course-title">${c.nome}</div>
      <p class="match-reason">${match.explanation}</p>
      <div class="match-meter"><div class="match-meter-fill ${match.tone}" style="width:${match.score}%"></div></div>
      <div class="course-meta">
        <span><i class="fa-regular fa-clock"></i> ${c.duracao}</span>
        <span class="badge ${nivelBadge(c.nivel)}">${c.nivel}</span>
        ${c.gratis ? '<span class="free-badge">Gratuito</span>' : '<span class="paid-badge">Pago</span>'}
      </div>
      <div class="course-skills">${skillsHtml}</div>
      <button class="btn btn-primary btn-sm btn-block" onclick="showCourseModal(${c.id})">
        <i class="fa-solid fa-eye"></i> Ver Curso
      </button>
    </div>
  </div>`;
}

function filterRecCursos() {
  const area  = document.getElementById('rec-filter-area')?.value  || '';
  const nivel = document.getElementById('rec-filter-nivel')?.value || '';
  const preco = document.getElementById('rec-filter-preco')?.value || '';
  const user  = getUser();

  const filtered = CURSOS.filter(c => {
    const matchArea  = !area  || c.area  === area;
    const matchNivel = !nivel || c.nivel === nivel;
    const matchPreco = !preco || (preco === 'free' ? c.gratis : !c.gratis);
    return matchArea && matchNivel && matchPreco;
  });
  const result = getRankedCourseMatches(user, filtered);

  const grid = document.getElementById('rec-cursos-grid');
  if (grid) grid.innerHTML = result.length
    ? result.map(renderCourseCard).join('')
    : '<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>Nenhum curso encontrado</h3><p>Tente outros filtros.</p></div>';
}

// ---- Jobs Rec Tab ----
function renderJobsRec(user) {
  const jobs = getRankedJobMatches(user).slice(0, 6);

  return `
  <div style="margin-bottom:24px">
    <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Vagas para Mim</h1>
    <p style="color:var(--text-muted);font-size:.9rem">Vagas ranqueadas por skills, area, contexto da descricao, tipo de vaga e localizacao.</p>
  </div>
  <div class="grid-cards">${jobs.map(renderJobCard).join('')}</div>
  `;
}

function renderJobCard(match) {
  const v = match.item;
  const skillsHtml = v.skills.map(s => `<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  return `
  <div class="card job-card">
    <div class="job-card-body">
      <div class="match-pill ${match.tone}">
        <i class="fa-solid fa-wand-magic-sparkles"></i> ${match.score}% de match
      </div>
      <span class="badge ${tipoBadge(v.tipo)} job-type-badge">${v.tipo}</span>
      <div class="job-title">${v.cargo}</div>
      <div class="job-company"><i class="fa-solid fa-building"></i> ${v.empresa}</div>
      <p class="match-reason">${match.explanation}</p>
      <div class="match-meter"><div class="match-meter-fill ${match.tone}" style="width:${match.score}%"></div></div>
      <div class="job-meta">
        <div class="job-meta-item"><i class="fa-solid fa-location-dot"></i> ${v.cidade}</div>
        <div class="job-meta-item"><i class="fa-solid ${modalidadeIcon(v.modalidade)}"></i> ${v.modalidade}</div>
      </div>
      <div class="job-skills">${skillsHtml}</div>
      <button class="btn btn-primary btn-sm btn-block" onclick="showJobModal(${v.id})">
        <i class="fa-solid fa-eye"></i> Ver Detalhes
      </button>
    </div>
  </div>`;
}

// ---- Search Tab ----
function renderSearchTab() {
  return `
  <div style="margin-bottom:24px">
    <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Buscar Oportunidades</h1>
    <p style="color:var(--text-muted);font-size:.9rem">Pesquise entre todas as vagas disponíveis na plataforma.</p>
  </div>

  <div class="search-bar-wrapper">
    <div class="search-input-wrapper" style="flex:1">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" class="form-input" id="search-keyword" placeholder="Cargo, empresa ou habilidade..." oninput="filterSearch()">
    </div>
    <button class="btn btn-primary" onclick="filterSearch()"><i class="fa-solid fa-search"></i> Buscar</button>
  </div>

  <div class="filter-bar">
    <select class="filter-select" id="search-area" onchange="filterSearch()">
      <option value="">Todas as áreas</option>
      ${AREAS.map(a=>`<option value="${a}">${a}</option>`).join('')}
    </select>
    <select class="filter-select" id="search-tipo" onchange="filterSearch()">
      <option value="">Todos os tipos</option>
      <option>CLT</option><option>Estágio</option><option>PJ</option><option>Trainee</option><option>Freelance</option>
    </select>
    <select class="filter-select" id="search-modal" onchange="filterSearch()">
      <option value="">Qualquer modalidade</option>
      <option>Presencial</option><option>Remoto</option><option>Híbrido</option>
    </select>
  </div>

  <div style="font-size:.875rem;color:var(--text-muted);margin-bottom:16px" id="search-count">${VAGAS.length} vagas encontradas</div>
  <div class="grid-cards" id="search-grid">${VAGAS.map(renderJobCard).join('')}</div>
  `;
}

function filterSearch() {
  const user  = getUser();
  const kw    = (document.getElementById('search-keyword')?.value || '').toLowerCase();
  const area  =  document.getElementById('search-area')?.value   || '';
  const tipo  =  document.getElementById('search-tipo')?.value   || '';
  const modal =  document.getElementById('search-modal')?.value  || '';

  const filtered = VAGAS.filter(v => {
    const matchKw    = !kw  || v.cargo.toLowerCase().includes(kw) || v.empresa.toLowerCase().includes(kw) || v.skills.some(s=>s.toLowerCase().includes(kw));
    const matchArea  = !area  || v.area  === area;
    const matchTipo  = !tipo  || v.tipo  === tipo;
    const matchModal = !modal || v.modalidade === modal;
    return matchKw && matchArea && matchTipo && matchModal;
  });
  const result = getRankedJobMatches(user, filtered);

  const grid  = document.getElementById('search-grid');
  const count = document.getElementById('search-count');
  if (count) count.textContent = `${result.length} vaga${result.length !== 1 ? 's' : ''} encontrada${result.length !== 1 ? 's' : ''}`;
  if (grid) grid.innerHTML = result.length
    ? result.map(renderJobCard).join('')
    : '<div class="empty-state"><i class="fa-solid fa-briefcase"></i><h3>Nenhuma vaga encontrada</h3><p>Tente outros termos de busca.</p></div>';
}

// ---- Tab switching ----
function switchDashTab(tabName, btn) {
  document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));

  document.getElementById(`tab-${tabName}`)?.classList.add('active');
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(b => b.classList.add('active'));
}

function initDashboard() {
  // Nothing extra needed — content already rendered
}
