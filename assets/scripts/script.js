/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* Light/Dark Theme */
const toggleElement = document.querySelector('.themes__toggle');
const toggleDarkTheme = () => toggleElement.classList.toggle('themes__toggle--isActive');
const toggleDarkThemeWithEnter = (event) => {
  event.key === 'Enter' && toggleDarkTheme();
};

toggleElement.addEventListener('keydown', toggleDarkThemeWithEnter);
toggleElement.addEventListener('click', toggleDarkTheme);

/* detect numbers */
const resultDisplayed = document.querySelector('.calc__result');
const numbersList = document.querySelectorAll('[data-type="number"]');
const operationsList = document.querySelectorAll('[data-type="operation"]');

const AC = () => {
  const ansElement = numbersList.querySelector('[data-value="ANS"]');
  ansElement.innerText = resultDisplayed.innerText;
  resultDisplayed.innerText = '0';
};
const DEL = () => {
  resultDisplayed.innerText -= ' ';
};

const displayNumber = (number) => {
  resultDisplayed.insertAdjacentText('beforeend', number);
};

numbersList.forEach((number) => {
  number.addEventListener('click', () => {
    if (resultDisplayed.innerText === '0') { resultDisplayed.innerText = ''; }
    displayNumber(number.innerText);
  });
});
operationsList.forEach((operation) => {
  operation.addEventListener('click', () => {
    // displayNumber(operation.innerText);
    if (operation.innerText === 'AC') {
      AC();
    }
  });
});
