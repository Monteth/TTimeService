import User from "./User";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from "config";
import Joi from "joi";

const prepareResponse = promise => promise
    .then(e => ({error: false, data: dbModelToLogic(e)}))
    .catch(e => ({error: true, errors: e}))

const register = async ({name, email, password}) => prepareResponse(
    User.create({name, email, password: await bcrypt.hash(password, 10)}))

const login = async ({email, password}) => {
    const user = await User.findOne({email}).then(e => e).catch(() => ({password: ''}))
    const logged = bcrypt.compareSync(password, user.password)
    return logged
        ? {error: false, data: { token: generateAuthToken(user) } }
        : {error: true, errors: [{message: "invalid credentials"}]}
}

const generateAuthToken = (user) => {
    const {_id, accessLevels} = user;
    return jwt.sign({id: _id, accessLevels}, config.get('myprivatekey'));
}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}

const dbModelToLogic = ({name, email, _id}) => ({id: _id, name, email})



export default {register, login}