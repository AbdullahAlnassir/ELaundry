// Add event listener for the registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Stop the form from submitting normally

    // Gather form data into an object
    let formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        mobile_number: document.getElementById('mobile_number').value,
        credit_card_details: document.getElementById('credit_card_details').value
    };

    // Send the data using the Fetch API
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Registration successful! Check console for details.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Check console for details.');
    });
});

// Add event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Stop the form from submitting normally

    // Gather form data into an object
    let formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    // Send the data using the Fetch API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Login successful! Check console for details.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Check console for details.');
    });
});
