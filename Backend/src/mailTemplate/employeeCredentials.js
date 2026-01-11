const employeeCredentials = (name, email, password) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Your HRMS Account Details</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .logo {
        max-width: 180px;
        margin-bottom: 20px;
      }

      .message {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
        text-align: left;
      }

      .credentials {
        background-color: #f4f6f8;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }

      .highlight {
        font-weight: bold;
      }

      .warning {
        color: #d9534f;
        font-size: 14px;
        margin-top: 15px;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }
    </style>
  </head>

  <body>

      <div class="message">Welcome to the HRMS Portal</div>

      <div class="body">
        <p>Hi ${name},</p>

        <p>
          Your employee account has been successfully created in our HRMS
          system. Below are your login credentials:
        </p>

        <div class="credentials">
          <p><span class="highlight">Email:</span> ${email}</p>
          <p><span class="highlight">Temporary Password:</span> ${password}</p>
        </div>

        <p>
          Please use these credentials to log in to the HRMS portal. For security
          reasons, we strongly recommend that you change your password
          immediately after your first login.
        </p>

        <p class="warning">
          If you did not expect this email or believe this account was created by
          mistake, please contact HR immediately.
        </p>
      </div>

      <div class="support">
        If you need help, reach out to us at
        <a href="mailto:hr@company.com">hr@company.com</a>.
      </div>
    </div>
  </body>
  </html>`;
};

export default employeeCredentials;
