
var story = {
  chapter: "currentScene",
  currentScene: {
    title: "Chapter 1",
    text: "Back again? You move through a packed marketplace, navigating your way through the busy traffic. You briefly stop to talk with a fruit vendor, who greets you kindly and hands you a date. You accept graciously and continue through the marketplace. You cut through the crowd and come to stop at a curious shop fronted by massive bronze and silver metalworks. Do you enter?",
    choices: [
      {
        choice: "You window-shop for a while, but ultimately decide it’s all a little too gaudy for your taste."
      },
      {
        choice: "Your interest is peaked, you walk in."
      },
      {
        choice: "No, you walk away. Chooising to save adventure for another day."
      },
    ]
  }
}
document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('#start-button')
  var input = document.querySelector('#name-input')
  var content = document.querySelector('#content')
  button.addEventListener('click', render)
})

function render() {
  content.innerHTML = ` 
  <h1>${story.currentScene.title}<h1>
  <p>${story.currentScene.text}</p> 
  ${getInputs()}  
  <button id = "submit-button">Proceed</button>
  `
  var button = document.querySelector("submit-button");
  button.addEventListener('click', function(){
  
  })
}

function getInputValue(){
  var inputs = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked){
      consolee.log(input[i])
    }
  }
}

function getInputs() {
  var input = ""
  for (var i = 0; i < story.currentScene.choices.length; i++) {
    input += `
    <div>
    <input id = "radio${i}" type = "radio" name = "choices"/> 
    <label for "radio${i}">${story.currentScene.choices[i].choice}</label>
    </div>      
    `    
    console.log(story.currentScene.choices[i].choice)
  }
  return input;
}