import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        
        const { atoken } = req.headers;
        if (!atoken) {
            return res.status(401).json({success:false , message: "Unauthorized" });
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success:false , message: "Unauthorized" });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default authAdmin;