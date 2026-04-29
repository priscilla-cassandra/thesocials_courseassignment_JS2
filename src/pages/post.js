import { get } from "../auth/apiClient";
import { isLoggedIn, siteAuthentication } from "../auth/auth";

isLoggedIn()
siteAuthentication()

const singlePostContainer = document.getElementById('single-post-container')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

async function getSinglePost(id){

    try{
        const singlePost = await get(`/social/posts/${id}`)



    }catch(error){
        console.error(error.message)
        singlePostContainer.textContent = 'Could not get post. Pleased try again!'
    }
}