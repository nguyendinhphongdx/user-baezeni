const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post("/api/sign-in", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("email or password is required");
        const userFinded = await userService.signIn(email, password);
        if (userFinded) {
            res.json({
                message: "Login Success",
                role: userFinded.role,
            })
        } else {
            throw new Error("Login failure");
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.post("/api/sign-up", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("email or password is required");
        const user = {
            email,
            password,
            role: "user"
        }
        await userService.signUp(user.email, user.password, user.role);
        res.json({
            message: "Create Succcess"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});


router.get("/api/users", async (req, res) => {
    try {
        const data = (await userService.getAll()).map(user => ({ ...user.dataValues, password: "****" }));
        res.json({
            users: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.patch("/api/user/:id/status", async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.changeStatus(userId);
        res.json({
            message: "Change Success",
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.get("/views/login", async (req, res) => {
    try {
        res.sendFile(process.cwd() + "/views/login.html");
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.get("/views/users", async (req, res) => {
    try {
        res.sendFile(process.cwd() + "/views/users.html");
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});


module.exports = router;