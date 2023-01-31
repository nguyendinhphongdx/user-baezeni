const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post("/sign-in", async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const userFinded = await userService.signIn(user.email, user.password);
        if(userFinded){
            res.json({
                message: "Login Success"
            })
        } else {
            throw new Error("user not found");
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.post("/sign-up", async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 100);
        const user = {
            email: req.body.email || `user${random}@gmail.com`,
            password: req.body.password || "123456a@A",
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


router.get("/users", async (req, res) => {
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

router.patch("/user/:id/active", async (req, res) => {
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

module.exports = router;