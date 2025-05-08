// Listen for completed navigation events
chrome.webNavigation.onCompleted.addListener((details) => {
    // Check if the URL exists
    if (details.url) {
      let url = details.url.toLowerCase();
  
      // Detect HTTP (unsecured) network
      if (url.startsWith("http://")) {
        notifyUser("Warning: You are connected to an unsecured (HTTP) network.");
      }
  
      // Check if the URL suggests a potential fake captive portal (login page)
      if (url.includes("captive-portal") || url.includes("login")) {
        notifyUser("Potential Fake Captive Portal Detected!");
      }
    }
  }, {
    // Filter to trigger only on HTTP or HTTPS protocols
    url: [{ schemes: ["http", "https"] }]
  });
  
  // Function to trigger a notification for security alerts
  function notifyUser(message) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Wi-Fi Security Alert",
      message: message
    });
  }
  