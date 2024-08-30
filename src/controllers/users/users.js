const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/userModel");
const usernameGenerator = require("username-generator");
const transporter = require("../../config/email");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // User already exists, do nothing
      return res.status(400).json({ message: "Email already exists" });
    } else {
      // User does not exist, create user and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
      const otpExpiry = new Date(Date.now() + 300000); // 5-minute expiry

      const username = usernameGenerator.generateUsername();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Send OTP via email or SMS
      const mailOptions = {
        from: "parasnathhills@gmail.com",
        to: email,
        subject: "Verify your email address",
        html: `
        <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;  font-family: Arial, sans-serif;"">
          <h2 style="color: #333;>Verify Your Email Address</h2>
          <p>Please enter the following OTP to complete the registration process:</p>
          <h1 style="color: #337ab7; font-family: Arial, sans-serif;">${otp}</h1>
          <p>If you did not request this email, please ignore it.</p>
        </div>
      `,
      };

      transporter.sendMail(mailOptions, async (err) => {
        if (err) {
          console.log(err.message);
          return res
            .status(400)
            .json({ message: "Error sending OTP", error: err.message });
        } else {
          console.log("OTP sent");

          // Create user
          await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
          });

          return res.status(201).json({ message: "User created successfully" });
        }
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
};

exports.verifySignUpOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await User.updateOne({ email }, { $unset: { otp: "", otpExpiry: "" } });

    // OTP verified successfully
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to verify OTP", error: err.message });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 300000); // 5-minute expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: "parasnathhills@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;  font-family: Arial, sans-serif;"">
          <h2 style="color: #333;>Verify Your Email Address</h2>
          <p>Please enter the following OTP to reset the password:</p>
          <h1 style="color: #337ab7; font-family: Arial, sans-serif;">${otp}</h1>
          <p>If you did not request this email, please ignore it.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to send email" });
      }
      res.json({ message: "OTP sent to your email" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyResetPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email, OTP, and new password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      "4n1kJiK3pXM4vZ8rG2qBnV8xM3lR4tF9",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error logging in" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error fetching users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error fetching user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user" });
  }
};
