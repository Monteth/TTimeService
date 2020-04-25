import express from 'express';
import UserService from "../Model/Users/UserService";
const router = express.Router();

const handleData = (data, next, res) => data.error
    ? next(data.errors)
    : res.json(data.data);

router.post('/register', async function(req, res, next) {
    const data = await UserService.register(req.body)
    handleData(data, next, res)
});

router.post('/login', async function(req, res, next) {
    const data = await UserService.login(req.body)
    handleData(data, next, res)
});

export default router;
