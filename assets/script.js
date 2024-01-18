// Function to handle "Enter" key press on contenteditable elements
const handleEnterKeyPress = ({ code }) => {
    if (code === "Enter") {
        document.activeElement.blur();
    }
};

document.querySelectorAll("[contenteditable]").forEach(element => {
    element.addEventListener("keydown", handleEnterKeyPress);
});

// Game variables
const setMessage = document.querySelector("#set_message");
const counterSteps = document.querySelectorAll("[data-step]");
const counterDisplays = document.querySelectorAll("[data-counter]");
const setDisplay = document.querySelector("[data-set-display]");
const setQuantityInput = document.querySelector("#set_quantity");
const resetBtn = document.querySelector("[data-reset-btn]");
const stepsLength = counterSteps.length;

let selectedStep = 0;
let setQuantity = 3;
let setPontuation = 25;
let set = 1;
let end = false;

// Event listener for setQuantity input
setQuantityInput.addEventListener("change", ({ target: { value } }) => {
    setQuantity = value;
});

// Event listener for step button click
const handleStepButtonClick = () => {
    selectedStep++;

    if (selectedStep <= stepsLength - 1) {
        document.querySelector("[data-step].active").classList.remove("active");
        counterSteps[selectedStep].classList.add("active");
    }
};

counterSteps[selectedStep].querySelector("[data-btn-step]").addEventListener("click", handleStepButtonClick);

// Event listeners for counter display buttons
counterDisplays.forEach(display => {
    const increaseBtn = display.querySelector(".btn_increase");
    const decreaseBtn = display.querySelector(".btn_decrease");
    const pointCounter = display.querySelector("p");
    const victoryCounter = document.querySelector(`.team_pontuation_${display.dataset.teamPontuation}`);

    let counterValue = +pointCounter.textContent;
    let victoryValue = +victoryCounter.textContent;

    increaseBtn.addEventListener("click", () => {
        if (!end) {
            counterValue++;
            pointCounter.textContent = counterValue;
        }

        if (counterValue >= setPontuation) {
            set++;

            if (set > setQuantity) {
                end = true;

                resetBtn.classList.add("active");
            } else {
                setDisplay.textContent = `${set}° set`;
            }

            victoryValue++;
            victoryCounter.textContent = `${victoryValue}`

            if (setQuantity == 5 && set == 5) {
                setPontuation = 15;
                setMessage.textContent = "Tie Break!";
            }

            counterDisplays.forEach(display => {
                display.querySelector("p").textContent = 0;
                counterValue = 0;
            });
        }
    });

    decreaseBtn.addEventListener("click", () => {
        if (counterValue > 0) {
            counterValue--;
            pointCounter.textContent = counterValue;
        }
    });
});

resetBtn.addEventListener("click", () => {
    window.location.reload()
});