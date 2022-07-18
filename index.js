const displayDiv = document.querySelector('.display')
let currentlyHeldValue = 0;
let initialValue = 0;
let operator;

//number buttons
const numberButtons = document.querySelectorAll('.number')
for (const button of numberButtons) {
  button.addEventListener('click', populateDisplay)
}

//actions buttons
const actionButtons = document.querySelectorAll('.action')
for (const button of actionButtons) {
  button.addEventListener('click', setOperation)
}

//equate button
const equateButton = document.querySelector('.operate')
equateButton.addEventListener('click', evaluate)

// Operations
const add = (x, y) => {
  return Number.parseInt(x) + Number.parseInt(y)
}

const multiply = (x, y) => {
  return x * y
}

const divide = (x, y) => {
  return x/y
}

const subtract = (x, y) => {
  return x - y
}

function setOperation(e) {
  initialValue = currentlyHeldValue
  operator = e.target.textContent
}

function evaluate() {
  const finalAnswer = operate(initialValue, operator, currentlyHeldValue)
  populateDisplay(undefined, finalAnswer)
  return finalAnswer
}

//operate function
const operate = (operand1, operator, operand2) => {
  switch (operator) {
    case '+':
      return add(operand1, operand2)
      break;
    case '-':
      return subtract(operand1, operand2)
      break;
    case '/':
      return divide(operand1, operand2)
      break;
    case '*':
      return multiply(operand1, operand2)
      break;  
    default:
      break;
  }
}

//populateDisplay function
function populateDisplay (e, value) {
  const toBeDisplayed = e ? e.target.value : value
  displayDiv.textContent = toBeDisplayed;
  currentlyHeldValue = toBeDisplayed
}