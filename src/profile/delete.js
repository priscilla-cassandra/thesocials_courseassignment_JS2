import { del } from "../auth/apiClient.js";

const deletePostMessage = document.getElementById('update-post-message')

export async function deletePost(id){
    try{
        deletePostMessage.textContent = 'Post is being deleted...'

        await del(`/social/posts/${id}`)

        setTimeout(()=>{
            window.location.href = '/html-pages/feed.html'
        },2000)

    }catch(error){
        console.error(error.message)
        deletePostMessage.textContent = 'Could not delete your post. Please try again later!'
    }
}