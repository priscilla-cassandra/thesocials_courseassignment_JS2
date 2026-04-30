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
        li.appendChild(a)
        ul.appendChild(li)
    })

    return ul
}

