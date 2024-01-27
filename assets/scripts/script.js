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

const ENTER = () => {
  const numbersArray = resultDisplayed.innerText.split(/[+−÷×]/);
  const operationsArray = resultDisplayed.innerText.match(/[+−÷×]/g);

  let resultNumber = parseFloat(numbersArray[0]);

  const applyOperation = (number, operation) => {
    if (operation === '+') {
      resultNumber += number;
    } else if (operation === '−') {
      resultNumber -= number;
    } else if (operation === '×') {
      resultNumber *= number;
    } else if (operation === '÷') {
      resultNumber /= number;
    }
  };
  for (let i = 0; i < operationsArray.length; i += 1) {
    applyOperation(parseFloat(numbersArray[i + 1]), operationsArray[i]);
  }
  if (resultNumber.toString() === 'NaN') {
    resultDisplayed.innerText = '0';
  } else resultDisplayed.innerText = resultNumber.toString();
  const ans = document.querySelector('[data-value="Ans"]');
  ans.setAttribute('data-saved', resultDisplayed.innerText);
};
const AC = () => {
  resultDisplayed.innerText = '0';
};
const DEL = () => {
  if (resultDisplayed.innerText.length === 1) { resultDisplayed.innerText = '0'; return; }
  const charArray = resultDisplayed.innerText.split('');
  charArray[1] = '';
  resultDisplayed.innerText = charArray.join('');
};

const displayNumber = (number) => {
  resultDisplayed.insertAdjacentText('beforeend', number);
};

numbersList.forEach((number) => {
  number.addEventListener('click', () => {
    if (resultDisplayed.innerText === '0') { resultDisplayed.innerText = ''; }
    if (number.innerText === 'Ans') { displayNumber(number.getAttribute('data-saved')); return; }
    displayNumber(number.innerText);
  });
});
operationsList.forEach((operation) => {
  operation.addEventListener('click', () => {
    if (operation.innerText === 'AC') { AC(); } else if (operation.innerText === 'DEL') { DEL(); } else if (operation.innerText === '=') { ENTER(); } else if (resultDisplayed.innerText !== '0') displayNumber(operation.innerText);
  });
});
