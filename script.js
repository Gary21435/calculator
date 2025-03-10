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
let done = false;

function startOver() { 
    num1 = null;
    num2 = null;
    operation = "";
}

function doOperation() {
    let ans = 0;

    if(num2 === 0 && operation == "/") {
        
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

}

function handleClick(e) {
    let input = e.target.id;
    if(input === "=") {

    }


    let number = Number(input);
    if(num1 == null && !number) {
        console.log("bro what");
        return;
    }
    else if(number && operation == "") {
        num1 = num1*10 + number;
        console.log(num1);
    }
    else if(number && operation !== "") {
        num2 = num2*10 + number;
        console.log(num2);
    }
    else if(!number && num1 != null && num2 == null) {
        operation = input;
        console.log("operation: ", input);
    }
}

buttons.addEventListener("click", (e) => handleClick(e));
