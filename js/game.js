//constant variables
let unclickedColor = "#283975";
let clickedColor = "#D44067";

let amountOfNumbers = 5;
let amountOfStages = 2;

let blockSmallSize = 150;
let blockBigSize = 200;

let checkMarkBox = document.getElementById("checkImg");
let successImgSource = "assets/checkmark.svg";
let failImgSource = "assets/cross.svg";
let scoreCounter = document.getElementById("scoreCounter");
let stageCounter = document.getElementById("stageCounter");

let pointsPerCorrectBlock = 5;
let pointsPerCorrectStage = 20;


//stage variables
let numbers = [];
let activeSquares = [];

let numberIndex = 0;

//game variables
let score = 0;
let stageIndex = 0;
let stagesCompleted = 0;

let startScene = document.getElementById("start-scene");
let gameScene = document.getElementById("gameScene");
const endScreen = document.getElementById('end-screen');

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
    checkMarkBox.style.display = "none";
    
}

function ClickBox(btnNmbr){
    squareID = "box" + btnNmbr;
    let square = document.getElementById(squareID);
    if(square.children[0].textContent == numbers[numberIndex]){
        square.style.backgroundColor  = clickedColor;
        square.style.pointerEvents = "none";

        score += pointsPerCorrectBlock;
    }
    else{
        activeSquares.forEach(square => {
            square.style.pointerEvents = "none";
        });
        checkMarkBox.src = failImgSource;
        checkMarkBox.style.display = "block";
        EndStage();
        return;
    }
    numberIndex++;

    // in case of success
    if(numberIndex == amountOfNumbers){
        checkMarkBox.src = successImgSource;
        checkMarkBox.style.display = "block";
        stagesCompleted ++;
        score += pointsPerCorrectStage;

        EndStage();
    }
}

function EndStage(){
    const hint = document.getElementById('hint');
    hint.style.display = 'none';
    if(stageIndex == amountOfStages){
        setTimeout(EndGame ,1000);
        return;
    }
    setTimeout(NewStage ,1000);
}

function NewStage(){
    stageIndex += 1;
    stageCounter.textContent = stageIndex + "/" + amountOfStages;

    ResetUI();
    ResetStageValues();
    CreateNewNumbers();
    AssignNewNumbers();
    numbers.sort(function(a, b){return a-b});
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
        square.style.backgroundColor = unclickedColor;
        activeSquares[i] = square;
        let size = RandomBinary(blockSmallSize, blockBigSize);
        square.style.width = size;
        square.style.height = size;
    };
}

function RandomBinary(firstValue, secondValue){
    let temp = Math.round(Math.random());
    if(temp>0.5){
        return firstValue;
    }
    else{
        return secondValue
    }
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
}

function NewGameSession(){
    ResetGameValues();
    stageCounter.textContent = stageIndex + "/" + amountOfStages;
    NewStage();
} 

function ResetGameValues(){
    score = 0;
    stageIndex = 0;
    stagesCompleted = 0;
}

function EndGame(){
    gameScene.style.display = "none";
    stageCounter.style.display = "none";

    const result = document.getElementById('result');
    result.textContent = 'Je hebt ' + stagesCompleted + '/' + amountOfStages + ' rondes behaald';

    endScreen.style.display = 'flex';


    //Those are the Game variables you can move to the center at the end of the Game:
    //scoreCounter 
    //stageCounter

    //If you want to start a new game, this method is all you need:
    //NewGame();
}

function StartGame(){
    startScene.style.display = "none"
    gameScene.style.display = "block";
    NewGameSession();
}

function EnterStartScene(){
    startScene.style.display = "flex";
    endScreen.style.display = "none";
    gameScene.style.display = "none";
}

EnterStartScene();
