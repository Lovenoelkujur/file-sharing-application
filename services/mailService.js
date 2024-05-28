const nodemailer = require('nodemailer');

// NodeMailer Transpoter (MailDev)
const transporter = nodemailer.createTransport({
    host: 'localhost', // Replace with your provider's SMTP server
    port: 1025, // Port may vary depending on your provider
    secure: false, // Use true for TLS, false for non-TLS (consult your provider)
});

module.exports = transporter;