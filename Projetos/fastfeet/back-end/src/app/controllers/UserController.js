import User from '../models/User';

class UserController{
    
    async index(req, res){
        const users = await User.findAll();
        res.json(users);
    }
    
    async store(req, res){
        const {id, name, email, password} = await User.create(req.body);
        return res.json({id, name, email});
    }
}

export default new UserController();