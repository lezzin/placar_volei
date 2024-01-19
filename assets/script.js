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
let firstTeamPontuation = 0;
let secondTeamPontuation = 0;

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
    const increasePontuationBtn = display.querySelector(".btn_increase");
    const decreasePontuationBtn = display.querySelector(".btn_decrease");
    const pointScoreboard = display.querySelector("p");
    const setPontuationScoreboard = display.querySelector(`.team_pontuation_${display.dataset.teamPontuation}`);

    let scoreboardValue = +pointScoreboard.textContent;
    let victoryValue = +setPontuationScoreboard.textContent;

    increasePontuationBtn.addEventListener("click", () => {
        if (!matchEnded) {
            scoreboardValue++;
            pointScoreboard.textContent = scoreboardValue;
        }

        if (scoreboardValue >= maxSetPontuation) {
            set++;

            if (display.dataset.teamPontuation == 0) {
                firstTeamPontuation++;
            } else {
                secondTeamPontuation++;
            }

            if (set > setQuantity) {
                matchEnded = true;
                resetScoreboardsBtn.classList.add("active");

                if (firstTeamPontuation > secondTeamPontuation) {
                    const teamName = scoreboardsDisplays[0].querySelector("h3").textContent;
                    setMessage.textContent = `${teamName} venceu!`;
                } else {
                    const teamName = scoreboardsDisplays[1].querySelector("h3").textContent;
                    setMessage.textContent = `${teamName} venceu!`;
                }

            } else {
                setDisplay.textContent = `${set}° set`;
            }

            victoryValue++;
            setPontuationScoreboard.textContent = `${victoryValue}`

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

    decreasePontuationBtn.addEventListener("click", () => {
        if (scoreboardValue > 0) {
            scoreboardValue--;
            pointScoreboard.textContent = scoreboardValue;
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