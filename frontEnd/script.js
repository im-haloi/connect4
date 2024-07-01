const ws = new WebSocket('wss://weconnect4.onrender.com');

ws.onopen = () => {
    console.log('WebSocket connection established.');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};
val_c1 = 1;
val_c2 = 1;
val_c3 = 1;
val_c4 = 1;
val_c5 = 1;
val_c6 = 1;
val_c7 = 1;
turn = 1;
totalMoves = 0; // Variable to track total moves

// Function to check the winner
function check(player) {
    setTimeout(() => {
        let winnerFound = false;

        for (i = 1; i <= 7; i++) {
            for (j = 1; j <= 3; j++) {
                if (document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 1}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 2}`).style.backgroundColor == `${player}` &&
                    document.getElementById(`c${i}r${j + 3}`).style.backgroundColor == `${player}`) {
                    alert(`${player} wins`);
                    location.reload();
                    winnerFound = true;
                    break;
                }
            }
            if (winnerFound) break;
        }

        if (!winnerFound) {
            for (i = 1; i <= 6; i++) {
                for (j = 1; j <= 4; j++) {
                    if (document.getElementById(`c${j}r${i}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${j + 1}r${i}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${j + 2}r${i}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${j + 3}r${i}`).style.backgroundColor == `${player}`) {
                        alert(`${player} wins`);
                        location.reload();
                        winnerFound = true;
                        break;
                    }
                }
                if (winnerFound) break;
            }
        }

        if (!winnerFound) {
            for (i = 1; i <= 4; i++) {
                for (j = 1; j <= 3; j++) {
                    if (document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 1}r${j + 1}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 2}r${j + 2}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 3}r${j + 3}`).style.backgroundColor == `${player}`) {
                        alert(`${player} wins`);
                        location.reload();
                        winnerFound = true;
                        break;
                    }
                }
                if (winnerFound) break;
            }
        }

        if (!winnerFound) {
            for (i = 1; i <= 4; i++) {
                for (j = 6; j >= 4; j--) {
                    if (document.getElementById(`c${i}r${j}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 1}r${j - 1}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 2}r${j - 2}`).style.backgroundColor == `${player}` &&
                        document.getElementById(`c${i + 3}r${j - 3}`).style.backgroundColor == `${player}`) {
                        alert(`${player} wins`);
                        location.reload();
                        winnerFound = true;
                        break;
                    }
                }
                if (winnerFound) break;
            }
        }

        if (!winnerFound && totalMoves === 42) {
            alert("Game is Draw");
            location.reload();
        }

    }, 200);
}

// Playing
document.querySelectorAll(".column").forEach((e) => {
    e.addEventListener("click", () => {
        let sum = eval(`val_${e.id}`);
        eval(`val_${e.id}++`);

        if (sum <= 6) {
            totalMoves++; // Increment total moves count

            if (turn % 2 != 0) {
                document.getElementById(`${e.id}r${sum}`).style.backgroundColor = "red";
                turn++;
                check('red');
                document.getElementById("whosturn").innerText = "Yellow's Turn";
            } else {
                document.getElementById(`${e.id}r${sum}`).style.backgroundColor = "yellow";
                turn++;
                check('yellow');
                document.getElementById("whosturn").innerText = "Red's Turn";
            }
        }
    });
});
