function eval() {
  // Do not use eval!!!
  return;
}

function express(op, a, b) {
  if (op === "/" && a === 0) {
    throw "TypeError: Division by zero.";
  }

  switch (op) {
    case "+":
      return a + b;
      break;

    case "-":
      return b - a;
      break;

    case "*":
      return a * b;
      break;

    case "/":
      return b / a;
      break;
  }
}

function expressionCalculator(exp) {
  let leftBrackets = exp.match(/\(/g);
  let rightBrackets = exp.match(/\)/g);
  if ((!leftBrackets && rightBrackets) || (leftBrackets && !rightBrackets)) {
    throw "ExpressionError: Brackets must be paired";
  } else if (leftBrackets && rightBrackets) {
    if (leftBrackets.length !== rightBrackets.length) {
      throw "ExpressionError: Brackets must be paired";
    }
  }

  let opsPrior = {
    "-": 2,
    "+": 1,
    "*": 3,
    "/": 3,
    "(": 0,
    ")": 0,
  };

  let arr = exp.match(/(\d+)|[\+\*\/\-()]/g).reverse();
  console.log(arr);

  let ops = [];
  let values = [];

  while (arr.length > 0) {
    let c = arr[arr.length - 1];
    if (c === "(") {
      ops.push(arr.pop());
    } else if (c === ")") {
      while (ops.length > 0 && ops[ops.length - 1] !== "(") {
        values.push(express(ops.pop(), values.pop(), values.pop()));
      }
      ops.pop();
      arr.pop();
    } else if (opsPrior.hasOwnProperty(c)) {

      while (ops.length > 0 && opsPrior[c] <= opsPrior[ops[ops.length - 1]]) {
        values.push(express(ops.pop(), values.pop(), values.pop()));
      }

      ops.push(arr.pop());
    } else {
      values.push(parseFloat(arr.pop()));
    }
  }

  while (ops.length > 0) {
    values.push(express(ops.pop(), values.pop(), values.pop()));
  }

  return values.pop();
}

module.exports = {
  expressionCalculator,
};
