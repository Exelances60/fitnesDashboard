require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailInfoForProduct = (to, from, subject, text, html) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };
  sgMail.send(msg);
};

module.exports = sendMailInfoForProduct;
