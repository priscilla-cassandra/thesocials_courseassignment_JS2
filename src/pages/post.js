import { get } from "../auth/apiClient.js";
import { isLoggedIn, siteAuthentication } from "../auth/auth.js";

isLoggedIn()
siteAuthentication()

const singlePostContainer = document.getElementById('single-post-container')
singlePostContainer.classList.add('post-container')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

async function getSinglePost(){

    try{
        const singlePost = await get(`/social/posts/${id}?_author=true`)
        const post = singlePost.data
        console.log(singlePost)

        const postTitle = document.createElement('h3')
        postTitle.textContent = post.title 
        singlePostContainer.appendChild(postTitle)

        const imageContainer = document.createElement('section')
        imageContainer.classList.add('img-container')
        singlePostContainer.appendChild(imageContainer)

        if(post.media?.url){
            const postImage = document.createElement('img')
            postImage.src = post.media.url
            postImage.alt = post.title
            imageContainer.appendChild(postImage)
        }

        const postCaption = document.createElement('p')
        postCaption.textContent = post.body
        postCaption.classList.add('post-caption')
        singlePostContainer.appendChild(postCaption)

        const profileLink = document.createElement('a')
        profileLink.href = `/html-pages/profile.html?name=${post.author.name}`
        profileLink.textContent = `@${post.author.name}`
        singlePostContainer.appendChild(profileLink)

        const postDate = document.createElement('p')
        postDate.textContent = post.created.slice(0, 10)
        singlePostContainer.appendChild(postDate)

    }catch(error){
        console.error(error.message)
        singlePostContainer.textContent = 'Could not get post. Pleased try again!'
    }
}

getSinglePost()