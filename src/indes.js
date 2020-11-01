const lostToys = `http://localhost:3000/toys`
const toyList = document.getElementById("toy-collection")

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
  createFormListener();
  addLike();
  findToys();
});

function findToys() {
  fetch(lostToys).then(resp => resp.json()).then(toys => renderToys(toys))
}

function renderToys(toys) {
    toys.forEach(toy => {
        toyList.innerHTML += `<div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like (^w^) </button>
      </div>`
    });
}
  
function createFormListener() {
    const form = document.querySelector('.add-toy-form')

    form.addEventListener('submit', function(event) {
      event.preventDefault()

      const formData = { 
        name: event.target['name'].value,

        image: event.target['image'].value, 

        // default value is zero
        likes: 0 


    }

    event.target.reset()

    const reqObj = {

      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(lostToys, reqObj).then(resp => resp.json).then(newToy => renderToys(newToy));
  })
}

function likes(e) {
  const toyId = e.target.parentElement.dataset.id;
  
  const likeCount = parseInt(e.target.parentElement.children[2].innerText.split(" ")[0])

  const likeData = {
    likes: likeCount + 1
  }

  const reqObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(likeData)
  }

  fetch(`http://localhost:3000/toys/${toyId}`, reqObj).then(resp => resp.json()).then(like => {
    likeData, 
    findToys();
  })
}
function addLike() {
  document.addEventListener("click", (e) => {
    // if the node they clicked has a class="like-btn" attribute
    if (e.target.className === "like-btn") {
      // call the handleLikeButton function and pass in the event as an argument
      likes(e);
    }
  });

}
  