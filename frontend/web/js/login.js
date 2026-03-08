document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function hideMessages() {
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
    }

    function switchToLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        hideMessages();
    }

    function switchToRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        hideMessages();
    }

    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (username.length < 3 || username.length > 20) {
            showError('用户名长度应为3-20个字符');
            return;
        }

        if (password.length < 6 || password.length > 20) {
            showError('密码长度应为6-20个字符');
            return;
        }

        const submitBtn = loginForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '登录中...';

        try {
            const response = await authService.login(username, password);
            
            if (response.code === 200) {
                showSuccess('登录成功！正在跳转...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showError(response.message || '登录失败，请重试');
            }
        } catch (error) {
            showError('网络错误，请稍后重试');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '登录';
        }
    });

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (username.length < 3 || username.length > 20) {
            showError('用户名长度应为3-20个字符');
            return;
        }

        if (password.length < 6 || password.length > 20) {
            showError('密码长度应为6-20个字符');
            return;
        }

        if (password !== confirmPassword) {
            showError('两次输入的密码不一致');
            return;
        }

        const submitBtn = registerForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '注册中...';

        try {
            const response = await authService.register(username, password);
            
            if (response.code === 200) {
                showSuccess('注册成功！请登录');
                setTimeout(() => {
                    switchToLogin();
                    document.getElementById('loginUsername').value = username;
                }, 1500);
            } else {
                showError(response.message || '注册失败，请重试');
            }
        } catch (error) {
            showError('网络错误，请稍后重试');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '注册';
        }
    });

    if (authService.isLoggedIn()) {
        authService.getUserInfo().then(response => {
            if (response.code === 200) {
                window.location.href = 'index.html';
            }
        });
    }
});
