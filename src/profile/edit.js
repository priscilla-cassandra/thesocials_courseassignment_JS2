import { put, get } from "../auth/apiClient.js";
import { renderNavigation, navLinks } from "../nav/nav.js";
import { logout, isLoggedIn, siteAuthentication } from "../auth/auth.js";
import { deletePost } from "./delete.js";

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)

const editForm = document.getElementById('edit-form')
const imageUrlInput = document.getElementById('edit-imageURL')
const titleInput = document.getElementById('edit-title')
const captionInput = document.getElementById('edit-caption')
const updatePostMessage = document.getElementById('update-post-message')

const deleteButton = document.getElementById('delete-post-button')
deleteButton.classList.add('delete-button')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

async function getPostToEdit(){
    try{
        const postToEdit = await get(`/social/posts/${id}?_author=true`)
        const result = postToEdit.data

        if(result.media?.url){
            imageUrlInput.value = result.media.url
        }

        titleInput.value = result.title

        if(result.body){
            captionInput.value = result.body
        }

    }catch(error){
        console.error(error.message)
        editForm.textContent = 'Could not get the post you want to edit. Please try again'
    }
}

async function updatePost(id){
    const requestBody = {
        title: titleInput.value,
        body: captionInput.value,
    }

    if(imageUrlInput.value){
        requestBody.media = {
            url: imageUrlInput.value,
            alt: titleInput.value
        }
    }

    try{
        
        await put(`/social/posts/${id}`, requestBody)
        
        updatePostMessage.textContent = 'Your post was updated! Lets have a look at it...'
        updatePostMessage.classList.add('success-message')
        setTimeout(()=>{
            window.location.href = `/html-pages/post.html?id=${id}`
        }, 2000)

    }catch(error){
        console.error(error.message)
        updatePostMessage.textContent = 'There was a problem with editing your post. Please try again!'
        updatePostMessage.classList.add('error-message')
    }
}

function submitUpdatePostForm(event){
    event.preventDefault()
    updatePost(id)
}

getPostToEdit()

editForm.addEventListener('submit', submitUpdatePostForm)

deleteButton.addEventListener('click', ()=>{
    const deleteConfirmation = confirm('Are you sure you want to delete this post?')

    if(deleteConfirmation){
        deletePost(id)
    }
})