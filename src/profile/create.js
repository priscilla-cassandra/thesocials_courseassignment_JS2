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

/**
 * Creates a new post and sendt it to the API 
 * @param {object} postInput The data that is collected from the form
 * @param {string} postInput.title The title of the new post
 * @param {string} postInput.caption The description of the post
 * @param {string} postInput.imageURL An image URL to add an image to the post (this is optional)
 */
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
        postMessage.classList.add('success-message')
        setTimeout(()=>{
            window.location.href = `/html-pages/post.html?id=${newPostId}`
        }, 2000)

    }catch(error){
        console.error(error.message)
        postMessage.textContent = 'Could not publish new post. Please try again'
        postMessage.classList.add('error-message')
    }
}

function publishNewPost(event){
    event.preventDefault()
    const formData = new FormData(event.target) //event.target = the form that was submitted. FormData collects all values from the input fields
    const formFields = Object.fromEntries(formData) //Object.fromEntries turns formData into a JavaScript Object
    createNewPost(formFields)
}

newPostForm.addEventListener('submit', publishNewPost)