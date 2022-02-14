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
const themeButton = document.getElementById('theme-btn');
const icons = document.querySelectorAll('ul img');
let isDark = true;
themeButton.addEventListener('click', () => handleTheme());
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
function handleTheme() {
    if (isDark) {
        isDark = false;
        document.querySelector('body').style.backgroundColor = 'white';
        document.querySelector('body').style.color = 'black';
        themeButton.style.color = 'black';
        document.querySelector('#theme-btn span').textContent = 'DARK';
        document.getElementById('theme-icon').src = 'assets/moon-icon.svg';
        document.getElementById('theme-icon').alt = 'moon-icon';
        document.querySelector('.search-container').style.backgroundColor = 'rgb(206, 206, 206)';
        document.querySelector('.search-container input').style.color = 'black';
        document.querySelector('.user-container').style.backgroundColor = 'rgb(206, 206, 206)';
        document.querySelector('h3').style.color = '#5683b4';
        document.getElementById('github').style.color = 'black';
        document.getElementById('twitter').style.color = 'black';
        document.querySelector('.info-container').style.backgroundColor = 'rgb(144, 144, 144)';
        icons.forEach(icon => icon.style.filter = 'invert(100%) sepia(100%) saturate(2%) hue-rotate(98deg) brightness(109%) contrast(100%)');
    }
    else {
        isDark = true;
        document.querySelector('body').style.backgroundColor = '#141c2f';
        document.querySelector('body').style.color = 'white';
        themeButton.style.color = 'white';
        document.querySelector('#theme-btn span').textContent = 'LIGHT';
        document.getElementById('theme-icon').src = 'assets/sun-icon.svg';
        document.getElementById('theme-icon').alt = 'sun-icon';
        document.querySelector('.search-container').style.backgroundColor = '#1f2a48';
        document.querySelector('.search-container input').style.color = 'white';
        document.querySelector('.user-container').style.backgroundColor = '#1f2a48';
        document.querySelector('h3').style.color = '#7ebcff';
        document.querySelector('a').style.color = 'white';
        document.getElementById('github').style.color = 'white';
        document.getElementById('twitter').style.color = 'white';
        document.querySelector('.info-container').style.backgroundColor = '#141c2f';
        icons.forEach(icon => icon.style.filter = 'unset');
    }
}
