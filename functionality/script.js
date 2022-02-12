"use strict";
const searchButton = document.querySelector('.search-container button');
const input = document.getElementById('search-input');
function fetchUser(user) {
    if (user !== "")
        fetch(`https://api.github.com/users/${user}`)
            .then(response => response.json())
            .then(data => {
            const user = {
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
            };
            console.log(user);
        });
}
searchButton.addEventListener('click', () => fetchUser(input.value));
input.addEventListener('keydown', event => {
    if (event.key === 'Enter')
        fetchUser(input.value);
});
