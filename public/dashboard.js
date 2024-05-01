document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch customer data
    function fetchCustomers() {
        fetch('/customers')
            .then(response => response.json())
            .then(data => populateCustomerTable(data))
            .catch(error => console.error('Failed to fetch customer data:', error));
    }

    // Function to populate the customer table
    function populateCustomerTable(customers) {
        const tableBody = document.getElementById('customer-data');
        tableBody.innerHTML = ''; // Clear existing table data
        customers.forEach(customer => {
            const row = `<tr>
                <td>${customer.fullName}</td>
                <td>${customer.email}</td>
                <td>${customer.username}</td>
                <td>${customer.phone}</td>
                <td>${customer.creditCardNumber}</td>
                <td>${customer.password.replace(/./g, '*')}</td> 
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // Function to prevent copying from the table
    const table = document.querySelector('.dashboard-info');
    table.addEventListener('copy', (event) => {
        event.preventDefault(); // Stop the copy event
        document.getElementById('copy-error').style.display = 'block'; // Show error message
        setTimeout(() => { document.getElementById('copy-error').style.display = 'none'; }, 3000); // Hide after 3 seconds
    });

    // Fetch customer data when the page loads
    fetchCustomers();
});
