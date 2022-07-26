const displayDiv = document.querySelector('.display')
let currentlyHeldValue = 0;
let initialValue = 0;
let operator;
let allowMoreThanOneDigit = true;
let consecutiveOperator = true

//keyboard support
window.addEventListener('keydown', function(e){
  if (e.key === 'Backspace'){
    return backspaceErase()
  }
  if (['1','2','3','4','5','6','7','8','9','0'].includes(e.key)){
    return populateDisplay(null, String(e.key))
  }
  //to add keyboard support in a way that matches the setOperation syntax
  if (['+','-','=','/','.','*'].includes(e.key)){
    return setOperation({
      target: {
        textContent: e.key
      }
    })
  }
})

//backspace button
const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', backspaceErase)

function backspaceErase(){
  displayDiv.textContent = displayDiv.textContent.substring(0, displayDiv.textContent.length - 1)
  currentlyHeldValue = Number.parseInt(displayDiv.textContent)
  // const temp = displayDiv.textContent
  // displayDiv.textContent = ''
  // currentlyHeldValue = displayDiv.textContent
  // populateDisplay(undefined, temp.substring(0, temp.length - 1))
  if (displayDiv.textContent.length < 1){
    currentlyHeldValue = 0;
    initialValue = 0;
    displayDiv.textContent = '0'
  }
}

//clear button
const clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', function(){
  displayDiv.textContent = '0'
  currentlyHeldValue = 0
  initialValue = 0
  allowMoreThanOneDigit = true
  consecutiveOperator = true
  operator = ''
})

//decimal button
const decimalButton = document.querySelector('.dot')
decimalButton.addEventListener('click', function() {
  decimalButton.disabled = true
})

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
  return Math.round(((Number.parseFloat(x) + Number.parseFloat(y)) + Number.EPSILON) * 10000000) / 10000000
}

const multiply = (x, y) => {
  return Math.round(((x * y) + Number.EPSILON) * 10000000) /10000000
}

const divide = (x, y) => {
  return Math.round(((x/y) + Number.EPSILON) * 10000000) /10000000
}

const subtract = (x, y) => {
  return Math.round(((x - y) + Number.EPSILON) * 10000000) /10000000
}

function setOperation(e) {
  decimalButton.disabled = false
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
      return currentlyHeldValue
      break;
  }
}

//populateDisplay function
function populateDisplay (e, value) {
  consecutiveOperator = false

  const toBeDisplayed = e ? e.target.value : value

  if (displayDiv.textContent === '0' && currentlyHeldValue === 0){
    currentlyHeldValue = toBeDisplayed
    return displayDiv.textContent = Number.parseInt(toBeDisplayed)
  }
  if (allowMoreThanOneDigit){
    return displayDiv.textContent = currentlyHeldValue += toBeDisplayed
  } else {
    displayDiv.textContent = ''
    allowMoreThanOneDigit = true;
    currentlyHeldValue = Number.parseInt(toBeDisplayed)
    return displayDiv.textContent = currentlyHeldValue 
  }
}