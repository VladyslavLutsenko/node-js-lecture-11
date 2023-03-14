const nodemailer = require('nodemailer');

const {EMAIL_USER,EMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
  host: '127.0.0.1',
  port: 1025,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (email) => {
  const emailToSend = {
    from: EMAIL_USER,
    ...email
  };

  try {
    await transport.sendMail(emailToSend)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = sendMail;
