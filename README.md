# 🏛️ TrustVote: Secure Blockchain-Based Online Voting System With Multi-Factor Authentication

An IEEE-standard compliant, production-grade **Online Voting System** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Biometric Face Landmark Recognition** (TensorFlow `face-api.js`), **Phone SMS OTP Passcode Verification**, **SHA-256 Proof-of-Work Blockchain Vote Ledger**, and **Socket.io Real-Time Streaming**.

> 📖 **Comprehensive Presentation & Viva Guide**: For PPT slide decks, system flowcharts, architecture deep-dive, and top viva Q&As, refer to [PRESENTATION_AND_ARCHITECTURE_GUIDE.md](file:///C:/Online-voting-system-main/PRESENTATION_AND_ARCHITECTURE_GUIDE.md).

---

## ✨ Key System Features

- **🔐 3-Stage Multi-Factor Authentication (MFA)**: Sequential identity pipeline combining Voter ID/Admin ID + Password + 128-float Neural Face Scan Matching + Registered Phone SMS OTP.
- **⛏️ Cryptographic SHA-256 Blockchain Ledger**: Every vote is mined into an immutable block linked with the previous block's SHA-256 hash, preventing vote tampering.
- **📍 Location-Based Jurisdiction Control**: Enforces geographical boundaries (Gram Panchayat, Ward, Municipality, Taluk, District, City) so voters only see elections assigned to their jurisdiction.
- **🛡️ One-Person-One-Vote Token Engine**: Prevents double-voting using anonymous one-way cryptographic tokens (`SHA-256(voterId + electionId)`).
- **🔒 Admin-Only Vote Decryption (Ballot Privacy)**: Individual ballots and candidate tallies are cryptographically secured on the blockchain and can **only be decrypted and inspected using Admin ID (`ADMIN123`) and Password (`admin123`)**. Voters receive a private sealed cryptographic receipt without tally leakage.
- **📡 Real-Time WebSockets Results**: Instant candidate vote distribution updates streamed securely to the Admin Command Center via Socket.io.
- **🔍 Blockchain Ledger Explorer & Integrity Auditor**: Automated SHA-256 hash recalculation tool for auditing chain integrity and verifying zero tampering.
- **🎨 Glassmorphic Responsive UI/UX**: Built with React 18, Tailwind CSS v3, and Lucide React icons with 1-click presentation demo autofills.

---

## 🏗️ System Architecture

```text
TrustVote/
├── client/                     # Frontend Application (React 18 + Tailwind CSS + Vite)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, FaceScanner, OTPModal, BlockchainBadge
│   │   ├── context/            # AuthContext, SocketContext
│   │   ├── pages/              # Home, Register, Login, VoterDashboard, VotingPage, LiveResults, BlockchainExplorer, AdminDashboard
│   │   ├── services/           # Axios API Client
│   │   └── utils/              # faceApiLoader
│   └── vite.config.js
│
└── server/                     # Backend API & Blockchain Engine (Node.js + Express)
    ├── blockchain/             # Block.js & Blockchain.js SHA-256 Engine, MerkleTree, ConsensusNetwork
    ├── config/                 # db.js & mailer.js
    ├── controllers/            # authController, electionController, candidateController, voteController, blockchainController, adminController
    ├── middleware/             # authMiddleware (JWT & Role Guards)
    ├── models/                 # User, Location, Election, Candidate, Vote, Block Schemas
    ├── routes/                 # Express API Endpoint Routes
    └── services/               # otpService & faceService (Euclidean Distance Matcher)
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas)

### 1. Backend Setup
```bash
cd server
npm install
node utils/seedData.js   # Seeds sample locations, elections, candidates, and demo accounts
npm start
```

### 2. Frontend Setup (New Terminal)
```bash
cd client
npm install
npm run dev
```

Open your browser at **`http://localhost:5173`**!

---

## 🔑 Demo Credentials

| Role | Voter / Admin ID | Password | Registered Phone | Permissions & Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Admin (Chief Officer)** | `ADMIN123` | `admin123` | `+919876543210` | **Exclusive**: Decrypt vote tallies, launch elections, audit blockchain |
| **Citizen Voter 1** | `VOTER1001` | `voter123` | `+919123456789` | Vote in Bengaluru Ward 42, inspect sealed receipt |
| **Citizen Voter 2** | `VOTER2002` | `voter123` | `+919234567890` | Vote in Mumbai Ward A, inspect sealed receipt |

---

## 📄 License
Distributed under the ISC License. Designed for Final Year Engineering Capstone Projects & Research Publications.
