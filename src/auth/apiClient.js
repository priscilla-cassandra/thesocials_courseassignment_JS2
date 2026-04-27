const BASE_URL = "https://v2.api.noroff.dev"

async function apiClient (endpoint, options = {}){
    const {body, ...customOptions} = options

    const headers = {
        'Content-Type': 'application/json'
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customOptions,
        headers: {
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
export const post = (enpoint, body) => apiClient(endpoint, {body}) //POST request needs response body
export const put = (endpoint, body) => apiClient(endpoint, {method: 'PUT', body}) //PUT request needs response body
export const del = (endpoint) => apiClient(endpoint, {method: 'DELETE'}) //DELETE only needs the endpoint