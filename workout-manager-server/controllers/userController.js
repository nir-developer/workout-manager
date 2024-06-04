const User = require('../models/userModel')
const { Workout, CardioWorkout, StrengthWorkout } = require('../models/workoutModel');


exports.createUserWithWorkouts = async (req,res) => {

    const session = await User.startSession(); 

    session.startTransaction(); 

    try 
    {
        const {name, email ,workouts} = req.body; 

        //CREATE A NEW USER (document - object)
        const user = new User({name, email})

        //CREATE WORKOUTS AND ASSOCIATE THEM WITH THE USER
        workouts.forEach(workoutData => {
            const {workoutType ,...workoutDetails} = workoutData

            //CALL MY FACTORY STATIC METHOD! 
            const workout = Workout.workoutFactory();

            if(workout)
                 user.workouts.push(workout._id);
        })

        const newUser = await user.save({session});

        console.log('NEW USER WITH WROKOUTS HAS BEEN CREATED:')
        console.log(newUser)

        await session.endSession(); 

        res.status(201).json({
            status:'success', 
            data:{
                user:newUser
            }
        }); 

    }
    catch(err)
    {
        console.log('COULD NOT CREATE A USER WITH WORKOUTS!')
        await session.abortTransaction(); 
        res.status(500).json({
            status:"fail", 
            message:err.message
        })
    }
}