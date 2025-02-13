import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointmnet, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//Protected Routes
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointmnet)
userRouter.post("/cancel-appointment", authUser,cancelAppointment)
userRouter.post("/payment-razorpay",authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter;