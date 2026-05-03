const BASE_URL = "https://v2.api.noroff.dev"
const API_KEY = "7490ce2b-fd87-43b5-9ea8-b6f18695876e"

/**
 * A reusable API service that performs HTTP methods based on endpoint and options
 * @param {*} endpoint The endpoint for the HTTP method
 * @param {*} options Optional argument that is added to configure the HTTP request
 * @returns A JSON response depending on the HTTP request
 */
async function apiClient (endpoint, options = {}){
    const {body, ...customOptions} = options //Separate body from ...customOptions to check if a body exists (to decide the HTTP method), keeping customOptions separate

    const apiKey = localStorage.getItem('apiKey')
    const accessToken = localStorage.getItem('accessToken')

    const headers = {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
    }

    if(apiKey){
        headers['X-Noroff-API-Key'] = apiKey
    }

    if(accessToken){
        headers['Authorization'] = `Bearer ${accessToken}`
    }

    const config = {
        method: body ? 'POST' : 'GET', //If there is a body, its a POST request, if not its a GET request
        ...customOptions, //customOptions will override the default method
        headers: { //Spread default headers first, then custom headers, so that the custom overrides the default
            ...headers,
            ...customOptions.headers
        }
    }

    if(body){
        config.body = JSON.stringify(body)
    }

    try{
        const response = await fetch(BASE_URL + endpoint, config)

        if(!response.ok){
            const errorData = await response.json()
            throw new Error(
                errorData.errors?.[0]?.message || 'An API error occured'
            )
        }

        if(response.status === 204){
            return null
        }

        return await response.json()
    } catch(error){
        console.error('API Client Error', error)
        throw error
    }
}

export const get = (endpoint) => apiClient(endpoint) //GET request only needs the endpoint
export const post = (endpoint, body) => apiClient(endpoint, {body}) //POST request needs response body
export const put = (endpoint, body) => apiClient(endpoint, {method: 'PUT', body}) //PUT request needs response body
export const del = (endpoint) => apiClient(endpoint, {method: 'DELETE'}) //DELETE only needs the endpoint