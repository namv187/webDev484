$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.speak-button').click(clickedSpeakButton);

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Zigzagoon", weight:10, happiness:5};
  
    function clickedTreatButton() {
      clearMessage();
      
      pet_info.happiness+=1; //add 1 happiness and 1 weight everytime the pet get a treat
      pet_info.weight+=1;
      document.getElementById("message").innerHTML =`<strong>${pet_info.name}</strong> ate some treats!`;
      checkAndUpdatePetInfoInHtml();
    }
    
    //.each( function )
    // function
    // Type: Function( Integer index, Element element )
    // A function to execute for each matched element.
    function clickedPlayButton() {
      clearMessage();
      $('button').prop('disabled', true);
      if(pet_info.weight !=1){ //checks if there are enough points in weight before subtracting
        pet_info.happiness += 1; //add 1 happiness and subtract 1 weight every time the pet plays
        pet_info.weight -= 1;
      }
      //.each(array,function(index,element)){functionality for function}
      $.each(playMessage, function(i, e) {  //iterates through playMessage, the function() iterates from index(i)=0 to the end of the array and returns the (e) Element
          setTimeout(function() { //set time out delays each time the function is called by the second value in milli seconds. setTimeout(function(),milliseconds)
              $('#message').html(`<strong>${pet_info.name}</strong>: ${e}`); // update the HTML with the current message iteration. zigagoon + element[i]
              if(i==2){$('button').prop('disabled', false);} //once the index becomes 2, it reenables all the buttons.
          }, i * 2000); // i*2000 is the delay of every iteration (2 seconds delay)
      });
      
      checkAndUpdatePetInfoInHtml();
    }
    //messages for the play loop
    const playMessage = [
        "Runs after ball",
        "Catches the ball",
        "Runs back",
        "Waiting patiently"
    ];    

    function clickedExerciseButton() {
      clearMessage();
      
      if(pet_info.happiness != 0&& pet_info.weight !=1){ //conditional check to make sure there is enough points to subtract from. if there is not enough points the function does nothing.
        pet_info.happiness -= 1; //lose 1 happiness and lose 1 weight for every exercise click
        pet_info.weight -= 1;
        document.getElementById("message").innerHTML =`<strong>${pet_info.name}</strong> is running around in circles.`;  
      }
      checkAndUpdatePetInfoInHtml();
    }

   //extra button for project & extra functionality for button
    //it display messages on the html page
   //add a speak function to the button
    function clickedSpeakButton() {
      clearMessage();
      pet_info.happiness+=1;
      if(pet_info.happiness>10){
       document.getElementById("message").innerHTML ="Zig Zag! :D"; //pet is very happy when above 10 happiness
      } else if (pet_info.happiness<2){
         document.getElementById("message").innerHTML ="Zad. :("; //pet is sad if happiness is less than 2
      } else {
         document.getElementById("message").innerHTML ="Zigzag. :)"; //pet neutral face is a smile
      }
      checkAndUpdatePetInfoInHtml();
    }


    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    //clears display message function
    function clearMessage() {
        document.getElementById("message").innerHTML = "";
    }
    
    
    function checkWeightAndHappinessBeforeUpdating() {
      //checks if weight and happiness is at minum value. if they are it sends a custom message through id tag
      if (pet_info.weight == 1 &&pet_info.happiness == 0){
        document.getElementById("message").innerHTML = `<strong>${pet_info.name}</strong> is too light and a little sad. Try feeding <strong>${pet_info.name}</strong> some snacks!`;
      }
      // sends a specific message weight is 1
      if (pet_info.weight == 1) {
          //inserts into the id "message" inner html to have a responsive statement of what should happens if the pet is too light
          document.getElementById("message").innerHTML = `<strong>${pet_info.name}</strong> is too light. Feed <strong>${pet_info.name}</strong> some snacks!`;
      }
    
      // send a specific message if happiness is 0
      if (pet_info.happiness == 0) {
         //inserts into the id "message" inner html to have a responsive statement of what should happens if the pet is sad
         document.getElementById("message").innerHTML = `<strong>${pet_info.name}</strong> is a little sad. Try playing with <strong>${pet_info.name}</strong>!`;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }
    
//toggle sign up
// .toggle( [duration ] [, complete ] )
// Type: Number or String
// A string or number determining how long the animation will run.
// complete
// Type: Function()
// A function to call once the animation is complete, called once per matched element.

//With no parameters, the .toggle() method simply toggles the visibility of elements
    $('#toggleButton').click(function() {
        $('#toggle1').toggle();
        $('#toggle2').toggle();
    });                           