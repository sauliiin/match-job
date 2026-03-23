/* ===========================
   CarreiraMais — Modal System
   =========================== */

function openModal(html) {
  closeModal(); // remove any existing modal
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'modal-backdrop';
  backdrop.innerHTML = html;
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const existing = document.getElementById('modal-backdrop');
  if (existing) existing.remove();
  document.body.style.overflow = '';
}

// ---- Course Modal ----
function showCourseModal(courseId) {
  const c = CURSOS.find(x => x.id === courseId);
  if (!c) return;

  const skillsHtml = c.skills.map(s =>
    `<span class="tag" style="cursor:default">${s}</span>`
  ).join('');

  openModal(`
    <div class="modal-box">
      <div class="modal-header">
        <div>
          <div class="modal-platform"><i class="fa-solid fa-graduation-cap"></i> ${c.plataforma}</div>
          <h2 class="modal-title">${c.nome}</h2>
        </div>
        <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div class="modal-meta">
          <span class="modal-meta-item"><i class="fa-regular fa-clock"></i> ${c.duracao}</span>
          <span class="modal-meta-item"><i class="fa-solid fa-chart-bar"></i> ${c.nivel}</span>
          <span class="modal-meta-item"><i class="fa-solid fa-layer-group"></i> ${c.area}</span>
          ${c.gratis
            ? '<span class="free-badge"><i class="fa-solid fa-tag"></i> Gratuito</span>'
            : '<span class="paid-badge"><i class="fa-solid fa-dollar-sign"></i> Pago</span>'
          }
        </div>
        <p class="modal-desc">${c.descricao}</p>
        <div class="modal-skills-label">Habilidades abordadas</div>
        <div class="modal-skills">${skillsHtml}</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost btn-sm" onclick="closeModal()">Fechar</button>
        <button class="btn btn-primary" onclick="closeModal(); toast('Você será redirecionado para ${c.plataforma}!', 'success')">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Curso em ${c.plataforma}
        </button>
      </div>
    </div>
  `);
}

// ---- Job Modal ----
function showJobModal(jobId) {
  const v = VAGAS.find(x => x.id === jobId);
  if (!v) return;

  const skillsHtml = v.skills.map(s =>
    `<span class="tag" style="cursor:default">${s}</span>`
  ).join('');
  const reqHtml = v.requisitos.map(r => `<li>${r}</li>`).join('');
  const benHtml = v.beneficios.map(b => `<li>${b}</li>`).join('');

  const modalidadeIcon = { Remoto: 'fa-wifi', Presencial: 'fa-building', Híbrido: 'fa-shuffle' };
  const tipoColor = { CLT: 'badge-blue', Estágio: 'badge-green', PJ: 'badge-yellow', Trainee: 'badge-purple', Freelance: 'badge-gray' };

  openModal(`
    <div class="modal-box modal-lg">
      <div class="modal-header">
        <div>
          <span class="badge ${tipoColor[v.tipo] || 'badge-gray'}" style="margin-bottom:8px;display:inline-block">${v.tipo}</span>
          <h2 class="modal-title">${v.cargo}</h2>
        </div>
        <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div class="modal-job-company">
          <i class="fa-solid fa-building-user"></i> <strong>${v.empresa}</strong> &nbsp;·&nbsp;
          <i class="fa-solid fa-location-dot"></i> ${v.cidade} &nbsp;·&nbsp;
          <i class="fa-solid ${modalidadeIcon[v.modalidade] || 'fa-briefcase'}"></i> ${v.modalidade}
        </div>

        <div class="modal-section">
          <div class="modal-section-title">Sobre a vaga</div>
          <p class="modal-desc">${v.descricao}</p>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">Habilidades da vaga</div>
          <div class="modal-skills">${skillsHtml}</div>
        </div>

        <div class="grid-2" style="gap:20px;margin-top:20px">
          <div class="modal-section">
            <div class="modal-section-title">Requisitos</div>
            <ul class="modal-list">${reqHtml}</ul>
          </div>
          <div class="modal-section">
            <div class="modal-section-title">Benefícios</div>
            <ul class="modal-list benefits">${benHtml}</ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost btn-sm" onclick="closeModal()">Voltar</button>
        <button class="btn btn-primary" onclick="showApplyConfirm(${v.id})">
          <i class="fa-solid fa-paper-plane"></i> Candidatar-se
        </button>
      </div>
    </div>
  `);
}

// ---- Apply Confirmation ----
function showApplyConfirm(jobId) {
  const v = VAGAS.find(x => x.id === jobId);
  if (!v) return;
  closeModal();

  openModal(`
    <div class="modal-box" style="max-width:420px;text-align:center">
      <div class="modal-body" style="padding:32px 24px">
        <div class="confirm-icon"><i class="fa-solid fa-check"></i></div>
        <div class="confirm-text">
          <h3>Candidatura Enviada!</h3>
          <p>Sua candidatura para <strong>${v.cargo}</strong> na <strong>${v.empresa}</strong> foi registrada com sucesso. Boa sorte!</p>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:24px" onclick="closeModal()">
          <i class="fa-solid fa-thumbs-up"></i> Ótimo!
        </button>
      </div>
    </div>
  `);
}

// ---- Forgot Password Modal ----
function showForgotModal() {
  openModal(`
    <div class="modal-box" style="max-width:440px">
      <div class="modal-header">
        <h2 class="modal-title">Recuperar Senha</h2>
        <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:20px">
          Informe seu e-mail cadastrado e enviaremos as instruções de recuperação.
        </p>
        <div class="form-group">
          <label class="form-label">E-mail</label>
          <input type="email" class="form-input" id="forgot-email" placeholder="seu@email.com">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="submitForgot()">
          <i class="fa-solid fa-envelope"></i> Enviar instruções
        </button>
      </div>
    </div>
  `);
}

function submitForgot() {
  const email = document.getElementById('forgot-email')?.value;
  if (!email) return;
  closeModal();
  toast(`Instruções enviadas para ${email}`, 'success');
}

// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
