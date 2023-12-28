import AppError from "../utils/error.util";

const register = (req, res) => {
    const {fullName, email, password} = req,body;

    if(!fullName || !email || !password) {
        return next (new AppError('All fields are required', 400));
    }
};

const login = (req, res) => {

};

const loguot = (req, res) => {

};

const getProfile = (req, res) => {

};

export {
    register,
    login,
    loguot,
    getProfile
}