// Operations

const add = (x, y) => {
  return x + y
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

//Operate function
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