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
   createFormListener()
   renderToys()
});

function createFormListener() {
    form = document.querySelector('form')  

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const formData = {
            name: event.target['name'].value,
            image: event.target['image'].value
        }

        event.target.reset()


        const reqObj = {
            method: 'POST',

            headers: {
                'Content-Type' : 'application/json'
            },

            body: JSON.stringify(formData)
        }

        fetch('http://localhost:3000/toys/', reqObj)
        .then(resp => resp.json())
        .then(toy => {
            renderToy(toy)
        })
    })
}

function renderToy(toy) {
    const toyContainer = document.getElementById('toy-collection')

    toyContainer.innerHTML += `<div class="card"> 
    <h2>${toy.name}</h2>
    <img src='${toy.image}'class="toy-avatar"/>
    <p> ${toy.likes} </p> 
    <button class="like-btn">Like <3</button>
    </div>`
}


function renderToys() {
    fetch('http://localhost:3000/toys/')
    .then(resp => resp.json())
    .then(toys => {
        toys.forEach(renderToy)
    })
}