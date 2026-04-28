import {post} from '../auth/apiClient.js'

const loginForm = document.getElementById('login-form')
const loginErrorMessage = document.getElementById('error-message')

async function userLogin(loginDetails){
    try{
        const response = await post('/auth/login', loginDetails)

        const {name, accessToken} = response.data

        if(accessToken){
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('name', name)
        }

        console.log('User logged in', response.data)

        //setTimeout(()=>{
            //window.location.href = '.../pages/feed.html'
        //}, 1000)

    }catch(error){
        console.error(error.message)
        loginErrorMessage.textContent = "Sorry, you were not able to log in. Please try again"
    }
}

function submitLoginForm(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    userLogin(formFields)
}

loginForm.addEventListener('submit', submitLoginForm)