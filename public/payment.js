document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const paymentData = {
            cardholder: document.getElementById('cardholder').value,
            cardNumber: document.getElementById('card-number').value,
            expMonth: document.getElementById('exp-month').value,
            expYear: document.getElementById('exp-year').value,
            cvv: document.getElementById('cvv').value
        };

        fetch('/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Payment Processed Successfully!');
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            alert('Failed to process payment.');
        });
    });
});

function submitPayment() {
    document.getElementById('paymentForm').submit();
}
