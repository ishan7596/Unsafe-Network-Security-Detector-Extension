document.addEventListener("DOMContentLoaded", () => { 
    const statusElement = document.getElementById("status"); 
    const notificationElement = document.getElementById("notification");
    setTimeout(async () => {
        const networkStatus = await checkWiFiSecurity();
        updateUI(networkStatus);
    }, 2000);
    
    document.getElementById("refreshBtn").addEventListener("click", async () => {
        statusElement.textContent = "Checking network security...";
        notificationElement.style.display = "none";
    
        setTimeout(async () => {
            const networkStatus = await checkWiFiSecurity();
            updateUI(networkStatus);
        }, 2000);
    });
    
    async function getCurrentTabUrl() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs && tabs.length > 0) {
                    const tabUrl = tabs[0].url;
                    console.log("Actual tab URL:", tabUrl);
                    resolve(tabUrl);
                } else {
                    console.warn("Could not get the active tab.");
                    resolve(null);
                }
            });
        });
    }
    
    async function checkWiFiSecurity() {
        const currentTabUrl = await getCurrentTabUrl();
        let isInsecureHttp = false;
    
        if (currentTabUrl) {
            const protocol = new URL(currentTabUrl).protocol;
            console.log("Protocol:", protocol);
            isInsecureHttp = protocol === 'http:';
        }
    
        const isCaptivePortal = currentTabUrl && (currentTabUrl.includes("login") || currentTabUrl.includes("captive-portal"));
        const isWeakEncryption = false; // Not detectable via browser JS
        const isVPN = await checkVPNUsage();
    
        return { isInsecureHttp, isCaptivePortal, isWeakEncryption, isVPN };
    }
    
    async function checkVPNUsage() {
        try {
            const ipResponse = await fetch("https://api64.ipify.org?format=json");
            const ipData = await ipResponse.json();
            const ip = ipData.ip;
            console.log("IP Response:", ip);
    
            const apiKey = "uLQsTu5QWNR6Pc8zTO5WxLCjPaTypaX6"; // Replace with your actual key
            const apiUrl = `https://ipqualityscore.com/api/json/ip/${apiKey}/${ip}`;
    
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            console.log("IPQualityScore API Response:", data);
    
            if (data.success) {
                const isVPN = data.vpn;
                const isProxy = data.proxy;
                const isTor = data.tor;
    
                return isVPN || isProxy || isTor;
            } else {
                console.error("IPQualityScore API error:", data.message);
                return false;
            }
    
        } catch (err) {
            console.error("Error checking VPN:", err);
            return false;
        }
    }
    
    function updateUI(networkStatus) {
        if (networkStatus.isVPN) {
            statusElement.textContent = "Warning: VPN detected!";
            showNotification("warning", "You are connected via a VPN. This network may not be safe.");
            showPopup("VPN connection detected.");
        } else if (networkStatus.isInsecureHttp) {
            statusElement.textContent = "Warning: Unsecured Connection detected (HTTP).";
            showNotification("warning", "You are connected to an unsecured (HTTP) network.");
            showPopup("Unsecured HTTP connection detected. Avoid entering sensitive info.");
        } else if (networkStatus.isCaptivePortal) {
            statusElement.textContent = "Warning: Potential Fake Captive Portal detected!";
            showNotification("warning", "Fake captive portal suspected.");
            showPopup("This might be a fake login page. Do not enter passwords.");
        } else if (networkStatus.isWeakEncryption) {
            statusElement.textContent = "Warning: Weak encryption detected (WEP/WPA1).";
            showNotification("warning", "Weak Network encryption.");
            showPopup("Your Network uses weak encryption. Consider switching networks.");
        } else {
            statusElement.textContent = "Your Network is secure!";
            showNotification("success", "Secure Network connection.");
        }
    }
    
    
    function showNotification(type, message) {
        notificationElement.textContent = message;
        notificationElement.className = 'notification ' + type;
        notificationElement.style.display = "block";
    }

    function showPopup(message) {
        alert(message); // Basic native popup box. You can replace this with a custom modal if needed.
    }
});    