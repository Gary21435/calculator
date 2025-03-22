/* --------------------------------------------ALTERNATIVE IMPLEMENTATION----------------------------
- Let user 'type' in a string of an operation
- string.pop() it to find relevant info (num2, operation, num1)
- ...
 */

/* ---------THIS METHOD----------
1. Enter number or '.', either keyboard or mouse click.
2. Save 
*/

const backspace = "←";
const buttonIDs = ["AC", "+/-", "%", "/", "7", "8", "9", "*", 
    "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "←", "="];

const blue = "rgb(54, 166, 222)";
const orange = "rgb(210, 137, 68)";
const green = "rgb(67, 125, 67)";

const buttonColors = [
    `${blue}`, `${blue}`, `${blue}`, `${orange}`, `${green}`, `${green}`, `${green}`, `${orange}`, 
    `${green}`, `${green}`, `${green}`, `${orange}`, `${green}`, `${green}`, `${green}`, `${orange}`, 
    `${green}`, `${green}`, `${green}`, `${orange}`, 
];

const calculator = document.querySelector(".calculator"); 
const buttons = document.querySelector(".buttons"); // buttons container
const screenNum = document.querySelector(".screen"); // calculator screen
const calcWidth = 600;
const calcHeight = 600;
let btnWidth = calcWidth/4;
let btnHeight = calcHeight/5;

buttons.style.width = `${calcWidth}px`;
buttons.style.height = `${calcHeight}px`;
// Generate calculator
for(let i = 0; i<buttonIDs.length; i++) {
    const btn = document.createElement("button");
    buttons.appendChild(btn);

    btn.classList = `btn ${buttonColors[i]}`;
    btn.id = `${buttonIDs[i]}`;
    // if(buttonIDs[i] === "0")
    //     btn.style.width = `${btnWidth*2}px`;
    // else
    btn.style.width = `${btnWidth}px`;
    btn.style.height = `${btnHeight}px`;
    btn.style.boxSizing = "border-box";
    btn.textContent = `${buttonIDs[i]}`;
    btn.style.backgroundColor = `${buttonColors[i]}`;
}





let num1 = null;
let num1Str = "";
let num2 = null;
let num2Str = "";
let twoNums = new Array(2);
let operation = "";
let mustBeOperation = false;
let decimal1 = false;
let decimal2 = false;

const operationArr = ["*", "/", "+", "-", "%"];

function startOver() { 
    num1 = null;
    num2 = null;
    operation = "";
    screenNum.textContent = 0;
    mustBeOperation = false;
    decimal1 = false;
    decimal2 = false;
    num1Str = "";
    num2Str = "";
}

function doOperation() {
    let ans = 0;

    if(num2 === 0 && operation == "/") {
        alert("You have committed the sin of dividing by ZERO! Shame on thee.");
        startOver();
        return;
    }

    switch (operation) {
        case "+":
            ans = num1 + num2;
            break;
        case "-":
            ans = num1 - num2;
            break;
        case "*":
            ans = num1 * num2;
            break;
        case "/":
            ans = num1 / num2;
            break;
    }
    if (operation === "%")
        if(num2 === null) ans = num1/100;
        else ans = num1/100 * num2;

    startOver();
    ans = Math.round(ans*10000000)/10000000; // Prevents 1.9999999999999999999
    screenNum.textContent = ans;
    num1 = ans;
    num1Str = String(num1);
    if (ans%1) decimal1 = true;
    mustBeOperation = true;
}

function displayOperation() {
    if(num2 === null) num2Str = "";
    if(num1 === null) num1Str = "0";
    if(decimal1 && !mustBeOperation && num1 === null) num1Str = "0."
    screenNum.textContent = num1Str + operation + num2Str;
}

function handleClick(e, optional) {

    let input = e.target.id;
    if(optional) input = optional; 

    if(input === ".") {
        if(!mustBeOperation && operation == "") { // if no operation has been entered, then we're on num1 still
            if(decimal1) return;
            else decimal1 = true;
            if(num1 === null) num1Str = '0';
            num1Str += input;
            num1 = 0;
        }
        else if(mustBeOperation && operation == "") {
            decimal1 = true;
            mustBeOperation = false;
            num1Str = "0.";
            num1 = 0;
        }
        else {
            if(decimal2) return;
            else decimal2 = true;
            if(num2 === null) num2Str = '0';
            num2Str += input;
            num2 = 0;
        }
        displayOperation();
    }

    // UNDO
    else if(input === backspace) { 
        mustBeOperation = false;
        if(num2 !== null) {
            if(num2Str.slice(-1) === '.') decimal2 = false;
            num2Str = num2Str.slice(0, -1);
            num2 = Number(num2Str);
            if(num2Str === '0') num2 = null;
        }
        else {
            if(operation === "") {
                if(num1Str.slice(-1) === '.') decimal1 = false;
                num1Str = num1Str.slice(0, -1);
                num1 = Number(num1Str);
                if(num1 === 0) num1 = null;
            }
            else {  
                operation = "";
            }
        }
        displayOperation();
    }

    else if(input === "=") {
        if(operation === "") return;
        doOperation();
    }
    else if(input === "AC")
        startOver();

    let number = Number(input);
    let numCheck = number;

    
    if(number === 0) numCheck = true; //0 is a number

    if(num1 == null && !numCheck) {
        return;
    }
    else if(numCheck && operation == "") { // NUM1
        if(mustBeOperation) {
            startOver();
            num1 = number; 
            num1Str = String(num1);
        }
        else {
            if (num1Str === '0') num1Str = "";
            num1Str += String(number);
            num1 = Number(num1Str);
        }
        displayOperation();
    }
    else if(numCheck && operation !== "") { // NUM2
        num2Str += String(number);
        num2 = Number(num2Str);
        displayOperation();
        // screenNum.textContent = num1 + operation + num2;
    }
    else if(!numCheck && num1 != null && num2 == null && operationArr.includes(input)) { // operation
        if(operation === input) return;
        operation = input;
        displayOperation();
        mustBeOperation = false;
    }
    else if(input === "+/-" && (num1 !== null || num2 !== null)) {
        if(operation === "") {
            num1 = -1 * num1;
            num1Str = String(num1);
            screenNum.textContent = num1;
        }
        else {
            num2 = -1 * num2;
            num2Str = String(num2);
            screenNum.textContent = num1 + operation + "(" + num2 + ")";
        }
    }
}

function handleKeys(e) {
    let key = e.key;
    if(!(Number(key) !== NaN || operationArr.includes(key) || key === 'Enter' || key === "Backspace" 
        || key === "."))
        return;
    if(key === "Enter") key = '=';
    else if(key === "Backspace") key = backspace;
    handleClick(e, key);
}

buttons.addEventListener("click", (e) => handleClick(e)); 
// implement keyboard support by adding custom event that calls handleClick(e) on a valid key stroke?
document.addEventListener("keydown", (e) => handleKeys(e));