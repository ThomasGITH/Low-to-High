//constant variables
let unclickedColor = "#283975";
let clickedColor = "#D44067";

let amountOfNumbers = 5;
let amountOfStages = 8;

let blockSmallSize = 150;
let blockBigSize = 200;

let checkMarkBox = document.getElementById("checkImg");
let successImgSource = "assets/checkmark.svg";
let failImgSource = "assets/cross.svg";
let scoreCounter = document.getElementById("scoreCounter");
let stageCounter = document.getElementById("stageCounter");

let pointsPerCorrectBlock = 5;
let pointsPerCorrectStage = 20;

let wordDictionary = {};
wordDictionary["elf"] = 11;
wordDictionary["twaalf"] = 12;
wordDictionary["dertien"] = 13;
wordDictionary["veertien"] = 14;
wordDictionary["vijftien"] = 15;
wordDictionary["zestien"] = 16;
wordDictionary["zeventien"] = 17;
wordDictionary["achttien"] = 18;
wordDictionary["negentien"] = 19;

let numberDictionary = {};
numberDictionary[11] = "elf";
numberDictionary[12] = "twaalf";
numberDictionary[13] = "dertien";
numberDictionary[14] = "veertien";
numberDictionary[15] = "vijftien";
numberDictionary[16] = "zestien";
numberDictionary[17] = "zeventien";
numberDictionary[18] = "achttien";
numberDictionary[19] = "negentien";


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
    if( CompareValue(square.children[0].textContent,numbers[numberIndex])){
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

function CompareValue(first, second){
    console.log("first: " + first);
    console.log("second: " + second);

    if(wordDictionary[first]==second){
        return true;
    }
    if(parseInt(first) == second){
        return true;
    }
    return false;
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
        if(numbers[i]>11 && numbers[i]<20){
            console.log("Why are you here" + numbers[i]);
            console.log(numbers[i]);
            if(RandomBinary(true, false)){
                square.children[0].textContent = numberDictionary[numbers[i]];
            }
            else{
                square.children[0].textContent = numbers[i];
            }
        }
        else{
            square.children[0].textContent = numbers[i];
        }
        //square.children[0].textContent = numbers[i];
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
    stageCounter.style.display = "block";
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

console.log(wordDictionary);
console.log(numberDictionary);

console.log(Math.floor(Math.random() * 100) + 1 + '%');