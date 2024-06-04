const User = require('../models/userModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.signup =  async(req,res)=>{
    const {name, email, password, passwordConfirm, photo} = req.body; 
    console.log('INSIDE SINGUP HANDLER:')
    console.log('password:', password)
    console.log('passwordConfirm', passwordConfirm)
    console.log(`are the same? ${password === passwordConfirm}`)
    try 
    {
        //CHECK IF USER ALREADY EXISTS IN DB
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({error:'Email already exists'})

        
        //HASHED PASSWORD! - MOVE THIS CODE TO A PRE-SAVE M.W!)
        //const hashedPassword = await bcrypt.hash(password, 10); 


        //CREATE NEW USER
        const newUser = await User.create({name,email, password, passwordConfirm, photo})
        //I HAVE PRE-SAVE M.W TO HADH THE PASSWORD BEFORE SAVING THE USER!
        //const newUser =  await  User.create({name,email,password:hashedPassword,passwordConfirm, photo})


        console.log('SUCCESS CREATING USER!')
        console.log(newUser) 



        //CREATE THE JWT TOKEN
        const token = jwt.sign({email}, 'superduper100', {expiresIn:'1h'})

        //SET HTTP-ONLY COOKIE WITH THE JWT TOKEN 
        res.cookie('token', token, { httpOnly:true})
       
       // res.status(201).json({message:'User created successfully'})
       res.status(201).json({
            token,
            status:'success', 
            data:{
                user:newUser
            }
       })

    }
    catch(err)
    {
        console.error(err)
        //res.status(500).json({error:'Internal Server Error'})
        res.status(500).json({
            status:'fail', 
            message:err.message
        })

    }

}


exports.login = async (req,res) =>{
    const {email, password} = req.body ; 
    
    console.log(email, password)
    try 
    {

        //FIND USER
        const user = await User.findOne({email})

        //CHECK IF USER EXISTS AND PASSWORD IS CORRECT
        if(!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(401).json({error:'Invalid username or password'})

        }

        //GENERATE JWT TOKEN 
        const token = jwt.sign({email}, 'superduper100', {expiresIn:'1h'})

        //SET HTTP-ONLY COOKIE WITH THE JWT TOKEN 
        res.cookie('token', token, { httpOnly:true})

       // res.status(200).json({message:'Login Successful'})
        res.status(201).json({
            token,
            status:'success', 
            data:{
                user
            }
       })


    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({error:'Internal server error'})


    }

}


exports.logout = (req,res) =>{
    //CLEAR HTTP-ONLY COOKIE
    try
    {
        res.clearCookie('token')
        res.status(200).json({message:'Logout Successful'})

    }
    catch(err)
    {
        res.status(500).json({status:'fail', message:'Server:Could not Logout'})
    }
}