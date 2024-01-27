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

// <=========================================================>
// <=========================================================>
/* <==========================detect numbers==========================> */
// <=========================================================>
// <=========================================================>
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
  const len = resultDisplayed.innerText.length;
  if (len === 1) { resultDisplayed.innerText = '0'; return; }
  const charArray = resultDisplayed.innerText.split('');
  charArray[len - 1] = '';
  resultDisplayed.innerText = charArray.join('');
};

const displayNumber = (number) => {
  resultDisplayed.insertAdjacentText('beforeend', number);
};

const makeOperation = (operation) => {
  if (operation === 'AC') { AC(); } else if (operation === 'DEL') { DEL(); } else if (operation === '=') { ENTER(); } else if (resultDisplayed.innerText !== '0') { displayNumber(operation); }
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
    makeOperation(operation.innerText);
  });
});

// <====================================================================================>
// <==================================================================================>
/* <==========================Use keyboard as input source==========================> */
// <====================================================================================>
// <==================================================================================>

const availableNumbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Ans',
];
const availableOperations = ['+', '-', '/', '*'];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  'Backspace',
  'Enter',
  'c',
];
const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add('hover');
    elem.click();
    setTimeout(() => elem.classList.remove('hover'), 100);
  }
};

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    displayNumber(key);
  } else if (availableOperations.includes(key)) {
    makeOperation(key);
  }
};
window.addEventListener('keydown', (event) => {
  // keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});
