# Sconto Wallet & Rewards System

A secure, scalable backend system for managing user wallets, transaction logging, and reward redemption using Node.js, Express, and MongoDB.

## 📌 Features
- **JWT Authentication:** Secure access to wallet and reward features.
- **Atomic Transactions:** Uses MongoDB Sessions to ensure money is never lost during redemption.
- **Custom Logging:** Middleware to track API requests and response times.
- **Optimized Performance:** Strategic indexing on high-traffic collections.

---

## 🚀 Setup & Installation

### Clone & Install
```bash
git clone https://github.com/Manthanpelne/sconto-assignment.git

npm install

npm run server



PORT=8000
MONGOURL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
