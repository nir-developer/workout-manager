const {Workout, RunningWorkout, CyclingWorkout} = require('../models/workoutModel')


/**
 * {  "_id": {    "$oid": "665b037a15fe3e6c8480b01c"  }, 
 *  "distance": 10,  "duration": 45,  
 * "location": 
 *      { 
 *           "type": "Point",
 *           "coordinates": [  -73.935242,40.73061    ] 
 *       }, 
 *  "workoutType": "RunningWorkout",  
 *  "createdAt": {    "$date": "2024-06-01T11:18:19.014Z"  }, 
 *  "updatedAt": {    "$date": "2024-06-01T11:18:19.014Z"  },
 *   "__v": 0}
 */
//CREATE A WORKOUT - IF -ELSE
exports.createWorkout = async(req,res,next) =>{

    try 
    {
        const {workoutType, ...workoutData} = req.body ; 

        let workout 

        if(workoutType === 'running') 
        {
            workout = new RunningWorkout(workoutData)
            
        }
        else if(workoutType === 'cycling')
        {
            workout = new CyclingWorkout(workoutData)
        }
        else
        {
            console.log('NO SUCH workoutType!!', workoutType)
           return  res.status(400).json({
                status:'fail', 
                message:`no such workoutType: ${workoutType}`
            })
        }

        const newWorkout = await workout.save(); 

        console.log('SUCCESS CREATED WORKOUT: ')
        console.log(workout)

        res.status(201).json({
            status:'success', 
            data:{
                workout:newWorkout
            }

        })





    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({status:'fail', message:err.message})
    }
}


//GET ALL WORKOUTS OF ALL TYPES!
exports.getAllWorkouts = async (req,res,next) =>{

    try
    {
      const workouts = await Workout.find(); 
      console.log(workouts)
      
      res.status(200).json({
        status:'success', 
        results:workouts.length, 
        data:{
            workouts
        }
      })

    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({
            status:'fail', 
            message:err.message
        })
    }

}