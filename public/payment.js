document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.payment-box form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Add form validation and submission logic here
        alert('Payment Processed!'); // Placeholder for actual payment processing
    });
});
