# 🔗 Blockchain Audit Dashboard

A secure and tamper-proof transaction monitoring system built using DBMS concepts and blockchain-inspired architecture. This project demonstrates how backend systems can ensure data integrity, traceability, and transparency using audit chains.

🌐 Live Demo: https://dbms-project-2.vercel.app/dashboard

---

## 📌 Overview

This project was developed as part of an academic DBMS initiative with the goal of exploring how backend systems work beyond traditional command-line outputs.

We were curious about:
- How frontend connects to backend
- How databases handle secure transactions
- How blockchain concepts can be simulated in DBMS

So we built a **Blockchain Audit System** with a **real dashboard interface**.

---

## 🚀 Features

- 🔐 **Tamper-proof audit logs**
- 🔗 **Blockchain-like structure using hash chaining**
- 💰 **Wallet-based transaction system**
- 📊 **Interactive dashboard UI**
- ⚡ **Real-time transaction updates**
- 🛡️ **Trigger-based protection against unauthorized modifications**

---

## 🧠 Core Concepts Used

### 🗄️ DBMS
- Tables: `wallets`, `transactions`, `audit_blocks`
- Triggers & Functions (PL/pgSQL)
- Data integrity constraints
- Transaction management

### 🔗 Blockchain Concepts
- Hash chaining between blocks
- Immutable audit trail
- Block verification system

### 🌐 Full Stack Integration
- Backend connected to frontend dashboard
- API-based communication
- Deployment using Vercel

---

## 🏗️ System Architecture

---

## 🧾 Database Schema

### Wallets Table
- Stores user balances

### Transactions Table
- Records money transfers

### Audit Blocks Table
- Stores hashed transaction logs
- Links each block to previous block (chain)

---

## ⚙️ Key Functions

### 🔁 `transfer_funds()`
- Transfers money between wallets
- Automatically logs transaction
- Creates audit block

### ⛓️ `insert_audit_block()`
- Generates hash
- Links with previous block
- Stores immutable record

### 🔍 `verify_audit_chain()`
- Checks integrity of entire blockchain
- Detects tampering

---

## 🛡️ Security Features

- ❌ Direct modification of critical tables restricted
- ⚠️ Triggers block unauthorized updates
- 🔐 Audit chain ensures data cannot be altered silently

---

## 💡 What We Learned

- How backend systems actually work beyond theory
- Real-world use of DBMS triggers and functions
- Integrating frontend with backend systems
- Practical implementation of blockchain concepts without crypto

---

## 🎯 Motivation

This project was not just for grades.

We built it because:
> We wanted to understand how real systems work — not just print outputs on a terminal.

---

## 🧑‍💻 Tech Stack

- PostgreSQL (DBMS)
- PL/pgSQL (Functions & Triggers)
- JavaScript (Frontend)
- Vercel (Deployment)

---

## 📸 Screenshots

_Add your dashboard screenshots here_

---

## 🔧 How to Run Locally

1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
-- create tables
-- create functions
-- setup triggers
