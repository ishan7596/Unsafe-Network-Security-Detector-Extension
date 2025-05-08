# 🔐 Unsafe Network Security Detector - Chrome Extension

This project is a Chrome browser extension that detects and warns users about unsafe public Wi-Fi networks. It identifies insecure protocols, detects captive portals, analyzes public IP reputations using external APIs, and delivers real-time alerts to enhance users’ browsing safety.

---

## 📌 Features

- 🔒 Detects non-HTTPS connections and warns the user.
- 🧠 Identifies potentially malicious captive portals and redirects.
- 🌐 Fetches and analyzes public IPs for risk signals (VPN, proxy, Tor).
- 📢 Real-time security alerts and threat summaries.
- ✅ Trusted network list to reduce false positives.
- 💡 Intuitive UI with security information popups.

---

## 🛠️ Technologies Used

- JavaScript (ES6)
- Chrome Extensions API
- HTML + CSS
- IPify API (for public IP detection)
- IPQualityScore API (for IP reputation analysis)
- Chrome Storage and Notification API

---

## 🚀 How It Works

1. The extension runs in the background and monitors the user’s navigation activity.
2. On every navigation event, it checks the URL protocol (HTTP vs HTTPS).
3. It retrieves the current public IP address using IPify.
4. It queries IPQualityScore with the IP to check for signs of VPN/proxy/Tor use.
5. It displays an alert to the user if the network is found to be suspicious or unsafe.
6. The user can choose to mark the network as trusted, skipping future warnings.

---

## 📦 Installation

1. Clone or download this repository.
2. Open Chrome and go to: `chrome://extensions/`
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked".
5. Select the root folder of this project.

---

## 🧪 Testing

Tested using:
- Simulated open/public Wi-Fi
- Custom DNS redirect servers (captive portals)
- VPN and proxy connections
- HTTP-only websites

