const nodemailer = require('nodemailer');

// Configure SMTP Transport with Secure Connection (recommended)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your preferred email provider
  auth: {
    user: 'dvnvictory@gmail.com', // Replace with your actual email address
    pass: '199100divine'  // Replace with your actual password (store securely)
  }
});

// Improved sendWelcomeEmail function with proper error handling
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: '"Mone-X" <dvnvictory@gmail.com>', // Use display name and email address
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
