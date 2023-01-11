let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {


// starter code provided

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
// });


// GET the toys from toys
// render/display the toys in cards
function getAllToys() {
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then((someData) => { someData.forEach(createCards)})
  // console.log(arrayOfToyObjects)
}

getAllToys() //call the function here so that is begins to run in the program


// someData represents each toy object
      //createElements
  function createCards(someData) {


    const divForToyCard = document.createElement("div")
          divForToyCard.className = "card" //this instruction was from the readme

    const h2ForToyCard = document.createElement("h2")
          h2ForToyCard.textContent = someData.name

    const imageForToyCard = document.createElement("img")
          imageForToyCard.src = someData.image //use dot notation with src to assign an image
          imageForToyCard.className = "toy-avatar"

    const pTagForToyCard = document.createElement("p")
          pTagForToyCard.textContent = `${someData.likes}`

    const buttonForToyCard = document.createElement("button")
          buttonForToyCard.innerText = "Like ❤️"
          buttonForToyCard.className = "like-btn"
          buttonForToyCard.id = `${someData.id}`
          buttonForToyCard.addEventListener("click", () => {

          //  console.log("click")
          //  let numberLikes = parseInt(pTagForToyCard.textContent)
          //  numberLikes += 1
          //  pTagForToyCard.textContent = numberLikes
          let numberLikes = parseInt(pTagForToyCard.textContent)
          numberLikes += 1
      //patch request goes here
      const configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({"likes" : numberLikes}),
      };
      fetch(`http://localhost:3000/toys/${someData.id}`, configurationObject)
        .then(function (response) {
        return response.json();
      })
        .then(function () {
        pTagForToyCard.textContent = numberLikes;
      })
      // .then pTagForToyCard.textContent = numberLikes

          })


      // console.log(buttonForToyCard)

      divForToyCard.append(h2ForToyCard, imageForToyCard, pTagForToyCard, buttonForToyCard)
        console.log(divForToyCard)

      
    toyCollectionDiv.append(divForToyCard)
  }


const toyCollectionDiv = document.querySelector("#toy-collection")
  console.log(toyCollectionDiv)

// get form to work
// Handle Our Form
const formForNewToy = document.querySelector( ".add-toy-form" )
formForNewToy.addEventListener(  "submit" , ( eventObject )=>{

  eventObject.preventDefault()

  const formText = document.querySelectorAll(".input-text")
  // console.log(formText)

  const formNewToyName = formText[0].value
  const formNewToyImage = formText[1].value
  // console.log(formNewToyImage)

  const newAddToy = {
    "name": formNewToyName,
    "image": formNewToyImage,
    "likes": 0,
  };
    const configurationObject = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newAddToy),
  };

  fetch("http://localhost:3000/toys", configurationObject)
    .then(function (response) {
      return response.json();
  })
    .then(function (object) {
    // console.log(object);
    createCards(object)

});
})

// break up into smaller functions to simplify code. 
//fetch request can be in single function
// render cards in single function
// find ways to create reusable code