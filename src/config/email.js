const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "parasnathhills@gmail.com",
    pass: "vurb wfca ursa enby",
  },
});

module.exports = transporter;
