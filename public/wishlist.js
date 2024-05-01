document.addEventListener('DOMContentLoaded', function() {
    fetchWishlistItems();

    document.getElementById('wishlist-table').addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const itemId = event.target.dataset.itemId;
            addToCart(itemId);
        }
    });
});

function fetchWishlistItems() {
    fetch('/wishlist')
    .then(response => response.json())
    .then(items => {
        const tableBody = document.getElementById('wishlist-table').querySelector('tbody');
        tableBody.innerHTML = '';
        items.forEach(item => {
            const row = `<tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td><button class="add-to-cart" data-item-id="${item.product_id}">Add to Cart</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching wishlist items:', error));
}

function addToCart(productId, quantity = 1) {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id: 1, product_id: productId, quantity })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Added to cart successfully!');
            fetchWishlistItems(); 
        } else {
            alert('Failed to add to cart.');
        }
    })
    .catch(error => console.error('Error adding to cart:', error));
}
