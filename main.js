
/*----------------- Constants -----------------*/

/*------------- Variables (state) -------------*/
//object to establish the original state of the game
let story = {
  start: {
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
  }, 
  enter: { 
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
  },
  gaudy: {
    title: "Not your taste...",
    text: "Your snobbery leads you astray once again, you lose. And perhaps more tragically, you've missed out on adventure.", // incorrect or losing destination
  }
}

let currentChapter = {}





/*--------- Cached Element References ---------*/
  const startButton = document.querySelector('#start-button')
  const input = document.querySelector('#name-input')
  const content = document.querySelector('#content')

/*-------------- Event Listeners --------------*/
  
  startButton.addEventListener('click', startGame)
  

/*----------------- Functions -----------------*/

// function to render the current scene 
function render(chapter) {
  content.innerHTML = ` 
  <h1>${story[chapter].title}<h1> 
  <p>${story[chapter].text}</p> 
  ${getChoices(chapter)}  
  <button id='submit-button'>Proceed</button>
  `  
  const submitButton = document.querySelector('#submit-button')
  submitButton.addEventListener('click', getPlayerChoice)
}

function getPlayerChoice() {
  let inputs = document.querySelectorAll('input[type="radio"]');
  let newChapter  
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      newChapter = inputs[i].getAttribute('data-destination') 
    } 
  } // function to check user input/
  render(newChapter) 
}

function getChoices(chapter) {
  let input = ""
  for (let i = 0; i < story[chapter].choices.length; i++) {
    input += `
    <div>
    <input data-destination = ${story[chapter].choices[i].destination}  id = "radio${i}" type = "radio" name = "choices"/> 
    <label for "radio${i}">${story[chapter].choices[i].choice}</label>
    </div>      
    `    
    console.log(story[chapter].choices[i].choice)
  }
  return input; // function to retrieve choices from story object
}

function startGame() {
  content.innerHTML = ` 
  <h1>${story.start.title}<h1> 
  <p>${story.start.text}</p> 
  ${getChoices('start')}  
  <button id='submit-button'>Proceed</button>
  `  
  const submitButton = document.querySelector('#submit-button')
  submitButton.addEventListener('click', getPlayerChoice)
}