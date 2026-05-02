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

    //If you follow the user, set isFollowing to true
    following.forEach(followed =>{
        if(followed.name === profileName){
            isFollowing = true
        }
    })

    followButton.classList.remove('hidden')
    followButton.textContent = isFollowing ? 'Unfollow' : 'Follow'

    followButton.addEventListener('click', async()=>{
        //If isFollowing is true, onclick will call the unfollow endpont
        //change the button text, and set isFollowing to false
        if(isFollowing){
            await unfollowUser (profileName)
            isFollowing = false
            followButton.textContent = 'Follow'
        }else{
            //If isFollowing is false, onclick will call the follow endpoint
            //Change the button text, and set isFollowing to true
            await followUser(profileName)
            isFollowing = true
            followButton.textContent = 'Unfollow'
        }

        console.log('Is following: ', isFollowing)
    })
}
