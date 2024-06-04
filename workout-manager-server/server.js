const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const {Workout, RunningWorkout} = require('./models/workoutModel')

const mongoose = require('mongoose');
const app = require('./app')


const port = process.env.PORT || 3000

const DB = process.env.DB;

mongoose.connect(DB, {
   
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//32.1897036,32.0909088

    // ///CREATE AND SAVE A WORKOUT 
    // const running = new RunningWorkout({
    //   duration: 45, 
    //   distance: 10, 
    //   location: {
    //     type: 'Point',
    //     coordinates: [34.8221051,32.1897036] // Example coordinates (longitude, latitude)
    // }

    // })

    // return running.save(); 
    
})
// .then(document => {
//   console.log('SUCCESS SAVING DOCUMENT!')
//   console.log(document)
// })
.catch(err => {
    console.error('Connection error', err);
});