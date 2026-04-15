document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const nameGroup = document.getElementById('name-group');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    
    let isLogin = true;

    function attachToggleListener() {
        document.getElementById('toggle-form').addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            
            if(isLogin) {
                formTitle.textContent = 'تسجيل الدخول';
                submitBtn.textContent = 'دخول';
                e.target.parentElement.innerHTML = 'ليس لديك حساب؟ <a href="#" id="toggle-form">سجل الآن</a>';
                nameGroup.style.display = 'none';
                nameInput.removeAttribute('required');
            } else {
                formTitle.textContent = 'إنشاء حساب جديد';
                submitBtn.textContent = 'تسجيل';
                e.target.parentElement.innerHTML = 'لديك حساب بالفعل؟ <a href="#" id="toggle-form">تسجيل الدخول</a>';
                nameGroup.style.display = 'block';
                nameInput.setAttribute('required', 'true');
            }
            attachToggleListener();
        });
    }
    
    attachToggleListener();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let userName = isLogin ? (emailInput.value.split('@')[0] || "مستخدم عزيز") : nameInput.value;
        if(isLogin && emailInput.value.includes('admin')) userName = "آدمن";
        
        const userObj = { name: userName, email: emailInput.value };
        localStorage.setItem('barber_user', JSON.stringify(userObj));
        
        window.location.href = 'index.html';
    });
});
