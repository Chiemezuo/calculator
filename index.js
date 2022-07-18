const displayDiv = document.querySelector('.display')
let currentlyHeldValue = 0;
let initialValue = 0;
let operator;
let allowMoreThanOneDigit = true;
let consecutiveOperator = true

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
  return Math.round(((x/y) + Number.EPSILON) * 10000) /10000
}

const subtract = (x, y) => {
  return x - y
}

function setOperation(e) {
  consecutiveOperator = true
  if (operator && e.target.textContent && consecutiveOperator && currentlyHeldValue === initialValue) {
    allowMoreThanOneDigit = false
    return operator = e.target.textContent
  }

  if (currentlyHeldValue >= 0 && initialValue >= 0 && operator){
    currentlyHeldValue = operate(initialValue, operator, currentlyHeldValue)
  }
  
  initialValue = currentlyHeldValue
  displayDiv.textContent = initialValue
  operator = e.target.textContent
  allowMoreThanOneDigit = false
}

function evaluate() {
  allowMoreThanOneDigit = false

  if (!operator || !currentlyHeldValue)
    return initialValue
  const finalAnswer = operate(initialValue, operator, currentlyHeldValue)
  populateDisplay(undefined, finalAnswer)
  allowMoreThanOneDigit = false
  operator = ''
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
  consecutiveOperator = false
  const toBeDisplayed = e ? e.target.value : value

  if (displayDiv.textContent === '0' && currentlyHeldValue === 0){
    currentlyHeldValue = toBeDisplayed
    return displayDiv.textContent = toBeDisplayed
  }
  if (allowMoreThanOneDigit){
    return displayDiv.textContent = currentlyHeldValue += toBeDisplayed
  } else {
    displayDiv.textContent = ''
    allowMoreThanOneDigit = true;
    currentlyHeldValue = toBeDisplayed
    return displayDiv.textContent = currentlyHeldValue 
  }

}