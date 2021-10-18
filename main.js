
/*----------------- Constants -----------------*/

/*------------- Variables (state) -------------*/

let story = {
  chapter: "currentScene",
  currentScene: {
    title: "Chapter 1",
    text: "Back again? You move through a packed marketplace, navigating your way through the busy traffic. You briefly stop to talk with a fruit vendor, who greets you kindly and hands you a date. You accept graciously and continue through the marketplace. You cut through the crowd and come to stop at a curious shop fronted by massive bronze and silver metalworks. Do you enter?",
    choices: [
      {
        choice: "You window-shop for a while, but ultimately decide it’s all a little too gaudy for your taste.",
        destination: 'gaudy'
      },
      {
        choice: "Your interest is peaked, you walk in.",
        destination: 'enter'
      },
      {
        choice: "No, you walk away. Chooising to save adventure for another day.",
        destination: 'disinterested' 
      },
    ]
},
gaudy: {
  title: "Not your taste...",
  text: "Your snobbery leads you astray once again, you lose. And perhaps more tragically, you've missed out on adventure.",
  }
},
enter: {
  title: "A curious mind!",
  text: "You enter the shop, which HUMS with the whirs and clanks of gears and mechanisms. At the entrance sits an astrolabe inlaid in silver, so large it could be the face of a clock tower. A water-clock sounds, its chime WHISTLED by a swallow that seems to raise itself out the water. A figure steps out from what seems to be an infinite doorway. Their eyes are kind and familiar, their voice warm. They greet you like an old friend.",
  choices: [
    {
      choice:'',
    },
    {
      choice:'',
    },
    {
      choice:'',
    },
  ]
  }
}


/*--------- Cached Element References ---------*/


/*-------------- Event Listeners --------------*/
document.addEventListener('DOMContentLoaded', function() {
  let button = document.querySelector('#start-button')
  let input = document.querySelector('#name-input')
  let content = document.querySelector('#content')
  button.addEventListener('click', render)
})

/*----------------- Functions -----------------*/

function render() {
  content.innerHTML = ` 
  <h1>${story.currentScene.title}<h1>
  <p>${story.currentScene.text}</p> 
  ${getInputs()}  
  <button id = "submit-button">Proceed</button>
  `
  let button = document.querySelector("#submit-button");
  button.addEventListener('click', function(){
    getInputValue()
  })
}

function getInputValue(){
  let inputs = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      console.log(inputs[i].getAttribute('data-destination'))
    }
  }
}

function getInputs() {
  let input = ""
  for (let i = 0; i < story.currentScene.choices.length; i++) {
    input += `
    <div>
    <input data-destination = ${story.currentScene.choices[i].destination}  id = "radio${i}" type = "radio" name = "choices"/> 
    <label for "radio${i}">${story.currentScene.choices[i].choice}</label>
    </div>      
    `    
    console.log(story.currentScene.choices[i].choice)
  }
  return input;
}