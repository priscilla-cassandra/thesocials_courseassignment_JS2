import { get } from "../auth/apiClient.js";
import { isLoggedIn, siteAuthentication } from "../auth/auth.js";
import { renderNavigation, navLinks } from "../nav/nav.js";

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)

const profileGrid = document.getElementById('profile-post-grid')
profileGrid.classList.add('profile-grid-container')

const params = new URLSearchParams(window.location.search)
const profileName = params.get('name')

async function getProfilePosts(){

    const profilePosts = await get(`/social/profiles/${profileName}/posts?_author=true`)
    
    console.log(profilePosts)

    const userName = document.getElementById('username')
    userName.textContent = profileName
    userName.classList.add('profile-username')

    profilePosts.data.forEach((post)=>{
        const postContainer = document.createElement('a')
        postContainer.href=`/html-pages/post.html?id=${post.id}`
        postContainer.classList.add('profile-post-container')

        const postTitle = document.createElement('h3')
        postTitle.textContent = post.title
        postTitle.classList.add('post-title') 
        postContainer.appendChild(postTitle)

        const imageContainer = document.createElement('section')
        imageContainer.classList.add('profile-img-container')
        postContainer.appendChild(imageContainer)

        const postImage = document.createElement('img')
        postImage.src = post.media?.url
        postImage.alt = post.title
        imageContainer.appendChild(postImage)

        profileGrid.appendChild(postContainer)

    })

}

getProfilePosts()