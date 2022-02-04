var input = document.getElementById('input'), // declaring input output button
  numbers = document.querySelectorAll('.main-elements div'), //Get all elements in the document with class main-elements(numberss) buttons
  operator = document.querySelectorAll('.operators div'), //Get all elements in the document with class operator buttons
  result = document.getElementById('result'), // equal-button
  clear = document.getElementById('clear-button'), // clear-button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

//this will allow to click on main-elements buttowns 
for (var i = 0; i < numbers.length; i++) {
  // e is an object from the event
  numbers[i].addEventListener("click", function(e) {

    //all the input string will be store and will be used later to output 
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if user don't hit for result button it will keep adding 
    if (resultDisplayed === false) {
      // parameter e is being added to the input 
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if user choose to output result and choose to click a operators  
      // keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // this will allow user to press number after result being display 
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// this will allow to click on operators
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // all the input string will be store and will be used later to output 
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a numberss first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing 
  var inputString = input.innerHTML;

  // forming an array of numbersss. eg for above string it will be: numbersss 
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators 
  
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // peforming operation at a time using loop though the array
  // this follows first divide, then multiply, then subtraction and then addition
  // final numbers in the array will be the result 

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // parseFloat allowing function parses a string and returns a floating point number
    //The splice() method helping the contents of arrays by removing or replacing existing elements and/or adding new elements in place
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})