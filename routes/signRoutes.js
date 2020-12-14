const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const router = Router();



router.post('/signup',  
    [
    check('email' ).isEmail().withMessage('Incorrect email'),
    check('login').isLength({min: 3}).withMessage('Name must have more than 3 characters'),
    check('password').isLength({min: 6}).withMessage('Your password must be at least 6 characters')
    ], 
  async (req,res)=>{
    try{

            const errors = validationResult(req)
        
            if (!errors.isEmpty()) {
              return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
              })
            }

        const {email, login, password, confrimPassword} = req.body;
        if (!password==confrimPassword) {
            return res.status(400).json({ message: 'Passwords don\'t match' })
        }

        const candidate = await User.findOne({$or: [{email}, {login}]});
        
        if (candidate) {
            return res.status(400).json({ message: 'This user has already existsт' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User ({email, login, password: hashedPassword});

        await user.save();

        res.status(201).json({message:'user created'});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
})

router.post('/signin', async (req,res)=>{
    try{
        
        const {login, password} = req.body;
        const user = await User.findOne({$or: [{email:login}, {login}]});
        if(!user){
            return res.status(400).json({message:'User isn\'t found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Wrong password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtKey'),
            {expiresIn: '1h'}
        );

        res.json({token, userId: user.id, message:'Succsessful login'});
        
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

module.exports = router;