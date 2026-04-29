import { get } from "../auth/apiClient.js";
import { isLoggedIn, siteAuthentication } from "../auth/auth.js";

isLoggedIn()
siteAuthentication()

const profileGrid = document.getElementById('profile-post-grid')
profileGrid.classList.add('profile-grid-container')

const params = new URLSearchParams(window.location.search)
const profileName = params.get('name')

async function getProfilePosts(){

    const profilePosts = await get(`/social/profiles/${profileName}/posts?_author=true`)
    
    console.log(profilePosts)

    profilePosts.data.forEach((post)=>{
        
    })

}

getProfilePosts()