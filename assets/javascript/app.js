'use strict';

/* DOM ELEMENTS */
const inputEl = document.getElementById('input-field');
const addBtnEl = document.getElementById('btn-add');
const deleteAllEl = document.getElementById('btn-delete-all');
const choresContainerEl = document.getElementById('chores-text-box');
const killerChickenEl = document.querySelector('.killer-chicken-container');
const surpriseChicken = document.querySelector('.surprise-chicken-container');

let choresArr, chickenKillerMeter, pointOfNoReturn, characterCounter;

const pinkPanther = new Audio('./assets/sound/pink-panther.mp3');
pinkPanther.volume = 0.3;

/* EVENT HANDLERS */
/*
    Below is what selects and displays the random welldone gif
*/
const randomGif = function () {
    const randomNum = Math.floor(Math.random() * 11);
    const gifPath = './assets/images/project/welldone'

    choresContainerEl.innerHTML = `
        <span class="welldone-header">click the gif to generate another random gif</span>
        <img src="${gifPath}-${randomNum}.gif" class="welldone-gif">
    `

    const welldoneGifEl = document.querySelector('.welldone-gif');
    if (welldoneGifEl) {
        welldoneGifEl.addEventListener('click', randomGif)
    }
}

const clearInputAfterSubmit = function () {
    inputEl.value = '';
}
/*
    I added this in as one of my own stretch goals, as the 
    function name suggests, it just adds the last userInput 
    as the placeholder text.
*/
const renderLastInputAsPlaceholder = (userInput) => {
    const formattedInput = userInput.slice(0, 1).toUpperCase() + userInput.slice(1);

    inputEl.setAttribute('placeholder', formattedInput);
}

/*
    As the name suggests, it just adds the user input 
    to the chores array. However to implement one of the 
    goals of not adding an existing item to the list, I 
    converted the input to lowercase letters and pushing 
    those converted inputs to the array so when checking,
    it makes the process easier, not to mention that if the
    user uses uppercase or mix of lowercase and uppercase, 
    it wouldn't matter.
*/
const addToChoresArr = function () {
    const userInput = inputEl.value;
    const userInputToLowercase = userInput.toLowerCase();

    if (choresArr.includes(userInputToLowercase)) {
        return;
    } else {
        choresArr.push(userInputToLowercase);
        renderLastInputAsPlaceholder(userInputToLowercase);
        clearInputAfterSubmit();
    }

    localStorage.setItem('choresArrInLocal', JSON.stringify(choresArr));
}

/*
    This function checks is the chores array is empty or not and updates the 
    local storage array, if there is not it removes it from the local storage
    and then display the random welldone gif.
*/
const checkIfChoresAreCompleted = function () {
    if (choresArr.length) {
        localStorage.setItem('choresArrInLocal', JSON.stringify(choresArr));
    } else {
        setTimeout(() => {
            randomGif()
        }, 250);
        localStorage.removeItem('choresArrInLocal');
    }
}

/*
    This function just adds the event listener to the newly
    created element. It's also where it checks if the tasks are 
    completed and display the gif.
*/
const createEventListenersForChores = function () {
    const choresEl = document.querySelectorAll('.chores');

    if (choresEl) {
        for (let i = 0; i < choresEl.length; i++) {
            choresEl[i].addEventListener('dblclick', function (evt) {
                const target = evt.target.innerText.toLowerCase();

                choresArr.splice(choresArr.indexOf(target), 1);

                let chores = '';

                for (let i = 0; i < choresArr.length; i++) {
                    chores += `
                    <li class='chores'>
                        ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
                    </li>
                    `;
                }

                choresContainerEl.innerHTML = chores;

                checkIfChoresAreCompleted()
                /*
                    This repeats the process for each item in the array, not sure if I did this right, also still slight confused about using innerHTML for setting
                    elements on the page.
                */ 
                createEventListenersForChores();
            });
        }
    }

}

/*
    This is fairly straight foward to understand, it was just the adding
    of event listeners to this.
*/
const renderChoresToList = function () {
    let chores = '';

    for (let i = 0; i < choresArr.length; i++) {
        chores += `
            <li class='chores'>
                ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
            </li>
        `
    }

    choresContainerEl.innerHTML = chores;
    createEventListenersForChores();
}

/*
    This resets my killer chicken after its been activated.
*/
const resetTheKillerChicken = function () {
    chickenKillerMeter = 0;
    pointOfNoReturn = false;
    inputEl.disabled = false;

    inputEl.setAttribute('placeholder', 'Do dishes');

    killerChickenEl.classList.remove('chicken');
    killerChickenEl.classList.remove('chicken-killer');
    killerChickenEl.classList.remove('slow-chicken');
    surpriseChicken.classList.remove('surprise');
    surpriseChicken.classList.remove('surprise-over');
}

/*
    These are the warning messages/actions for the killer chicken
*/
const firstWarning = function () {
    inputEl.setAttribute('placeholder', 'Add a chore');
    killerChickenEl.classList.add('chicken');
}

const secondWarning = function () {
    inputEl.setAttribute('placeholder', 'Don\'t test me!');
    killerChickenEl.classList.add('chicken-killer');
}

/*
    disables chat and displays a message if a person 
    tries to stop the killer chicken.
*/
const pointOfNoReturnFunc = function () {
    if (pointOfNoReturn) {
        inputEl.disabled = true;
        inputEl.setAttribute('placeholder', 'MUHAHAHA!');
    }
}

const killerChickenActivated = function () {
    pointOfNoReturn = true;

    inputEl.setAttribute('placeholder', 'What\'s behind you?');

    killerChickenEl.classList.add('slow-chicken');

    pinkPanther.play();

    setTimeout(() => {
        surpriseChicken.classList.add('surprise');
    }, 8500);

    setTimeout(() => {
        surpriseChicken.classList.add('surprise-over');
    }, 13500);

    setTimeout(() => {
        resetTheKillerChicken();
    }, 16500)
}

// This is the stages as to how the killer chicken gets activated
const checkIfNoInput = function () {
    if (chickenKillerMeter === 2) {
        killerChickenActivated()
    } else if (chickenKillerMeter === 1) {
        secondWarning()
    } else {
        firstWarning()
    }
}

/*
    This is another sort of reset, but this happens before the
    killer chicken is activated, so if you are within the first
    2 warnings and you begin to type it will reset the killer 
    chicken.
*/
const checkIfInput = function (event) {
    if (event.key !== 'Enter') {
        chickenKillerMeter = 0;

        killerChickenEl.classList.remove('chicken');
        killerChickenEl.classList.remove('chicken-killer');
        killerChickenEl.classList.remove('slow-chicken');
        surpriseChicken.classList.remove('surprise');
    }
}

/* EVENT LISTENERS */
/*
    This looks for a keyboard enter press when typing in the 
    input field, this feels more natural, but both options
    for submitting are added to the project.
*/
inputEl.addEventListener('keydown', function (evt) {
    pointOfNoReturnFunc()

    /*
        Here we are check if the submit is happening with the enter
        key while the input field is empty.
        if so, it will run check if no input function as well as
        increment the warning level controlled by the chicken killer
        meter. 
        Otherwise it functions how it should if there is input.
    */
    if (!inputEl.value && evt.key === 'Enter') {
        checkIfNoInput();
        chickenKillerMeter++;
    } else if (inputEl.value && evt.key === 'Enter') {
        addToChoresArr();
        renderChoresToList();
    }

    /*
        This is the soft reset allowing for users to reset before
        the killer chicken is activated.
    */
    checkIfInput(evt);
})

// pretty much the same as above just with a button and a lot less code
addBtnEl.addEventListener('click', function () {
    if (pointOfNoReturn) return

    if (inputEl.value) {
        addToChoresArr();
        renderChoresToList();
    } else {
        checkIfNoInput();
        chickenKillerMeter++;
    }
})

/*
    This reset the stage for all elements, reassigned 
    the chores array and removes the array from storage 
    as there is no reason for it to stay there.
*/
deleteAllEl.addEventListener('click', function () {
    if (pointOfNoReturn) return

    choresContainerEl.innerHTML = '';
    inputEl.setAttribute('placeholder', 'Do dishes')
    choresArr = [];
    localStorage.removeItem('choresArrInLocal');
})


/* LOCAL STORAGE */
/*
    this sets this chares array from local storage to
    the documents array so we can itterate over it and 
    render it on the page with the function below.
*/
const setChoresArrFromLocal = function () {
    if (localStorage.hasOwnProperty('choresArrInLocal')) {
        choresArr = JSON.parse(localStorage.getItem('choresArrInLocal'))
    } else {
        choresArr = [];
    }
}

const renderChoresArrFromLocal = function () {
    let chores = ''

    for (let i = 0; i < choresArr.length; i++) {
        chores += `
            <li class='chores'>
                ${choresArr[i].slice(0, 1).toUpperCase() + choresArr[i].slice(1)}
            </li>
        `;
    }

    choresContainerEl.innerHTML = chores;
    createEventListenersForChores()
}


/* DOCUMENT INITIALIZATION */
function init() {
    chickenKillerMeter = 0;
    pointOfNoReturn = false;

    setChoresArrFromLocal();
    renderChoresArrFromLocal();
}

init();