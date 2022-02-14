"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchButton = document.querySelector('.search-container button');
const input = document.getElementById('search-input');
searchButton.addEventListener('click', () => handleUser(input.value));
input.addEventListener('keydown', event => event.key === 'Enter' && handleUser(input.value));
function handleUser(user) {
    fetch(`https://api.github.com/users/${user}`)
        .then((response) => __awaiter(this, void 0, void 0, function* () {
        if (response.ok) {
            const data = yield response.json();
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
            // Setting the fetched data to HTML DOM
            document.querySelector('h2').textContent = user.name;
            document.querySelector('h3').textContent = `@${user.userName}`;
            let cakeDay = new Date(user.creationDate);
            cakeDay = cakeDay.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
            document.querySelector('.names-and-date p').textContent = `Joined ${cakeDay}`;
            document.getElementById('pug').src = user.image;
            document.getElementById('bio').textContent = user.bio;
            document.getElementById('repos').textContent = user.repos;
            document.getElementById('followers').textContent = user.followers;
            document.getElementById('following').textContent = user.following;
            document.getElementById('location').textContent = user.location ? user.location : 'Not Available';
            document.getElementById('github').textContent = user.github;
            document.getElementById('github').href = user.github;
            if (user.twitter) {
                document.getElementById('twitter').textContent = user.twitter;
                document.getElementById('twitter').href = `https://twitter.com/${user.twitter}`;
            }
            else {
                document.getElementById('twitter').textContent = 'Not Available';
                document.getElementById('twitter').href = '#';
            }
            document.getElementById('company').textContent = user.company ? user.company : 'Not Available';
        }
        else
            alert('User Not Found!');
    }))
        .catch(err => alert(err));
}
