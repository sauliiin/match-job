/* ===========================
   CarreiraMais — Cursos (Public)
   =========================== */

function pageCursos() {
  const areasOptions = [...new Set(CURSOS.map(c=>c.area))].map(a=>`<option value="${a}">${a}</option>`).join('');
  const cards = CURSOS.map(renderPublicCourseCard).join('');

  return `
  <!-- Page Hero -->
  <div class="page-hero">
    <div class="container">
      <h1><i class="fa-solid fa-graduation-cap"></i> Catálogo de Cursos</h1>
      <p>Explore ${CURSOS.length} cursos de plataformas reconhecidas, gratuitos e pagos, para diversas áreas e trilhas profissionais.</p>
    </div>
  </div>

  <!-- Filters -->
  <div class="filters-toolbar">
    <div class="container">
      <div class="filters-inner">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" class="form-input" id="cursos-search" placeholder="Buscar cursos..." oninput="filterCursos()">
        </div>
        <div class="filters-selects">
          <select class="form-input form-select filter-select" id="cursos-area" onchange="filterCursos()">
            <option value="">Todas as áreas</option>
            ${areasOptions}
          </select>
          <select class="form-input form-select filter-select" id="cursos-nivel" onchange="filterCursos()">
            <option value="">Todos os níveis</option>
            <option>Iniciante</option><option>Intermediário</option><option>Avançado</option>
          </select>
          <select class="form-input form-select filter-select" id="cursos-preco" onchange="filterCursos()">
            <option value="">Gratuito e pago</option>
            <option value="free">Apenas gratuitos</option>
            <option value="paid">Apenas pagos</option>
          </select>
        </div>
        <span class="filter-count" id="cursos-count">${CURSOS.length} cursos</span>
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="results-section">
    <div class="container">
      <div class="grid-cards" id="cursos-grid">${cards}</div>

      <!-- CTA -->
      <div class="jobs-cta-banner">
        <h3><i class="fa-solid fa-wand-magic-sparkles"></i> Quer recomendações personalizadas?</h3>
        <p>Crie seu perfil e nosso sistema encontrará os cursos ideais para o seu perfil e objetivos.</p>
        <button class="btn btn-primary btn-lg" onclick="window.location.hash='cadastro'">
          <i class="fa-solid fa-user-plus"></i> Criar perfil grátis
        </button>
      </div>
    </div>
  </div>
  `;
}

function renderPublicCourseCard(c) {
  const skillsHtml = c.skills.slice(0,3).map(s=>`<span class="tag" style="cursor:default;font-size:.72rem;padding:2px 8px">${s}</span>`).join('');
  return `
  <div class="card course-card-pub">
    <div class="card-top-bar"></div>
    <div class="card-body">
      <div class="platform-tag"><i class="fa-solid fa-graduation-cap"></i> ${c.plataforma}</div>
      <div class="course-name">${c.nome}</div>
      <div class="course-info-row">
        <span><i class="fa-regular fa-clock"></i> ${c.duracao}</span>
        <span class="${nivelBadge(c.nivel)} badge">${c.nivel}</span>
        ${c.gratis ? '<span class="free-badge">Gratuito</span>' : '<span class="paid-badge">Pago</span>'}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${skillsHtml}</div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline btn-sm" onclick="showCourseModal(${c.id})" style="flex:1">
          <i class="fa-solid fa-info-circle"></i> Saiba Mais
        </button>
        <button class="btn btn-primary btn-sm" onclick="showCourseModal(${c.id})" style="flex:1">
          <i class="fa-solid fa-external-link-alt"></i> Ver Curso
        </button>
      </div>
    </div>
  </div>`;
}

function filterCursos() {
  const kw    = (document.getElementById('cursos-search')?.value  || '').toLowerCase();
  const area  =  document.getElementById('cursos-area')?.value    || '';
  const nivel =  document.getElementById('cursos-nivel')?.value   || '';
  const preco =  document.getElementById('cursos-preco')?.value   || '';

  const result = CURSOS.filter(c => {
    const matchKw    = !kw    || c.nome.toLowerCase().includes(kw) || c.plataforma.toLowerCase().includes(kw) || c.skills.some(s=>s.toLowerCase().includes(kw));
    const matchArea  = !area  || c.area  === area;
    const matchNivel = !nivel || c.nivel === nivel;
    const matchPreco = !preco || (preco === 'free' ? c.gratis : !c.gratis);
    return matchKw && matchArea && matchNivel && matchPreco;
  });

  const grid  = document.getElementById('cursos-grid');
  const count = document.getElementById('cursos-count');
  if (count) count.textContent = `${result.length} curso${result.length !== 1 ? 's' : ''}`;
  if (grid)  grid.innerHTML = result.length
    ? result.map(renderPublicCourseCard).join('')
    : '<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-graduation-cap"></i><h3>Nenhum curso encontrado</h3><p>Tente outros termos de busca.</p></div>';
}

function initCursos() {
  // Filters are inline via oninput/onchange
}
