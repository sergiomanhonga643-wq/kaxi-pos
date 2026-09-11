/* ======================= Kaxi POS — App Logic ======================= */
const APP_VERSION = '2.1.2';

/* ---------- Storage layer ---------- */
const DB_KEY = 'kaxi_db_v1';
const SESSION_KEY = 'kaxi_session_v1';

function emptyDB(){
  return { stores:[], users:[], products:[], sales:[], cashSessions:[], clients:[], stockMoves:[], invoiceCounters:{}, pendingAuthorizations:[] };
}
let DB = loadDB();
function loadDB(){
  try{
    const raw = localStorage.getItem(DB_KEY);
    if(!raw) return emptyDB();
    return Object.assign(emptyDB(), JSON.parse(raw));
  }catch(e){ return emptyDB(); }
}
function saveDB(){
  localStorage.setItem(DB_KEY, JSON.stringify(DB));
  scheduleCloudPush();
}

const DEVICE_ID_KEY = 'kaxi_device_id';
function getDeviceId(){
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if(!id){ id = uid(); localStorage.setItem(DEVICE_ID_KEY, id); }
  return id;
}
const deviceId = getDeviceId();

function loadSession(){
  try{ return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }catch(e){ return null; }
}
function saveSession(s){ localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
function clearSession(){ localStorage.removeItem(SESSION_KEY); }

let SESSION = loadSession(); // {storeId, userId}

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

/* ======================= CLOUD SYNC (opcional, via Firebase) ======================= */
const SYNC_KEY = 'kaxi_sync_v1';
let firestoreDB = null;
let syncUnsub = null;
let applyingRemote = false;
let syncDebounceTimer = null;

function loadSyncConfig(){ try{ return JSON.parse(localStorage.getItem(SYNC_KEY) || 'null'); }catch(e){ return null; } }
function saveSyncConfig(cfg){ localStorage.setItem(SYNC_KEY, JSON.stringify(cfg)); }
function isSyncEnabled(){ const c = loadSyncConfig(); return !!(c && c.enabled && c.firebaseConfig); }

function loadFirebaseSDK(cb){
  if(window.firebase && window.firebase.firestore){ cb(); return; }
  const s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s1.onload = ()=>{
    const s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
    s2.onload = cb;
    s2.onerror = ()=> toast('Sem ligação à internet para ativar a sincronização');
    document.head.appendChild(s2);
  };
  s1.onerror = ()=> toast('Sem ligação à internet para ativar a sincronização');
  document.head.appendChild(s1);
}

function initSyncIfEnabled(){
  const cfg = loadSyncConfig();
  if(cfg && cfg.enabled && cfg.firebaseConfig){
    loadFirebaseSDK(()=>{
      try{
        if(!firebase.apps.length) firebase.initializeApp(cfg.firebaseConfig);
        firestoreDB = firebase.firestore();
        firestoreDB.enablePersistence({ synchronizeTabs:true }).catch(err=>{
          console.warn('Persistência offline não disponível:', err.code);
        });
        if(SESSION) subscribeStoreSync();
        updateSyncStatusBadge(true);
      }catch(e){
        console.error(e);
        toast('Erro ao ligar à sincronização — verifique a configuração');
        updateSyncStatusBadge(false);
      }
    });
  }else{
    updateSyncStatusBadge(false);
  }
}

function subscribeStoreSync(){
  if(!firestoreDB || !SESSION) return;
  if(syncUnsub){ syncUnsub(); syncUnsub = null; }
  syncUnsub = firestoreDB.collection('kaxi_stores').doc(SESSION.storeId).onSnapshot(doc=>{
    if(!doc.exists){ pushStoreToCloud(); return; }
    const data = doc.data();
    if(data._writer === deviceId) return; // ignore our own writes echoed back
    applyingRemote = true;
    mergeCloudIntoLocal(data);
    applyingRemote = false;
    rerenderCurrent();
  }, err=> console.error(err));
}

function mergeCloudIntoLocal(data){
  const sid = SESSION.storeId;
  DB.users = DB.users.filter(u=>u.storeId!==sid).concat(data.users||[]);
  DB.products = DB.products.filter(p=>p.storeId!==sid).concat(data.products||[]);
  DB.sales = DB.sales.filter(s=>s.storeId!==sid).concat(data.sales||[]);
  DB.cashSessions = DB.cashSessions.filter(c=>c.storeId!==sid).concat(data.cashSessions||[]);
  DB.clients = DB.clients.filter(c=>c.storeId!==sid).concat(data.clients||[]);
  DB.stockMoves = DB.stockMoves.filter(m=>m.storeId!==sid).concat(data.stockMoves||[]);
  DB.invoiceCounters[sid] = data.invoiceCounter || DB.invoiceCounters[sid] || 0;
  const store = DB.stores.find(s=>s.id===sid);
  if(store && data.name) store.name = data.name;
  localStorage.setItem(DB_KEY, JSON.stringify(DB));
}

function scheduleCloudPush(){
  if(applyingRemote || !isSyncEnabled() || !SESSION) return;
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(pushStoreToCloud, 500);
}

function pushStoreToCloud(){
  if(!firestoreDB || !SESSION || applyingRemote) return;
  const sid = SESSION.storeId;
  const store = DB.stores.find(s=>s.id===sid);
  const payload = {
    name: store ? store.name : '',
    users: DB.users.filter(u=>u.storeId===sid),
    products: DB.products.filter(p=>p.storeId===sid),
    sales: DB.sales.filter(s=>s.storeId===sid),
    cashSessions: DB.cashSessions.filter(c=>c.storeId===sid),
    clients: DB.clients.filter(c=>c.storeId===sid),
    stockMoves: DB.stockMoves.filter(m=>m.storeId===sid),
    invoiceCounter: DB.invoiceCounters[sid] || 0,
    _ts: Date.now(), _writer: deviceId
  };
  firestoreDB.collection('kaxi_stores').doc(sid).set(payload).catch(e=> console.error(e));
}

function rerenderCurrent(){
  if(!SESSION) return;
  if(document.getElementById('main-app').classList.contains('hidden')) return;
  navigate(currentScreen);
}

function updateSyncStatusBadge(){
  const dot = document.getElementById('sync-status-dot');
  const label = document.getElementById('sync-status-label');
  if(!dot || !label) return;
  const enabled = isSyncEnabled();
  dot.classList.remove('on','warn');
  if(!enabled){
    label.textContent = 'Sincronização desativada — dados guardados apenas neste aparelho';
    return;
  }
  if(navigator.onLine){
    dot.classList.add('on');
    label.textContent = 'Sincronização ativa — funciona online e offline, e atualiza sozinha entre aparelhos';
  }else{
    dot.classList.add('warn');
    label.textContent = 'Sem internet agora — continua a funcionar normalmente e sincroniza sozinho assim que voltar';
  }
}

window.addEventListener('online', ()=>{
  updateSyncStatusBadge();
  if(isSyncEnabled()){
    toast('Ligado à internet — a sincronizar automaticamente...');
    pushStoreToCloud();
  }
});
window.addEventListener('offline', ()=> updateSyncStatusBadge());

/* ---------- Backup / Restore / Wipe ---------- */
function downloadBackup(){
  const dataStr = JSON.stringify(DB, null, 2);
  const blob = new Blob([dataStr], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `kaxi-backup-${todayStr()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

async function shareBackup(){
  const dataStr = JSON.stringify(DB, null, 2);
  const blob = new Blob([dataStr], { type:'application/json' });
  const file = new File([blob], `kaxi-backup-${todayStr()}.json`, { type:'application/json' });
  if(navigator.canShare && navigator.canShare({ files:[file] })){
    try{
      await navigator.share({ files:[file], title:'Cópia de segurança Kaxi POS', text:'Cópia de segurança dos dados da loja' });
    }catch(e){ /* user cancelled */ }
  }else{
    downloadBackup();
    toast('Este aparelho não permite partilha direta. O ficheiro foi descarregado — envie-o pelo WhatsApp manualmente.');
  }
}

function restoreBackupFromFile(file){
  const reader = new FileReader();
  reader.onload = (e)=>{
    try{
      const imported = JSON.parse(e.target.result);
      if(!confirm('Restaurar esta cópia de segurança? Os dados atuais neste aparelho serão substituídos.')) return;
      DB = Object.assign(emptyDB(), imported);
      localStorage.setItem(DB_KEY, JSON.stringify(DB));
      toast('Dados restaurados com sucesso');
      setTimeout(()=> window.location.reload(), 800);
    }catch(err){ toast('Ficheiro inválido ou corrompido'); }
  };
  reader.readAsText(file);
}

function wipeAllData(){
  if(!confirm('Isto vai apagar TODOS os dados (produtos, vendas, clientes, funcionários, lojas). Esta ação não pode ser desfeita. Deseja continuar?')) return;
  if(!confirm('Tem a certeza absoluta? Todos os dados serão perdidos para sempre.')) return;
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SYNC_KEY);
  window.location.reload();
}

/* ---------- Helpers ---------- */
function formatKz(n){
  n = Number(n) || 0;
  const parts = n.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts[0] + ',' + parts[1] + ' Kz';
}
function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT') + ' ' + d.toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'});
}
function todayStr(){ return new Date().toISOString().slice(0,10); }

function normalizePhone(phone){
  let digits = String(phone||'').replace(/\D/g,'');
  if(digits.startsWith('00')) digits = digits.slice(2);
  if(digits.length === 9) digits = '244' + digits; // assume Angola local number
  return digits;
}
function waLink(phone, text){
  const digits = normalizePhone(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
function openWhatsApp(phone, text){
  if(!phone){ toast('Este contacto não tem número de WhatsApp registado'); return; }
  window.open(waLink(phone, text), '_blank');
}
function isSameDay(iso, dayStr){ return iso.slice(0,10) === dayStr; }
function startOfWeek(){
  const d = new Date(); const day = d.getDay() || 7;
  if(day !== 1) d.setHours(-24*(day-1));
  d.setHours(0,0,0,0); return d;
}
function startOfMonth(){ const d = new Date(); d.setDate(1); d.setHours(0,0,0,0); return d; }

function toast(msg, ms=2400){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.add('hidden'), ms);
}

function currentStore(){ return DB.stores.find(s=>s.id === SESSION.storeId); }
function currentUser(){ return DB.users.find(u=>u.id === SESSION.userId); }
function storeUsers(){ return DB.users.filter(u=>u.storeId === SESSION.storeId); }
function storeProducts(){ return DB.products.filter(p=>p.storeId === SESSION.storeId); }
function storeSales(){ return DB.sales.filter(s=>s.storeId === SESSION.storeId); }
function storeClients(){ return DB.clients.filter(c=>c.storeId === SESSION.storeId); }
function storeAuthorizations(){ return DB.pendingAuthorizations.filter(a=>a.storeId === SESSION.storeId); }

function nextInvoiceNumber(storeId){
  DB.invoiceCounters[storeId] = (DB.invoiceCounters[storeId] || 0) + 1;
  return DB.invoiceCounters[storeId];
}

const PERMISSIONS = {
  caixa:   ['home','vendas','caixa','mais','vendas-hoje','contactos'],
  gerente: ['home','vendas','caixa','mais','produtos','estoque','clientes','config','vendas-hoje','contactos','autorizacoes'],
  dono:    ['home','vendas','caixa','mais','produtos','estoque','clientes','relatorios','config','faturas','vendas-hoje','contactos','autorizacoes']
};
function can(screen){
  const u = currentUser();
  if(!u) return false;
  return PERMISSIONS[u.role].includes(screen);
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', boot);

// Configuração embutida — liga automaticamente à mesma nuvem em qualquer aparelho, sem configuração manual
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDD39U_mG14neakozm5abmxFR5IQ-_28UQ",
  authDomain: "kaxi-pos-vsmj.firebaseapp.com",
  projectId: "kaxi-pos-vsmj",
  storageBucket: "kaxi-pos-vsmj.firebasestorage.app",
  messagingSenderId: "169313257460",
  appId: "1:169313257460:web:36102e64a07e13c3e41ba1"
};
const DEV_CODE = 'KAXIDEV2026';
const STORE_UNLOCK_CODE = 'NOVALOJA2026';

function ensureDefaultSyncConfig(){
  const existing = loadSyncConfig();
  if(!existing || !existing.firebaseConfig){
    saveSyncConfig({ enabled:true, firebaseConfig: DEFAULT_FIREBASE_CONFIG });
  }
}

function initFirestoreOnly(){
  return new Promise((resolve)=>{
    const cfg = loadSyncConfig();
    if(!cfg || !cfg.enabled || !cfg.firebaseConfig){ resolve(null); return; }
    let done = false;
    const finish = (val)=>{ if(done) return; done = true; resolve(val); };
    setTimeout(()=> finish(null), 18000); // avoid hanging forever on very slow connections
    loadFirebaseSDK(()=>{
      try{
        if(!firebase.apps.length) firebase.initializeApp(cfg.firebaseConfig);
        firestoreDB = firebase.firestore();
        firestoreDB.enablePersistence({ synchronizeTabs:true }).catch(()=>{});
        finish(firestoreDB);
      }catch(e){ console.error(e); finish(null); }
    });
  });
}

function fetchAllCloudStores(){
  return new Promise((resolve)=>{
    if(!firestoreDB){ resolve(null); return; } // null = could not check (not the same as "confirmed empty")
    let done = false;
    const finish = (val)=>{ if(done) return; done = true; resolve(val); };
    setTimeout(()=> finish(null), 18000);
    firestoreDB.collection('kaxi_stores').get().then(snap=>{
      const results = [];
      snap.forEach(doc=> results.push({ id: doc.id, data: doc.data() }));
      finish(results);
    }).catch(e=>{ console.error(e); finish(null); });
  });
}

function mergeCloudStoreIntoLocal(id, data){
  const existingStore = DB.stores.find(s=>s.id===id);
  if(existingStore){ existingStore.name = data.name; existingStore.logo = data.logo; existingStore.whatsapp = data.whatsapp; }
  else DB.stores.push({ id, name:data.name, logo:data.logo, whatsapp:data.whatsapp });
  DB.users = DB.users.filter(u=>u.storeId!==id).concat(data.users||[]);
  DB.products = DB.products.filter(p=>p.storeId!==id).concat(data.products||[]);
  DB.sales = DB.sales.filter(s=>s.storeId!==id).concat(data.sales||[]);
  DB.cashSessions = DB.cashSessions.filter(c=>c.storeId!==id).concat(data.cashSessions||[]);
  DB.clients = DB.clients.filter(c=>c.storeId!==id).concat(data.clients||[]);
  DB.stockMoves = DB.stockMoves.filter(m=>m.storeId!==id).concat(data.stockMoves||[]);
  DB.invoiceCounters[id] = data.invoiceCounter || DB.invoiceCounters[id] || 0;
}

async function boot(){
  registerSW();
  wireGlobalEvents();
  ensureDefaultSyncConfig();
  document.getElementById('restore-file-input').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file) restoreBackupFromFile(file);
    e.target.value = '';
  });

  showRoot('loading');
  await initFirestoreOnly();

  if(PROGRAMMER_SESSION && firestoreDB){
    enterProgrammerDashboard();
    return;
  }

  const cloudStores = await fetchAllCloudStores();
  if(cloudStores && cloudStores.length){
    cloudStores.forEach(({id, data})=> mergeCloudStoreIntoLocal(id, data));
    localStorage.setItem(DB_KEY, JSON.stringify(DB));
  }

  if(DB.stores.length === 0){
    if(cloudStores === null){
      // Não foi possível confirmar se existem lojas na nuvem (internet lenta/instável) —
      // nunca assumir que está vazio nesse caso, para não mandar ninguém para a tela errada.
      document.getElementById('loading-text').textContent = 'Não foi possível ligar à nuvem. Verifique a sua internet e tente novamente.';
      document.getElementById('loading-retry-btn').classList.remove('hidden');
      return;
    }
    showRoot('onboarding');
    return;
  }
  if(SESSION && DB.users.find(u=>u.id===SESSION.userId && u.storeId===SESSION.storeId)){
    enterApp();
  }else{
    showRoot('login');
    renderLogin();
  }
}

function showRoot(which){
  document.getElementById('screen-loading').classList.toggle('hidden', which!=='loading');
  document.getElementById('screen-onboarding').classList.toggle('hidden', which!=='onboarding');
  document.getElementById('screen-login').classList.toggle('hidden', which!=='login');
  document.getElementById('screen-programmer').classList.toggle('hidden', which!=='programmer');
  document.getElementById('main-app').classList.toggle('hidden', which!=='app');
}

function enterApp(){
  showRoot('app');
  if(firestoreDB) subscribeStoreSync();
  navigate('home');
  checkEndOfDay();
}

/* ---------- Onboarding (programador apenas) ---------- */
document.getElementById('dev-gate-link').addEventListener('click', ()=>{
  document.getElementById('dev-gate-code').classList.remove('hidden');
});
document.getElementById('dev-code-submit').addEventListener('click', ()=>{
  const code = document.getElementById('dev-code-input').value.trim();
  if(code === DEV_CODE){
    document.getElementById('dev-gate').classList.add('hidden');
    document.getElementById('form-onboarding').classList.remove('hidden');
  }else{
    toast('Código de programador inválido');
  }
});
document.getElementById('loading-retry-btn').addEventListener('click', ()=> window.location.reload());
document.getElementById('form-onboarding').addEventListener('submit', function(e){
  e.preventDefault();
  const storeName = document.getElementById('ob-store-name').value.trim();
  const ownerName = document.getElementById('ob-owner-name').value.trim();
  const code = document.getElementById('ob-owner-code').value.trim();
  if(!storeName || !ownerName || code.length < 4){ toast('Preencha todos os campos (código com pelo menos 4 dígitos)'); return; }
  const storeId = uid();
  const userId = uid();
  DB.stores.push({ id:storeId, name:storeName, createdAt:new Date().toISOString() });
  DB.users.push({ id:userId, storeId, name:ownerName, role:'dono', code });
  saveDB();
  writeStoreDirectoryEntry(storeId, storeName, ownerName);
  SESSION = { storeId, userId };
  saveSession(SESSION);
  toast('Loja criada com sucesso!');
  enterApp();
});

function writeStoreDirectoryEntry(storeId, storeName, ownerName){
  if(!firestoreDB) return;
  firestoreDB.collection('kaxi_stores_directory').doc(storeId).set({
    name: storeName, ownerName: ownerName, createdAt: new Date().toISOString()
  }).catch(e=> console.error(e));
}

/* ---------- Login ---------- */
let loginSelectedStoreId = null;
let pinBuffer = '';

function renderLogin(){
  const stores = DB.stores;
  const picker = document.getElementById('login-store-picker');
  const switchBtn = document.getElementById('btn-switch-store');
  if(stores.length > 1){
    loginSelectedStoreId = loginSelectedStoreId || (SESSION && SESSION.storeId) || null;
    if(!loginSelectedStoreId){
      picker.classList.remove('hidden');
      picker.innerHTML = stores.map(s=>`<button type="button" class="store-pick-item" data-store="${s.id}"><span class="dot"></span>${escapeHtml(s.name)}</button>`).join('');
      document.getElementById('form-login').classList.add('hidden');
      picker.querySelectorAll('.store-pick-item').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          loginSelectedStoreId = btn.dataset.store;
          renderLogin();
        });
      });
      document.getElementById('login-store-name').textContent = 'Kaxi POS';
      return;
    }
    switchBtn.classList.remove('hidden');
  } else {
    loginSelectedStoreId = stores[0].id;
    switchBtn.classList.add('hidden');
  }
  picker.classList.add('hidden');
  document.getElementById('form-login').classList.remove('hidden');
  const store = stores.find(s=>s.id===loginSelectedStoreId);
  document.getElementById('login-store-name').textContent = store ? store.name : 'Kaxi POS';
  const brandLogoEl = document.querySelector('#screen-login .brand-logo');
  if(store && store.logo){ brandLogoEl.innerHTML = `<img src="${store.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:20px">`; }
  else{ brandLogoEl.textContent = 'K'; }
  pinBuffer = '';
  updatePinDots();
  document.getElementById('login-error').classList.add('hidden');
  setTimeout(()=>{ try{ loginCodeInput.focus(); }catch(e){} }, 200);
}

document.getElementById('btn-switch-
