# Blockchain Audit Dashboard

A tamper-evident audit ledger built with React, Vite, MUI, and Supabase.

## Features
- **Immutable Log**: Every transaction logged via the backend creates an immutable block.
- **Chain Verification**: Verify the entire chain's integrity locally or against the Supabase DB.
- **Block Explorer**: Visualizes the chain of blocks linking cryptographic hashes.
- **Exporting/Anchoring**: Export the latest root hash for anchoring the chain state.

## Getting Started

### Prerequisites
- Node.js installed

### Environment Variables
1. Create a `.env` in the root (for React):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Create a `.env` in the `backend` folder (for the Server Endpoint):
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
```

### Installation
1. Install dependencies:
```bash
npm install
```

### Running the App
1. Start the React frontend:
```bash
npm run dev
```

2. Start the Backend API mock server (in a new terminal):
```bash
cd backend
node server.js
```

### Usage
- Visit `http://localhost:5173` to view the Dashboard.
- You can bypass auth and test the `Dashboard` and `Settings` directly via the URL.
- To create a transaction, the React app will `POST` to `http://localhost:3001/api/log`. The backend securely inserts the payload using Supabase RPC and the Service Role key.

## Viva Notes (Q&A)

**Q: Why use a separate backend server for writing blocks?**
A: To write blocks safely, you must use the `SERVICE_ROLE_KEY` to prevent unauthorized client-side insertions. Clients should only use the `ANON_KEY` to read data. The backend serves as a proxy, verifying the transaction logic before writing.

**Q: How does the chain verify itself?**
A: Every new block hashed incorporates the `block_hash` of the previous block. The Supabase RPC `verify_audit_chain` continuously re-hashes the payload and `prev_hash` to match the expected `block_hash` stored in the row. If someone alters the payload, the hashes mismatch, indicating a violation.

**Q: How is performance handled for long chains?**
A: For visualization and the block explorer, pagination (`LIMIT`/`OFFSET`) and querying only the most recent blocks prevent loading massive payloads. Verification can also be optimized by verifying segments or comparing periodic 'anchors' instead of recounting from Genesis on every client load.
