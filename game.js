// console.log("In da script");
// var box = document.getElementById("box1");
// console.log(box);
// var box2 = document.getElementById("box2");
// var text2 = box2.children[0];
// text2.textContent = "2";


let numbers = [];

function AssingNewNumbers(){
    for(let i = 0; i < 5; i++){
        let isNew = false;
        let newNum;
        while(isNew == false){
           isNew = true;
           newNum = (getRandomInt(1, 100));
           numbers.forEach(element => {
               if(element == newNum){
                   isNew = false;
               }
           });
        }
        numbers[i] = newNum;
    }
    console.log(numbers);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

AssingNewNumbers();