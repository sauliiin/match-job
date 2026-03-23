/* ===========================
   CarreiraMais — Empresa (Wizard)
   =========================== */

function pageEmpresa() {
  const setores = ['Tecnologia','Saúde','Educação','Varejo','Indústria','Financeiro','Logística','Agronegócio','Consultoria','Marketing e Comunicação','Construção Civil','Serviços','Outro'];
  const areasOptions = AREAS.map(a=>`<option value="${a}">${a}</option>`).join('');

  const tiposVaga = ['Estágio','Aprendiz','Trainee','CLT Júnior','CLT Pleno','PJ','Freelance'];
  const tiposHtml = tiposVaga.map(t=>`
    <label class="checkbox-item">
      <input type="checkbox" name="tipo-vaga" value="${t}">
      <label>${t}</label>
    </label>
  `).join('');

  const skillsHtml = Object.entries(SKILLS_CATEGORIES).map(([cat, skills]) => `
    <div class="skill-category">
      <h4>${cat}</h4>
      <div class="tags-row">
        ${skills.map(s=>`<span class="tag" onclick="toggleEmpresaSkill(this,'${s.replace(/'/g,"\\'")}')">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  return `
  <div class="empresa-wrapper">
    <!-- Stepper -->
    <div class="stepper" id="emp-stepper">
      <div class="stepper-item active" id="emp-step-ind-1">
        <div class="stepper-circle">1</div>
        <div class="stepper-label">Dados da Empresa</div>
      </div>
      <div class="stepper-item" id="emp-step-ind-2">
        <div class="stepper-circle">2</div>
        <div class="stepper-label">Perfis Buscados</div>
      </div>
    </div>

    <div class="wizard-card">

      <!-- Etapa 1 -->
      <div class="wizard-step active" id="emp-step-1">
        <h2 class="wizard-title">Dados da Empresa</h2>
        <p class="wizard-subtitle">Informe os dados da sua organização para cadastro na plataforma.</p>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Razão Social *</label>
            <input type="text" id="emp-razao" class="form-input" placeholder="Razão social">
            <div class="form-error" id="err-emp-razao">Campo obrigatório.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Nome Fantasia</label>
            <input type="text" id="emp-fantasia" class="form-input" placeholder="Nome fantasia">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">CNPJ *</label>
            <input type="text" id="emp-cnpj" class="form-input" placeholder="00.000.000/0001-00" maxlength="18" oninput="maskCNPJ(this)">
            <div class="form-error" id="err-emp-cnpj">CNPJ inválido.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Porte *</label>
            <select id="emp-porte" class="form-input form-select">
              <option value="">Selecione...</option>
              <option>MEI</option><option>Pequena</option><option>Média</option><option>Grande</option>
            </select>
            <div class="form-error" id="err-emp-porte">Selecione o porte.</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Setor de Atuação *</label>
          <select id="emp-setor" class="form-input form-select">
            <option value="">Selecione...</option>
            ${setores.map(s=>`<option>${s}</option>`).join('')}
          </select>
          <div class="form-error" id="err-emp-setor">Selecione o setor.</div>
        </div>
        <div class="form-group">
          <label class="form-label">Site Institucional</label>
          <input type="url" id="emp-site" class="form-input" placeholder="https://www.suaempresa.com.br">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">E-mail Corporativo *</label>
            <input type="email" id="emp-email" class="form-input" placeholder="rh@empresa.com.br">
            <div class="form-error" id="err-emp-email">E-mail inválido.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Telefone</label>
            <input type="tel" id="emp-tel" class="form-input" placeholder="(11) 9 0000-0000" maxlength="16" oninput="maskPhone(this)">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Cidade *</label>
            <input type="text" id="emp-cidade" class="form-input" placeholder="Cidade">
            <div class="form-error" id="err-emp-cidade">Campo obrigatório.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Estado *</label>
            <select id="emp-estado" class="form-input form-select">
              <option value="">UF</option>
              ${['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(e=>`<option>${e}</option>`).join('')}
            </select>
            <div class="form-error" id="err-emp-estado">Selecione o estado.</div>
          </div>
        </div>

        <div class="wizard-nav">
          <button class="btn btn-ghost" onclick="window.location.hash='home'">Cancelar</button>
          <button class="btn btn-primary" onclick="empNext()">Próximo <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!-- Etapa 2 -->
      <div class="wizard-step" id="emp-step-2">
        <h2 class="wizard-title">Perfis que Busca</h2>
        <p class="wizard-subtitle">Nos conte sobre os profissionais que sua empresa procura.</p>

        <div class="form-group">
          <label class="form-label">Áreas de interesse em candidatos</label>
          <select id="emp-areas" class="form-input form-select">
            <option value="">Selecione a principal área</option>
            ${areasOptions}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Tipos de vaga que costuma oferecer</label>
          <div class="checkbox-group">${tiposHtml}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Competências mais valorizadas</label>
          <p class="form-hint">Clique nas habilidades para selecionar.</p>
          <div class="skills-wrapper" id="empresa-skills-wrapper" style="max-height:300px;overflow-y:auto">${skillsHtml}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Descrição da cultura da empresa</label>
          <textarea id="emp-cultura" class="form-input" rows="4" placeholder="Descreva o ambiente de trabalho, valores, missão..."></textarea>
        </div>

        <div class="wizard-nav">
          <button class="btn btn-ghost" onclick="empBack()"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
          <button class="btn btn-secondary btn-lg" onclick="finalizarEmpresa()">
            <i class="fa-solid fa-building"></i> Cadastrar Empresa
          </button>
        </div>
      </div>

      <!-- Sucesso -->
      <div class="success-screen" id="empresa-success">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h2>Empresa cadastrada!</h2>
        <p>Bem-vinda ao CarreiraMais! Seu cadastro foi realizado com sucesso. Nossa equipe entrará em contato em breve para ativar sua conta empresarial.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:16px">
          <button class="btn btn-primary" onclick="window.location.hash='vagas'">
            <i class="fa-solid fa-briefcase"></i> Ver vagas da plataforma
          </button>
          <button class="btn btn-ghost" onclick="window.location.hash='home'">
            <i class="fa-solid fa-house"></i> Ir para Home
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

let empresaSkills = [];

function initEmpresa() {
  empresaSkills = [];
}

function empNext() {
  const razao   = document.getElementById('emp-razao')?.value.trim();
  const cnpj    = document.getElementById('emp-cnpj')?.value.trim();
  const porte   = document.getElementById('emp-porte')?.value;
  const setor   = document.getElementById('emp-setor')?.value;
  const email   = document.getElementById('emp-email')?.value.trim();
  const cidade  = document.getElementById('emp-cidade')?.value.trim();
  const estado  = document.getElementById('emp-estado')?.value;

  let ok = true;
  if (!razao)  { showEmpErr('razao');  ok = false; }
  if (!cnpj || cnpj.length < 14) { showEmpErr('cnpj');  ok = false; }
  if (!porte)  { showEmpErr('porte');  ok = false; }
  if (!setor)  { showEmpErr('setor');  ok = false; }
  if (!isValidEmail(email)) { showEmpErr('email'); ok = false; }
  if (!cidade) { showEmpErr('cidade'); ok = false; }
  if (!estado) { showEmpErr('estado'); ok = false; }
  if (!ok) return;

  document.getElementById('emp-step-1').classList.remove('active');
  document.getElementById('emp-step-2').classList.add('active');
  const ind = document.getElementById('emp-step-ind-1');
  ind.classList.remove('active'); ind.classList.add('done');
  ind.querySelector('.stepper-circle').innerHTML = '<i class="fa-solid fa-check"></i>';
  document.getElementById('emp-step-ind-2').classList.add('active');
}

function empBack() {
  document.getElementById('emp-step-2').classList.remove('active');
  document.getElementById('emp-step-1').classList.add('active');
  const ind = document.getElementById('emp-step-ind-1');
  ind.classList.remove('done'); ind.classList.add('active');
  ind.querySelector('.stepper-circle').textContent = '1';
  document.getElementById('emp-step-ind-2').classList.remove('active');
}

function showEmpErr(field) {
  const el = document.getElementById(`emp-${field}`);
  const err = document.getElementById(`err-emp-${field}`);
  if (el)  el.classList.add('invalid');
  if (err) err.classList.add('show');
}

function toggleEmpresaSkill(el, skill) {
  const idx = empresaSkills.indexOf(skill);
  if (idx === -1) { empresaSkills.push(skill); el.classList.add('selected'); }
  else             { empresaSkills.splice(idx,1); el.classList.remove('selected'); }
}

function finalizarEmpresa() {
  const tiposChecked = [...document.querySelectorAll('input[name="tipo-vaga"]:checked')].map(el=>el.value);

  const data = {
    razao:     document.getElementById('emp-razao')?.value,
    fantasia:  document.getElementById('emp-fantasia')?.value,
    cnpj:      document.getElementById('emp-cnpj')?.value,
    porte:     document.getElementById('emp-porte')?.value,
    setor:     document.getElementById('emp-setor')?.value,
    site:      document.getElementById('emp-site')?.value,
    email:     document.getElementById('emp-email')?.value,
    tel:       document.getElementById('emp-tel')?.value,
    cidade:    document.getElementById('emp-cidade')?.value,
    estado:    document.getElementById('emp-estado')?.value,
    areas:     document.getElementById('emp-areas')?.value,
    tipos:     tiposChecked,
    skills:    empresaSkills,
    cultura:   document.getElementById('emp-cultura')?.value
  };

  localStorage.setItem('cm_empresa', JSON.stringify(data));

  document.querySelectorAll('.wizard-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('emp-stepper').style.opacity = '.4';
  document.getElementById('empresa-success').classList.add('show');
}

function maskCNPJ(el) {
  let v = el.value.replace(/\D/g,'');
  v = v.replace(/^(\d{2})(\d)/,'$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/,'.$1/$2');
  v = v.replace(/(\d{4})(\d)/,'$1-$2');
  el.value = v;
}

function maskPhone(el) {
  let v = el.value.replace(/\D/g,'');
  if (v.length > 11) v = v.slice(0,11);
  if (v.length >= 11) v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/,'($1) $2 $3-$4');
  else if (v.length >= 10) v = v.replace(/^(\d{2})(\d{4})(\d{4})$/,'($1) $2-$3');
  el.value = v;
}

function initEmpresa() {
  empresaSkills = [];
}
