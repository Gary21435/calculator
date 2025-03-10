const buttonIDs = ["AC", "+/-", "%", "/", "7", "8", "9", "*", 
    "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

const blue = "rgb(54, 166, 222)";
const orange = "rgb(210, 137, 68)";
const green = "rgb(67, 125, 67)";

const buttonColors = [
    `${blue}`, `${blue}`, `${blue}`, `${orange}`, `${green}`, `${green}`, `${green}`, `${orange}`, 
    `${green}`, `${green}`, `${green}`, `${orange}`, `${green}`, `${green}`, `${green}`, `${orange}`, 
    `${green}`, `${green}`, `${orange}`, 
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

for(let i = 0; i<buttonIDs.length; i++) {
    const btn = document.createElement("button");
    buttons.appendChild(btn);

    btn.classList = `btn ${buttonColors[i]}`;
    btn.id = `${buttonIDs[i]}`;
    if(buttonIDs[i] === "0")
        btn.style.width = `${btnWidth*2}px`;
    else
        btn.style.width = `${btnWidth}px`;
    btn.style.height = `${btnHeight}px`;
    btn.style.boxSizing = "border-box";
    btn.textContent = `${buttonIDs[i]}`;
    btn.style.backgroundColor = `${buttonColors[i]}`;
}





let num1 = null;
let num2 = null;
let twoNums = new Array(2);
let operation = "";
let mustBeOperation = false;

const operationArr = ["*", "/", "+", "-"];

function startOver() { 
    num1 = null;
    num2 = null;
    operation = "";
    screenNum.textContent = 0;
    mustBeOperation = false;
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

    startOver();
    screenNum.textContent = ans;
    num1=ans;
    mustBeOperation = true;
}

function handleClick(e) {
    let input = e.target.id;
    console.log(input + " " + num1);
    if(input === "=") {
        doOperation();
    }
    if(input === "AC")
        startOver();

    let number = Number(input);
    let numCheck = number;
    if(number === 0) numCheck = true; //0 is a number

    if(num1 == null && !numCheck) {
        console.log("bro what");
        return;
    }
    else if(numCheck && operation == "") {
        mustBeOperation ? num1 = number : num1 = num1*10 + number;        
        screenNum.textContent = num1;
        console.log(num1);
    }
    else if(numCheck && operation !== "") {
        num2 = num2*10 + number;
        screenNum.textContent += num2;
        console.log(num2);
    }
    else if(!numCheck && num1 != null && num2 == null && operationArr.includes(input)) { // operation
        operation = input;
        screenNum.textContent += operation;
        mustBeOperation = false;
        console.log("operation: ", operation);
    }
    else if(input === "+/-" && (num1 !== null || num2 !== null)) {
        if(operation === "") {
            num1 = -1 * num1;
            console.log(num1);
            screenNum.textContent = num1;
        }
        else {
            num2 = -1 * num2;
            console.log(num2);
            screenNum.textContent = num1 + operation + "(" + num2 + ")";
        }
    }
}

buttons.addEventListener("click", (e) => handleClick(e));
