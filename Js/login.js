function validateForm(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("الرجاء إدخال بريد إلكتروني صحيح");
        return false;
    }
    
    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
        alert("كلمتا المرور غير متطابقتين");
        return false;
    }
    
    // إذا كانت جميع البيانات صحيحة
    alert("تم تسجيل الدخول بنجاح!");
    window.location.href = 'index.html'; // التوجيه إلى الصفحة الرئيسية
    return true;
}