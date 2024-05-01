document.addEventListener('DOMContentLoaded', function() {
    fetchSettings();

    document.getElementById('settingsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveSettings();
    });
});

function fetchSettings() {
    // Fetch settings from the server
    fetch('/get-settings', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('marketing-emails').checked = data.receive_marketing_emails;
        document.getElementById('sale-notifications').checked = data.notify_sale;
        document.getElementById('auto-subscription').checked = data.auto_subscription;
    })
    .catch(error => console.error('Error loading settings:', error));
}

function saveSettings() {
    const settingsData = {
        marketingEmails: document.getElementById('marketing-emails').checked,
        saleNotifications: document.getElementById('sale-notifications').checked,
        autoSubscription: document.getElementById('auto-subscription').checked
    };

    fetch('/update-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingsData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Settings saved successfully!');
    })
    .catch(error => {
        console.error('Error saving settings:', error);
        alert('Failed to save settings.');
    });
}
