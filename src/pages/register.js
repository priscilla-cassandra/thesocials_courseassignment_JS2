import {post} from '../auth/apiClient.js'

const registerForm = document.getElementById('register-form')
const messageDisplay = document.getElementById('success-error-message')

async function registerNewUser(userInput) {
    try{
        const newUser = await post('/auth/register', userInput)
        messageDisplay.textContent = 'New user registered! You can now log in'
        
        console.log('User Created', newUser)
    } catch(error){
        console.error(error.message)
        messageDisplay.textContent = 'Could not create new user. Try again'
    }
}

function submitRegisterForm(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const formFields = Object.fromEntries(formData)
    registerNewUser(formFields)
}

registerForm.addEventListener('submit', submitRegisterForm)