/* ===========================
   CarreiraMais — Login Page
   =========================== */

function pageLogin() {
  return `
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo"><i class="fa-solid fa-rocket"></i></div>
        <h2>Bem-vindo de volta</h2>
        <p>Acesse sua conta para ver recomendações e vagas personalizadas</p>
      </div>

      <div id="login-alert"></div>

      <form id="login-form" onsubmit="submitLogin(event)" novalidate>
        <div class="form-group">
          <label class="form-label" for="login-email">E-mail</label>
          <input type="email" id="login-email" class="form-input" placeholder="seu@email.com" autocomplete="email">
          <div class="form-error" id="err-login-email">Informe um e-mail válido.</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="login-password">
            Senha
            <span class="forgot-link" onclick="showForgotModal()" style="float:right;font-weight:400">Esqueci a senha</span>
          </label>
          <div style="position:relative">
            <input type="password" id="login-password" class="form-input" placeholder="Sua senha" autocomplete="current-password">
            <button type="button" onclick="togglePasswordVisibility('login-password',this)"
              style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
          <div class="form-error" id="err-login-password">Informe sua senha.</div>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg" id="login-btn">
          <i class="fa-solid fa-right-to-bracket"></i> Entrar
        </button>
      </form>

      <div class="auth-footer">
        Não tem conta? <a href="#cadastro">Cadastre-se grátis</a>
      </div>
    </div>
  </div>
  `;
}

function initLogin() {
  // real-time validation
  document.getElementById('login-email')?.addEventListener('input', function() {
    validateField(this, isValidEmail(this.value), 'err-login-email');
  });
  document.getElementById('login-password')?.addEventListener('input', function() {
    validateField(this, this.value.length >= 1, 'err-login-password');
  });
}

async function submitLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const alertEl  = document.getElementById('login-alert');
  const btn      = document.getElementById('login-btn');

  let valid = true;
  if (!isValidEmail(email)) {
    validateField(document.getElementById('login-email'), false, 'err-login-email');
    valid = false;
  }
  if (!password) {
    validateField(document.getElementById('login-password'), false, 'err-login-password');
    valid = false;
  }
  if (!valid) return;

  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Entrando...';

  try {
    const result = await authenticateUserInFirebase(email, password);

    if (result) {
      saveUserSession(result.userId, result.user);
      toast(`Bem-vindo, ${result.user.nome?.split(' ')[0]}! 👋`, 'success');
      refreshNavbar();
      window.location.hash = 'dashboard';
    } else {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar';
      alertEl.innerHTML = `<div class="alert alert-error"><i class="fa-solid fa-circle-xmark"></i> E-mail ou senha incorretos. Verifique seus dados ou <a href="#cadastro">crie uma conta</a>.</div>`;
    }
  } catch (error) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar';
    alertEl.innerHTML = `<div class="alert alert-error"><i class="fa-solid fa-circle-xmark"></i> ${error.message || 'Não foi possível acessar sua conta agora.'}</div>`;
  }
}

function validateField(input, isValid, errorId) {
  input.classList.toggle('valid', isValid);
  input.classList.toggle('invalid', !isValid);
  const err = document.getElementById(errorId);
  if (err) err.classList.toggle('show', !isValid);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.innerHTML = isHidden
    ? '<i class="fa-regular fa-eye-slash"></i>'
    : '<i class="fa-regular fa-eye"></i>';
}
