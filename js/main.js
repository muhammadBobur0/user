
let elListUser = document.querySelector(".users")
let elListPost = document.querySelector(".posts")
let elListComment = document.querySelector(".comment")
let tempListcomment = document.querySelector(".comment-temp").content
let tempListUser = document.querySelector(".temp-users").content
let tempPost = document.querySelector(".temp-post").content
let load = document.querySelector(".lodaing")



function elComment(arr, nod){
  nod.innerHTML = ""
  for (com of arr) {
    let tempComment = tempListcomment.cloneNode(true)
    tempComment.querySelector(".comment__iteam__postid").textContent = `postId:${com.postId}`
    tempComment.querySelector(".comment__iteam__id").textContent = `id:${com.id}`
    tempComment.querySelector(".comment__iteam__useremail").textContent = `email:${com.email}`
    tempComment.querySelector('.comment__iteam__name').textContent = `Title:  ${com.name}`
    tempComment.querySelector('.comment__iteam__text').textContent = `comment:${com.body}`
    nod.appendChild(tempComment)
  }  
}




function elUserPost(aray, nodes){
  nodes.innerHTML = ""
  for (pocs of aray) {
    let tempPosts = tempPost.cloneNode(true)
    tempPosts.querySelector(".post__item").dataset.todoId = `${pocs.id}`;
    tempPosts.querySelector(".post__userid").textContent = `userId:${pocs.userId}`
    tempPosts.querySelector(".post__item__id").textContent = `id:${pocs.id}`
    tempPosts.querySelector('.post__item__tittle').textContent = `Title:  ${pocs.title}`
    tempPosts.querySelector('.post__item__text').textContent = `comment:${pocs.body}`
    nodes.appendChild(tempPosts)
  }  
}



  window.addEventListener('load', function(){
    load.classList.add("hide")
  })



function elUserDom (array, node){
  node.innerHTML = ""
  for (poc of array) {
    let newTeampUser = tempListUser.cloneNode(true)
    newTeampUser.querySelector(".users__item").dataset.todoId = `${poc.id}`;
    newTeampUser.querySelector(".users__id").textContent = `id:${poc.id}`
    newTeampUser.querySelector('.users__name').textContent = `${poc.name}`
    newTeampUser.querySelector('.users__names').textContent = `username:  ${poc.username}`
    newTeampUser.querySelector('.users__email').href =`mailto:${poc.email}`
    newTeampUser.querySelector('.users__email').textContent = `user-email:${poc.email}`
    newTeampUser.querySelector('.users__email').setAttribute("target", "blank")
    newTeampUser.querySelector('.users__address__city').textContent = `city: ${poc.address.city}`
    newTeampUser.querySelector('.users__address__street').textContent = `street: ${poc.address.street}`
    newTeampUser.querySelector('.users__address__suite').textContent = `suite: ${poc.address.suite}`
    newTeampUser.querySelector('.users__address__zipcode').textContent = `zipcode: ${poc.address.zipcode}`
    newTeampUser.querySelector('.users__location').href = `https://www.google.com/maps/place/${poc.address.geo.lat} , ${poc.address.geo.lng}`
    newTeampUser.querySelector('.users__location').textContent = "user location"
    newTeampUser.querySelector('.users__tel').textContent = `tel:${poc.phone}`
    newTeampUser.querySelector('.users__tel').href = `tel:${poc.phone}`
    newTeampUser.querySelector('.users__website').href = `${poc.website}`
    newTeampUser.querySelector('.users__website').textContent = `website:${poc.website}`
    newTeampUser.querySelector('.users__company').textContent = `company:${poc.company.name}`
    newTeampUser.querySelector('.users__catch').textContent = `catch:${poc.company.catchPhrase}`
    newTeampUser.querySelector('.users__bs').textContent = `bs:${poc.company.bs}`
    node.appendChild(newTeampUser)
  }  

}

async function elPostComment (postid){
  let commentRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
  let commentData = await commentRes.json()
  elComment(commentData, elListComment)
}

async function elUser (){
  let res = await fetch("https://jsonplaceholder.typicode.com/users")
  let data = await res.json()
  elUserDom(data, elListUser)
}


async function elPost(val){
  let postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${val}`)
  let postData = await postRes.json()
  elUserPost(postData, elListPost);
  
}

elUser()



elListUser.addEventListener('click', function(evt){
  let id = evt.target.closest("li").dataset.todoId;
  elListPost.style.display = "block"
  elPost(id)
})


elListPost.addEventListener('click', function(evts){
  let idComment = evts.target.closest("li").dataset.todoId;
  elListComment.style.display = "block"
  elPostComment(idComment)
})