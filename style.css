:root{
  --bg: #0B0E1A;
  --bg-elev: #131729;
  --card: #161B2E;
  --card-2: #1B2036;
  --border: #262c47;
  --text: #F5F6FA;
  --text-dim: #9AA0B4;
  --purple-1: #6C5CE7;
  --purple-2: #4834D4;
  --blue-2: #4F5BD5;
  --violet-2: #7B2FF7;
  --green: #2ECC71;
  --red: #FF5C5C;
  --amber: #F5A623;
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 10px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

*{box-sizing:border-box; -webkit-tap-highlight-color:transparent;}
html,body{height:100%;}
body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:'Inter', -apple-system, sans-serif;
  overflow:hidden;
  overscroll-behavior:none;
}
h1,h2,h3{font-family:'Plus Jakarta Sans', 'Inter', sans-serif; margin:0;}
a{color:inherit; text-decoration:none;}
button{font-family:inherit; cursor:pointer;}
input,select{font-family:inherit;}
.hidden{display:none !important;}
.muted{color:var(--text-dim); font-size:13px;}
.center{text-align:center;}

#app{
  max-width:480px;
  margin:0 auto;
  height:100dvh;
  position:relative;
  background:var(--bg);
  display:flex;
  flex-direction:column;
}

/* ---------- ONBOARDING / LOGIN ---------- */
.onboard-wrap, .login-wrap{
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:28px;
  overflow-y:auto;
}
.brand-mark{text-align:center; margin-bottom:28px;}
.brand-logo{
  width:64px; height:64px; margin:0 auto 14px;
  border-radius:20px;
  background:linear-gradient(135deg, var(--purple-1), var(--violet-2));
  display:flex; align-items:center; justify-content:center;
  font-size:28px; font-weight:800; color:#fff;
  box-shadow:0 8px 24px rgba(108,92,231,0.4);
}
.brand-mark h1{font-size:22px; font-weight:700;}
.card{
  background:var(--card);
  border-radius:var(--radius-lg);
  border:1px solid var(--border);
}
.form-card{
  padding:24px;
  display:flex;
  flex-direction:column;
  gap:14px;
}
.form-card h2{font-size:17px; margin-bottom:4px;}
.form-card label{
  display:flex; flex-direction:column; gap:6px;
  font-size:13px; color:var(--text-dim); font-weight:500;
}
.form-card input, .form-card select{
  background:var(--bg-elev);
  border:1px solid var(--border);
  color:var(--text);
  padding:13px 14px;
  border-radius:var(--radius-sm);
  font-size:15px;
  outline:none;
}
.form-card input:focus, .form-card select:focus{border-color:var(--purple-1);}
.two-col{display:grid; grid-template-columns:1fr 1fr; gap:12px;}

.btn-primary{
  background:linear-gradient(135deg, var(--purple-1), var(--violet-2));
  color:#fff; border:none; padding:15px; border-radius:var(--radius-sm);
  font-weight:700; font-size:15px; width:100%;
  box-shadow:0 6px 18px rgba(108,92,231,0.35);
}
.btn-primary:disabled{opacity:0.4; box-shadow:none;}
.btn-secondary{
  background:var(--card-2); color:var(--text); border:1px solid var(--border);
  padding:12px 16px; border-radius:var(--radius-sm); font-weight:600; font-size:14px;
}
.btn-ghost{
  background:transparent; color:var(--text-dim); border:1px solid var(--border);
  padding:14px; border-radius:var(--radius-sm); font-weight:600; width:100%; font-size:14px;
}
.btn-ghost.small{width:auto; padding:8px 14px; font-size:13px;}
.btn-danger{
  background:rgba(255,92,92,0.12); color:var(--red); border:1px solid rgba(255,92,92,0.3);
  padding:14px; border-radius:var(--radius-sm); font-weight:700; width:100%;
}

.pin-dots{display:flex; justify-content:center; gap:14px; margin:4px 0; position:relative;}
.pin-dots span{width:14px; height:14px; border-radius:50%; border:2px solid var(--border); background:transparent; transition:all .15s;}
.pin-dots span.filled{background:var(--purple-1); border-color:var(--purple-1);}
.pin-input{
  position:absolute; inset:-16px; opacity:0; border:none; background:none; padding:0; margin:0;
  font-size:16px; cursor:pointer;
}
.error-text{color:var(--red); font-size:13px; text-align:center;}
.store-picker{display:flex; flex-direction:column; gap:10px; margin-bottom:18px;}
.store-pick-item{
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:16px; display:flex; align-items:center; gap:12px; font-weight:600;
}
.store-pick-item .dot{width:10px;height:10px;border-radius:50%;background:var(--purple-1);}

/* ---------- MAIN APP LAYOUT ---------- */
#main-app{flex:1; display:flex; flex-direction:column; height:100%; position:relative;}
.screen{
  flex:1;
  overflow-y:auto;
  padding-bottom:calc(90px + var(--safe-bottom));
  -webkit-overflow-scrolling:touch;
}
#screen-vendas{display:flex; flex-direction:column;}

.topbar{
  display:flex; justify-content:space-between; align-items:center;
  padding:20px 20px 8px;
}
.greet{color:var(--text-dim); font-size:13px; margin:0 0 2px;}
.topbar h1{font-size:22px;}
.avatar{
  width:42px; height:42px; border-radius:14px;
  background:linear-gradient(135deg, var(--purple-1), var(--blue-2));
  display:flex; align-items:center; justify-content:center; font-weight:700;
}

.subbar{
  display:flex; align-items:center; justify-content:space-between;
  padding:18px 14px; position:sticky; top:0; background:var(--bg); z-index:5;
  border-bottom:1px solid var(--border);
}
.subbar h2{font-size:17px;}
.subbar.dark{background:#000;}
.back-btn, .icon-btn{
  background:var(--card); border:1px solid var(--border); color:var(--text);
  width:38px; height:38px; border-radius:12px; font-size:18px;
  display:flex; align-items:center; justify-content:center;
}

.balance-card{
  margin:14px 20px; padding:22px; border-radius:var(--radius-lg); position:relative; overflow:hidden;
}
.grad-purple{background:linear-gradient(135deg, var(--blue-2), var(--violet-2));}
.grad-red{background:linear-gradient(135deg, #FF5C5C, #C0392B);}
.label-on-grad{color:rgba(255,255,255,0.8); font-size:13px; margin:0 0 6px;}
.balance-card h2{color:#fff; font-size:30px; margin-bottom:6px;}
.sub-on-grad{color:rgba(255,255,255,0.85); font-size:13px; margin:0;}

.quick-actions{
  display:grid; grid-template-columns:repeat(4,1fr); gap:10px; padding:6px 20px 4px;
}
.qa{
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:14px 6px; display:flex; flex-direction:column; align-items:center; gap:8px;
  color:var(--text); font-size:12px; font-weight:600;
}
.qa-icon{width:26px; height:26px; border-radius:9px; display:block; background:var(--purple-1);}
.icon-sale{background:linear-gradient(135deg,#6C5CE7,#4834D4);}
.icon-cash{background:linear-gradient(135deg,#2ECC71,#16A085);}
.icon-box{background:linear-gradient(135deg,#F5A623,#E67E22);}
.icon-more{background:linear-gradient(135deg,#4F5BD5,#7B2FF7);}
.icon-home{background:linear-gradient(135deg,#6C5CE7,#4834D4);}

.section-block{padding:16px 20px 4px;}
.section-head{display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;}
.section-head h3{font-size:15px;}
.see-all{color:var(--purple-1); font-size:13px; font-weight:600;}

.stat-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:10px;}
.stat-tile{
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:14px 10px; text-align:center; display:flex; flex-direction:column; gap:4px;
}
.stat-tile.warn{border-color:rgba(245,166,35,0.4);}
.stat-num{font-size:18px; font-weight:800;}
.stat-lbl{font-size:11px; color:var(--text-dim);}

.list-card{margin:0 20px 16px; display:flex; flex-direction:column; gap:2px;}
.list-row{
  background:var(--card); border:1px solid var(--border);
  padding:14px; display:flex; align-items:center; gap:12px; margin-bottom:8px; border-radius:var(--radius-md);
}
.list-row:last-child{margin-bottom:0;}
.row-icon{
  width:40px; height:40px; border-radius:12px; flex-shrink:0;
  background:var(--card-2); display:flex; align-items:center; justify-content:center; font-size:18px;
  object-fit:cover; overflow:hidden;
}
.row-icon img{width:100%; height:100%; object-fit:cover; border-radius:12px;}
.row-main{flex:1; min-width:0;}
.row-title{font-weight:600; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.row-sub{font-size:12px; color:var(--text-dim);}
.row-amount{font-weight:700; font-size:14px; white-space:nowrap;}
.row-amount.pos{color:var(--green);}
.row-amount.neg{color:var(--red);}
.row-amount.warn{color:var(--amber);}
.empty-inline{text-align:center; padding:30px 10px; color:var(--text-dim); font-size:13px;}

.empty-state{text-align:center; padding:60px 30px; color:var(--text-dim);}
.empty-state p{font-weight:600; color:var(--text); margin-bottom:6px;}

/* ---------- BOTTOM NAV ---------- */
.bottom-nav{
  position:absolute; bottom:0; left:0; right:0;
  display:flex; background:var(--bg-elev); border-top:1px solid var(--border);
  padding:10px 6px calc(10px + var(--safe-bottom));
  z-index:20;
}
.nav-item{
  flex:1; background:none; border:none; color:var(--text-dim);
  display:flex; flex-direction:column; align-items:center; gap:5px; font-size:11px; font-weight:600;
}
.nav-item.active{color:var(--purple-1);}
.nav-icon{width:22px; height:22px; border-radius:7px; background:var(--border); display:block;}
.nav-item.active .nav-icon{background:linear-gradient(135deg, var(--purple-1), var(--violet-2));}

/* ---------- VENDAS / POS ---------- */
.scan-entry{display:flex; gap:8px; padding:14px 20px;}
.scan-entry input{
  flex:1; background:var(--card); border:1px solid var(--border); color:var(--text);
  padding:13px 14px; border-radius:var(--radius-sm); font-size:14px; outline:none;
}
.quickpick-grid{
  display:grid; grid-template-columns:repeat(4,1fr); gap:10px; padding:4px 20px 14px;
}
.qp-item{
  display:flex; flex-direction:column; align-items:center; gap:6px; background:none; border:none; color:var(--text);
}
.qp-bubble{
  width:52px; height:52px; border-radius:16px; background:linear-gradient(135deg, var(--purple-1), var(--blue-2));
  display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px; color:#fff; overflow:hidden;
}
.qp-bubble img{width:100%; height:100%; object-fit:cover;}
.qp-label{font-size:10.5px; color:var(--text-dim); text-align:center; max-width:64px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}

.search-results{padding:0 20px;}
.search-result-item{
  background:var(--card-2); border:1px solid var(--border); border-radius:var(--radius-sm);
  padding:12px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;
}
.cart-list{flex:1; overflow-y:auto; padding:0 20px;}
.cart-item{
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:12px; display:flex; align-items:center; gap:12px; margin-bottom:8px;
}
.cart-item .row-main{flex:1;}
.qty-control{display:flex; align-items:center; gap:8px;}
.qty-btn{
  width:28px; height:28px; border-radius:8px; border:1px solid var(--border);
  background:var(--card-2); color:var(--text); font-size:16px; display:flex; align-items:center; justify-content:center;
}
.qty-val{min-width:20px; text-align:center; font-weight:700;}
.cart-item-remove{color:var(--red); font-size:13px; font-weight:600; background:none; border:none; margin-left:6px;}

.pos-footer{
  padding:14px 20px calc(14px + var(--safe-bottom));
  border-top:1px solid var(--border); background:var(--bg-elev);
  position:sticky; bottom:0; z-index:15; box-shadow:0 -6px 20px rgba(0,0,0,0.35);
}
.pos-total-row{display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:15px;}
.pos-total-row strong{font-size:22px;}

/* ---------- SCANNER ---------- */
.scanner-screen{background:#000; display:flex; flex-direction:column; padding-bottom:0 !important;}
#qr-reader{flex:1; background:#000;}
#qr-reader video{width:100% !important; height:100% !important; object-fit:cover;}
.scan-hint{text-align:center; color:#ccc; font-size:13px; padding:14px;}
.scanner-manual{display:flex; gap:8px; padding:0 16px 20px;}
.scanner-manual input{
  flex:1; background:#111; border:1px solid #333; color:#fff; padding:12px; border-radius:10px;
}

/* ---------- MODAL ---------- */
.modal{
  position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:50;
  display:flex; align-items:flex-end;
}
.modal-sheet{
  background:var(--bg-elev); width:100%; border-radius:24px 24px 0 0;
  padding:20px 22px calc(20px + var(--safe-bottom)); max-height:88vh; overflow-y:auto;
  border-top:1px solid var(--border);
}
.modal-sheet.small{border-radius:24px; margin:auto 16px; max-width:400px;}
.modal-handle{width:40px; height:4px; background:var(--border); border-radius:4px; margin:0 auto 14px;}
.modal-sheet h2{font-size:18px; margin-bottom:16px;}
.modal-sheet form{display:flex; flex-direction:column; gap:14px;}
.modal-sheet label{display:flex; flex-direction:column; gap:6px; font-size:13px; color:var(--text-dim); font-weight:500;}
.modal-sheet input, .modal-sheet select{
  background:var(--card); border:1px solid var(--border); color:var(--text);
  padding:13px 14px; border-radius:var(--radius-sm); font-size:15px; outline:none;
}
.modal-actions{display:flex; gap:10px; margin-top:6px;}
.modal-actions button{flex:1;}

.checkout-total{
  background:var(--card); border-radius:var(--radius-md); padding:16px; margin-bottom:16px;
  display:flex; justify-content:space-between; align-items:center;
}
.checkout-total strong{font-size:20px;}
.pay-methods{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;}
.pay-method{
  background:var(--card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:16px 8px; display:flex; flex-direction:column; align-items:center; gap:8px;
  color:var(--text); font-size:12px; font-weight:600;
}
.pay-method span{font-size:22px;}
.pay-method.selected{border-color:var(--purple-1); background:rgba(108,92,231,0.12);}
.pay-fields{display:flex; flex-direction:column; gap:12px; margin-bottom:8px;}
.troco-row{display:flex; justify-content:space-between; background:var(--card); padding:12px 14px; border-radius:var(--radius-sm);}
.proof-uploader{
  background:var(--card); border:1px dashed var(--border); border-radius:var(--radius-sm);
  padding:18px 14px; text-align:center; color:var(--text-dim); font-size:13px; cursor:pointer;
}
.proof-uploader.has-file{border-style:solid; border-color:var(--green); color:var(--text);}
.proof-uploader img{max-width:100%; max-height:140px; border-radius:8px; display:block; margin:0 auto;}
.proof-file-chip{display:flex; align-items:center; justify-content:center; gap:8px; font-weight:600;}

.toggle-btn{
  background:var(--card); border:1px solid var(--border); color:var(--text-dim);
  padding:12px; border-radius:var(--radius-sm); font-weight:700;
}
.toggle-btn.active{border-color:var(--green); color:var(--green); background:rgba(46,204,113,0.1);}
#btn-saida.active{border-color:var(--red); color:var(--red); background:rgba(255,92,92,0.1);}

/* ---------- PRODUCT FORM ---------- */
.photo-picker{display:flex; justify-content:center; margin-bottom:6px;}
.photo-preview{
  width:120px; height:120px; border-radius:var(--radius-md); background:var(--card);
  border:1px dashed var(--border); display:flex; align-items:center; justify-content:center;
  text-align:center; color:var(--text-dim); font-size:12px; overflow:hidden; cursor:pointer;
}
.photo-preview img{width:100%; height:100%; object-fit:cover;}
.hidden-input{display:none;}
.input-with-btn{display:flex; gap:8px;}
.input-with-btn input{flex:1;}
#form-produto{padding:18px 20px; display:flex; flex-direction:column; gap:14px;}
#form-produto label{display:flex; flex-direction:column; gap:6px; font-size:13px; color:var(--text-dim); font-weight:500;}
#form-produto input{
  background:var(--card); border:1px solid var(--border); color:var(--text);
  padding:13px 14px; border-radius:var(--radius-sm); font-size:15px; outline:none;
}

/* ---------- INVOICE ---------- */
.invoice-paper{
  background:#fff; color:#1a1a1a; margin:16px 20px; border-radius:var(--radius-md);
  padding:22px; font-size:13px;
}
.invoice-paper h3{color:#1a1a1a; font-size:16px; margin-bottom:2px;}
.invoice-paper .inv-meta{color:#666; font-size:12px; margin-bottom:14px;}
.invoice-paper table{width:100%; border-collapse:collapse; margin:14px 0;}
.invoice-paper th{text-align:left; font-size:11px; color:#888; border-bottom:1px solid #ddd; padding:6px 4px;}
.invoice-paper td{padding:6px 4px; border-bottom:1px solid #f0f0f0; font-size:12.5px;}
.invoice-paper .inv-total-row{display:flex; justify-content:space-between; padding:8px 4px; font-weight:700; font-size:15px;}
.invoice-paper .inv-divider{border:none; border-top:1px dashed #ccc; margin:12px 0;}
.invoice-paper .inv-foot{text-align:center; color:#999; font-size:11px; margin-top:14px;}
.fatura-actions{padding:14px 20px calc(14px + var(--safe-bottom));}

/* ---------- PERIOD TABS ---------- */
.period-tabs{display:flex; gap:8px; padding:14px 20px 0;}
.period-tab{
  flex:1; background:var(--card); border:1px solid var(--border); color:var(--text-dim);
  padding:10px; border-radius:var(--radius-sm); font-weight:600; font-size:13px;
}
.period-tab.active{background:var(--purple-1); color:#fff; border-color:var(--purple-1);}

/* ---------- MENU (MAIS) ---------- */
.menu-list{padding:6px 20px;}
.menu-item{
  display:flex; align-items:center; gap:14px; padding:16px; background:var(--card);
  border:1px solid var(--border); border-radius:var(--radius-md); margin-bottom:10px; color:var(--text);
}
.menu-item .mi-icon{width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:18px; background:var(--card-2);}
.menu-item.danger{color:var(--red);}
.menu-item .chev{margin-left:auto; color:var(--text-dim);}

/* ---------- CONFIG ---------- */
#config-content{padding:16px 20px;}
.config-group{margin-bottom:24px;}
.config-group h3{font-size:14px; margin-bottom:10px; color:var(--text-dim); font-weight:600; text-transform:none;}
.store-name-edit{display:flex; gap:8px;}
.store-name-edit input{
  flex:1; background:var(--card); border:1px solid var(--border); color:var(--text);
  padding:13px 14px; border-radius:var(--radius-sm); font-size:15px;
}
.config-actions{display:flex; flex-direction:column; gap:10px;}
.sync-status{display:flex; align-items:center; gap:8px; font-size:13px; color:var(--text-dim); margin-bottom:12px;}
.sync-dot{width:9px; height:9px; border-radius:50%; background:var(--border);}
.sync-dot.on{background:var(--green); box-shadow:0 0 8px var(--green);}
.sync-dot.warn{background:var(--amber); box-shadow:0 0 8px var(--amber);}
.config-textarea{
  width:100%; background:var(--card); border:1px solid var(--border); color:var(--text);
  padding:12px; border-radius:var(--radius-sm); font-size:12.5px; font-family:monospace;
  min-height:100px; resize:vertical; margin-bottom:10px;
}
.help-box{
  background:var(--card-2); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:12px 14px; font-size:12px; color:var(--text-dim); line-height:1.6; margin-bottom:12px;
}
.help-box b{color:var(--text);}

/* ---------- UPDATE BANNER ---------- */
.update-banner{
  position:absolute; top:0; left:0; right:0; z-index:100;
  background:var(--amber); color:#1a1a1a; padding:10px 16px;
  display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:600;
}
.update-banner button{background:#1a1a1a; color:#fff; border:none; padding:6px 12px; border-radius:8px; font-weight:700; font-size:12px;}
.eod-banner{background:var(--red); top:auto; bottom:0; z-index:150;}
.eod-banner button{background:rgba(0,0,0,0.35);}

/* ---------- TOAST ---------- */
.toast{
  position:absolute; bottom:100px; left:50%; transform:translateX(-50%);
  background:#222; color:#fff; padding:12px 20px; border-radius:14px; font-size:13px;
  z-index:200; box-shadow:0 6px 20px rgba(0,0,0,0.3); max-width:88%; text-align:center;
}

/* scrollbar */
::-webkit-scrollbar{width:0; height:0;}

@media print{
  body *{visibility:hidden;}
  .invoice-paper, .invoice-paper *{visibility:visible;}
  .invoice-paper{position:absolute
