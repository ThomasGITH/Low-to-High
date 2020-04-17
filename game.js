// console.log("In da script");
// var box = document.getElementById("box1");
// console.log(box);
// var box2 = document.getElementById("box2");
// var text2 = box2.children[0];
// text2.textContent = "2";

//stage variables
let numbers = [];
let activeSquares = [];

let numberIndex = 0;

//game variables
let score = 0;
let stageIndex = 0;

function ResetStageValues(){
    numberIndex = 0;
    activeSquares = [];
    numbers = [];
}

function ResetUI(){
    activeSquares.forEach(square => {
        square.style.display = "none";
    });
}

function FinishStage(){

}

function ClickBox(btnNmbr){
    squareID = "box" + btnNmbr;
    let square = document.getElementById(squareID);
    console.log(btnNmbr);
    if(square.children[0].textContent == numbers[numberIndex]){
        console.log("correcto mundo");
    }
    else{
        console.log("im not homophobic, but ur a fagot");
    }
    numberIndex++;

    if(numberIndex == 5){
        console.log();
        setTimeout(NewStage ,2000);
    }
}

function NewStage(){
    ResetUI();
    ResetStageValues();
    CreateNewNumbers();
    AssignNewNumbers();
    numbers.sort(function(a, b){return a-b});
    console.log(numbers);
}

function CreateNewNumbers(){
    numbers = RandomNumbers(5, 100);
}

function AssignNewNumbers(){
    squareNumbers = RandomNumbers(5, 9);
    for(let i = 0; i < 5; i++){
        squareID = "box" + squareNumbers[i];
        let square = document.getElementById(squareID);
        square.style.display = "block";
        square.children[0].textContent = numbers[i];
        activeSquares[i] = square;
    };
    console.log(activeSquares);
}

function RandomNumbers(length, maxValue){
    var arr = [];
    while(arr.length < length){
      var r = Math.floor(Math.random() * maxValue) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}


function myFunction(squareIndex)
{
    console.log(squareIndex);
}

NewStage();


