<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Privacy Policy - Omni Brand Bot</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: "Inter", sans-serif;
            background-color: #F8FAFC;
            padding: 24px;
            color: #0F172A;
            line-height: 1.6;
        }

        .privacy-container {
            max-width: 800px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }

        .privacy-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid #E9E9EF;
        }

        .privacy-header h1 {
            font-size: 2rem;
            font-weight: 600;
            color: #0F172A;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .privacy-header h1 i {
            color: #7C3AED;
        }

        .back-link {
            color: #7C3AED;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9rem;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .last-updated {
            font-size: 0.85rem;
            color: #94A3B8;
            margin-bottom: 24px;
        }

        .privacy-section {
            margin-bottom: 32px;
        }

        .privacy-section h2 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #0F172A;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .privacy-section h2 i {
            color: #7C3AED;
            font-size: 1rem;
        }

        .privacy-section p {
            color: #475569;
            font-size: 0.95rem;
            margin-bottom: 12px;
        }

        .privacy-section ul {
            list-style: none;
            padding-left: 0;
        }

        .privacy-section ul li {
            padding: 6px 0 6px 24px;
            position: relative;
            color: #475569;
            font-size: 0.9rem;
        }

        .privacy-section ul li::before {
            content: '•';
            color: #7C3AED;
            font-weight: 600;
            position: absolute;
            left: 0;
        }

        .consent-banner {
            background: #EEF2FF;
            border-radius: 12px;
            padding: 20px;
            margin-top: 24px;
            border: 1px solid #E0E7FF;
        }

        .consent-banner h3 {
            font-size: 1rem;
            color: #4338CA;
            margin-bottom: 8px;
        }

        .consent-banner p {
            font-size: 0.9rem;
            color: #475569;
        }

        .btn {
            border: none;
            border-radius: 8px;
            padding: 8px 20px;
            font-weight: 500;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background-color 0.2s;
            font-family: "Inter", sans-serif;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: #7C3AED;
            color: white;
        }

        .btn-primary:hover {
            background: #6D28D9;
        }

        .btn-secondary {
            background: #F1F5F9;
            color: #475569;
        }

        .btn-secondary:hover {
            background: #E2E8F0;
        }

        .consent-actions {
            display: flex;
            gap: 12px;
            margin-top: 12px;
        }

        @media (max-width: 640px) {
            .privacy-container {
                padding: 24px;
            }
            .privacy-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="privacy-container">
        <!-- Header -->
        <div class="privacy-header">
            <h1><i class="fas fa-shield-alt"></i> Privacy Policy</h1>
            <a href="/" class="back-link"><i class="fas fa-arrow-left"></i> Back to Bot</a>
        </div>

        <div class="last-updated">
            <i class="far fa-clock"></i> Last updated: July 29, 2026
        </div>

        <!-- Introduction -->
        <div class="privacy-section">
            <h2><i class="fas fa-info-circle"></i> Introduction</h2>
            <p>
                Omni Brand Intelligence Bot ("we", "our", "us") is committed to protecting your privacy.
                This policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
            <p>
                By using the Omni Brand Intelligence Bot, you agree to the collection and use of information
                in accordance with this policy.
            </p>
        </div>

        <!-- Data Collection -->
        <div class="privacy-section">
            <h2><i class="fas fa-database"></i> What Data We Collect</h2>
            <ul>
                <li><strong>Chat History:</strong> Your questions and our responses are stored to improve the bot's performance and provide you with a better experience.</li>
                <li><strong>Feedback:</strong> Thumbs up/down ratings you provide help us improve our responses.</li>
                <li><strong>Usage Analytics:</strong> We collect anonymous usage data to understand how our bot is used and improve its features.</li>
                <li><strong>Technical Data:</strong> Basic information like your IP address, browser type, and device type for security and performance optimization.</li>
            </ul>
        </div>

        <!-- Data Usage -->
        <div class="privacy-section">
            <h2><i class="fas fa-cogs"></i> How We Use Your Data</h2>
            <ul>
                <li><strong>Improving the Bot:</strong> Your interactions help us train and refine our AI model to provide better answers.</li>
                <li><strong>Personalization:</strong> We use your chat history to provide contextually relevant responses.</li>
                <li><strong>Analytics:</strong> Aggregate usage patterns help us identify popular features and areas for improvement.</li>
                <li><strong>Security:</strong> We use technical data to protect against abuse and ensure service reliability.</li>
            </ul>
        </div>

        <!-- Data Storage -->
        <div class="privacy-section">
            <h2><i class="fas fa-server"></i> Data Storage & Security</h2>
            <ul>
                <li><strong>Data Retention:</strong> We retain your chat history for up to 30 days to improve our service.</li>
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest.</li>
                <li><strong>Access Control:</strong> Only authorized personnel have access to user data, and only for legitimate purposes.</li>
                <li><strong>Third-Party Processing:</strong> We use trusted third-party services (like Vercel and Groq) to process your requests securely.</li>
            </ul>
        </div>

        <!-- Your Rights -->
        <div class="privacy-section">
            <h2><i class="fas fa-user-shield"></i> Your Privacy Rights</h2>
            <p>Under GDPR and other privacy regulations, you have the following rights:</p>
            <ul>
                <li><strong>Access:</strong> Request a copy of your data.</li>
                <li><strong>Rectification:</strong> Correct any inaccurate data.</li>
                <li><strong>Erasure:</strong> Request deletion of your data.</li>
                <li><strong>Restrict Processing:</strong> Limit how we use your data.</li>
                <li><strong>Data Portability:</strong> Receive your data in a portable format.</li>
                <li><strong>Object:</strong> Object to the processing of your data.</li>
            </ul>
        </div>

        <!-- Consent Management -->
        <div class="consent-banner">
            <h3><i class="fas fa-check-circle"></i> Manage Your Consent</h3>
            <p>You can change your privacy settings at any time. You can also request to view, modify, or delete your data.</p>
            <div class="consent-actions">
                <button class="btn btn-primary" onclick="managePrivacy()">
                    <i class="fas fa-cog"></i> Manage Settings
                </button>
                <button class="btn btn-secondary" onclick="requestDataDeletion()">
                    <i class="fas fa-trash-alt"></i> Request Deletion
                </button>
                <button class="btn btn-secondary" onclick="exportData()">
                    <i class="fas fa-download"></i> Export Data
                </button>
            </div>
        </div>

        <!-- Cookies -->
        <div class="privacy-section">
            <h2><i class="fas fa-cookie-bite"></i> Cookies</h2>
            <p>
                We use minimal cookies to enhance your experience. Specifically, we use localStorage
                in your browser to store your chat history and preferences. No third-party tracking
                cookies are used.
            </p>
        </div>

        <!-- Contact -->
        <div class="privacy-section">
            <h2><i class="fas fa-envelope"></i> Contact Us</h2>
            <p>
                If you have any questions about this privacy policy or how your data is handled,
                please contact us at:
            </p>
            <p style="margin-top: 8px;">
                <strong>Email:</strong> <a href="mailto:privacy@omnibrandbot.com" style="color:#7C3AED;">privacy@omnibrandbot.com</a>
            </p>
        </div>

        <!-- Footer -->
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #E9E9EF;font-size:0.8rem;color:#94A3B8;text-align:center;">
            <p>© 2026 Omni Brand Intelligence Bot. All rights reserved.</p>
            <p style="margin-top:4px;">
                <i class="fas fa-shield-alt"></i> GDPR Compliant &bull;
                <i class="fas fa-lock"></i> Data Encrypted &bull;
                <i class="fas fa-user-check"></i> Your Data, Your Control
            </p>
        </div>
    </div>

    <script>
        // ============================================
        // PRIVACY MANAGEMENT FUNCTIONS
        // ============================================

        function managePrivacy() {
            // In production, this would open a settings modal or redirect to settings page
            alert('Privacy settings will open here. You can manage your consent, view stored data, and update preferences.');
        }

        function requestDataDeletion() {
            if (confirm('Are you sure you want to request deletion of all your data? This action cannot be undone.')) {
                // In production, this would call the /api/privacy DELETE endpoint
                alert('Deletion request submitted. You will receive a confirmation email shortly.');
            }
        }

        function exportData() {
            // In production, this would trigger a data export
            alert('Your data export is being prepared. You will receive a download link via email.');
        }

        // ============================================
        // CHECK PRIVACY SETTINGS ON LOAD
        // ============================================
        async function checkPrivacyStatus() {
            try {
                const response = await fetch('/api/privacy');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Privacy status:', data);
                }
            } catch (error) {
                console.error('Error checking privacy status:', error);
            }
        }

        // Check privacy status on page load
        checkPrivacyStatus();
    </script>
</body>
</html>
