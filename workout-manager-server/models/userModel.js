const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'Name Confirm is required']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email Confirm is required']
    },
    password:{
        type:String, 
        required:[true, 'Password is required'], 
        minLength:4
    },
    passwordConfirm:{
        type:String,
        required:[true, 'Please confirm your password'],
        //VALIDATOR FOR HAVING PASSWORD AND PASSWORD CONFIRM EQUAL! 
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:'Password are not the same'
        }
     },
    photo:String, 
})



// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
    
    console.log('INSIDE THE PRE-SAVE M.W OF HASHING THE PASSWORDS!')
   
    // If the password is not modified, move to the next middleware
    if (!this.isModified('password')) return next();


    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the salt
        const hash = await bcrypt.hash(this.password, salt);
        // Replace the plain text password with the hashed one
        this.password = hash;
        
         //PREVENT THE CONFIRM PASSWORD FROM BEING SAVED TO DB(OK DOES NOT IN THE DB AND NOT IN THE DB)
         this.passwordConfirm = undefined;
        next();
    } catch (error) {
        next(error);
    }

    
});


const User = mongoose.model('User', userSchema)

module.exports = User; 
// const {isEmail} = require('validator')
// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')



// const userSchema = mongoose.Schema({

//     name: {
//         type:String, 
//         required:[true, 'Please provide your name'], 
//     }, 
//     //CHECK EMAIL VALIDATION!
//    email:{
//         type:String, 
//         required:[true, 'Please provide your email'], 
//        // unique:true, 
//         lowercase:true, 
//         validate:[isEmail,'Please provide a valid email']
//     },
    
//     password: {
//         type:String, 
//         required:[true, 'Please provide a password'], 
//         minLength:8
//     },
//      passwordConfirm:{
//         type:String,
//         required:[true, 'Please confirm your password'],
//         validate:{
//             validator: function(el){
//                 return el === this.password
//             },
//             message:'Password are not the same'
//         }
//      },
//      photo:{
//         type:String, 

//      },
//     //CHILD REFERENCING 
//     workouts:[
//         {type:mongoose.Schema.Types.ObjectId, ref: 'Workout'}
//     ]



// })




// //////////////////////////////////////////

// const User = mongoose.model('User', userSchema)

// module.exports = User; 