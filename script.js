document.addEventListener('DOMContentLoaded', function() {
    // Encryption explanations
    const explanations = {
        aes: `
            <h3>AES Encryption</h3>
            <p>AES (Advanced Encryption Standard) is a symmetric encryption algorithm that uses the same key for both encryption and decryption.</p>
            <h4>How it works:</h4>
            <ul>
                <li>Your message is divided into blocks</li>
                <li>Each block undergoes multiple rounds of substitution and permutation</li>
                <li>The same key is used to encrypt and decrypt the message</li>
                <li>Key sizes: 128, 192, or 256 bits</li>
            </ul>
            <h4>Security:</h4>
            <p>Considered extremely secure when using a strong key. Used by governments and security experts worldwide.</p>
        `,
        rsa: `
            <h3>RSA Encryption</h3>
            <p>RSA is an asymmetric encryption algorithm that uses a public/private key pair.</p>
            <h4>How to use:</h4>
            <ol>
                <li>Generate a key pair using the "Generate New Key Pair" button below</li>
                <li>Share your <strong>public key</strong> with others (it's safe to share)</li>
                <li>Keep your <strong>private key</strong> secure (never share it)</li>
                <li>Others can encrypt messages with your public key</li>
                <li>Only you can decrypt with your private key</li>
            </ol>
            <h4>Important:</h4>
            <ul>
                <li>Never share your private key</li>
                <li>Public keys should be in format: (e,n)</li>
                <li>Private keys should be in format: (d,n)</li>
                <li>For demonstration purposes, this uses small primes. Real applications use much larger keys.</li>
            </ul>
        `,
        caesar: `
            <h3>Caesar Cipher</h3>
            <p>One of the simplest and most ancient encryption techniques.</p>
            <h4>How it works:</h4>
            <ul>
                <li>Each letter in the plaintext is shifted by a fixed number down the alphabet</li>
                <li>The shift value acts as the key</li>
                <li>Example: With shift 3, A → D, B → E, etc.</li>
            </ul>
            <h4>Security:</h4>
            <p>Not secure for modern purposes. Easy to break with frequency analysis or brute force (only 25 possible keys).</p>
        `,
        default: `
            <h3>How to Use This Tool</h3>
            <ol>
                <li>Select whether you want to encrypt or decrypt</li>
                <li>Choose an encryption method</li>
                <li>Enter your message and any required keys</li>
                <li>Click the encrypt/decrypt button</li>
            </ol>
            <h4>Key Management:</h4>
            <ul>
                <li>For RSA: Generate keys first, then share public key for encryption</li>
                <li>For AES: Remember your password - it can't be recovered</li>
                <li>For Caesar: Remember your shift value</li>
            </ul>
        `
    };

    // RSA Key Pair
    let rsaKeys = {
        publicKey: { e: '', n: '' },
        privateKey: { d: '', n: '' }
    };

    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const encryptionMethod = document.getElementById('encryption-method');
    const decryptionMethod = document.getElementById('decryption-method');
    const rsaKeySection = document.getElementById('rsa-key-section');
    const symmetricKeySection = document.getElementById('symmetric-key-section');
    const decryptRsaKeySection = document.getElementById('decrypt-rsa-key-section');
    const decryptSymmetricKeySection = document.getElementById('decrypt-symmetric-key-section');
    const generateKeysBtn = document.getElementById('generate-keys-btn');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearEncryptBtn = document.getElementById('clear-encrypt-btn');
    const clearDecryptBtn = document.getElementById('clear-decrypt-btn');
    const explanationContent = document.getElementById('explanation-content');
    const copyEncryptedBtn = document.getElementById('copy-encrypted');
    const copyDecryptedBtn = document.getElementById('copy-decrypted');
    const copyKeyBtns = document.querySelectorAll('.copy-btn[data-target]');

    // Initialize UI
    updateKeySections();
    updateDecryptKeySections();
    updateExplanation('default');

    // Event Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    encryptionMethod.addEventListener('change', () => {
        updateKeySections();
        updateExplanation(encryptionMethod.value);
    });

    decryptionMethod.addEventListener('change', () => {
        updateDecryptKeySections();
        updateExplanation(decryptionMethod.value);
    });

    generateKeysBtn.addEventListener('click', generateNewRSAKeys);
    encryptBtn.addEventListener('click', encryptMessage);
    decryptBtn.addEventListener('click', decryptMessage);
    clearEncryptBtn.addEventListener('click', clearEncryptInterface);
    clearDecryptBtn.addEventListener('click', clearDecryptInterface);
    
    if (copyEncryptedBtn) {
        copyEncryptedBtn.addEventListener('click', () => copyToClipboard('encrypted-output'));
    }
    
    if (copyDecryptedBtn) {
        copyDecryptedBtn.addEventListener('click', () => copyToClipboard('decrypted-output'));
    }

    copyKeyBtns.forEach(btn => {
        btn.addEventListener('click', () => copyToClipboard(btn.dataset.target));
    });

    // Tab Switching
    function switchTab(tabName) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        const activeTab = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeTab) activeTab.classList.add('active');
        
        // Update explanation based on selected method in the active tab
        if (tabName === 'encrypt') {
            updateExplanation(encryptionMethod.value);
        } else {
            updateExplanation(decryptionMethod.value);
        }
    }

    // RSA Key Generation
    function generateNewRSAKeys() {
        setLoading(true, generateKeysBtn);
        setTimeout(() => {
            try {
                rsaKeys = generateRSAKeys();
                showAlert('New RSA key pair generated!', 'success');
            } catch (error) {
                console.error("Key generation error:", error);
                showAlert('Failed to generate RSA keys', 'error');
            } finally {
                setLoading(false, generateKeysBtn);
            }
        }, 100);
    }

    function generateRSAKeys() {
        // Generate two distinct primes
        const p = generateLargePrime();
        let q = generateLargePrime();
        while (q === p) {
            q = generateLargePrime(); // Ensure p and q are different
        }
        
        const n = p * q;
        const phi = (p - 1n) * (q - 1n);
        
        // Common public exponent
        let e = 65537n;
        
        // Ensure e and phi are coprime
        while (gcd(e, phi) !== 1n) {
            e += 2n;
        }
        
        // Calculate modular inverse (private exponent)
        const d = modInverse(e, phi);
        
        const keys = {
            publicKey: { e: e.toString(), n: n.toString() },
            privateKey: { d: d.toString(), n: n.toString() }
        };
        
        // Update UI
        document.getElementById('public-key').textContent = `(${e}, ${n})`;
        document.getElementById('private-key').textContent = `(${d}, ${n})`;
        
        return keys;
    }

    function generateLargePrime() {
        // For demonstration purposes - in real use, generate much larger primes
        const primes = [
            101n, 103n, 107n, 109n, 113n, 127n, 131n, 137n, 139n, 149n,
            151n, 157n, 163n, 167n, 173n, 179n, 181n, 191n, 193n, 197n,
            199n, 211n, 223n, 227n, 229n, 233n, 239n, 241n, 251n, 257n
        ];
        return primes[Math.floor(Math.random() * primes.length)];
    }

    function gcd(a, b) {
        while (b !== 0n) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    function modInverse(a, m) {
        let [old_r, r] = [a, m];
        let [old_s, s] = [1n, 0n];
        let [old_t, t] = [0n, 1n];
        
        while (r !== 0n) {
            const quotient = old_r / r;
            [old_r, r] = [r, old_r - quotient * r];
            [old_s, s] = [s, old_s - quotient * s];
            [old_t, t] = [t, old_t - quotient * t];
        }
        
        if (old_r !== 1n) throw new Error('Inverse does not exist');
        return old_s < 0n ? old_s + m : old_s;
    }

    // RSA Encryption
    function rsaEncrypt(message, publicKey) {
        try {
            const { e, n } = publicKey;
            const eBig = BigInt(e);
            const nBig = BigInt(n);
            
            // Encrypt each character separately (for demonstration)
            // In real applications, you would use proper message padding and chunking
            return Array.from(message).map(char => {
                const code = BigInt(char.charCodeAt(0));
                if (code >= nBig) {
                    throw new Error('Message too large for current key size');
                }
                return modPow(code, eBig, nBig).toString();
            }).join(',');
        } catch (error) {
            console.error("RSA Encryption Error:", error);
            showAlert('RSA encryption failed: ' + error.message, 'error');
            return '';
        }
    }

    // RSA Decryption
    function rsaDecrypt(encrypted, privateKey) {
        try {
            const { d, n } = privateKey;
            const dBig = BigInt(d);
            const nBig = BigInt(n);
            
            return encrypted.split(',').map(numStr => {
                const num = BigInt(numStr);
                const decryptedNum = modPow(num, dBig, nBig);
                return String.fromCharCode(Number(decryptedNum));
            }).join('');
        } catch (error) {
            console.error("RSA Decryption Error:", error);
            showAlert('RSA decryption failed: ' + error.message, 'error');
            return '';
        }
    }

    function modPow(base, exp, mod) {
        let result = 1n;
        base = base % mod;
        
        while (exp > 0n) {
            if (exp % 2n === 1n) {
                result = (result * base) % mod;
            }
            exp = exp / 2n;
            base = (base * base) % mod;
        }
        return result;
    }

    // Encryption Function
    function encryptMessage() {
        const input = document.getElementById('input-message')?.value;
        const method = encryptionMethod.value;

        if (!validateInput(input, method)) return;

        setLoading(true, encryptBtn);
        
        setTimeout(() => {
            try {
                let encrypted;
                if (method === 'aes') {
                    const key = document.getElementById('encryption-key')?.value;
                    if (!key) {
                        showAlert('Please enter an AES password');
                        setLoading(false, encryptBtn);
                        return;
                    }
                    encrypted = CryptoJS.AES.encrypt(input, key).toString();
                } else if (method === 'rsa') {
                    const publicKeyInput = document.getElementById('rsa-public-key-input')?.value;
                    if (!publicKeyInput) {
                        showAlert('Please enter recipient\'s public key');
                        setLoading(false, encryptBtn);
                        return;
                    }
                    
                    const publicKey = parseKey(publicKeyInput);
                    encrypted = rsaEncrypt(input, publicKey);
                } else if (method === 'caesar') {
                    const shift = parseInt(document.getElementById('encryption-key')?.value);
                    if (isNaN(shift)) {
                        showAlert('Please enter a valid shift value (1-25)');
                        setLoading(false, encryptBtn);
                        return;
                    }
                    encrypted = caesarEncrypt(input, shift);
                }
                
                const encryptedOutput = document.getElementById('encrypted-output');
                const encryptedMessageInput = document.getElementById('encrypted-message');
                
                if (encryptedOutput) encryptedOutput.textContent = encrypted;
                if (encryptedMessageInput) encryptedMessageInput.value = encrypted;
                
                showAlert('Message encrypted successfully!', 'success');
            } catch (e) {
                console.error("Encryption error:", e);
                showAlert('Encryption failed: ' + (e.message || 'Unknown error'));
            } finally {
                setLoading(false, encryptBtn);
            }
        }, 100);
    }

    // Decryption Function
    function decryptMessage() {
        const input = document.getElementById('encrypted-message')?.value;
        const method = decryptionMethod.value;

        if (!validateInput(input, method)) return;

        setLoading(true, decryptBtn);
        
        setTimeout(() => {
            try {
                let decrypted;
                if (method === 'aes') {
                    const key = document.getElementById('decryption-key')?.value;
                    if (!key) {
                        showAlert('Please enter an AES password');
                        setLoading(false, decryptBtn);
                        return;
                    }
                    const bytes = CryptoJS.AES.decrypt(input, key);
                    decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    if (!decrypted) throw new Error('Invalid key or encrypted message');
                } else if (method === 'rsa') {
                    const privateKeyInput = document.getElementById('rsa-private-key-input')?.value;
                    if (!privateKeyInput) {
                        showAlert('Please provide your private key');
                        setLoading(false, decryptBtn);
                        return;
                    }
                    
                    const privateKey = parseKey(privateKeyInput);
                    decrypted = rsaDecrypt(input, privateKey);
                } else if (method === 'caesar') {
                    const shift = parseInt(document.getElementById('decryption-key')?.value);
                    if (isNaN(shift)) {
                        showAlert('Please enter a valid shift value (1-25)');
                        setLoading(false, decryptBtn);
                        return;
                    }
                    decrypted = caesarDecrypt(input, shift);
                }
                
                const decryptedOutput = document.getElementById('decrypted-output');
                if (decryptedOutput) decryptedOutput.textContent = decrypted;
                
                showAlert('Message decrypted successfully!', 'success');
            } catch (e) {
                console.error("Decryption error:", e);
                showAlert('Decryption failed: ' + (e.message || 'Unknown error'));
            } finally {
                setLoading(false, decryptBtn);
            }
        }, 100);
    }

    // Caesar Cipher
    function caesarEncrypt(message, shift) {
        shift = shift % 26;
        return message.replace(/[a-zA-Z]/g, char => {
            const code = char.charCodeAt(0);
            const base = char >= 'A' && char <= 'Z' ? 65 : 97;
            return String.fromCharCode((code - base + shift + 26) % 26 + base);
        });
    }

    function caesarDecrypt(message, shift) {
        return caesarEncrypt(message, 26 - (shift % 26));
    }

    // Helper function to parse RSA keys
    function parseKey(keyString) {
        try {
            if (!keyString) throw new Error('Empty key string');
            
            const match = keyString.match(/\((\d+),\s*(\d+)\)/);
            if (!match || match.length < 3) {
                throw new Error('Invalid key format. Expected format: (number, number)');
            }
            return {
                e: match[1],
                d: match[1],
                n: match[2]
            };
        } catch (e) {
            console.error("Key parsing error:", e);
            showAlert('Key parsing error: ' + e.message);
            throw e;
        }
    }

    // Input validation
    function validateInput(input, method) {
        if (!input || !input.trim()) {
            showAlert('Please enter a message');
            return false;
        }
        
        if (method === 'rsa' && input.length > 1000) {
            showAlert('RSA encryption is limited to 1000 characters for this demo');
            return false;
        }
        
        return true;
    }

    // Update UI Sections
    function updateKeySections() {
        const method = encryptionMethod.value;
        
        if (method === 'rsa') {
            if (rsaKeySection) rsaKeySection.style.display = 'block';
            if (symmetricKeySection) symmetricKeySection.style.display = 'none';
        } else {
            if (rsaKeySection) rsaKeySection.style.display = 'none';
            if (symmetricKeySection) symmetricKeySection.style.display = 'block';
            
            const encryptionKeyInput = document.getElementById('encryption-key');
            if (encryptionKeyInput) {
                encryptionKeyInput.placeholder = method === 'caesar' ? 'Enter shift value (1-25)' : 'Enter AES password';
            }
        }
    }

    function updateDecryptKeySections() {
        const method = decryptionMethod.value;
        
        if (method === 'rsa') {
            if (decryptRsaKeySection) decryptRsaKeySection.style.display = 'block';
            if (decryptSymmetricKeySection) decryptSymmetricKeySection.style.display = 'none';
        } else {
            if (decryptRsaKeySection) decryptRsaKeySection.style.display = 'none';
            if (decryptSymmetricKeySection) decryptSymmetricKeySection.style.display = 'block';
            
            const decryptionKeyInput = document.getElementById('decryption-key');
            if (decryptionKeyInput) {
                decryptionKeyInput.placeholder = method === 'caesar' ? 'Enter shift value (1-25)' : 'Enter AES password';
            }
        }
    }

    // Update Explanation
    function updateExplanation(method) {
        if (explanationContent) {
            explanationContent.innerHTML = explanations[method] || explanations.default;
        }
    }

    // Clear Interfaces
    function clearEncryptInterface() {
        const inputMessage = document.getElementById('input-message');
        const encryptionKey = document.getElementById('encryption-key');
        const encryptedOutput = document.getElementById('encrypted-output');
        
        if (inputMessage) inputMessage.value = '';
        if (encryptionKey) encryptionKey.value = '';
        if (encryptedOutput) encryptedOutput.textContent = '';
        
        showAlert('Encrypt interface cleared', 'success');
    }

    function clearDecryptInterface() {
        const encryptedMessage = document.getElementById('encrypted-message');
        const decryptionKey = document.getElementById('decryption-key');
        const rsaPublicKeyInput = document.getElementById('rsa-public-key-input');
        const rsaPrivateKeyInput = document.getElementById('rsa-private-key-input');
        const decryptedOutput = document.getElementById('decrypted-output');
        
        if (encryptedMessage) encryptedMessage.value = '';
        if (decryptionKey) decryptionKey.value = '';
        if (rsaPublicKeyInput) rsaPublicKeyInput.value = '';
        if (rsaPrivateKeyInput) rsaPrivateKeyInput.value = '';
        if (decryptedOutput) decryptedOutput.textContent = '';
        
        showAlert('Decrypt interface cleared', 'success');
    }

    // Loading state
    function setLoading(state, button) {
        if (!button) return;
        
        button.disabled = state;
        button.classList.toggle('loading', state);
        
        const btnText = button.querySelector('.btn-text');
        if (btnText) {
            btnText.style.visibility = state ? 'hidden' : 'visible';
        }
    }

    // Copy to Clipboard
    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const text = element.textContent || element.value;
        if (!text) return;
        
        navigator.clipboard.writeText(text).then(() => {
            showAlert('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showAlert('Failed to copy text');
        });
    }

    // Show Alert
    function showAlert(message, type = 'error') {
        // Remove any existing alerts first
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 3000);
    }
});