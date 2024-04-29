document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('otp-modal').style.display = 'flex';
    });

    document.getElementById('otp-submit').addEventListener('click', function() {
        var otp = document.getElementById('otp-input').value;
        var errorText = document.getElementById('otp-error');

        if (otp === '0000') {
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else if (otp === '1111') {
            window.location.href = 'cart.html'; // Redirect to cart page
        } else {
            errorText.style.display = 'block';
        }
    });

    // Handling the Cancel button click
    document.getElementById('otp-cancel').addEventListener('click', function() {
        document.getElementById('otp-modal').style.display = 'none'; // Hide the modal
        document.getElementById('otp-input').value = ''; // Reset OTP input
        document.getElementById('otp-error').style.display = 'none'; // Hide error message if visible
    });
});
