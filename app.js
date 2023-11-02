/*OPEN-CLOSE MODAL*/
const modal = document.getElementById("modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});

/*Game*/
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const playerScoreDiv = document.querySelector(".score__player-number");
const aiScoreDiv = document.querySelector(".score__ai-number");
let playerScore = 0;
let aiScore = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());
    if (userWins) {
      resultText.innerText = "You Win";
      resultDivs[0].classList.toggle("winner");
      playerScore++;
      playerScoreDiv.innerText = playerScore;
      localStorage.setItem("playerscore", playerScore);
    } else if (aiWins) {
      resultText.innerText = "You Loose";
      resultDivs[1].classList.toggle("winner");
      aiScore++;
      aiScoreDiv.innerText = aiScore;
      localStorage.setItem("aiScore", aiScore);
    } else {
      resultText.innerText = "Draw";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

/*retrieving scores from local storage */
window.addEventListener("DOMContentLoaded", () => {
  playerScore = localStorage.getItem("playerscore");
  playerScoreDiv.innerText = playerScore;

  aiScore = localStorage.getItem("aiScore");
  aiScoreDiv.innerText = aiScore;
});
