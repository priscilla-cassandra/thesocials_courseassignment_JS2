import { get, put } from "../auth/apiClient.js";

async function followUser(profileName){
    try{
        const response = await put(`/social/profiles/${profileName}/follow`)
        return response

    }catch(error){
        console.error(error.message)
    }
}

async function unfollowUser(profileName){
    try{
        const response = await put(`/social/profiles/${profileName}/unfollow`)
        return response

    }catch(error){
        console.error(error.message)
    }
}

export async function followOrUnfollowUser(profileName){
    const loggedInUser = localStorage.getItem('name')
    const followButton = document.getElementById('follow-btn')

    //Stop function here if the profile that is being rendered
    //is the user that is logged in
    if(profileName === loggedInUser) return

    //Get logged in users follower list to see if logged in user
    //follows the user-profile
    const profileData = await get(`/social/profiles/${loggedInUser}?_following=true`)
    
    let following

    if(profileData.data.following){
        following = profileData.data.following
    }else{
        following = []
    }

    let isFollowing = false

    following.forEach(followed =>{
        if(followed.name === profileName){
            isFollowing = true
        }
    })

    followButton.classList.remove('hidden')
    followButton.textContent = isFollowing ? 'Unfollow' : 'Follow'

    followButton.addEventListener('click', async()=>{
        if(isFollowing){
            await unfollowUser (profileName)
            isFollowing = false
            followButton.textContent = 'Follow'
        }else{
            await followUser(profileName)
            isFollowing = true
            followButton.textContent = 'Unfollow'
        }

        console.log('Is following: ', isFollowing)
    })
}
