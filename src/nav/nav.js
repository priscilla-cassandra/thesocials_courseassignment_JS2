import { logout } from "../auth/auth.js"
import { getAccessToken } from "../auth/auth.js"

export const navLinks = [
    {name: 'Feed', href: '/html-pages/feed.html', iconClass: 'fa-regular fa-house'},
    {name: 'MyProfile', href: '/html-pages/profile.html', iconClass: 'fa-regular fa-user'},
    {name: 'NewPost', href: '/html-pages/create.html', iconClass: 'fa-solid fa-plus'},
    {name: 'Logout', href: '/index.html', iconClass: 'fa-solid fa-arrow-right-from-bracket'}
]

export function renderNavigation(links){
    const ul = document.createElement('ul')

    links.forEach((link)=>{
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = link.href
        
        const icon = document.createElement('i')
        icon.className = link.iconClass

        a.appendChild(icon)

        if(link.name === 'Logout'){
            a.addEventListener('click', (event)=>{
                event.preventDefault()
                logout()
                window.location.href = link.href
            })
        }

        if(link.name === 'MyProfile'){
            a.addEventListener('click', (event)=>{
                event.preventDefault()

            })
        }

        li.appendChild(a)
        ul.appendChild(li)
    })

    return ul
}

