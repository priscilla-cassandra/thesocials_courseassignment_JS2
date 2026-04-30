import { post } from "../auth/apiClient.js";
import { renderNavigation, navLinks } from "../nav/nav.js";
import { isLoggedIn, siteAuthentication } from "../auth/auth.js";

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)

const newPostForm = document.getElementById('new-post')
const postMessage = document.getElementById('new-post-message-display')

async function createNewPost(postInput){
    try{
        
        const requestBody = {
            title: postInput.title,
            body: postInput.caption,
        }

        if(postInput.imageURL){
            requestBody.media = {
                url: postInput.imageURL,
                alt: postInput.title
            }
        }

        const newPost = await post('/social/posts', requestBody)

        const newPostId = newPost.data.id

        postMessage.textContent = 'Your post was published! Lets have a look at it!'
        setTimeout(()=>{
            window.location.href = `/html-pages/post.html?id=${newPostId}`
        }, 2000)

    }catch(error){
        console.error(error.message)
        postMessage.textContent = 'Could not publish new post. Please try again'
    }
}

function publishNewPost(event){
    event.preventDefault()
    const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all values from the input fields
    const formFields = Object.fromEntries(formData) //Object.fromEntries turns formData into a JavaScript Object
    createNewPost(formFields)
}

newPostForm.addEventListener('submit', publishNewPost)