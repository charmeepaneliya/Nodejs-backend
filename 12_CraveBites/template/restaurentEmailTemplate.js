
const restaurantEmailTemplate = (name, restaurantName) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restaurant Added Successfully</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f7fb;
  font-family: Arial, Helvetica, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          max-width: 600px;
          width: 100%;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <tr>
            <td align="center" style="
              background: linear-gradient(135deg, #ff6b35, #ff3d00);
              padding: 35px 20px;
              color: #ffffff;
            ">

              <div style="
                font-size: 42px;
                margin-bottom: 8px;
              ">
                🍔
              </div>

              <h1 style="
                margin: 0;
                font-size: 28px;
                font-weight: 700;
              ">
                CraveBites
              </h1>

              <p style="
                margin: 8px 0 0;
                font-size: 14px;
                opacity: 0.9;
              ">
                Your Restaurant. Your Customers. Your Growth.
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
                🎉 Restaurant Added Successfully!
              </h2>

              <p style="
                color: #555555;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 20px;
              ">
                Hello <strong>${name}</strong>,
              </p>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.7;
              ">
                Congratulations! Your restaurant has been successfully
                registered with <strong>CraveBites</strong>.
              </p>

              <!-- Restaurant Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="
                background: #fff7f3;
                border-left: 5px solid #ff6b35;
                border-radius: 8px;
                margin: 25px 0;
              ">
                <tr>
                  <td style="padding: 20px;">

                    <p style="
                      margin: 0 0 6px;
                      color: #777777;
                      font-size: 13px;
                    ">
                      RESTAURANT
                    </p>

                    <p style="
                      margin: 0;
                      color: #222222;
                      font-size: 20px;
                      font-weight: 700;
                    ">
                      🍽️ ${restaurantName}
                    </p>

                    <p style="
                      margin: 8px 0 0;
                      color: #28a745;
                      font-size: 14px;
                      font-weight: 600;
                    ">
                      ✓ Successfully Registered
                    </p>

                  </td>
                </tr>
              </table>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.7;
              ">
                You can now manage your restaurant, update your menu,
                and start receiving food orders from customers.
              </p>

              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                <tr>
                  <td width="33%" align="center" style="padding: 10px;">
                    <div style="font-size: 28px;">📋</div>
                    <p style="font-size: 12px; color: #555;">
                      Manage Menu
                    </p>
                  </td>

                  <td width="33%" align="center" style="padding: 10px;">
                    <div style="font-size: 28px;">🛍️</div>
                    <p style="font-size: 12px; color: #555;">
                      Receive Orders
                    </p>
                  </td>

                  <td width="33%" align="center" style="padding: 10px;">
                    <div style="font-size: 28px;">📈</div>
                    <p style="font-size: 12px; color: #555;">
                      Grow Business
                    </p>
                  </td>
                </tr>
              </table>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.7;
                margin-bottom: 0;
              ">
                We're excited to have you as part of the
                <strong>CraveBites</strong> family. ❤️
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="
              background: #f8f9fa;
              padding: 25px 20px;
              border-top: 1px solid #eeeeee;
            ">

              <p style="
                margin: 0 0 8px;
                color: #333333;
                font-size: 15px;
                font-weight: 600;
              ">
                CraveBites Team 🍔
              </p>

              <p style="
                margin: 0;
                color: #999999;
                font-size: 12px;
                line-height: 1.6;
              ">
                Thank you for choosing CraveBites.<br />
                © 2026 CraveBites. All rights reserved.
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

export default restaurantEmailTemplate;

