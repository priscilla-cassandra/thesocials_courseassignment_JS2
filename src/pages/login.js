import {post} from '../auth/apiClient.js'

const loginForm = document.getElementById('login-form')
const loginErrorMessage = document.getElementById('error-message')

async function userLogin(loginDetails){
    try{
        const response = await post('/auth/login', loginDetails)

        const {name, accessToken, apiKey} = response.data

        if(accessToken){
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('name', name)
        }

        if(apiKey){
            localStorage.setItem('apiKey', apiKey.data.key)
        }

        setTimeout(()=>{
            window.location.href = '/html-pages/feed.html'
        }, 1000)

    }catch(error){
        console.error(error.message)
        loginErrorMessage.textContent = "Sorry, you were not able to log in. Please try again"
        loginErrorMessage.classList.add('error-message')
    }
}

function submitLoginForm(event){
    event.preventDefault()
    const formData = new FormData(event.target) //event.target = the form that was submitted. formData collects all the values from the input fields in the form
    const formFields = Object.fromEntries(formData) //Object.fromEntries turns formDate into a JavaScript Object
    userLogin(formFields)
}

loginForm.addEventListener('submit', submitLoginForm)