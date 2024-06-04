

const mongoose = require('mongoose');



//IMPORTANT: DEFINE SPECIFIC DISCRIMINATORS TYPE - RUNNING & CYCLING - TO VE VALIDATED BY THE SCHEMA
const validDiscriminatorTypes = ['cycling', 'running'];

// Define the base schema
const workoutSchema = new mongoose.Schema({

    //name: { type: String, required: true },
    distance:{type:Number, required:true},
    duration: { type: Number, required: true }, // duration in minutes
   

    //IMPORTANT! Enforce discriminator key(OPTIONAL - BUT I WANT)
    workoutType: {
         type: String,
         enum: validDiscriminatorTypes,
         required: true 
        }, 

    location: {
        type: {
            type: String,
            enum: ['Point'], // Only allow 'Point' as the value for type
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers: [longitude, latitude]
            required: true
        }
    }
}, 
//DISCRIMINATOR
{ 
    discriminatorKey: 'workoutType', timestamps: true 
});






const runningWorkoutSchema = new mongoose.Schema({
    cadence: {type: Number, required:true}, //distance in km 
    pace: {type: Number}

    //PACE IS DERIVED FILED! SHOULD NOT REQUIRED IN THE SCHEMA!

    // //CALCULATE WITH PRE-SAVE M.W IN THE CLIENT IT IS A DERIVED PROPERTY - CALCULATED BY CALLING THE calcSpeed() from constructor
    // speed:{type:Number} //average speed in km/h

})



runningWorkoutSchema.pre('save', function(next)
{
    //CADENCE: duration / distance 
  this.pace =  this.duration / this.distance;
   next();

})



const cyclingWorkoutSchema = new mongoose.Schema({
    

    elevationGain:{type: Number, required:true},
    
    //DERIVE PROPERTY: distance / duration 
    speed:{type:Number} //average speed in km/h


    
})


cyclingWorkoutSchema.pre('save', function(next) {
    this.speed = this.distance / this.duration;
    next(); 
})



//////////////////////
//CREATE THE WORKOUTS 
/**We use the discriminatorKey option in the base schema to specify a key (workoutType) that Mongoose uses to determine which discriminator to use when querying or saving documents. */



// Static method to find users by email domain
// userSchema.statics.findByEmailDomain = function(domain) {
//     return this.find({ email: new RegExp(`@${domain}$`, 'i') });
// };
//MY WORKOUT FACTORY  - STATIC METHOD
workoutSchema.statics.workoutFactory = workout => {
    
    let newWorkout;

    if (workoutType === 'CardioWorkout')
     {
        newWorkout = new CardioWorkout(workoutDetails);
     } 
     else if (workoutType === 'StrengthWorkout') {
             newWorkout = new StrengthWorkout(workoutDetails);
     } 
     else 
     {
        throw new Error('Invalid newWorkout type');
    }

    return newWorkout; 
}



//BASE MODEL
const Workout = new mongoose.model('Workout', workoutSchema)


const RunningWorkout = Workout.discriminator('running', runningWorkoutSchema)

const CyclingWorkout = Workout.discriminator('cycling', cyclingWorkoutSchema)

module.exports = {Workout, RunningWorkout, CyclingWorkout}