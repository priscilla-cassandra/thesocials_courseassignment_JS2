import {get} from '../auth/apiClient.js'

const feedContainer = document.getElementById('feed-posts-container')
feedContainer.classList.add('feed-container')

async function getAllPosts(){
    try{
        const allPosts = await get('/social/posts?_author=true')

        console.log(allPosts)

        allPosts.data.forEach(function(post){
            const postContainer = document.createElement('a')
            postContainer.href=`.../pages/post.html?id=${post.id}`
            postContainer.classList.add('feed-post')

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

            feedContainer.appendChild(postContainer)
            
        })   

    } catch(error){
        console.error(error.message)
        feedContainer.textContent = "Could not find any posts. Please try again"
    }
}

getAllPosts()