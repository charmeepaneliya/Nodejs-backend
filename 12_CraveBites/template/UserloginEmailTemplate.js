
const loginEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Login Detected</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#f4f6f8;
  font-family:Arial, Helvetica, sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
  <tr>
    <td align="center">

      <!-- Main Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="
        max-width:600px;
        width:100%;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        box-shadow:0 6px 25px rgba(0,0,0,0.08);
      ">

        <!-- Header -->
        <tr>
          <td align="center" style="
            background:linear-gradient(135deg,#ff6b35,#ff3d00);
            padding:32px 20px;
            color:#ffffff;
          ">

            <div style="font-size:42px;">🍔</div>

            <h1 style="
              margin:8px 0 0;
              font-size:27px;
            ">
              CraveBites
            </h1>

            <p style="
              margin:7px 0 0;
              font-size:13px;
              opacity:0.9;
            ">
              Delicious Food. Delivered With Care.
            </p>

          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px 35px;">

            <div style="
              width:65px;
              height:65px;
              background:#fff4ef;
              border-radius:50%;
              text-align:center;
              line-height:65px;
              font-size:30px;
              margin-bottom:20px;
            ">
              🔐
            </div>

            <h2 style="
              margin:0 0 15px;
              color:#222222;
              font-size:24px;
            ">
              New Login Detected
            </h2>

            <p style="
              margin:0 0 18px;
              color:#555555;
              font-size:16px;
              line-height:1.7;
            ">
              Hello <strong>${name}</strong>,
            </p>

            <p style="
              margin:0;
              color:#555555;
              font-size:15px;
              line-height:1.7;
            ">
              We noticed a successful login to your
              <strong>CraveBites</strong> account.
            </p>

            <!-- Login Info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="
              margin:25px 0;
              background:#f8f9fa;
              border-radius:10px;
            ">
              <tr>
                <td style="padding:20px;">

                  <p style="
                    margin:0 0 12px;
                    color:#777777;
                    font-size:13px;
                  ">
                    LOGIN ACTIVITY
                  </p>

                  <p style="
                    margin:8px 0;
                    color:#333333;
                    font-size:14px;
                  ">
                    🟢 <strong>Status:</strong> Successful
                  </p>

                  <p style="
                    margin:8px 0;
                    color:#333333;
                    font-size:14px;
                  ">
                    🔑 <strong>Account:</strong> CraveBites User
                  </p>

                  <p style="
                    margin:8px 0 0;
                    color:#333333;
                    font-size:14px;
                  ">
                    🕐 <strong>Time:</strong> Just now
                  </p>

                </td>
              </tr>
            </table>

            <!-- Security Message -->
            <p style="
              color:#555555;
              font-size:14px;
              line-height:1.7;
            ">
              If this was you, you don't need to do anything.
              Your account is safe and ready to use.
            </p>

            <p style="
              color:#555555;
              font-size:14px;
              line-height:1.7;
            ">
              If you don't recognize this activity, please change
              your password immediately and secure your account.
            </p>

            <!-- Button -->
            <table cellpadding="0" cellspacing="0" style="margin:25px 0 10px;">
              <tr>
                <td style="
                  background:#ff5a1f;
                  border-radius:8px;
                ">
                  <a href="#"
                    style="
                      display:inline-block;
                      padding:13px 25px;
                      color:#ffffff;
                      text-decoration:none;
                      font-size:14px;
                      font-weight:bold;
                    ">
                    Secure My Account
                  </a>
                </td>
              </tr>
            </table>

            <p style="
              margin:25px 0 0;
              color:#999999;
              font-size:12px;
              line-height:1.6;
            ">
              For your security, never share your password or
              verification codes with anyone.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="
            background:#f8f9fa;
            padding:25px 20px;
            border-top:1px solid #eeeeee;
          ">

            <p style="
              margin:0 0 7px;
              color:#333333;
              font-size:14px;
              font-weight:bold;
            ">
              CraveBites Team 🍔
            </p>

            <p style="
              margin:0;
              color:#999999;
              font-size:12px;
              line-height:1.6;
            ">
              You're receiving this email because a login
              occurred on your CraveBites account.
              <br />
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

export default loginEmailTemplate;

