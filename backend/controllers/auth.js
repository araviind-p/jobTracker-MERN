import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const { name, email, password } = req.body

    User.create({ name, email, password })
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: err.message }))
}

export const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Generate access token (short-lived)
                    const accessToken = jwt.sign(
                        { email: user.email },
                        "jwt-access-token-secret-key",
                        { expiresIn: '30m' }
                    );

                    // Set access token as a cookie
                    res.cookie('accessToken', accessToken, {
                        maxAge: 1800000, // 30 minutes
                        httpOnly: true, // Prevent client-side JavaScript access
                        secure: true,   // Use only with HTTPS
                        sameSite: 'strict'
                    });

                    return res.json({ Login: true, user, accessToken });
                } else {
                    return res.status(401).json({ Login: false, message: 'Incorrect password' });
                }
            } else {
                return res.status(404).json({ Login: false, message: 'You have to register first' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
