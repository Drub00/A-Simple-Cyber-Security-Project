Message Encryption Tool:-
A web-based tool for encrypting/decrypting messages using:
- AES (symmetric encryption)
- RSA (asymmetric encryption) 
- Caesar Cipher (historical substitution cipher)

Features:-
- Real-time client-side processing
- Responsive UI with input validation
- Toggle between encryption methods
- Auto-generated RSA keys (demo mode)

Quick Start:-
1. Clone repo:  
`git clone https://github.com/yourusername/encryption-tool.git`
2. Open `index.html` in any browser

Usage:-
1. Select algorithm  
2. Enter message + required key:  
   - AES: Password string  
   - RSA: Auto-generated keys  
   - Caesar: Shift value (1-25)  
3. Click Encrypt/Decrypt

Notes:-
Security Limitations:  
- RSA uses small primes (educational use only)  
- Caesar Cipher provides no real security  
- No data persistence (reset on refresh)
