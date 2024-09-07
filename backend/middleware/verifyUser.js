import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header exists and follows the 'Bearer <token>' format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract the token part from the Authorization header
    const accessToken = authHeader.split(' ')[1];
    // Check if the access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Access token is missing" });
    }

    // Verify the access token
    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
        if (err) {
            // Handle specific JWT error cases
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ success: false, message: "Access token has expired" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ success: false, message: "Invalid access token" });
            } else {
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
        }

        // If the token is valid, store the decoded email in the request
        req.email = decoded.email;
        next();
    });
};

export default verifyUser;
