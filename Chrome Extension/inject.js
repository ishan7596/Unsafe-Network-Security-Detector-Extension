// inject.js
document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.href.toLowerCase();

    // Check if the URL starts with HTTP (unsecured) or contains captive portal
    if (url.startsWith("http://")) {
        // Send a message to background.js to show a popup for insecure connection
        chrome.runtime.sendMessage({ action: 'showPopup', message: 'Warning: You are connected to an unsecured (HTTP) network.' });
    } else if (url.includes("captive-portal") || url.includes("login")) {
        // Send a message to background.js to show a popup for potential captive portal
        chrome.runtime.sendMessage({ action: 'showPopup', message: 'Potential Fake Captive Portal Detected!' });
    }
});
