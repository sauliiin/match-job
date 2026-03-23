/* ===========================
   CarreiraMais — Vagas (Public)
   =========================== */

function pageVagas() {
  const areasOptions = [...new Set(VAGAS.map(v=>v.area))].sort().map(a=>`<option value="${a}">${a}</option>`).join('');
  const cards = VAGAS.map(renderPublicJobCard).join('');

  return `
  <!-- Page Hero -->
  <div class="page-hero">
    <div class="container">
      <h1><i class="fa-solid fa-briefcase"></i> Vagas Abertas</h1>
      <p>Encontre oportunidades de emprego em diversas áreas, modalidades e tipos de contratação.</p>
    </div>
  </div>

  <!-- CTA Banner -->
  <div class="container">
    <div class="jobs-cta-banner" style="margin-top:32px">
      <h3><i class="fa-solid fa-wand-magic-sparkles"></i> Receba vagas compatíveis com o seu perfil</h3>
      <p>Crie sua conta e nosso sistema encontrará automaticamente as vagas mais alinhadas com suas habilidades e área de interesse.</p>
      <button class="btn btn-white btn-lg" onclick="window.location.hash='cadastro'">
        <i class="fa-solid fa-user-plus"></i> Criar perfil grátis
      </button>
    </div>
  </div>

  <!-- Filters -->
  <div class="filters-toolbar">
    <div class="container">
      <div class="filters-inner">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" class="form-input" id="vagas-search" placeholder="Cargo, empresa ou habilidade..." oninput="filterVagas()">
        </div>
        <div class="filters-selects">
          <select class="form-input form-select" id="vagas-area" onchange="filterVagas()">
            <option value="">Todas as áreas</option>
            ${areasOptions}
          </select>
          <select class="form-input form-select" id="vagas-tipo" onchange="filterVagas()">
            <option value="">Todos os tipos</option>
            <option>CLT</option><option>Estágio</option><option>PJ</option>
            <option>Trainee</option><option>Freelance</option>
          </select>
          <select class="form-input form-select" id="vagas-modal" onchange="filterVagas()">
            <option value="">Qualquer modalidade</option>
            <option>Presencial</option><option>Remoto</option><option>Híbrido</option>
          </select>
        </div>
        <span class="filter-count" id="vagas-count">${VAGAS.length} vagas</span>
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="results-section">
    <div class="container">
      <div class="grid-cards" id="vagas-grid">${cards}</div>
    </div>
  </div>
  `;
}

function renderPublicJobCard(v) {
  const skillsHtml = v.skills.slice(0,4).map(s=>`<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  const tipoColor = { CLT:'badge-blue', Estágio:'badge-green', PJ:'badge-yellow', Trainee:'badge-purple', Freelance:'badge-gray' };
  const modIcon   = { Remoto:'fa-wifi', Presencial:'fa-building', Híbrido:'fa-shuffle' };

  return `
  <div class="card job-card-pub">
    <div class="card-body">
      <div class="job-card-header">
        <div class="job-card-title">${v.cargo}</div>
        <span class="badge ${tipoColor[v.tipo]||'badge-gray'}">${v.tipo}</span>
      </div>
      <div class="job-card-company"><i class="fa-solid fa-building"></i> ${v.empresa}</div>
      <div class="job-card-details">
        <div class="job-card-detail"><i class="fa-solid fa-location-dot"></i> ${v.cidade}</div>
        <div class="job-card-detail"><i class="fa-solid ${modIcon[v.modalidade]||'fa-briefcase'}"></i> ${v.modalidade}</div>
        <div class="job-card-detail"><i class="fa-solid fa-layer-group"></i> ${v.area}</div>
      </div>
      <div class="job-card-skills">${skillsHtml}</div>
      <div class="job-card-actions">
        <button class="btn btn-outline btn-sm" onclick="showJobModal(${v.id})" style="flex:1">
          <i class="fa-solid fa-eye"></i> Ver Vaga
        </button>
        <button class="btn btn-primary btn-sm" onclick="showApplyConfirm(${v.id})" style="flex:1">
          <i class="fa-solid fa-paper-plane"></i> Candidatar
        </button>
      </div>
    </div>
  </div>`;
}

function filterVagas() {
  const kw    = (document.getElementById('vagas-search')?.value || '').toLowerCase();
  const area  =  document.getElementById('vagas-area')?.value   || '';
  const tipo  =  document.getElementById('vagas-tipo')?.value   || '';
  const modal =  document.getElementById('vagas-modal')?.value  || '';

  const result = VAGAS.filter(v => {
    const matchKw    = !kw    || v.cargo.toLowerCase().includes(kw) || v.empresa.toLowerCase().includes(kw) || v.skills.some(s=>s.toLowerCase().includes(kw));
    const matchArea  = !area  || v.area  === area;
    const matchTipo  = !tipo  || v.tipo  === tipo;
    const matchModal = !modal || v.modalidade === modal;
    return matchKw && matchArea && matchTipo && matchModal;
  });

  const grid  = document.getElementById('vagas-grid');
  const count = document.getElementById('vagas-count');
  if (count) count.textContent = `${result.length} vaga${result.length !== 1 ? 's' : ''}`;
  if (grid)  grid.innerHTML = result.length
    ? result.map(renderPublicJobCard).join('')
    : '<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-briefcase"></i><h3>Nenhuma vaga encontrada</h3><p>Tente outros filtros.</p></div>';
}

function initVagas() {
  // Filters are inline via oninput/onchange
}
