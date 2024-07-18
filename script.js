let boxes = document.querySelectorAll(".num");
let mainbox = document.querySelector(".game");
let newGame = document.querySelector(".new");
let msgcontainer = document.querySelector(".msgbtn");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    mainbox.classList.remove("hide");
}

boxes.forEach((num) => {
    num.addEventListener("click",() => {
        if(turnO){
            num.innerText = "O";
            turnO = false;
        } else {
            num.innerText = "X";
            turnO = true;
        }  
        num.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    boxes.forEach(num => {
        num.disabled = false;
        num.innerText = "";
    });
}


const showWinner = (winner) => {
    msg.innerText = `WINNER ${winner}`;
    msgcontainer.classList.remove("hide");
    mainbox.classList.add("hide");
}

const showDraw = () => {
    msg.innerText = `DRAW`;
    msgcontainer.classList.remove("hide");
    mainbox.classList.add("hide");
}

const checkDraw = () => {
    for (let num of boxes) {
        if (num.innerText === "") {
            return false;
        }
    }
    return true;
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;
        
        if(pos1value && pos1value === pos2value && pos2value === pos3value){
            showWinner(pos1value);
            return;
        }
    }
    if (checkDraw()) {
        showDraw();
    }
}

newGame.addEventListener("click", resetGame);
