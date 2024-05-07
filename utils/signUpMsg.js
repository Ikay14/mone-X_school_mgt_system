const nodemailer = require('nodemailer')

var smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
      user: 'dvnvictory@gmail.com',
      pass: '###'
    }
  }));

const sendWelcomeEmail = async (email) => {
    const mailOptions = {
        from: '"Your Name" <dvnvictory@gmail.com>',
        to: email,
        subject: 'Welcome to Our App',
        html: '<p>Thank you for signing up! <br> proceed to register with your details</p>'
    };

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Welcome email sent to:', email);
        }
    });
};

module.exports = sendWelcomeEmail;
