import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // validating  strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be atleast 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
        
        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageURL = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }

    res.json({success:true,message:"Profile Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointmnet
const bookAppointment = async (req,res) => {
  try {
    
    const { userId, docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select("-password")

    if (!docData.available) {
      return res.json({success:false,message:"Doctor not available"})
    }

    let slots_booked = docData.slots_booked || {};

    //checking for slot available
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
          return res.json({success:false,message:"Slot not available"})
      } else {
          slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()


    // save new slot data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true, message:"Appointmet Booked"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API  to get user appontment for frontend my-appointmnet page
const listAppointmnet = async (req,res) => {
  try {
    
    const {userId} = req.body
    const appointments = await appointmentModel.find({userId})

    res.json({success:true, appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to cancel appointment
// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    // Validate input
    if (!userId || !appointmentId) {
      return res.status(400).json({ success: false, message: "User ID and Appointment ID are required" });
    }

    // Find the appointment
    const appointmentData = await appointmentModel.findById(appointmentId);

    // Check if appointment exists
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Verify the user owns the appointment
    if (appointmentData.userId !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release the doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;

    // Find the doctor
    const doctorData = await doctorModel.findById(docId);

    // Check if slots_booked exists and has the slotDate key
    if (doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
      // Remove the slotTime from the booked slots
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(e => e !== slotTime);

      // Update the doctor's slots_booked
      await doctorModel.findByIdAndUpdate(docId, { slots_booked: doctorData.slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req,res) => {

  try {

    const { appointmentId } = req.body
  const appointmentData = await appointmentModel.findById(appointmentId)

  if (!appointmentData || appointmentData.cancelled) {
    return res.json({success:false, message:"Appointment Cancelled or not found"})
  }

  //  creating options for razorpay payment
  const options = {
    amount: appointmentData.amount * 100,
    currency: process.env.CURRENCY,
    receipt: appointmentId,
  }

  // creation of an order
  const order = await razorpayInstance.orders.create(options)

  res.json({success: true, orders})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
 }

 // API to verify payment of razorpay
 const verifyRazorpay = async (req,res) => {

  try {
    
    const {razorpay_order_id} = req.body
    const orderInFo = await razorpayInstance.orders.fetch(razorpay_order_id)

    console.log(orderInFo)
    if (orderInFo.status == 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInFo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successful"})
    } else{
      res.json({success:false,message:"Payment failed"})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

 }

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointmnet, cancelAppointment, paymentRazorpay, verifyRazorpay };