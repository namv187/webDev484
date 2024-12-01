const testWrapper = document.querySelector(".test-wrapper");
// const testArea = document.querySelector("#test-area");
// const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");

// const outputDiv = document.getElementById("output");
// const originalContent = outputDiv.innerHTML;
//const theTimer = document.querySelector("#timer");


// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:


// Match the text entered with the provided text on the page:


// Start the timer:


// Reset everything:


// Event listeners for keyboard input and the reset button:






//intializing variables

let list = []; //list for the inputs

const allowedKeys = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", ";", ":", "'", "\"", "\\", "|", ",", ".", "<", ">", "/", "?", "~", "`", " "
]; //keys allowed to be inputed into list

const sentences = [
    "Hello world! I'm taking Comp484! This is a web dev class.",
    "Count to 10! 1 2 3 4 5 6 7 8 9 10.",
    "The price isn't right; you have to find a cheaper one!",
]; //setences for game

//sets a setence into the index id="setence"
// Select a random sentence from the sentences array
function randomSentence(){
    const randomIndex = Math.floor(Math.random() * sentences.length);
    document.getElementById("sentence").innerHTML = sentences[randomIndex];
}


//key listener for game logic
function keyListener(event) {
    startTimer();
    testWrapper.style.borderColor = 'yellow';
    //check if key press is allowed
    //if allowed push it onto the array
    if(allowedKeys.includes(event.key)){
        list.push(event.key);
    }
    //deletes from the list array
    if(event.key==="Backspace"){
        list.pop();
    }

    //document.getElementById("output").innerHTML = list.map(e => `${e}`).join("");
    document.getElementById("output").value = list.join("");
    const listString = list.join("");
    if(listString===sentences[0]||listString===sentences[1]||listString===sentences[2]){
        testWrapper.style.borderColor = 'green';
        document.removeEventListener("keydown",keyListener);
        stopTimer();
        score();
    }
}

//reset variables for the entire game back to 0
function reset(){
    list = [];
    resetTimer();
    document.getElementById("output").innerHTML="";
    testWrapper.style.borderColor = 'grey';
    randomSentence();
    document.addEventListener("keydown", keyListener); // Prevent stacking
}

//score display functions
//score() inputs the timer result into the local storage
function score() {
    const timerElement = document.getElementById("timer").innerHTML; // get the current timer value as a string
    
    // retrieve or initialize scores from localStorage
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    // add the new score
    scores.push(timerElement);

    // save updated scores back to localStorage
    localStorage.setItem("scores", JSON.stringify(scores));

    // calls displayScore() function to updated scoreboard
    displayScores();
}

//display displays the scores
function displayScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || []; // retrieve scores

    const formattedScores = scores
        .map((score, index) => `${index + 1}: ${score}`) // display each score as-is
        .join("<br>");

    // display the scores in the scoreboard container
    document.getElementById("displayScore").innerHTML = `<p>${formattedScores}</p>`;
}



// Timer logic
let timerId = null; //create a null variable to stop from creating multiple time objects
let startTime = Date.now(); //sets the current date to now

//formats time into 00:00:00 and returns the time.
function formatTime(ms){
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10); 

    const formatMinutes = minutes.toString().padStart(2, "0"); //minutes
    const formatSeconds = seconds.toString().padStart(2, "0"); //seconds
    const formatMillis = millis.toString().padStart(2, "0"); //milliseconds

    return `${formatMinutes}:${formatSeconds}:${formatMillis}`; //returns formatted
}


//displays the timre
function timerDisplay() {
    let current = Date.now() - startTime; //calculates time based on Date.now() function
    document.getElementById("timer").innerHTML = formatTime(current); // Display in seconds
}

//starts the timer
function startTimer() {
    if (!timerId) { //if timerID is running once creates time object
        timeDifference = Date.now();
        timerId = setInterval(timerDisplay, 10);
    }
}

//stops the setInterval and set the timerID back to null
function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}


//calls the stop timer function
//reset the starttime for the most current time
//changes timer ID in html back to 00:00:00
function resetTimer(){
    stopTimer();
    startTime=Date.now();
    document.getElementById("timer").innerHTML="00:00:00";
}


//main function
function main() {
    document.removeEventListener("keydown", keyListener); // prevent listern from stacking twice
    resetButton.removeEventListener("click", reset); //clears listern in case of it runs twice

    document.addEventListener("keydown", keyListener); //listens to key strocks 
    resetButton.addEventListener("click", reset); //listens to reset button
}

// initialize the listerns when a key is pressed down then it remove stops the main init listener.
document.addEventListener("keydown", function mainInit() {
    main();
    document.removeEventListener("keydown", mainInit); // Run only once
});

window.onload = function () {
    displayScores(); // calls display Score on the html file loading
    randomSentence();
};