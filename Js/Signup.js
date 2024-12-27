document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;

    // Basic validation
    if (firstName && lastName && email && password && age) {
        // Here you would typically send this data to a server
        // For now, we'll just show a success message and redirect
        alert('تم التسجيل بنجاح!');
        window.location.href = 'index.html';
    } else {
        alert('برجاء ملء جميع الحقول');
    }
});
