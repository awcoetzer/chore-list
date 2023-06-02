'use strict';

/* DOM ELEMENTS */
const inputEl = document.getElementById('input-field');
const addBtnEl = document.getElementById('btn-add');
const deleteAllEl = document.getElementById('btn-delete-all');
const choresContainerEl = document.getElementById('chores-text-box');
const killerChickenEl = document.querySelector('.killer-chicken-container');
const surpriseChicken = document.querySelector('.surprise-chicken-container');

let choresArr, chickenKillerMeter;
const pinkPanther = new Audio('./assets/sound/pinkpanther.mp3')
pinkPanther.currentTime = 9;
pinkPanther.volume = 0.3;

/* EVENT HANDLERS */
const clearInput = function () {
    inputEl.value = ''
}

const renderLastInputAsPlaceholder = (userInput) => {
    const formattedInput = userInput.slice(0, 1).toUpperCase() + userInput.slice(1);

    inputEl.setAttribute('placeholder', formattedInput)
}

const addToChoresArr = function () {
    const userInput = inputEl.value
    const userInputToLowercase = userInput.toLowerCase()

    if (choresArr.includes(userInputToLowercase)) {
        return
    } else {
        choresArr.push(userInputToLowercase)
        renderLastInputAsPlaceholder(userInputToLowercase)
        clearInput()
    }

    localStorage.setItem('choresArrInLocal', JSON.stringify(choresArr))

}

const createEventListenersForChores = function () {
    const choresEl = document.querySelectorAll('.chores');

    if (choresEl) {
        for (let i = 0; i < choresEl.length; i++) {
            choresEl[i].addEventListener('click', function (evt) {
                const target = evt.target.innerText.toLowerCase();

                choresArr.splice(choresArr.indexOf(target), 1);

                let chores = ''

                for (let i = 0; i < choresArr.length; i++) {
                    chores += `
                    <li class='chores'>
                        ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
                    </li>
                    `
                }

                choresContainerEl.innerHTML = chores;

                if (choresArr.length) {
                    localStorage.setItem('choresArrInLocal', JSON.stringify(choresArr))
                } else {
                    localStorage.removeItem('choresArrInLocal')
                }

                createEventListenersForChores()
            })
        }
    }

}

const renderChoresToList = function () {
    let chores = ''

    for (let i = 0; i < choresArr.length; i++) {
        chores += `
            <li class='chores'>
                ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
            </li>
        `
    }

    choresContainerEl.innerHTML = chores;
    createEventListenersForChores()
}

const checkIfNoInput = function () {
    if (chickenKillerMeter === 2) {
        inputEl.setAttribute('placeholder', 'Whats behind you?');
        killerChickenEl.classList.add('slow-chicken')
        pinkPanther.play()
        setTimeout(() => {
            surpriseChicken.classList.add('surprise')
        }, 8500);

        setTimeout(() => {
            surpriseChicken.classList.add('surprise-over')
        }, 13500);

        setTimeout(() => {
            window.location.reload()
        }, 16500)
    } else if (chickenKillerMeter === 1) {
        inputEl.setAttribute('placeholder', 'Don\'t test me!');
        killerChickenEl.classList.add('chicken-killer')
    } else {
        inputEl.setAttribute('placeholder', 'Add a chore');
        killerChickenEl.classList.add('chicken')
    }
}

const checkIfInput = function (event) {
    if (event.key !== 'Enter') {
        chickenKillerMeter = 0;

        killerChickenEl.classList.remove('chicken')
        killerChickenEl.classList.remove('chicken-killer')
        killerChickenEl.classList.remove('slow-chicken')
        surpriseChicken.classList.remove('surprise')
    }
}

/* EVENT LISTENERS */
inputEl.addEventListener('keydown', function (evt) {

    if (!inputEl.value && evt.key === 'Enter') {
        checkIfNoInput()
        chickenKillerMeter++
    } else if (inputEl.value && evt.key === 'Enter') {
        addToChoresArr()
        renderChoresToList()
    }

    checkIfInput(evt)
})

addBtnEl.addEventListener('click', function () {
    if (inputEl.value) {
        addToChoresArr()
        renderChoresToList()
    } else {
        checkIfNoInput()
        chickenKillerMeter++
    }
})

deleteAllEl.addEventListener('click', function () {
    choresContainerEl.innerHTML = '';
    choresArr = [];
    localStorage.removeItem('choresArrInLocal');
})


/* LOCAL STORAGE */
const setChoresArrFromLocal = function () {
    if (localStorage.hasOwnProperty('choresArrInLocal')) {
        choresArr = JSON.parse(localStorage.getItem('choresArrInLocal'))
    } else {
        choresArr = []
    }
}

const renderChoresArrFromLocal = function () {
    let chores = ''

    for (let i = 0; i < choresArr.length; i++) {
        chores += `
            <li class='chores'>
                ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
            </li>
        `
    }

    choresContainerEl.innerHTML = chores;
    createEventListenersForChores()
}


/* DOCUMENT INITIALIZATION */
function init() {
    chickenKillerMeter = 0;

    setChoresArrFromLocal();
    renderChoresArrFromLocal();
}

init();