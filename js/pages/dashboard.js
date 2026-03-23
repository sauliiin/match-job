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

function saveProfileEdit() {
  const user = getUser();
  const fields = { nome:'edit-nome', email:'edit-email', cidade:'edit-cidade', estado:'edit-estado' };
  Object.entries(fields).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) user[key] = el.value;
  });
  saveUser(user);
  toast('Perfil atualizado!', 'success');
  refreshNavbar();
  navigate('dashboard');
}

function removeSkillFromProfile(skill) {
  const user = getUser();
  user.skills = (user.skills || []).filter(s => s !== skill);
  saveUser(user);
  const container = document.getElementById('profile-skills');
  if (container) {
    const updatedSkills = user.skills;
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
function saveModalSkills() {
  if (!_modalSkills) { closeModal(); return; }
  const user = getUser();
  user.skills = _modalSkills;
  saveUser(user);
  _modalSkills = null;
  closeModal();
  toast('Habilidades salvas!', 'success');
  navigate('dashboard');
}

// ---- Courses Rec Tab ----
function renderCoursesRec(user) {
  const userSkills = user.skills || [];
  const userArea   = user.area || '';

  let recommended = CURSOS.filter(c =>
    c.area === userArea || c.skills.some(s => userSkills.includes(s))
  );
  // Score by matches
  recommended = recommended.sort((a, b) => {
    const scoreA = a.skills.filter(s => userSkills.includes(s)).length + (a.area === userArea ? 2 : 0);
    const scoreB = b.skills.filter(s => userSkills.includes(s)).length + (b.area === userArea ? 2 : 0);
    return scoreB - scoreA;
  });
  if (!recommended.length) recommended = CURSOS.slice(0,6);

  const cards = recommended.map(c => renderCourseCard(c)).join('');

  return `
  <div style="margin-bottom:24px">
    <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Recomendações de Cursos</h1>
    <p style="color:var(--text-muted);font-size:.9rem">Cursos selecionados com base nas suas habilidades e área de interesse.</p>
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

function renderCourseCard(c) {
  const skillsHtml = c.skills.map(s => `<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  return `
  <div class="card course-card">
    <div class="course-card-top"></div>
    <div class="course-card-body">
      <div class="course-platform">${c.plataforma}</div>
      <div class="course-title">${c.nome}</div>
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
  const userSkills = user?.skills || [];
  const userArea   = user?.area   || '';

  let result = CURSOS.filter(c => {
    const matchArea  = !area  || c.area  === area;
    const matchNivel = !nivel || c.nivel === nivel;
    const matchPreco = !preco || (preco === 'free' ? c.gratis : !c.gratis);
    return matchArea && matchNivel && matchPreco;
  });

  if (!area) {
    result = result.sort((a,b) => {
      const sa = a.skills.filter(s=>userSkills.includes(s)).length + (a.area===userArea?2:0);
      const sb = b.skills.filter(s=>userSkills.includes(s)).length + (b.area===userArea?2:0);
      return sb - sa;
    });
  }

  const grid = document.getElementById('rec-cursos-grid');
  if (grid) grid.innerHTML = result.length
    ? result.map(renderCourseCard).join('')
    : '<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>Nenhum curso encontrado</h3><p>Tente outros filtros.</p></div>';
}

// ---- Jobs Rec Tab ----
function renderJobsRec(user) {
  const userArea   = user.area || '';
  const userSkills = user.skills || [];

  let jobs = VAGAS.filter(v => v.area === userArea || v.skills.some(s => userSkills.includes(s)));
  jobs = jobs.sort((a,b) => {
    const sa = a.skills.filter(s=>userSkills.includes(s)).length + (a.area===userArea?2:0);
    const sb = b.skills.filter(s=>userSkills.includes(s)).length + (b.area===userArea?2:0);
    return sb - sa;
  });
  if (!jobs.length) jobs = VAGAS.slice(0,6);

  return `
  <div style="margin-bottom:24px">
    <h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Vagas para Mim</h1>
    <p style="color:var(--text-muted);font-size:.9rem">Vagas compatíveis com seu perfil e área de interesse.</p>
  </div>
  <div class="grid-cards">${jobs.map(renderJobCard).join('')}</div>
  `;
}

function renderJobCard(v) {
  const skillsHtml = v.skills.map(s => `<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  return `
  <div class="card job-card">
    <div class="job-card-body">
      <span class="badge ${tipoBadge(v.tipo)} job-type-badge">${v.tipo}</span>
      <div class="job-title">${v.cargo}</div>
      <div class="job-company"><i class="fa-solid fa-building"></i> ${v.empresa}</div>
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
  const kw    = (document.getElementById('search-keyword')?.value || '').toLowerCase();
  const area  =  document.getElementById('search-area')?.value   || '';
  const tipo  =  document.getElementById('search-tipo')?.value   || '';
  const modal =  document.getElementById('search-modal')?.value  || '';

  const result = VAGAS.filter(v => {
    const matchKw    = !kw  || v.cargo.toLowerCase().includes(kw) || v.empresa.toLowerCase().includes(kw) || v.skills.some(s=>s.toLowerCase().includes(kw));
    const matchArea  = !area  || v.area  === area;
    const matchTipo  = !tipo  || v.tipo  === tipo;
    const matchModal = !modal || v.modalidade === modal;
    return matchKw && matchArea && matchTipo && matchModal;
  });

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
