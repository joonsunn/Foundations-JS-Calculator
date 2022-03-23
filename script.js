const display = document.querySelector(".display span");
const one_btn = document.getElementById("1");
const two_btn = document.getElementById("2");
const three_btn = document.getElementById("3");
const four_btn = document.getElementById("4");
const five_btn = document.getElementById("5");
const six_btn = document.getElementById("6");
const seven_btn = document.getElementById("7");
const eight_btn = document.getElementById("8");
const nine_btn = document.getElementById("9");
const zero_btn = document.getElementById("0");
const decimal_btn = document.getElementById("decimal");

const clear_btn = document.getElementById("clear");
const equals_btn = document.getElementById("equals");
const add_btn = document.getElementById("add");
const minus_btn = document.getElementById("minus");
const multiply_btn = document.getElementById("multiply");
const divide_btn = document.getElementById("divide");


let num1 = null;
let num2 = null;
let counter = 0;
let displayText = "";
let prevFn = null;
let afterEquals = false;

one_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "1";
    display.innerHTML = displayText;
})

two_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "2";
    display.innerHTML = displayText;
})

three_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "3";
    display.innerHTML = displayText;
})
four_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "4";
    display.innerHTML = displayText;
})
five_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "5";
    display.innerHTML = displayText;
})
six_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "6";
    display.innerHTML = displayText;
})
seven_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "7";
    display.innerHTML = displayText;
})
eight_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "8";
    display.innerHTML = displayText;
})
nine_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "9";
    display.innerHTML = displayText;
})
zero_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    displayText += "0";
    display.innerHTML = displayText;
})

decimal_btn.addEventListener("click", event=>{
    clearDisplayAfterEquals()
    if(!displayText.includes(".")){
        
        if(displayText.length < 1){
            displayText += "0";
        }
        displayText += ".";
        display.innerHTML = displayText;
    }
})

clear_btn.addEventListener("click", event => {
    reset();
})

add_btn.addEventListener("click", event => {
    display.innerHTML = "+";
    if(!afterEquals){
        save_input();
        runPrevFn();
    }
    afterEquals = false;
    displayText = "";
    prevFn = "add";
})

minus_btn.addEventListener("click", event => {
    display.innerHTML = "-";
    if(!afterEquals){
        save_input();
        runPrevFn();
    }
    afterEquals = false;
    displayText = "";
    prevFn = "minus";
})

multiply_btn.addEventListener("click", event => {
    display.innerHTML = "×";
    if(!afterEquals){
        save_input();
        runPrevFn();
    }
    afterEquals = false;
    displayText = "";
    prevFn = "multiply";
})

divide_btn.addEventListener("click", event => {
    display.innerHTML = "÷";
    if(!afterEquals){
        save_input();
        runPrevFn();
    }
    afterEquals = false;
    displayText = "";
    prevFn = "divide";
})

equals_btn.addEventListener("click", event => {
    save_input();
    runPrevFn();
    afterEquals = true;
})

function save_input(){
    if (num1 == null){
        num1 = Number(displayText);
    }
    if(!afterEquals){
        num2 = Number(displayText);
    }
}



function add(a, b){
    afterEquals = false;
    precision = comparePrecision(a, b)
    return (Number(a) + Number(b)).toFixed(precision)
}

function minus(a, b){
    afterEquals = false;
    precision = comparePrecision(a, b)
    return (Number(a) - Number(b)).toFixed(precision)
}

function multiply(a, b){
    afterEquals = false;
    result = (Number(a) * Number(b))
    // precision = comparePrecision(a, b)
    precision = detectPrecision(result)
    return result.toFixed(precision)
    // return (Number(a) * Number(b)).toFixed(precision)
}

function divide(a, b){
    afterEquals = false;
    result = (Number(a) / Number(b))
    precision = detectPrecision(result)

    return result.toFixed(precision)
}

function runPrevFn(){

    switch(prevFn){
        case "add":
            num1 = add(num1, num2)
            displayText = tidyUpDisplay(num1)
            // displayText = num1
            display.innerHTML = displayText;
            break;

        case "minus":
            num1 = minus(num1, num2)
            displayText = num1
            display.innerHTML = displayText;
            break;

        case "multiply":
            num1 = multiply(num1, num2)
            displayText = num1
            display.innerHTML = displayText;
            break;

        case "divide":
            num1 = divide(num1, num2)
            displayText = num1
            display.innerHTML = displayText;
            break;
    }
}

function clearDisplayAfterEquals(){
    if (afterEquals){
        reset();
        afterEquals = false;
    }
}

function reset(){
    num1 = null;
    num2 = null;
    prevFn = null;
    displayText = "";
    display.innerHTML = 0;
    afterEquals = false;
}

document.addEventListener("keydown", (e) => {
    if(e.key == "Escape"){
        reset();
    }

});

function detectPrecision(num){
    cleanNum = num.toString()
    // console.log(`cleanNum = ${cleanNum}`)
    splitStr = cleanNum.split(".")
    console.log(`splitStr = ${splitStr}`)
    console.log(`splitStr[1] = ${splitStr[1]}`)
    if(splitStr.length > 1){
        if(splitStr.length == 2 && splitStr[1].match(/[1-9]/gm) == null){
            len = 0
        }else{
            len = splitStr[1].length
        }
    }
    else{
        len = 0
    }
    console.log(`precision = ${len}`)
    // console.log(`len = ${len}`)

    return len > 8 ? 8 : len
}

function comparePrecision(num1, num2){
    precisionA = detectPrecision(num1)
    // console.log(`precisionA = ${precisionA}`)
    precisionB = detectPrecision(num2)
    // console.log(`precisionB = ${precisionB}`)
    precision = precisionA > precisionB ? precisionA:precisionB

    return precision
}

function tidyUpDisplay(number){

    numStr = number.toString();
    if (numStr.match(/^[.]+$/) != null){
        numSplit = numStr.split(".")
        if(numSplit[0].length + numSplit[1].length > 8){
            truncation = 8 - numSplit[0].length
            return parseFloat(number).toFixed(truncation)
        }else{
            return number
        }
    }else{
        return number
    }

    
    
}