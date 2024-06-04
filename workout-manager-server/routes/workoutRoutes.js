const workoutController = require('../controllers/workoutController')
const express = require("express")

const router = express.Router(); 

router.route('/')
.get(workoutController.getAllWorkouts)
.post(workoutController.createWorkout)


module.exports = router;