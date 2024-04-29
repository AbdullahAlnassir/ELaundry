document.addEventListener('DOMContentLoaded', function() {
    // Mock data - replace with actual API fetch call
    const mockData = [
        { fullName: 'John Doe', email: 'john@example.com', username: 'johnnyD', phone: '123-456-7890', cardNumber: '1234-5678-9012-3456', password: '••••••' },
        { fullName: 'Jane Smith', email: 'jane@example.com', username: 'janeS', phone: '987-654-3210', cardNumber: '6543-2109-8765-4321', password: '••••••' },
        // Add more mock customers as needed
    ];

    const tableBody = document.getElementById('customer-data');
    mockData.forEach(customer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${customer.fullName}</td>
            <td>${customer.email}</td>
            <td>${customer.username}</td>
            <td>${customer.phone}</td>
            <td>${customer.cardNumber}</td>
            <td>${customer.password}</td>
        `;
        tableBody.appendChild(tr);
    });

    const infoTable = document.querySelector('.dashboard-info');
    const copyError = document.getElementById('copy-error');

    infoTable.addEventListener('copy', function(event) {
        event.preventDefault(); // Prevent the copy action
        copyError.style.display = 'block'; // Show the error message
        setTimeout(() => {
            copyError.style.display = 'none'; // Hide the message after a few seconds
        }, 3000);
    });
});
