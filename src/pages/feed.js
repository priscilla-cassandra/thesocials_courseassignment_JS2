import {get} from '../auth/apiClient.js'
import { isLoggedIn, siteAuthentication } from '../auth/auth.js'
import { renderNavigation, navLinks } from '../nav/nav.js'

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)

const feedContainer = document.getElementById('feed-posts-container')
feedContainer.classList.add('feed-container')

async function getAllPosts(){
    try{
        const allPosts = await get('/social/posts?_author=true')

        console.log(allPosts)

        allPosts.data.forEach(function(post){
            const postContainer = document.createElement('section')
            postContainer.classList.add('feed-post')

            //Make the entire postContainer clickable
            postContainer.addEventListener('click', ()=>{
                window.location.href =`/html-pages/post.html?id=${post.id}`
            })

            const postTitle = document.createElement('h3')
            postTitle.textContent = post.title
            postContainer.appendChild(postTitle)

            const imageContainer = document.createElement('section')
            imageContainer.classList.add('img-container')
            postContainer.appendChild(imageContainer)

            //Not all posts has an image URL, så only render img if there is an imgURL present!
            if(post.media?.url){
                const postImage = document.createElement('img')
                postImage.src = post.media.url
                postImage.alt = post.title
                imageContainer.appendChild(postImage)
            }

            //When clicking the profile-name, go to the profile
            if(post.author?.name){
                const profileLink = document.createElement('a')
                profileLink.href =`/html-pages/profile.html?name=${post.author.name}`
                profileLink.textContent = `@${post.author.name}`
                
                //Prevent parent eventListener (on the post container) to run
                profileLink.addEventListener('click', (event)=>{
                    event.stopPropagation()
                })

                postContainer.appendChild(profileLink)

            }

            feedContainer.appendChild(postContainer)
            
        })   

    } catch(error){
        console.error(error.message)
        feedContainer.textContent = "Could not find any posts. Please try again"
    }
}

getAllPosts()