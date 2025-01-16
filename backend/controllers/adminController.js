import validator from 'validator';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import userModel from '../models/userModel.js';


// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        
        const { name, email, password, speciality, degree, experience, about,  fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({success: false, message: "Missing Details" });
        }

        // validation for email
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Please enter a valid Email" });
        }

        // validation for password
        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be atleast 8 characters" });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload   = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor Added Successfully"  });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//API For admin login
const loginAdmin = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.status(200).json({ success: true, token, message: "Admin Logged In Successfully" });
            
        }else{
            res.status(400).json({ success: false, message: "Invalid Credentials" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password');
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

// API to get all appointment list
const appointmentAdmin = async (req,res) => {

    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }

} 

// API for appointment  cancellation
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      // Validate input
      if (!userId || !appointmentId) {
        return res.status(400).json({ success: false, message: "User ID and Appointment ID are required" });
      }
  
      // Find the appointment
      const appointmentData = await appointmentModel.findById(appointmentId);
  
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

  // API to get dashboard data for admin panel
  const adminDashboard = async (req,res) => {

    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})


    } catch (error) {
        console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard }