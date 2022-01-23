import User from "../models/User.js";
import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

class AuthController {

    async register(req, res) {
        try {
            const newUser = User({
                username: req.body.username,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
                email: req.body.email
            });
            const user = await newUser.save();
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({message: 'Something went wrong!'});
        }
    }

    async login(req, res) {
        try {
            const user = await User.findOne({email: req.body.email});
            !user && res.status(401).json({message: 'Wrong password or username!'});

            //decrypt
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            //compering
            originalPassword !== req.body.password &&
            res.status(401).json({message: 'Wrong password or username!'});

            const accessToken = JWT.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.SECRET_KEY, {
                expiresIn: "5d"
            });

            //remove password on user doc
            const {password, ...info} = user._doc;

            res.status(200).json({...info, accessToken});
        } catch (err) {
            res.status(500).json({message: 'Something went wrong!'});
        }
    }

}

export default new AuthController();
