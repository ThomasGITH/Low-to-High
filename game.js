// console.log("In da script");
// var box = document.getElementById("box1");
// console.log(box);
// var box2 = document.getElementById("box2");
// var text2 = box2.children[0];
// text2.textContent = "2";

//constant variables
let unclickedColor = "blue";
let clickedColor = "green";

let amountOfNumbers = 5;

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
        square.style.pointerEvents = "all"
        square.style.backgroundColor = unclickedColor;
    });
}

function FinishStage(){

}

function ClickBox(btnNmbr){
    squareID = "box" + btnNmbr;
    let square = document.getElementById(squareID);
    console.log(square);
    console.log(btnNmbr);
    if(square.children[0].textContent == numbers[numberIndex]){
        console.log("correcto mundo");
        square.style.backgroundColor  = clickedColor;
        square.style.pointerEvents = "none";
    }
    else{
        activeSquares.forEach(square => {
            square.style.pointerEvents = "none";
        });

        EndStage();
        return;
    }
    numberIndex++;

    if(numberIndex == amountOfNumbers){
        EndStage();
    }
}

function EndStage(){
    setTimeout(NewStage ,1000);
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
    numbers = RandomNumbers(amountOfNumbers, 100);
}

function AssignNewNumbers(){
    squareNumbers = RandomNumbers(amountOfNumbers, 9);
    for(let i = 0; i < amountOfNumbers; i++){
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


