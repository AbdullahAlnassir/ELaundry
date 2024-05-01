function submitLoginForm() {
    event.preventDefault();

    let formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data.message);
            window.location.href = '/dashboard';
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
}
