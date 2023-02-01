const User = require("../model/user");

class UserService {
    getAll = async () => {
        return await User.findAll();
    }
    signUp = async (email, password, role) => {
        return await User.create({ email, password, role, active: false });
    }
    signIn = async (email, password) => {
        return await User.findOne({ where: { email, password, role: "admin" } });
    }
    changeStatus = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if(!user) throw new Error("User not found");
        if(user && user.role === "admin") throw new Error("Permission user");
        await user.update({ active: !user.dataValues.active });
    }
    init = async () => {
        const admin = await User.findOne({ where: { email: "admin@gmail.com" } });
        if (!admin) {
            return await User.create({ email: "admin@gmail.com", password: '123456a@A', role: 'admin', active: true });
        }
    }
}
module.exports = new UserService();