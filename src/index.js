let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  fetchToys();
});



function fetchToys(){
  const toyCollection = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys/')
    .then(resp => resp.json())
    
    .then(toys => {
      toys.forEach(function(toy) {
        toyCollection.innerHTML += `<div class="card"> 
        <h2>${toy.name}</h2>
        <img src='${toy.image}'class="toy-avatar"/>
        <p> ${toy.likes} </p> 
        <button class="like-btn">Like <3</button>
        </div>`
      })
    })
}

function formListener(){
  const form = document.querySelector('form')

  form.addEventListener('submit', function(event){
    event.preventDefault()

    const data = {
      name: event.target['name'].value,
      image: event.target['image'].value
    }    

    

  })
}




// Add a new toy to the collection

// DECLARED VARIABLES
// form 
// input from the form

// DEFINED FUNCTIONS


// INVOKED FUNCTIONS


// EVENT LISTENERS
// submit


// Increase the toy's likes