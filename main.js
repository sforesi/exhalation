
/*----------------- Constants -----------------*/
const images = [

  
  "https://media3.giphy.com/media/26tnaNlcZHVwfsQTe/giphy.gif?cid=790b7611655928d137c77e4961b901c4b4e8d7d19cdad8ff&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/lKKXOCVviOAXS/giphy-downsized-large.gif",
  "https://media4.giphy.com/media/1AiqjMPNltYFVyFF2z/giphy.gif?cid=790b761175e804ef1f35d71b5bd2e35aa0733a76f459354b&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/3og0IV7MOCfnm85iRa/giphy.gif?cid=790b7611eabe3308d23f076b6d11d4e0d5c1972672b25b2e&rid=giphy.gif&ct=g",
  "",
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
    title: "2",
    text: "You enter the shop, which hums with the whirs and clanks of gears and mechanisms. At the entrance sits an astrolabe inlaid in silver, so large it could be the face of a clock tower. A water-clock sounds, its chime whistled by a swallow that seems to raise itself out the water. A figure steps out from what seems to be an infinite doorway. Their eyes are kind and familiar, their voice warm. They greet you like an old friend. How do you respond?",
    choices: [
      {
        choice:'Tell them you want to shop on your own.',
        destination:'solo',
      },
      {
        choice:'Hand them your resume.',
        destination: 'resume'
      },
      {
        choice:'Compliment the collection and ask them where they acquired their merchandise.',
        destination: 'curious'
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
    title: "I get it...",
    text: "I prefer to shop on my own as well, sorry you gotta restart the game.",
    choices: [],
    win: false,
     // incorrect or losing destination
  },

  solo: {
    title: "I Get It...",
    text: "I prefer to shop on my own as well. Unfortunately you gotta try again.",
    choices: [],
    win: false,
     // incorrect or losing destination
  },

  resume: {
    title: "Not quite...",
    text: "You hand them your CV, and they look at you puzzled. This is a magical fantasy store, and they doesn't really take resumes.",
    choices: [],
    win: false,
     // incorrect or losing destination
  },

  curious: {
    title: "3",
    text: '"I am grateful for your kind words. Everything you see here was made in my workshop, either by myself or by my assistants under my direction," says your companion. You start to notice strange symbols all around the shop.  ',
    choices: [
      {
        choice:'Compliment them on their hat',
        destination:'compliments',
      },
      {
        choice:'Ask them about the symbols on the wall.',
        destination: 'symbols'
      },
      {
        choice:'Tell them outright that you think Alchemy is hogwash, and you know better than to credit it.',
        destination: 'alchemy'
      },
    ],
  },
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
  const h1 = document.querySelector('#title')
  const p = document.querySelector('#text')
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
  // section.appendChild(h1)
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

// $(document).ready(function () {
//   let current = 0;
//   $("#mirror-content").on("click", function () {
//     $(this).css({
//       "background-image": `url(${images[++current % images.length]})`
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function() { // create an event listener on entire document to check if dom has loaded
  let current = 0; // set to first element in images array
  let mirrorContent = document.getElementById('mirror-content');//calling the mirror containe to JS
  mirrorContent.onclick= function() {
    this.style.backgroundImage = 'url(' + images[current++ % images.length] + ')'
  }//the even listener that listens for user click
}
);

