import User from "../models/user.model.js";
import OTP from "../models/junk.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";
// import validator from 'email-validator';
import nodemailer from "nodemailer";
import { updateUserStart } from "../../client/src/redux/user/userSlice.js";

// const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail", // true for port 465, false for other ports
  auth: {
    user: "findmyway232004@gmail.com",
    pass: "tqrmiekcskdhgbot",
  },
});

export const register = async (req, res, next) => {
  // console.log(req.body);
  // const {username,email,password} = req.body;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // const hashedPassword = bcryptjs.hashSync(password,10);
  // password = hashedPassword;
  const newUser = new User({ username, email, password });
  // const newUser = new User({username,email,password});
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    console.log(error.message);
    // res.status(500).json(error.message);
    next(error);
  }

  // res.send("hiiii");
};

export const verify = async (req, res, next) => {
  const { email } = req.body;
  console.log("Email to verify:", email);

  // Dynamically generate an OTP (for real-world usage)
  const otp = Math.floor(100000 + Math.random() * 900000);
  // 6-digit OTP
  const expirationTime = Date.now() + 5 * 60 * 1000;
  const subject = "OTP Verification";

  const message = `Your OTP is ${otp}. It will expire in 5 minutes.`;

  try {
    // Sending the email using nodemailer
    const info = await transporter.sendMail({
      from: "findmyway232004@gmail.com", // Your verified email address
      to: email, // Recipient's email
      subject: subject, // Email subject
      text: message, // Plain text body of the email
    });

    const newOtp = new OTP({ email, otp, expiresAt: expirationTime });
    await newOtp.save();
    // res.status(201).json('User created Successfully');

    // console.log("Email sent successfully:", info.response);
    // Responding with success
    // otpStore.set(email, { otp, expiration: expirationTime });

    res.status(200).json({ message: "OTP sent successfully", otp }); // Don't send the OTP in production!
  } catch (error) {
    console.error("Error sending email:");
    next(error); // Pass the error to the next middleware
  }
};

export const login = async (req, res, next) => {
  const { email, passkey } = req.body;
  // const { email, passkey } = req.body;
  console.log(passkey);

  try {
    // Retrieve OTP details for the given email
    const otpDetails = await OTP.findOne({ email }).sort({ updatedAt: -1 });

    console.log("check");
    console.log(otpDetails);
    if (!otpDetails) {
      return res
        .status(400)
        .json({
          message: "OTP not found or expired. Please request a new one.",
        });
    }

    const { otp, expiration } = otpDetails;

    // Check if OTP is expired
    if (Date.now() > expiration) {
      const deleteOtp = await OTP.findOneAndDelete({ email }).sort({
        updatedAt: -1,
      });
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    // Validate the provided OTP
    if (passkey == otp) {
      // OTP is valid

      const deleteOtp = await OTP.findOne({ email }).sort({ updatedAt: -1 });
      // Remove OTP after successful validation

      const curUser = await User.findOne({ email });
      console.log(curUser);

      if (!curUser) {
        return res.status(250).json({ message: "Register Yourself" });
      }

      const token = jwt.sign({ id: curUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = curUser._doc;
      console.log("done succesfully");
      return res
        .cookie("access_token", token, { httpOnly: false })
        .status(200)
        .json(rest);
      // return res.status(200).json({ message: "Login successful" });
    } else {
      // OTP is invalid

      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

export const google = async (req, res, next) => {
  try {
    const data = req.body;
    const email = data.email;
    const avatar = data.avatar;
    console.log(data.name);
    const validUser = await User.findOne({ email: data.email });
    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // console.log(token);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: false })
        .status(201)
        .json(rest);
      // res.send(JSON.stringify(rest));
      // res.send("old user");
    }

    const num = Math.floor(9000 * Math.random() + 1000);
    const username =
      data.name.split(" ").join("").toLowerCase() + num.toString(36);
    const genratedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(genratedPassword, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // console.log(token);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: false })
      .status(201)
      .json(rest);
    // res.send("user saved successfully");
  } catch (error) {
    next(error);
  }
};

export const access_user = async (req, res, err) => {
  try {
    // const token = req.body;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const email = data.email;
    const name = data.name;
    const birthday = data.birthday;
    let gender = "";
    let marital = "";
    let address = "";
    let phone = "";
    if (data.gender) gender = data.gender;
    if (data.marital) marital = data.marital;
    if (data.address) address = data.address;
    if (data.phone) phone = data.phone;

    const updatedUser = await User.findOneAndUpdate(
      { email },

      req.body,
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getUser = async(req,res,next)=>{
    try {
        // const data = req.body;
        // const email = data.email;

        const email = req.params.id;
        // console.log(email);
        const user = await User.findOne({email});
        res.status(200).json(user);

    } catch (error) {
        // console.log(error.message);
        next(error);
    }

    

};
