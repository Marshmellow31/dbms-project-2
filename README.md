# 🔗 Blockchain Audit Dashboard

A DBMS-based Blockchain-Inspired Audit System designed to ensure **data integrity, transparency, and tamper-resistant transaction tracking**.

🌐 Live Demo: https://dbms-project-2.vercel.app/dashboard

---

## 📌 Overview

This project was built as part of an academic DBMS project with the goal of going beyond traditional database systems.

Instead of just storing data, we explored:
- How **blockchain-like audit systems** work
- How **backend logic integrates with frontend dashboards**
- How to enforce **data immutability inside a database**

The system simulates a blockchain by storing transactions in **linked audit blocks**, making unauthorized changes detectable.

---

## ✨ Features

- 🔐 Tamper-resistant audit trail using chained blocks  
- 💸 Wallet system with balance tracking  
- 🔄 Transaction system with validation  
- 🧱 Audit blocks storing transaction history  
- ⚡ Real-time dashboard UI  
- 🚫 Restricted modification using database functions  
- 📊 Clean visualization of data  

---

## 🧠 Core Concept

Unlike real blockchain systems, this project implements a **database-level blockchain simulation**.

Each block contains:
- Transaction data  
- Previous block hash  
- Current block hash  

This creates a chain:

Block 1 → Block 2 → Block 3 → Block N  

If any data is modified:
- The chain breaks  
- Integrity verification fails  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Custom dark UI  
- Deployed on Vercel  

### Backend / DBMS
- PostgreSQL  
- PL/pgSQL  
- Triggers & Stored Procedures  

### Concepts Used
- Database triggers  
- Transaction management  
- Hash chaining  
- Data integrity enforcement  

---

## 📂 Database Structure

### Tables

- **wallets** → stores balances  
- **transactions** → records transfers  
- **audit_blocks** → stores blockchain-like chain  

---

## ⚙️ Key Functions

### create_wallet()
Creates a wallet with initial balance  

### transfer_funds()
- Validates balance  
- Executes transfer  
- Logs transaction  

### insert_audit_block()
- Creates new block  
- Links with previous hash  
- Stores snapshot  

### verify_audit_chain()
- Checks full chain integrity  
- Detects tampering  

### Security Logic
- Prevents direct modification  
- Forces controlled operations  

---

## 🚀 Getting Started

### Prerequisites

- Node.js  
- PostgreSQL  
- Git  

---

### Installation

```bash
git clone https://github.com/your-username/dbms-blockchain-audit.git
cd dbms-blockchain-audit
npm install
