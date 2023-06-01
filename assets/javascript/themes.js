'use strict';

/* DOM ELEMENTS */
const rootEl = document.documentElement.style;

/* EVENT HANDLERS */
const darkTheme = function () {
    rootEl.setProperty('--clr-shadow', 'hsl(221, 39%, 3%)');
    rootEl.setProperty('--clr-background', 'hsl(222, 47%, 21%)');
    rootEl.setProperty('--clr-background-tint', 'hsl(221, 39%, 31%)');
    rootEl.setProperty('--clr-headline', 'hsl(221, 80%, 95%)');
    rootEl.setProperty('--clr-paragraph', 'hsl(221, 80%, 85%)');
    rootEl.setProperty('--clr-paragraph-placeholder', 'hsla(221, 80%, 85%, 0.2)');
    rootEl.setProperty('--clr-button', 'hsl(0, 0%, 98%)');
    rootEl.setProperty(
        '--clr-button-before',
        'linear-gradient(140deg, hsl(0, 0%, 95%), hsl(0, 0%, 75%))'
    );
    rootEl.setProperty('--clr-accent', 'hsl(25, 100%, 64%)');
    rootEl.setProperty('--clr-accent-tint', 'hsl(40, 100%, 70%)');
    rootEl.setProperty('--clr-accent-tintier', 'hsl(47, 94%, 74%)');
}

const lightTheme = function () {
    rootEl.setProperty('--clr-shadow', 'hsl(0, 0%, 10%)');
    rootEl.setProperty('--clr-background', 'hsl(0, 0%, 93%)');
    rootEl.setProperty('--clr-background-tint', 'hsl(0, 0%, 100%)');
    rootEl.setProperty('--clr-headline', 'hsl(0, 0%, 5%)');
    rootEl.setProperty('--clr-paragraph', 'hsl(0, 0%, 10%)');
    rootEl.setProperty('--clr-paragraph-placeholder', 'hsl(0, 0%, 64%)');
    rootEl.setProperty('--clr-button', 'hsl(0, 0%, 98%)');
    rootEl.setProperty(
        '--clr-button-before',
        'linear-gradient(140deg, hsl(0, 0%, 95%), hsl(0, 0%, 75%))'
    );
    rootEl.setProperty('--clr-accent', 'hsl(25, 100%, 64%)');
    rootEl.setProperty('--clr-accent-tint', 'hsl(40, 100%, 70%)');
    rootEl.setProperty('--clr-accent-tintier', 'hsl(47, 94%, 74%)');
}

/* EXPORTS */
export { darkTheme, lightTheme }