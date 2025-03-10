/* --------------------------------------------ALTERNATIVE IMPLEMENTATION----------------------------
- Let user 'type' in a string of an operation
- Parse it, checking for correct syntax, then
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

const buttoColors = ["blue", "blue", "blue", "orange", "green", "green", "green", "orange", 
                      "green", "green", "green", "orange", "green", "green", "green", "orange", 
                      "green", "green", "orange"
];

const calculator = document.querySelector(".calculator");
const buttons = document.querySelector(".buttons");
const screenNum = document.querySelector(".screen");
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
    num1Str = num1 = ans;
    mustBeOperation = true;
}

function displayOperation() {
    let num1Text = num1; 
    let num2Text = num2;// = (num2 !== null) ? num2 : "";
    if(!decimal1) num1Text = (num1 !== null) ? num1 : "";
    else if(decimal1 && num1 === Math.floor(num1)) num1Text = (num1 !== null) ? num1+"." : ".";
    console.log(num1);  
    console.log(Math.floor(num1));
    console.log(num1+".");  

    if(!decimal2) num2Text = (num2 !== null) ? num2 : "";
    else if(decimal2 && num2 === Math.floor(num2)) num2Text = (num2 !== null) ? num2+"." : ".";
    screenNum.textContent = num1Str + operation + num2Str;
}

function handleClick(e) {
    let input = e.target.id;

    if(input === ".") {
        if(operation == "") {
            decimal1 = true;
            num1Str += input;
            displayOperation();
        }
        else {
            decimal2 = true;
            num2Str += input;
            displayOperation();
        }
    }

    // UNDO
    if(input === backspace) { 
        if(num2 !== null) {
            num2 = Math.floor(num2/10);
            if(num2 === 0) num2 = null;
            num2Str = num2;
            displayOperation();
        }
        else {
            if(operation === "") {
                num1 = Math.floor(num1/10);
                num1Str = num1;
                displayOperation();
            }
            else {  
                operation = "";
                displayOperation();
            }
        }
    }

    if(input === "=") {
        if(num2 !== null)
            doOperation();
        else if(num2 === null && operation === "%")
            doOperation();
    }
    if(input === "AC")
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
            num1Str = num1 = number; 
            displayOperation();
        }
        // else if(!decimal1) {
        //     num1 = num1*10 + number;
        // } 
        // else {
        //     let str1 = String(num1);
        //     // let dec = str1.length - str1.indexOf(".") - 1;
        //     // num1 += number/10**(dec+1);
        //     // num1 = Math.round(num1*100)/100;
        //     // if(!str1.includes(".")) {
        //     //     str1 += ".";
        //     //     num1Str = str1;
        //     // }
            
        // }
        num1Str += String(number);
        num1 = Number(num1Str);
        screenNum.textContent = num1Str;
    }
    else if(numCheck && operation !== "") { // NUM2
        // if(!decimal2) {
        //     num2 = num2*10 + number;
        // } 
        // else {
        //     let str2 = String(num2);
        //     if(!str2.includes(".")) str2=str2.concat(".");
        //     let dec = str2.length - str2.indexOf(".") - 1;
        //     num2 += number/10**(dec+1);
        //     num2 = Math.round(num2*10000000)/10000000;
        // }
        num2Str += String(number);
        num2 = Number(num2Str);
        screenNum.textContent = num2Str;
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

buttons.addEventListener("click", (e) => handleClick(e)); 
// implement keyboard support by adding custom event that calls handleClick(e) on a valid key stroke?
