/* ===========================
   CarreiraMais — Cadastro (Wizard)
   =========================== */

function pageCadastro() {
  const areasOptions = AREAS.map(a => `<option value="${a}">${a}</option>`).join('');

  const skillsHtml = Object.entries(SKILLS_CATEGORIES).map(([cat, skills]) => `
    <div class="skill-category">
      <h4>${cat}</h4>
      <div class="tags-row">
        ${skills.map(s => `<span class="tag" onclick="toggleSkill(this,'${s.replace(/'/g,"\\'")}')">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  return `
  <div class="wizard-wrapper">
    <!-- Stepper -->
    <div class="stepper" id="stepper">
      <div class="stepper-item active" id="step-ind-1">
        <div class="stepper-circle">1</div>
        <div class="stepper-label">Dados Pessoais</div>
      </div>
      <div class="stepper-item" id="step-ind-2">
        <div class="stepper-circle">2</div>
        <div class="stepper-label">Formação</div>
      </div>
      <div class="stepper-item" id="step-ind-3">
        <div class="stepper-circle">3</div>
        <div class="stepper-label">Habilidades</div>
      </div>
    </div>

    <!-- Wizard Card -->
    <div class="wizard-card">

      <!-- Passo 1 -->
      <div class="wizard-step active" id="wizard-step-1">
        <h2 class="wizard-title">Dados Pessoais</h2>
        <p class="wizard-subtitle">Vamos começar com suas informações básicas.</p>

        <div class="form-group">
          <label class="form-label">Nome completo *</label>
          <input type="text" id="reg-nome" class="form-input" placeholder="Seu nome completo">
          <div class="form-error" id="err-nome">Informe seu nome completo.</div>
        </div>
        <div class="form-group">
          <label class="form-label">E-mail *</label>
          <input type="email" id="reg-email" class="form-input" placeholder="seu@email.com">
          <div class="form-error" id="err-email">Informe um e-mail válido.</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Senha *</label>
            <input type="password" id="reg-senha" class="form-input" placeholder="Mínimo 6 caracteres">
            <div class="form-error" id="err-senha">Mínimo de 6 caracteres.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmar senha *</label>
            <input type="password" id="reg-senha2" class="form-input" placeholder="Repita a senha">
            <div class="form-error" id="err-senha2">As senhas não conferem.</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Cidade *</label>
            <input type="text" id="reg-cidade" class="form-input" placeholder="Sua cidade">
            <div class="form-error" id="err-cidade">Informe sua cidade.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Estado *</label>
            <select id="reg-estado" class="form-input form-select">
              <option value="">Selecione...</option>
              ${['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(e=>`<option>${e}</option>`).join('')}
            </select>
            <div class="form-error" id="err-estado">Selecione seu estado.</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tipo de perfil *</label>
          <div class="radio-group" id="reg-perfil-group">
            <label class="radio-btn" onclick="selectRadio(this,'reg-perfil','Estudante')"><input type="radio" name="perfil" value="Estudante"> Estudante</label>
            <label class="radio-btn" onclick="selectRadio(this,'reg-perfil','Profissional Formado')"><input type="radio" name="perfil" value="Profissional Formado"> Profissional Formado</label>
            <label class="radio-btn" onclick="selectRadio(this,'reg-perfil','Em transição de carreira')"><input type="radio" name="perfil" value="Em transição de carreira"> Em transição de carreira</label>
          </div>
          <input type="hidden" id="reg-perfil">
          <div class="form-error" id="err-perfil">Selecione seu perfil.</div>
        </div>

        <div class="wizard-nav">
          <button class="btn btn-ghost" onclick="window.location.hash='home'">Cancelar</button>
          <button class="btn btn-primary" onclick="wizardNext(1)">Próximo <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Passo 2 -->
      <div class="wizard-step" id="wizard-step-2">
        <h2 class="wizard-title">Formação e Área</h2>
        <p class="wizard-subtitle">Conte-nos sobre sua formação e interesses profissionais.</p>

        <div class="form-group">
          <label class="form-label">Nível de escolaridade *</label>
          <select id="reg-escolaridade" class="form-input form-select">
            <option value="">Selecione...</option>
            <option>Ensino Médio</option>
            <option>Técnico</option>
            <option>Superior Incompleto</option>
            <option>Superior Completo</option>
            <option>Pós-graduação</option>
          </select>
          <div class="form-error" id="err-escolaridade">Selecione seu nível de escolaridade.</div>
        </div>
        <div class="form-group">
          <label class="form-label">Curso / Área de formação</label>
          <input type="text" id="reg-curso" class="form-input" placeholder="Ex: Ciência da Computação, Enfermagem...">
        </div>
        <div class="form-group">
          <label class="form-label">Área de interesse profissional *</label>
          <select id="reg-area" class="form-input form-select">
            <option value="">Selecione...</option>
            ${areasOptions}
          </select>
          <div class="form-error" id="err-area">Selecione sua área de interesse.</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Instituição de ensino</label>
            <input type="text" id="reg-instituicao" class="form-input" placeholder="Nome da instituição">
          </div>
          <div class="form-group">
            <label class="form-label">Ano de conclusão / Previsão</label>
            <input type="text" id="reg-ano" class="form-input" placeholder="Ex: 2024 ou 2026">
          </div>
        </div>

        <div class="wizard-nav">
          <button class="btn btn-ghost" onclick="wizardBack(2)"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
          <button class="btn btn-primary" onclick="wizardNext(2)">Próximo <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Passo 3 -->
      <div class="wizard-step" id="wizard-step-3">
        <h2 class="wizard-title">Competências e Habilidades</h2>
        <p class="wizard-subtitle">Clique nas habilidades para adicioná-las ao seu perfil.</p>

        <div class="skills-wrapper" id="skills-selector">
          ${skillsHtml}
        </div>

        <div class="custom-skill-row">
          <input type="text" id="custom-skill-input" class="form-input" placeholder="Adicionar outra habilidade...">
          <button class="btn btn-outline btn-sm" onclick="addCustomSkill()">
            <i class="fa-solid fa-plus"></i> Adicionar
          </button>
        </div>

        <div class="selected-preview">
          <h5><i class="fa-solid fa-check-circle" style="color:var(--secondary)"></i> Habilidades selecionadas (<span id="skill-count">0</span>)</h5>
          <div class="tags-row" id="selected-skills-preview"></div>
        </div>

        <div class="wizard-nav">
          <button class="btn btn-ghost" onclick="wizardBack(3)"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
          <button class="btn btn-secondary btn-lg" onclick="finalizarCadastro()">
            <i class="fa-solid fa-rocket"></i> Criar meu Perfil
          </button>
        </div>
      </div>

      <!-- Tela de sucesso -->
      <div class="success-screen" id="cadastro-success">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h2>Perfil criado com sucesso!</h2>
        <p>Bem-vindo ao CarreiraMais! Seu perfil está pronto e já temos recomendações esperando por você.</p>
        <button class="btn btn-primary btn-lg" id="go-dashboard-btn">
          <i class="fa-solid fa-gauge"></i> Acessar Dashboard
        </button>
      </div>
    </div>
  </div>
  `;
}

// ---- State ----
let selectedSkills = [];

function initCadastro() {
  selectedSkills = [];
  updateSelectedPreview();

  // Real-time validation
  const fields = ['nome','email','senha','senha2','cidade'];
  fields.forEach(f => {
    document.getElementById(`reg-${f}`)?.addEventListener('input', function() {
      validateRegField(f);
    });
  });
}

// ---- Validation ----
function validateRegField(field) {
  const val = document.getElementById(`reg-${field}`)?.value || '';
  const el  = document.getElementById(`reg-${field}`);
  let valid = false;

  switch (field) {
    case 'nome':   valid = val.trim().split(' ').length >= 2 && val.trim().length >= 4; break;
    case 'email':  valid = isValidEmail(val); break;
    case 'senha':  valid = val.length >= 6; break;
    case 'senha2': valid = val === (document.getElementById('reg-senha')?.value || ''); break;
    case 'cidade': valid = val.trim().length >= 2; break;
    default: valid = val.length > 0;
  }

  if (el) {
    el.classList.toggle('valid', valid);
    el.classList.toggle('invalid', !valid);
  }
  const err = document.getElementById(`err-${field}`);
  if (err) err.classList.toggle('show', !valid);
  return valid;
}

function wizardNext(step) {
  if (step === 1) {
    const n1 = validateRegField('nome');
    const n2 = validateRegField('email');
    const n3 = validateRegField('senha');
    const n4 = validateRegField('senha2');
    const n5 = validateRegField('cidade');
    const estado = document.getElementById('reg-estado').value;
    const perfil = document.getElementById('reg-perfil').value;

    if (!estado) {
      document.getElementById('err-estado').classList.add('show');
      document.getElementById('reg-estado').classList.add('invalid');
    }
    if (!perfil) document.getElementById('err-perfil').classList.add('show');

    if (!n1||!n2||!n3||!n4||!n5||!estado||!perfil) return;
  }
  if (step === 2) {
    const esc = document.getElementById('reg-escolaridade').value;
    const area = document.getElementById('reg-area').value;
    if (!esc) { document.getElementById('err-escolaridade').classList.add('show'); document.getElementById('reg-escolaridade').classList.add('invalid'); }
    if (!area){ document.getElementById('err-area').classList.add('show'); document.getElementById('reg-area').classList.add('invalid'); }
    if (!esc||!area) return;
  }

  document.getElementById(`wizard-step-${step}`).classList.remove('active');
  document.getElementById(`wizard-step-${step+1}`).classList.add('active');

  // Update stepper
  const ind = document.getElementById(`step-ind-${step}`);
  ind.classList.remove('active'); ind.classList.add('done');
  ind.querySelector('.stepper-circle').innerHTML = '<i class="fa-solid fa-check"></i>';
  document.getElementById(`step-ind-${step+1}`).classList.add('active');
}

function wizardBack(step) {
  document.getElementById(`wizard-step-${step}`).classList.remove('active');
  document.getElementById(`wizard-step-${step-1}`).classList.add('active');
  const ind = document.getElementById(`step-ind-${step-1}`);
  ind.classList.remove('done'); ind.classList.add('active');
  ind.querySelector('.stepper-circle').textContent = step - 1;
  document.getElementById(`step-ind-${step}`).classList.remove('active');
}

function selectRadio(label, hiddenId, value) {
  document.querySelectorAll(`[name="${hiddenId.replace('reg-','')}"]`).forEach(el => {
    el.closest('.radio-btn')?.classList.remove('selected');
  });
  label.classList.add('selected');
  document.getElementById(hiddenId).value = value;
  document.getElementById(`err-${hiddenId.replace('reg-','')}`).classList.remove('show');
}

// ---- Skills ----
function toggleSkill(tagEl, skill) {
  const idx = selectedSkills.indexOf(skill);
  if (idx === -1) {
    selectedSkills.push(skill);
    tagEl.classList.add('selected');
  } else {
    selectedSkills.splice(idx, 1);
    tagEl.classList.remove('selected');
  }
  updateSelectedPreview();
}

function addCustomSkill() {
  const input = document.getElementById('custom-skill-input');
  const skill = input.value.trim();
  if (!skill || selectedSkills.includes(skill)) return;
  selectedSkills.push(skill);
  input.value = '';
  updateSelectedPreview();
}

function updateSelectedPreview() {
  const count   = document.getElementById('skill-count');
  const preview = document.getElementById('selected-skills-preview');
  if (count)   count.textContent = selectedSkills.length;
  if (preview) preview.innerHTML = selectedSkills.length
    ? selectedSkills.map(s => `<span class="tag selected">${s}</span>`).join('')
    : '<span style="color:var(--text-muted);font-size:.875rem">Nenhuma selecionada ainda.</span>';
}

// ---- Finalizar ----
async function finalizarCadastro() {
  const submitBtn = document.querySelector('#wizard-step-3 .btn-secondary');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Criando perfil...';
  }

  const userData = {
    nome:        document.getElementById('reg-nome').value.trim(),
    email:       document.getElementById('reg-email').value.trim(),
    senha:       document.getElementById('reg-senha').value,
    cidade:      document.getElementById('reg-cidade').value.trim(),
    estado:      document.getElementById('reg-estado').value,
    perfil:      document.getElementById('reg-perfil').value,
    escolaridade:document.getElementById('reg-escolaridade').value,
    curso:       document.getElementById('reg-curso').value.trim(),
    area:        document.getElementById('reg-area').value,
    instituicao: document.getElementById('reg-instituicao').value.trim(),
    ano:         document.getElementById('reg-ano').value.trim(),
    skills:      [...selectedSkills],
    createdAt:   new Date().toISOString()
  };

  try {
    const createdUser = await createUserInFirebase(userData);
    saveUserSession(createdUser.userId, createdUser.user);
    refreshNavbar();
  } catch (error) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-rocket"></i> Criar meu Perfil';
    }
    toast(error.message || 'Não foi possível concluir o cadastro.', 'error');
    return;
  }

  // Hide all steps, show success
  document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
  document.getElementById('stepper').style.opacity = '.4';
  const success = document.getElementById('cadastro-success');
  success.classList.add('show');

  document.getElementById('go-dashboard-btn').onclick = () => {
    window.location.hash = 'dashboard';
  };
}

// Enter key on custom skill
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement?.id === 'custom-skill-input') {
    e.preventDefault();
    addCustomSkill();
  }
});
