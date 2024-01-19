// Game variables
const editableTeamNames = document.querySelectorAll("[contenteditable]")

const setMessage = document.querySelector("[data-set-message]");
const scoreboardPages = document.querySelectorAll("[data-page]");
const scoreboardPagesLength = scoreboardPages.length;

const scoreboardsDisplays = document.querySelectorAll("[data-scoreboard]");
const setDisplay = document.querySelector("[data-set-display]");

const setQuantityInput = document.querySelector("#set_quantity");
const resetScoreboardsBtn = document.querySelector("[data-reset-btn]");

let selectedScoreboardPage = 0;
let setQuantity = 3;
let maxSetPontuation = 25;
let matchEnded = false;
let set = 1;

// Function to handle "Enter" key press on contenteditable elements
const handleEnterKeyPress = ({ code }) => {
    if (code === "Enter") {
        document.activeElement.blur();
    }
};

// Event listener for step button click
const handleStepButtonClick = () => {
    selectedScoreboardPage++;

    if (selectedScoreboardPage <= scoreboardPagesLength - 1) {
        document.querySelector("[data-page].active").classList.remove("active");
        scoreboardPages[selectedScoreboardPage].classList.add("active");
    }
};

// Event listeners for scoreboard display buttons
scoreboardsDisplays.forEach(display => {
    const increaseBtn = display.querySelector(".btn_increase");
    const decreaseBtn = display.querySelector(".btn_decrease");
    const pointscoreboard = display.querySelector("p");
    const victoryscoreboard = document.querySelector(`.team_pontuation_${display.dataset.teamPontuation}`);

    let scoreboardValue = +pointscoreboard.textContent;
    let victoryValue = +victoryscoreboard.textContent;

    increaseBtn.addEventListener("click", () => {
        if (!matchEnded) {
            scoreboardValue++;
            pointscoreboard.textContent = scoreboardValue;
        }

        if (scoreboardValue >= maxSetPontuation) {
            set++;

            if (set > setQuantity) {
                matchEnded = true;
                resetScoreboardsBtn.classList.add("active");
            } else {
                setDisplay.textContent = `${set}° set`;
            }

            victoryValue++;
            victoryscoreboard.textContent = `${victoryValue}`

            if (setQuantity == 5 && set == 5) {
                maxSetPontuation = 15;
                setMessage.textContent = "Tie Break!";
            }

            scoreboardsDisplays.forEach(display => {
                display.querySelector("p").textContent = 0;
                scoreboardValue = 0;
            });
        }
    });

    decreaseBtn.addEventListener("click", () => {
        if (scoreboardValue > 0) {
            scoreboardValue--;
            pointscoreboard.textContent = scoreboardValue;
        }
    });
});

resetScoreboardsBtn.addEventListener("click", () => {
    window.location.reload()
});

editableTeamNames.forEach(element => {
    element.addEventListener("keydown", handleEnterKeyPress);
});

setQuantityInput.addEventListener("change", ({ target: { value } }) => {
    setQuantity = value;
});

scoreboardPages[selectedScoreboardPage].querySelector("[data-btn-step]").addEventListener("click", handleStepButtonClick);