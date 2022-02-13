const searchButton = document.querySelector('.search-container button') as HTMLButtonElement
const input = document.getElementById('search-input') as HTMLInputElement

interface UserInterface {
    name: string
    userName: string
    creationDate: string
    image: string
    bio: string
    repos: string
    followers: string
    following: string
    location: string
    github: string
    twitter: string
    company: string
}

function handleUser(user: string): void {
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

                // Setting the fetched data to HTML DOM
                document.querySelector('h2')!.textContent = user.name
                document.querySelector('h3')!.textContent = `@${user.userName}`

                let cakeDay: Date | string = new Date(user.creationDate)
                cakeDay = cakeDay.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })
                document.querySelector('.names-and-date p')!.textContent = `Joined ${cakeDay}`;

                (<HTMLImageElement>document.getElementById('pug')).src = user.image
                document.getElementById('bio')!.textContent = user.bio
                document.getElementById('repos')!.textContent = user.repos
                document.getElementById('followers')!.textContent = user.followers
                document.getElementById('following')!.textContent = user.following
                document.getElementById('location')!.textContent = user.location

                document.getElementById('github')!.textContent = user.github;
                (<HTMLAnchorElement>document.getElementById('github')).href = user.github

                if (user.twitter) {
                    document.getElementById('twitter')!.textContent = user.twitter;
                    (<HTMLAnchorElement>document.getElementById('twitter')).href = `https://twitter.com/${user.twitter}`
                }
                else {
                    document.getElementById('twitter')!.textContent = 'Not Available';
                    (<HTMLAnchorElement>document.getElementById('twitter')).href = '#'
                }

                document.getElementById('company')!.textContent = user.company ? user.company : 'Not Available'
            })
}

searchButton.addEventListener('click', () => handleUser(input.value))

input.addEventListener('keydown', event => {
    if (event.key === 'Enter')
        handleUser(input.value)
})