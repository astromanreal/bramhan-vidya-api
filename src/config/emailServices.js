const sendNewUserMsg = async (email, userId, name) => {
  const mailOptions = {
    from: "parasnathhills@gmail.com",
    to: "astroman6569@gmail.com",
    subject: "A new user is here..",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #4CAF50;">New User Joined!</h2>
      <p>Dear Admin,</p>
      <p>A new user has registered at the Sri Shikharji App. Here are the details:</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>User ID: ${userId}</li>
      </ul>
      <p>Welcome them to our community!</p>
      <p>Thank you,<br/>Shikharji Team</p>
      <hr/>
      <p style="font-size: 12px; color: #777; text-align: center;">
        Sri Shikharji | <a href="https://srishikharji.vercel.app/">Visit Our Website</a> | Email: parasnathhills@gmail.com
      </p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendNewUserMsg,
};
