function submitAddressForm() {
    const form = document.getElementById('addressForm');
    const formData = {
        street: document.getElementById('street').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value,
        deliveryType: document.getElementById('delivery-type').value,
        deliveryTime: document.getElementById('delivery-time').value,
        deliveryDate: document.getElementById('delivery-date').value
    };

    fetch('/save-address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Address saved successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error saving address:', error);
        alert('Failed to save address.');
    });
}
