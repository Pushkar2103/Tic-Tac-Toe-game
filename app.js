let boxes = document.querySelectorAll(".box");
let reset = document.querySelectorAll(".reset-btn");
let win = document.querySelector("#winner");
let msg = document.querySelector("#winMess");

let winPatt = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
let turnX = true;
let count = 0;

reset[0].addEventListener("click", resetGame);
reset[1].addEventListener("click", resetGame);

function resetGame() {
    msg.innerText = "";
    win.classList.add("hidden");

    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    turnX = true;
    count = 0;
}

for (const box of boxes) {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            box.style.color = "blue"
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }

        count++;
        box.disabled = true;
        checkWinner();
    })
}

function checkWinner() {
    if(count==9) {
        displayWinner("none");
    }

    winPatt.forEach(pattern => {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!="") {
            if(pos1==pos2 && pos2==pos3) {
                displayWinner(pos1);
            }
        }
    });
}

function displayWinner(winner) {
    boxes.forEach(box => {
        box.disabled = true;
    });
    
    if(winner == "none") {
        msg.innerText = `~Draw~`;
    }
    else {
        msg.innerText = `Congratulations!! The Winner Is ${winner}`;
    }
    win.classList.remove("hidden");
}