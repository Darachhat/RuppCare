import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({success:false , message: "Unauthorized" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default authUser;