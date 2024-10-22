export const verificationEmailTemplate = (
  verificationCode: string,
  language: "en" | "de",
) => {
  const isGerman = language === "de";

  return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
          }

          h1 {
            color: #333333;
            text-align: center;
          }

          p {
            color: #666666;
            line-height: 1.5;
            text-align: center;
          }

          .code {
            display: block;
            margin: 20px auto;
            padding: 10px;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 20px;
            text-align: center;
            border: 1px dashed #007bff;
            border-radius: 5px;
            width: fit-content;
          }

          .expire-time {
            text-align: center;
            margin-top: 10px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${
            isGerman
              ? "Bestätigen Sie Ihre E-Mail-Adresse"
              : "Verify Your Email Address"
          }</h1>
          <p>
            ${
              isGerman
                ? "Vielen Dank für Ihre Anmeldung! Um Ihre Registrierung abzuschließen, geben Sie bitte den folgenden Bestätigungscode auf unserer Website ein:"
                : "Thank you for signing up! To complete your registration, please enter the following verification code on our website:"
            }
          </p>
          <div class="code">${verificationCode}</div>
          <p class="expire-time">${
            isGerman
              ? "Dieser Code läuft in 30 Minuten ab."
              : "This code expires in 30 minutes."
          }</p>
        </div>
      </body>
    </html>
    `;
};
