// تهيئة EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS

function validateForm(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // التحقق من صحة البيانات
    if (!phone || !email || !message) {
        alert("من فضلك املأ جميع الحقول");
        return false;
    }

    // إرسال البريد الإلكتروني
    const templateParams = {
        from_name: email,
        from_phone: phone,
        message: message,
        to_email: 'khaled78dream@gmail.com'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('تم إرسال الرسالة بنجاح!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('حدث خطأ في إرسال الرسالة، يرجى المحاولة مرة أخرى.');
            console.error('Error:', error);
        });

    return false;
}