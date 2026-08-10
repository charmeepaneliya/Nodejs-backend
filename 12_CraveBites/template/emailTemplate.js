const emailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Welcome to CraveBites</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  font-family: Arial, Helvetica, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          max-width: 600px;
          width: 100%;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <tr>
            <td align="center" style="
              background-color: #ff6b35;
              padding: 30px 20px;
            ">

              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 30px;
                letter-spacing: 1px;
              ">
                🍔 CraveBites
              </h1>

              <p style="
                margin: 8px 0 0;
                color: #fff4ee;
                font-size: 14px;
              ">
                Delicious food. Delivered with love.
              </p>

            </td>
          </tr>


          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px;">

              <h2 style="
                margin: 0 0 15px;
                color: #222222;
                font-size: 24px;
              ">
                Welcome, ${name}! 🎉
              </h2>

              <p style="
                margin: 0 0 18px;
                color: #555555;
                font-size: 16px;
                line-height: 1.7;
              ">
                We're excited to have you as a part of the
                <strong>CraveBites</strong> family.
              </p>

              <p style="
                margin: 0 0 25px;
                color: #555555;
                font-size: 15px;
                line-height: 1.7;
              ">
                Your account has been successfully created.
                Get ready to explore delicious meals, discover
                amazing restaurants, and satisfy your cravings.
              </p>


              <!-- Highlight Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background-color: #fff4ee;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                  ">

                    <p style="
                      margin: 0;
                      color: #ff6b35;
                      font-size: 18px;
                      font-weight: bold;
                    ">
                      🍕 Your cravings, our mission!
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      color: #666666;
                      font-size: 14px;
                    ">
                      Discover. Order. Enjoy.
                    </p>

                  </td>
                </tr>
              </table>


              <!-- Button -->
              <div style="text-align: center; margin-top: 30px;">

                <a href="http://localhost:5000"
                  style="
                    display: inline-block;
                    padding: 14px 30px;
                    background-color: #ff6b35;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: bold;
                  ">
                  Explore CraveBites 🍴
                </a>

              </div>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td style="
              background-color: #fafafa;
              padding: 25px;
              text-align: center;
              border-top: 1px solid #eeeeee;
            ">

              <p style="
                margin: 0 0 8px;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
              ">
                CraveBites Team ❤️
              </p>

              <p style="
                margin: 0;
                color: #888888;
                font-size: 12px;
                line-height: 1.6;
              ">
                Thank you for choosing CraveBites.
                <br />
                This is an automated email. Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export default emailTemplate;