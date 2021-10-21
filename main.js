
/*----------------- Constants -----------------*/
const images = [
  "https://data.whicdn.com/images/251238216/original.gif",
  "https://i.gifer.com/7Rrs.gif",
  "https://i.pinimg.com/originals/b0/10/e9/b010e954f94acbd034917b2d6931bd79.gif",
  "https://64.media.tumblr.com/5f4c0252b15dda55028536c5a8923c7d/b691a90722d7bbb5-c8/s500x750/34aac55dfd7302e41fec400ba9636edeadb1890a.gif",
  "https://64.media.tumblr.com/746e848c8b0cf90bc7938599421e6b4e/tumblr_pbhfk0rEth1txe8seo1_500.gif",
  "https://media2.giphy.com/media/Wm9XlKG2xIMiVcH4CP/giphy.gif"
];

/*------------- Variables (state) -------------*/
//object to establish the original state of the game
let story = {
  start: {
    title: "1",
    text: "Back again? You move through a packed marketplace, navigating your way through the busy traffic. You briefly stop to talk with a fruit vendor, who greets you kindly and hands you a date. You accept graciously and continue through the marketplace. You cut through the crowd and come to stop at a curious shop fronted by massive bronze and silver metalworks. Do you enter?",
    choices: [ // array of choices and destinations 
      {
        choice: "Your interest is peaked, you walk in.",
        destination: 'enter'
      },
      {
        choice: "You window-shop for a while, but ultimately decide it’s all a little too gaudy for your taste.",
        destination: 'gaudy',
      },
      {
        choice: "No, you walk away. Choosing to save adventure for another day.",
        destination: 'disinterested', 
      }
    ], 

  }, 
  enter: { 
    title: "A curious mind!",
    text: "You enter the shop, which hums with the whirs and clanks of gears and mechanisms. At the entrance sits an astrolabe inlaid in silver, so large it could be the face of a clock tower. A water-clock sounds, its chime whistled by a swallow that seems to raise itself out the water. A figure steps out from what seems to be an infinite doorway. Their eyes are kind and familiar, their voice warm. They greet you like an old friend. How do you respond?",
    choices: [
      {
        choice:'Tell them you want to shop on your own.',
        destination:''
      },
      {
        choice:'Hand them your resume.',
      },
      {
        choice:'Ask them where they acquired their merchandise.',
      },
    ],// correct or "winning" choice continues the story with more choices
  },
  gaudy: {
    title: "Not your taste...",
    text: "Your snobbery leads you astray once again, you lose. And perhaps more tragically, you've missed out on adventure.",
    choices: [],
    win: false,
  
     // incorrect or losing destination
  },
  disinterested: {
    title: "Not your taste...",
    text: "You've chosen to save adventure for another time. Try again when you're up for a story!'.",
    choices: [],
    win: false,
     // incorrect or losing destination
  }
}

let currentChapter = {}




/*--------- Cached Element References ---------*/
  const startButton = document.querySelector('#start-button')
  const input = document.querySelector('#name-input')
  const content = document.querySelector('#content')
  const restartButton = document.querySelector('#restart-button')
  restartButton.style.display = 'none'
  const proceedButton = document.querySelector('#submit-button')
  proceedButton.style.display = 'none'
  const h1 = document.querySelector('h1')
  const p = document.querySelector('p')
  p.style.display = 'none'
  const nameInput = document.querySelector('#name-input')
  const section = document.querySelector('section')
  section.style.display = 'none'
  const nameLabel = document.querySelector('#name-label')
  const lightDarkBtn = document.querySelector("#light-dark-button")
  const body = document.querySelector("body")


checkDarkPref()
/*-------------- Event Listeners --------------*/
  
  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', restartGame)
  proceedButton.addEventListener('click', getPlayerChoice)
  lightDarkBtn.addEventListener("click", toggleLightDark)


/*----------------- Functions -----------------*/

// function to render the current scene 
function render(chapter) {
  h1.innerText = story[chapter].title
  p.innerText = story[chapter].text
  
  getChoices(chapter)
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
  section.style.display = 'block'
  startButton.style.display = 'none'
  nameInput.style.display = 'none'
  nameLabel.style.display = 'none'
if (story[chapter].choices.length) {  
    let allChoices = ''
    proceedButton.style.display = 'block'
    for (let i = 0; i < story[chapter].choices.length; i++) {
      allChoices += `
      <div>
      <input data-destination = ${story[chapter].choices[i].destination}  id = "radio${i}" type = "radio" name = "choices"/> 
      <label for "radio${i}">${story[chapter].choices[i].choice}</label>
      </div>      
      `  
      console.log(story[chapter].choices[i].choice)
    }
    section.innerHTML = allChoices
  } else { 
    const endMessage = 'Game over'
    section.innerHTML = endMessage
    // content.innerHTML = ''  
    restartButton.style.display = 'block'
    proceedButton.style.display = 'none'
  }
   // function to retrieve choices from story object
}

function startGame() {
  h1.innerText = story.start.title
  p.innerText = story.start.text
  getChoices('start') 
  p.style.display = 'block'
  proceedButton.style.display = 'block'
}

function restartGame() {
  location.reload()
}

$(document).ready(function () {
  let current = 0;
  $("#mirror-content").on("click", function () {
    $(this).css({
      "background-image": `url(${images[++current % images.length]})`
    });
  });
});

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

checkDarkPref()