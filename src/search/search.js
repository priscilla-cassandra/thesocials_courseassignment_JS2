import { get } from "../auth/apiClient.js";

const searchField = document.getElementById('site-search')
const resultsContainer = document.getElementById('search-result')
resultsContainer.classList.add('results-container')

async function searchForPosts(query){
    try{
        const response = await get(`/social/posts/search?q=${(query)}`)
        renderPosts(response.data)
    }catch(error){
        console.error(error.message)
    }
}

function renderPosts(posts){
    resultsContainer.innerHTML = ''

    if(!posts || posts.length === 0){
        const noResult = document.createElement('p')
        noResult.textContent = 'No posts matches your search'
        resultsContainer.appendChild(noResult)
        return
    }

    posts.forEach(post => {
        const postContainer = document.createElement('section')
        postContainer.classList.add('post-container-on-search')
        resultsContainer.appendChild(postContainer)

        if(post.media?.url){
            const postImage = document.createElement('img')
            postImage.src = post.media.url
            postContainer.appendChild(postImage)
        }

        postContainer.addEventListener('click', ()=>{
            window.location.href = `/html-pages/post.html?id=${post.id}`
        })
    })
}

/**
 * Creates a debounce function that waits 300ms before doing the API call in searchForPosts
 * @param {Function} func The function that needs to be debounced
 * @param {number} delay The number of milliseconds to delay function call
 * @returns {Function} Returns the new debounce function
 */
function debounce (func, delay){
    let timeoutId

    //Returns a function that wraps the original function with the timer logic
    return function (...args){
        const context = this

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() =>{
            func.apply(context, args)
        }, delay)
    }
}

const debounceSearch = debounce(searchForPosts, 300)

function handleSearch (event){
    const query = event.target.value.trim()

    if(!query){
        resultsContainer.innerHTML = ''
        return
    }

    debounceSearch(query)
}

searchField.addEventListener('input', handleSearch)
searchField.addEventListener('keyup', handleSearch)

searchField.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault()
    }
})