let addWorkoutBtn = document.getElementById("addWorkoutBtn");
let workouts;

try {
    workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  } catch (error) {
    workouts = [];
  }


function convertTime(intialTime){
const minute = math.floor(intialTime/60);
const second = intialTime % 60;
const afterSecond = `${second}`<10 ? `0${second}`: `${second}`;
const realTime =`${minute}: ${afterSecond}`;
return realTime;
}
function showOnPage(){
    const item = "";
    for(let i=0;i<workouts.length;i++){
        item += ` <li class = "col-1">
        <div class = "exercisename"> ${workouts[i].name}--X ${workouts[i].sets} </div>
        <div class= "col-2"
        
        ${convertTime(workouts[i].duration)} </div>
        <button class = "col-4" data-index ="${i}"> delete </button>`
    }

}