import User from "../models/User.js";
import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

class UserController {

    async allUser(req, res) {
        const query = req.query.new;
        if (req.user.isAdmin) {
            try {
                const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();
                res.status(201).json(users);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You are not allowed to see all users!'});
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc;
            res.status(201).json(info);
        } catch (err) {
            res.status(500).json({message: err});
        }
    }

    async statsUser(req, res) {
        const today = new Date();
        const lastYear = today.setFullYear(today.setFullYear() - 1);
        const monthArray = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: {
                            $year: "$createdAt"
                        }
                    }
                }, {
                    $group: {
                        _id: "$month",
                        total: {$sum: 1}
                    }
                }
            ]);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({message: err});
        }
    }

    async updateUser(req, res) {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            if (req.body.password) {
                req.body.password === CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString()
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new: true}
                );
                res.status(201).json(updatedUser);
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(403).json({message: 'You can update only your account!'});
        }
    }

    async deleteUser(req, res) {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(201).json({message: 'User has been deleted...'});
            } catch (err) {
                res.status(500).json({message: err});
            }
        } else {
            res.status(500).json({message: 'You can delete only your account!'});
        }
    }

}

export default new UserController();
