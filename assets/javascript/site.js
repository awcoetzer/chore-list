'use strict';

/* IMPORTS */
import { darkTheme, lightTheme } from "./themes.js";

/* DOM ELEMENTS */
const heroImgSourceEl = document.querySelectorAll('.hero-img-source-el');
const heroImgEl = document.querySelector('.hero-img');
const themeBtnEl = document.querySelector('.theme-btn');
const checkboxEl = document.getElementById('theme-checkbox');

let themeCheckboxValue, imgVer, imgPath, lightAlt, darkAlt, imgSrcPath, imgSources;


/* LOCAL STORAGE */
const setThemeFromLocal = function () {

    if (localStorage.hasOwnProperty('themeCheckboxValueInLocal')) {
        themeCheckboxValue = JSON.parse(localStorage.getItem('themeCheckboxValueInLocal'));
    } else {
        themeCheckboxValue = false;
    }

    if (!themeCheckboxValue) {
        lightTheme();
        themeBtnEl.classList.remove('active');
    } else {
        darkTheme();
        themeBtnEl.classList.add('active');
    }

    checkboxEl.checked = themeCheckboxValue;
}

const setImgVerFromLocal = function () {
    if (localStorage.hasOwnProperty('imgVerInLocal')) {
        imgVer = JSON.parse(localStorage.getItem('imgVerInLocal'))
    } else {
        imgVer = 'light'
    }
}

const setHeroSourcesFromLocal = function () {
    if (localStorage.hasOwnProperty('imgSourcesInLocal')) {
        imgSources = JSON.parse(localStorage.getItem('imgSourcesInLocal'))
    } else {
        // this is the default state for the hero image sources
        imgSources = {
            webp: `${imgPath}hero-light.webp`,
            png: `${imgPath}hero-light-min.png`
        }
    }

    const [webpSource, pngSource] = heroImgSourceEl;

    webpSource.setAttribute('srcset', imgSources.webp);
    pngSource.setAttribute('srcset', imgSources.png);
}

const setHeroImageFromLocal = function () {
    if (imgVer === 'light') {
        heroImgEl.setAttribute('alt', lightAlt)
    } else {
        heroImgEl.setAttribute('alt', darkAlt)
    }

    if (localStorage.hasOwnProperty('imgSrcPathInLocal')) {
        imgSrcPath = JSON.parse(localStorage.getItem('imgSrcPathInLocal'))
    } else {
        // this is the default state for the hero image
        imgSrcPath = `${imgPath}hero-light-min.png`;
    }
    
    heroImgEl.setAttribute('src', imgSrcPath)
}

/* DOCUMENT INITIALIZATION */
const init = function () {
    imgPath = './assets/images/hero/';
    lightAlt = 'Images by catalyststuff on Freepik of a supercow flying into the air with a happy expression on its face';
    darkAlt = 'Images by catalyststuff on Freepik of a sleeping cow, after doing all its chores for the day';

    setThemeFromLocal()
    setImgVerFromLocal()
    setHeroSourcesFromLocal()
    setHeroImageFromLocal()
}

init()

/* EVENT HANDLERS */
const changeHeroSources = function (theme) {
    imgSources = {
        webp: `${imgPath}hero-${theme}.webp`,
        png: `${imgPath}hero-${theme}-min.png`
    }

    const [webpSource, pngSource] = heroImgSourceEl;

    webpSource.setAttribute('srcset', imgSources.webp);
    pngSource.setAttribute('srcset', imgSources.png);

    localStorage.setItem('imgSourcesInLocal', JSON.stringify(imgSources));
}

const changeHeroImage = function (theme) {
    imgVer = theme;

    changeHeroSources(imgVer)

    imgSrcPath = `${imgPath}hero-${imgVer}-min.png`;
    heroImgEl.setAttribute('src', imgSrcPath);

    if (imgVer === 'light') {
        heroImgEl.setAttribute('alt', lightAlt)
    } else {
        heroImgEl.setAttribute('alt', darkAlt)
    }

    localStorage.setItem('imgVerInLocal', JSON.stringify(imgVer))
    localStorage.setItem('imgSrcPathInLocal', JSON.stringify(imgSrcPath))
}

const changeTheme = function (evt) {
    themeCheckboxValue = evt.target.checked;
    if (!themeCheckboxValue) {
        lightTheme()
        changeHeroImage('light')
        themeBtnEl.classList.remove('active')
    } else {
        darkTheme()
        changeHeroImage('dark')
        themeBtnEl.classList.add('active')
    }

    localStorage.setItem('themeCheckboxValueInLocal', JSON.stringify(themeCheckboxValue))
}

/* EVENT LISTENERS */
checkboxEl.addEventListener('click', function (evt) {
    changeTheme(evt)
})