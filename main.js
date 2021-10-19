
/*----------------- Constants -----------------*/

/*------------- Variables (state) -------------*/
//object to establish the original state of the game
let story = {
    title: "Chapter 1",
    text: "Back again? You move through a packed marketplace, navigating your way through the busy traffic. You briefly stop to talk with a fruit vendor, who greets you kindly and hands you a date. You accept graciously and continue through the marketplace. You cut through the crowd and come to stop at a curious shop fronted by massive bronze and silver metalworks. Do you enter?",
    choices: [ // array of choices and destinations 
      {
        choice: "Your interest is peaked, you walk in.",
        destination: 'enter',
      },
      {
        choice: "You window-shop for a while, but ultimately decide it’s all a little too gaudy for your taste.",
        destination: 'gaudy',
      },
      {
        choice: "No, you walk away. Chooising to save adventure for another day.",
        destination: 'disinterested', 
      }
    ]
  }


let enter= { 
  title: "A curious mind!",
  text: "You enter the shop, which hums with the whirs and clanks of gears and mechanisms. At the entrance sits an astrolabe inlaid in silver, so large it could be the face of a clock tower. A water-clock sounds, its chime whistled by a swallow that seems to raise itself out the water. A figure steps out from what seems to be an infinite doorway. Their eyes are kind and familiar, their voice warm. They greet you like an old friend. How do you respond?",
  choices: [
    {
      choice:'Tell them you want to shop on your own.',
    },
    {
      choice:'Hand them your resume.',
    },
    {
      choice:'Ask them where they acquired their merchandise.',
    },
  ]// correct or "winning" choice continues the story with more choices
}
let gaudy = {
  title: "Not your taste...",
  text: "Your snobbery leads you astray once again, you lose. And perhaps more tragically, you've missed out on adventure.", // incorrect or losing destination
}

/*--------- Cached Element References ---------*/
  const startButton = document.querySelector('#start-button')
  const input = document.querySelector('#name-input')
  const content = document.querySelector('#content')
  const submitButton = document

/*-------------- Event Listeners --------------*/
  
  startButton.addEventListener('click', render)
  submitButton.addEventListener('click', function() {
  getUserInput()
})

/*----------------- Functions -----------------*/

// function to render the current scene 
function render() {
  content.innerHTML = ` 
  <h1>${story.title}<h1> 
  <p>${story.text}</p> 
  ${getInputs()}  
  <button id = "submit-button">Proceed</button>
  `
  let submitButton = document.querySelector("#submit-button");
}

function getUserInput(){
  let inputs = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      console.log(inputs[i].getAttribute('data-destination'))
    } 
  } // function to check user input/
}

function getInputs() {
  let input = ""
  for (let i = 0; i < story.choices.length; i++) {
    input += `
    <div>
    <input data-destination = ${story.choices[i].destination}  id = "radio${i}" type = "radio" name = "choices"/> 
    <label for "radio${i}">${story.choices[i].choice}</label>
    </div>      
    `    
    console.log(story.choices[i].choice)
  }
  return input; // function to retrieve choices from story object
}