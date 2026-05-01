import { del } from "../auth/apiClient.js";

const deletePostMessage = document.getElementById('update-post-message')
const loggedInUser = localStorage.getItem('name')

export async function deletePost(id){
    try{
        deletePostMessage.textContent = 'Post is being deleted...'

        await del(`/social/posts/${id}`)

        setTimeout(()=>{
            window.location.href = `/html-pages/profile.html?name=${loggedInUser}`
        },2000)

    }catch(error){
        console.error(error.message)
        deletePostMessage.textContent = 'Could not delete your post. Please try again later!'
    }
}