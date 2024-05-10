const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USERNAME, 
    pass: process.env.EMAIL_PASSWORD  
  }
});

// Improved sendWelcomeEmail function with proper error handling
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: 'Mone-X <dvnvictory@gmail.com>', 
    to: email,
    subject: 'Welcome to Our School',
    html: '<p>Thank you for signing up! <br> Proceed to register with your details</p>'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendWelcomeEmail;
