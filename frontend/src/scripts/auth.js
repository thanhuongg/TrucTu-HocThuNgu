// =============================================
// TRÚC TỰ — Auth Modal Logic
// =============================================

(function () {
    'use strict';

    // ── DOM refs ──────────────────────────────
    const overlay   = document.getElementById('authOverlay');
    const modalCard = overlay ? overlay.querySelector('.auth-modal') : null;
    const closeBtn  = document.getElementById('authClose');
    const userBtn   = document.querySelector('.user-profile');
    const startBtns = document.querySelectorAll('.btn-start, .btn-primary');

    // Tabs
    const tabLogin    = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const panelLogin  = document.getElementById('panelLogin');
    const panelRegister = document.getElementById('panelRegister');

    // ── Helpers ───────────────────────────────
    function openModal(tab) {
        if (!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchTab(tab || 'login');
        setTimeout(() => closeBtn && closeBtn.focus(), 300);
    }

    function closeModal() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function switchTab(which) {
        if (!tabLogin) return;
        [tabLogin, tabRegister].forEach(t => t.classList.remove('active'));
        [panelLogin, panelRegister].forEach(p => p.classList.remove('active'));
        clearErrors();

        if (which === 'register') {
            tabRegister.classList.add('active');
            panelRegister.classList.add('active');
        } else {
            tabLogin.classList.add('active');
            panelLogin.classList.add('active');
        }
    }

    // ── Validation helpers ────────────────────
    function setError(field, msg) {
        const wrap = document.getElementById(field + 'Field');
        const err  = document.getElementById(field + 'Error');
        if (wrap) wrap.classList.add('has-error');
        if (err)  { err.textContent = msg; err.style.display = 'block'; }
    }

    function clearError(field) {
        const wrap = document.getElementById(field + 'Field');
        if (wrap) wrap.classList.remove('has-error');
    }

    function clearErrors() {
        document.querySelectorAll('.auth-field.has-error').forEach(el => el.classList.remove('has-error'));
    }

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    }

    // ── Password visibility toggle ────────────
    document.querySelectorAll('.auth-pw-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            if (!input) return;
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.textContent = isHidden ? '🙈' : '👁️';
        });
    });

    // ── Password strength ─────────────────────
    const regPw = document.getElementById('regPassword');
    const bars  = document.querySelectorAll('#regStrength .pw-bar');
    const strengthLabel = document.getElementById('regStrengthLabel');

    function calcStrength(pw) {
        let s = 0;
        if (pw.length >= 8)  s++;
        if (/[A-Z]/.test(pw)) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^A-Za-z0-9]/.test(pw)) s++;
        return s; // 0–4
    }

    if (regPw) {
        regPw.addEventListener('input', () => {
            const s = calcStrength(regPw.value);
            const labels = ['', 'Yếu', 'Trung bình', 'Tốt', 'Mạnh'];
            const cls    = ['', 'weak', 'fair', 'strong', 'strong'];

            bars.forEach((bar, i) => {
                bar.className = 'pw-bar';
                if (i < s) bar.classList.add(cls[s]);
            });
            strengthLabel.textContent = labels[s];
        });
    }

    // ── Login form ────────────────────────────
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const email = document.getElementById('loginEmail').value;
            const pw    = document.getElementById('loginPassword').value;
            let valid   = true;

            if (!isValidEmail(email)) {
                setError('loginEmail', 'Vui lòng nhập email hợp lệ.');
                valid = false;
            }
            if (pw.length < 6) {
                setError('loginPassword', 'Mật khẩu tối thiểu 6 ký tự.');
                valid = false;
            }
            if (!valid) return;

            const btn = loginForm.querySelector('.auth-submit');
            btn.classList.add('loading');
            btn.disabled = true;

            // Simulate API call
            await new Promise(r => setTimeout(r, 1400));

            btn.classList.remove('loading');
            btn.disabled = false;

            // Show success
            panelLogin.style.display = 'none';
            document.getElementById('loginSuccess').classList.add('show');
            setTimeout(() => closeModal(), 2200);
        });
    }

    // ── Register form ─────────────────────────
    const regForm = document.getElementById('registerForm');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const name   = document.getElementById('regName').value.trim();
            const email  = document.getElementById('regEmail').value;
            const pw     = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            const terms  = document.getElementById('regTerms').checked;
            let valid = true;

            if (name.length < 2) {
                setError('regName', 'Vui lòng nhập họ tên (tối thiểu 2 ký tự).');
                valid = false;
            }
            if (!isValidEmail(email)) {
                setError('regEmail', 'Vui lòng nhập email hợp lệ.');
                valid = false;
            }
            if (calcStrength(pw) < 2) {
                setError('regPassword', 'Mật khẩu cần ít nhất 8 ký tự và 1 chữ hoa hoặc số.');
                valid = false;
            }
            if (confirm !== pw) {
                setError('regConfirm', 'Mật khẩu nhập lại chưa khớp.');
                valid = false;
            }
            if (!terms) {
                setError('regTerms', 'Bạn cần đồng ý với điều khoản để tiếp tục.');
                valid = false;
            }
            if (!valid) return;

            const btn = regForm.querySelector('.auth-submit');
            btn.classList.add('loading');
            btn.disabled = true;

            await new Promise(r => setTimeout(r, 1600));

            btn.classList.remove('loading');
            btn.disabled = false;

            panelRegister.style.display = 'none';
            document.getElementById('registerSuccess').classList.add('show');
            setTimeout(() => closeModal(), 2400);
        });
    }

    // ── Event bindings ────────────────────────
    if (closeBtn)  closeBtn.addEventListener('click', closeModal);
    if (overlay)   overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    if (userBtn)   userBtn.addEventListener('click', () => openModal('login'));
    startBtns.forEach(b => b.addEventListener('click', () => openModal('register')));

    tabLogin    && tabLogin.addEventListener('click',    () => switchTab('login'));
    tabRegister && tabRegister.addEventListener('click', () => switchTab('register'));

    document.getElementById('switchToRegister')  && document.getElementById('switchToRegister').addEventListener('click',  () => switchTab('register'));
    document.getElementById('switchToLogin')      && document.getElementById('switchToLogin').addEventListener('click',     () => switchTab('login'));

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) closeModal();
    });

})();
