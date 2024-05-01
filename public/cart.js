document.addEventListener('DOMContentLoaded', function() {
    fetchCartItems();

    document.querySelector('.checkout-button').addEventListener('click', function() {
        proceedToCheckout();
    });
});

function fetchCartItems() {
    fetch('/cart')
    .then(response => response.json())
    .then(data => {
        const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
        cartTable.innerHTML = '';
        data.forEach(item => {
            let row = cartTable.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.textContent = item.product_name;
            cell2.textContent = item.quantity;
            cell3.textContent = `$${item.price.toFixed(2)}`;
        });
    })
    .catch(error => {
        console.error('Error fetching cart items:', error);
    });
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}
