"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendMailOrderCreate = (to, from, subject, text, data) => {
    const mappingData = [];
    mappingData.push(data);
    const msg = {
        to,
        from,
        subject,
        text,
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                text-align: center;
            }
            .order-details {
                margin-top: 20px;
            }
            .order-item {
                border-bottom: 1px solid #ccc;
                padding: 10px 0;
            }
            .order-item:last-child {
                border-bottom: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Order Confirmation</h1>
            <div class="order-details">
                <p>Dear Customer,</p>
                <p>Your order has been successfully placed!</p>
                <p>Here are the details of your order:</p>
                <div class="order-items">
                    ${mappingData
            .map((item) => `
                        <div class="order-item">
                            <img src="${`http://localhost:8080/${item.imageUrl}`}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;">
                            <p>${item.name}</p>
                            <p>Price: ${item.price}TL | Amount: ${item.amount}</p>
                        </div>
                        `)
            .join("")}
                </div>
                <p>Total: <strong>${data.totalPrice} TL</strong></p>
                <p>Thank you for shopping with us!</p>
            </div>
        </div>
    </body>
    </html>`,
    };
    mail_1.default.send(msg);
};
exports.default = sendMailOrderCreate;
/* var nodemailer = require("nodemailer");

async function sendEmail(toEmail, subject, text, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "E-Commerce",
      address: process.env.SENDER_MAIL,
    },
    to: toEmail,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
 */
//# sourceMappingURL=sendMailOrderCreate.js.map