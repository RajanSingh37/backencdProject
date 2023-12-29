import User from "../models/user.models.js";
import AppError from "../utils/error.util.js";

const cookieOptions = {
    maxAge: 7 * 24 *60 * 60 * 1000, // 7 days cookie
    httpOnly: true,
    secure: true
}

const register = async (req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password) {
        return next (new AppError('All fields are required', 400));
    }

    const userExists = await UserActivation.findOne({ email });

    if(userExists) {
        return next(new AppError('Email already exists', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secur_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload'
        }
    });

    if (!user) {
        return next (new AppError("User registrationfailed, please try again"))
    }

        //TODO: File upload

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTToken();

        res.cookie('token, cookieOptions')

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if(!email || password) {
            return next(new AppError('All fields are required', 400));
        }
    
        const user = await User.findOne({
            email
        }).select('+password');
    
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or password does not match', 400))
        }
    
        const token = await user.generateJWTToken();
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
            success: true,
            message: 'User loggedin successfully',
            user,
        });

    } catch(e) {
        return next(new AppError(e.message, 500));
    }
};

const loguot = (req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });
};

const getProfile = (req, res) => {

};

export {
    register,
    login,
    loguot,
    getProfile
}