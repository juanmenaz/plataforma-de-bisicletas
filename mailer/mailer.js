
const nodemailer = require("nodemailer");

const mailConfig = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'adafdasf@ethereal.email',
      pass: 'asdadadad,#fsddsf14'
  }
});

module.exports = nodemailer.createTransport(mailConfig)