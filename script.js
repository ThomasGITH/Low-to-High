// console.log("In da script");
// var box = document.getElementById("box1");
// console.log(box);
// var box2 = document.getElementById("box2");
// var text2 = box2.children[0];
// text2.textContent = "2";


let numbers = [];
let activeSquares = [];

function CreateNewNumbers() {
    numbers = RandomNumbers(5, 100);
    console.log(numbers);
}

function AssignNewNumbers() {
    activeSquares = RandomNumbers(5, 9);
    for (let i = 0; i < 5; i++) {
        squareID = "box" + activeSquares[i];
        let square = document.getElementById(squareID);
        square.style.display = "block";
        square.children[0].textContent = numbers[i];
    };
}

function RandomNumbers(length, maxValue) {
    var arr = [];
    while (arr.length < length) {
        var r = Math.floor(Math.random() * maxValue) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}



CreateNewNumbers();
AssignNewNumbers();
