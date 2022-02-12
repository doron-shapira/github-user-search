const searchButton = document.querySelector('.search-container button') as HTMLButtonElement
const input = document.getElementById('search-input') as HTMLInputElement

interface UserInterface {
    name: string
    userName: string
    creationDate: string
    image: string
    bio: string
    repos: number
    followers: number
    following: number
    location: string
    github: string
    twitter: string
    company: string
}

function fetchUser(user: string): void {
    if (user !== "")
        fetch(`https://api.github.com/users/${user}`)
            .then(response => response.json())
            .then(data => {
                const user: UserInterface = {
                    name: data.name,
                    userName: data.login,
                    creationDate: data.created_at,
                    image: data.avatar_url,
                    bio: data.bio,
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    location: data.location,
                    github: data.html_url,
                    twitter: data.twitter_username,
                    company: data.company
                }
                console.log(user)
            })
}

searchButton.addEventListener('click', () => fetchUser(input.value))

input.addEventListener('keydown', event => {
    if (event.key === 'Enter')
        fetchUser(input.value)
})