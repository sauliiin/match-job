/* ===========================
   CarreiraMais — Firebase
   Auth + Realtime Database
   =========================== */

const firebaseConfig = {
  apiKey: 'AIzaSyB81J-a9i5ZMSnuEf0_E6B_fBmmf8r9bBo',
  authDomain: 'alien-bruin-339920.firebaseapp.com',
  databaseURL: 'https://alien-bruin-339920-default-rtdb.firebaseio.com',
  projectId: 'alien-bruin-339920',
  storageBucket: 'alien-bruin-339920.firebasestorage.app',
  messagingSenderId: '330511053030',
  appId: '1:330511053030:web:0526e66e56ef9782474b27'
};

const SESSION_CACHE_KEY = 'cm_session';

let firebaseDbInstance = null;
let firebaseAuthInstance = null;
let authReadyPromise = null;
let resolveAuthReady = null;
let authListenerBound = false;

function initFirebase() {
  if (firebaseDbInstance && firebaseAuthInstance) {
    return { db: firebaseDbInstance, auth: firebaseAuthInstance };
  }

  if (!window.firebase) {
    console.error('Firebase SDK não foi carregado.');
    return null;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebaseDbInstance = firebase.database();
  firebaseAuthInstance = firebase.auth();
  initFirebaseAuthListener();

  return { db: firebaseDbInstance, auth: firebaseAuthInstance };
}

function getFirebaseDb() {
  const services = initFirebase();
  if (!services?.db) throw new Error('Firebase Database indisponível no momento.');
  return services.db;
}

function getFirebaseAuth() {
  const services = initFirebase();
  if (!services?.auth) throw new Error('Firebase Auth indisponível no momento.');
  return services.auth;
}

function readSessionCache() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_CACHE_KEY));
  } catch {
    return null;
  }
}

function writeSessionCache(userId, user) {
  localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify({ userId, user }));
}

function clearSessionCache() {
  localStorage.removeItem(SESSION_CACHE_KEY);
}

function sanitizeUserRecord(record = {}) {
  const clean = { ...record };
  delete clean.passwordHash;
  delete clean.emailLower;
  return clean;
}

async function hashPassword(password = '') {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeAuthError(error, fallbackMessage) {
  const code = error?.code || '';
  const messages = {
    'auth/email-already-in-use': 'Já existe uma conta com este e-mail.',
    'auth/invalid-email': 'O e-mail informado é inválido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/network-request-failed': 'Falha de conexão ao falar com o Firebase.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente em alguns minutos.',
    'auth/requires-recent-login': 'Por segurança, faça login novamente antes de alterar este dado.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/operation-not-allowed': 'Login por e-mail/senha não está habilitado no Firebase Auth.'
  };

  return messages[code] || fallbackMessage || 'Ocorreu um erro ao acessar o Firebase.';
}

function buildUserProfile(authUser, userData = {}) {
  return {
    nome: userData.nome || authUser.displayName || (authUser.email ? authUser.email.split('@')[0] : 'Usuário'),
    email: authUser.email || userData.email || '',
    cidade: userData.cidade || '',
    estado: userData.estado || '',
    perfil: userData.perfil || '',
    escolaridade: userData.escolaridade || '',
    curso: userData.curso || '',
    area: userData.area || '',
    instituicao: userData.instituicao || '',
    ano: userData.ano || '',
    skills: Array.isArray(userData.skills) ? [...userData.skills] : [],
    createdAt: userData.createdAt || new Date().toISOString()
  };
}

async function findLegacyUserByEmail(email = '') {
  const normalizedEmail = email.trim().toLowerCase();
  const snapshot = await getFirebaseDb()
    .ref('users')
    .orderByChild('emailLower')
    .equalTo(normalizedEmail)
    .once('value');

  if (!snapshot.exists()) return null;

  const [legacyUserId, legacyUser] = Object.entries(snapshot.val())[0];
  return { legacyUserId, legacyUser };
}

async function loadUserProfile(userId) {
  const snapshot = await getFirebaseDb().ref(`users/${userId}`).once('value');
  if (!snapshot.exists()) return null;
  return sanitizeUserRecord(snapshot.val() || {});
}

async function ensureUserProfile(authUser, seedData = null) {
  const ref = getFirebaseDb().ref(`users/${authUser.uid}`);
  const snapshot = await ref.once('value');

  if (snapshot.exists()) {
    const user = sanitizeUserRecord(snapshot.val() || {});
    if (authUser.email && user.email !== authUser.email) {
      const patchedUser = {
        ...user,
        email: authUser.email,
        updatedAt: new Date().toISOString()
      };
      await ref.update({
        email: patchedUser.email,
        updatedAt: patchedUser.updatedAt
      });
      return patchedUser;
    }
    return user;
  }

  const profile = buildUserProfile(authUser, seedData || {});
  await ref.set(profile);
  return profile;
}

function initFirebaseAuthListener() {
  if (authListenerBound) return authReadyPromise || Promise.resolve();

  authListenerBound = true;
  authReadyPromise = new Promise(resolve => {
    resolveAuthReady = resolve;
  });

  getFirebaseAuth().onAuthStateChanged(async authUser => {
    try {
      if (!authUser) {
        clearSessionCache();
      } else {
        const userProfile = await ensureUserProfile(authUser);
        writeSessionCache(authUser.uid, userProfile);
      }
    } catch (error) {
      console.error('Falha ao sincronizar sessão do Firebase:', error);
      clearSessionCache();
    } finally {
      if (resolveAuthReady) {
        resolveAuthReady();
        resolveAuthReady = null;
      }

      if (typeof refreshNavbar === 'function') {
        refreshNavbar();
      }
    }
  });

  return authReadyPromise;
}

function waitForAuthReady() {
  initFirebase();
  return authReadyPromise || Promise.resolve();
}

async function createUserInFirebase(userData) {
  try {
    const credential = await getFirebaseAuth().createUserWithEmailAndPassword(userData.email, userData.senha);
    const authUser = credential.user;
    const profile = buildUserProfile(authUser, userData);

    await getFirebaseDb().ref(`users/${authUser.uid}`).set(profile);
    if (userData.nome) {
      try {
        await authUser.updateProfile({ displayName: userData.nome });
      } catch (error) {
        console.warn('Não foi possível sincronizar o nome no Auth:', error);
      }
    }

    writeSessionCache(authUser.uid, profile);
    return { userId: authUser.uid, user: profile };
  } catch (error) {
    throw new Error(normalizeAuthError(error, 'Não foi possível concluir o cadastro.'));
  }
}

async function tryMigrateLegacyUser(email, password) {
  const legacyResult = await findLegacyUserByEmail(email);
  if (!legacyResult?.legacyUser?.passwordHash) return null;

  const passwordHash = await hashPassword(password);
  if (legacyResult.legacyUser.passwordHash !== passwordHash) return null;

  try {
    const credential = await getFirebaseAuth().createUserWithEmailAndPassword(email, password);
    const migratedProfile = {
      ...sanitizeUserRecord(legacyResult.legacyUser),
      email,
      migratedAt: new Date().toISOString()
    };

    await getFirebaseDb().ref(`users/${credential.user.uid}`).set(migratedProfile);
    if (migratedProfile.nome) {
      try {
        await credential.user.updateProfile({ displayName: migratedProfile.nome });
      } catch (error) {
        console.warn('Não foi possível sincronizar o nome legado no Auth:', error);
      }
    }
    writeSessionCache(credential.user.uid, migratedProfile);
    return { userId: credential.user.uid, user: migratedProfile };
  } catch (error) {
    if (error?.code === 'auth/email-already-in-use') {
      return null;
    }
    throw new Error(normalizeAuthError(error, 'Não foi possível migrar a conta antiga.'));
  }
}

async function authenticateUserInFirebase(email, password) {
  try {
    const credential = await getFirebaseAuth().signInWithEmailAndPassword(email, password);
    const user = await ensureUserProfile(credential.user);

    writeSessionCache(credential.user.uid, user);
    return { userId: credential.user.uid, user };
  } catch (error) {
    const invalidCredentials = [
      'auth/invalid-credential',
      'auth/invalid-login-credentials',
      'auth/wrong-password',
      'auth/user-not-found'
    ];

    if (invalidCredentials.includes(error?.code)) {
      return await tryMigrateLegacyUser(email, password);
    }

    throw new Error(normalizeAuthError(error, 'Não foi possível acessar sua conta agora.'));
  }
}

async function updateUserInFirebase(userId, updates) {
  const authUser = getFirebaseAuth().currentUser;
  if (!authUser || authUser.uid !== userId) {
    throw new Error('Sua sessão expirou. Faça login novamente.');
  }

  const payload = { ...updates };

  try {
    if (payload.email && payload.email !== authUser.email) {
      await authUser.updateEmail(payload.email);
    }

    if (payload.nome && payload.nome !== authUser.displayName) {
      await authUser.updateProfile({ displayName: payload.nome });
    }

    await getFirebaseDb().ref(`users/${userId}`).update(payload);
    const updatedUser = await ensureUserProfile(authUser);
    writeSessionCache(userId, updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error(normalizeAuthError(error, 'Não foi possível atualizar o perfil.'));
  }
}

async function signOutUser() {
  clearSessionCache();
  await getFirebaseAuth().signOut();
}

async function createCompanyInFirebase(companyData) {
  const ref = getFirebaseDb().ref('companies').push();
  await ref.set(companyData);
  return ref.key;
}
