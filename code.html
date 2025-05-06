<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Encryption Tool</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e9ecef;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .container {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            padding: 30px;
            width: 100%;
            max-width: 700px;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 25px;
            font-size: 24px;
        }

        .section {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #34495e;
            font-weight: 600;
            font-size: 14px;
        }

        textarea {
            width: 100%;
            height: 120px;
            padding: 12px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            resize: vertical;
            font-size: 14px;
            box-sizing: border-box;
        }

        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            font-size: 14px;
            background-color: #fff;
            cursor: pointer;
        }

        button {
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px 5px;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #0056b3;
        }

        #decryptBtn {
            background-color: #28a745;
        }

        #decryptBtn:hover {
            background-color: #218838;
        }

        .output {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #ced4da;
            min-height: 60px;
            word-break: break-all;
            font-size: 14px;
        }

        .key-section {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .key-section input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            font-size: 14px;
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px;
            }

            button {
                width: 100%;
                margin: 10px 0;
            }

            .key-section {
                flex-direction: column;
                gap: 10px;
            }

            .key-section input {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Message Encryption Tool</h1>

        <div class="section">
            <label for="inputMessage">Enter Your Message:</label>
            <textarea id="inputMessage" placeholder="Type your message here..."></textarea>
        </div>

        <div class="section">
            <label for="encryptionMethod">Select Encryption Method:</label>
            <select id="encryptionMethod" onchange="toggleKeyInput()">
                <option value="aes">AES</option>
                <option value="rsa">RSA</option>
                <option value="caesar">Caesar Cipher</option>
            </select>
        </div>

        <div class="section key-section" id="keySection">
            <label for="keyInput">Key (AES Password / Caesar Shift):</label>
            <input type="text" id="keyInput" placeholder="Enter key or shift value">
        </div>

        <div class="section">
            <button onclick="encryptMessage()">Encrypt Message</button>
        </div>

        <div class="section">
            <label>Encrypted Message:</label>
            <div id="encryptedOutput" class="output"></div>
        </div>

        <div class="section">
            <label for="encryptedInput">Enter Encrypted Message:</label>
            <textarea id="encryptedInput" placeholder="Paste encrypted message here..."></textarea>
        </div>

        <div class="section key-section" id="decryptKeySection">
            <label for="decryptKeyInput">Key (AES Password / Caesar Shift):</label>
            <input type="text" id="decryptKeyInput" placeholder="Enter key or shift value">
        </div>

        <div class="section">
            <button id="decryptBtn" onclick="decryptMessage()">Decrypt Message</button>
        </div>

        <div class="section">
            <label>Decrypted Message:</label>
            <div id="decryptedOutput" class="output"></div>
        </div>
    </div>

    <script>
        // RSA key generation (simplified for demonstration)
        function generateRSAKeys() {
            // Using small prime numbers for simplicity (not secure for production)
            const p = 61;
            const q = 53;
            const n = p * q;
            const phi = (p - 1) * (q - 1);
            let e = 17; // Public key exponent
            let d = modInverse(e, phi); // Private key exponent
            return { publicKey: { e, n }, privateKey: { d, n } };
        }

        function modInverse(e, phi) {
            for (let d = 1; d < phi; d++) {
                if ((e * d) % phi === 1) return d;
            }
            throw new Error("Modular inverse does not exist");
        }

        function rsaEncrypt(message, publicKey) {
            return [...message].map(char => {
                const code = char.charCodeAt(0);
                return modPow(code, publicKey.e, publicKey.n);
            }).join(",");
        }

        function rsaDecrypt(encrypted, privateKey) {
            return encrypted.split(",").map(num => {
                const code = modPow(parseInt(num), privateKey.d, privateKey.n);
                return String.fromCharCode(code);
            }).join("");
        }

        function modPow(base, exp, mod) {
            let result = 1;
            base = base % mod;
            while (exp > 0) {
                if (exp & 1) result = (result * base) % mod;
                base = (base * base) % mod;
                exp >>= 1;
            }
            return result;
        }

        // Caesar Cipher implementation
        function caesarEncrypt(message, shift) {
            return message.replace(/[a-zA-Z]/g, char => {
                const code = char.charCodeAt(0);
                const base = char >= 'A' && char <= 'Z' ? 65 : 97;
                return String.fromCharCode((code - base + shift) % 26 + base);
            });
        }

        function caesarDecrypt(message, shift) {
            return caesarEncrypt(message, 26 - shift);
        }

        // Toggle key input visibility based on encryption method
        function toggleKeyInput() {
            const method = document.getElementById('encryptionMethod').value;
            const keySection = document.getElementById('keySection');
            const decryptKeySection = document.getElementById('decryptKeySection');
            if (method === 'rsa') {
                keySection.style.display = 'none';
                decryptKeySection.style.display = 'none';
            } else {
                keySection.style.display = 'flex';
                decryptKeySection.style.display = 'flex';
                document.getElementById('keyInput').placeholder = method === 'caesar' ? 'Enter shift value (1-25)' : 'Enter AES password';
                document.getElementById('decryptKeyInput').placeholder = method === 'caesar' ? 'Enter shift value (1-25)' : 'Enter AES password';
            }
        }

        // Initialize RSA keys
        let rsaKeys = generateRSAKeys();
        toggleKeyInput();

        // Encrypt message
        function encryptMessage() {
            const input = document.getElementById('inputMessage').value;
            const method = document.getElementById('encryptionMethod').value;
            const key = document.getElementById('keyInput').value;

            if (!input) {
                alert('Please enter a message to encrypt');
                return;
            }

            let encrypted;
            try {
                if (method === 'aes') {
                    if (!key) {
                        alert('Please enter an AES password');
                        return;
                    }
                    encrypted = CryptoJS.AES.encrypt(input, key).toString();
                } else if (method === 'rsa') {
                    encrypted = rsaEncrypt(input, rsaKeys.publicKey);
                } else if (method === 'caesar') {
                    const shift = parseInt(key);
                    if (isNaN(shift) || shift < 1 || shift > 25) {
                        alert('Please enter a valid shift value (1-25)');
                        return;
                    }
                    encrypted = caesarEncrypt(input, shift);
                }
                document.getElementById('encryptedOutput').textContent = encrypted;
                document.getElementById('encryptedInput').value = encrypted;
            } catch (e) {
                alert('Encryption failed: ' + e.message);
            }
        }

        // Decrypt message
        function decryptMessage() {
            const input = document.getElementById('encryptedInput').value;
            const method = document.getElementById('encryptionMethod').value;
            const key = document.getElementById('decryptKeyInput').value;

            if (!input) {
                alert('Please enter an encrypted message');
                return;
            }

            let decrypted;
            try {
                if (method === 'aes') {
                    if (!key) {
                        alert('Please enter an AES password');
                        return;
                    }
                    decrypted = CryptoJS.AES.decrypt(input, key).toString(CryptoJS.enc.Utf8);
                    if (!decrypted) throw new Error('Invalid key or encrypted message');
                } else if (method === 'rsa') {
                    decrypted = rsaDecrypt(input, rsaKeys.privateKey);
                } else if (method === 'caesar') {
                    const shift = parseInt(key);
                    if (isNaN(shift) || shift < 1 || shift > 25) {
                        alert('Please enter a valid shift value (1-25)');
                        return;
                    }
                    decrypted = caesarDecrypt(input, shift);
                }
                document.getElementById('decryptedOutput').textContent = decrypted;
            } catch (e) {
                alert('Decryption failed: ' + e.message);
            }
        }
    </script>
</body>
</html>
