let workouts =JSON.parse(localStorage.getItem("workouts")) || [];
let workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
let cuuerentWorkoutIndex =0;

let workoutInterval;  // for run the set interval function in the 
let restTime = 30;
let currentTime = 0;

//for change the text in the html
const currentExercise = document.getElementById("current-exercise");
const timeDisplay = document.getElementById("timer");
const endExerciseBtn = document.getElementById("endExerciseBtn");

window.onload =()=>{
    if(workouts.length >0){
        startCountDown(6,startExercise);
    }
    else
    {
        alert("No workouts to start!");
        window.location.href ="index.html";
    }
};
function startCountDown (seconds,startExercise){
    currentTime = seconds;
    updateTimerDisplay();

    workoutInterval = setInterval(()=>{
        currentTime--;
        updateTimerDisplay();
        if(currentTime<0)
        {
            clearInterval(workoutInterval);
            startExercise();
        }
    },1000);
};
function startExercise(){
    if(cuuerentWorkoutIndex<workouts.length){
        const workout =workouts[cuuerentWorkoutIndex]; //get the object from the workouts
        currentExercise.textContent =`Current Exercise${workout.name} --X ${workout.reps}`
        currentTime = workout.duration;
        updateTimerDisplay();
        endExerciseBtn.disabled = false;

        workoutInterval = setInterval(()=>{
            currentTime--;
            updateTimerDisplay();
            if(currentTime<=0){
                clearInterval(workoutInterval);
               logExercise(workout.name,workout.duration);
               cuuerentWorkoutIndex++;
               startRest();
            }
        },1000);
        
    }
    else{
        endWorkout();
    }
}
function startRest(){
    if(cuuerentWorkoutIndex<workouts.length){
        currentExercise.textContent ="Resting Time ....."
        startCountDown(restTime,startExercise);
    }
}
endExerciseBtn.addEventListener("click",()=>{
if(cuuerentWorkoutIndex<workouts.length){
   clearInterval(workoutInterval);
   const workout = workouts[cuuerentWorkoutIndex];
    logExercise(workout.name,workout.duration-currentTime);
    cuuerentWorkoutIndex++;
    startRest();
}
else{
    endWorkout();
}
});
function logExercise(name,completedTime){
    workoutLog.push(name,completedTime); //
    localStorage.setItem("workoutLog",JSON.stringify(workoutLog));
}