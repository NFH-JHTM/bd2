const giftBox = document.querySelector(".gift-box");
const popup = document.querySelector(".popup");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const questionMark = document.querySelector(".secret-hint");
const gamePanel = document.querySelector(".game-panel");
const numberGrid = document.querySelector(".number-grid");
const card = document.querySelector(".card");

const yesVariants = ["yuppp", "yas queen", "suree", "uh huh", "let's gooo", "do it", "okieee"];
const noVariants = ["naurr", "uh oh", "maybe not", "nopeee", "cancel", "deny it", "nevaa"];

let interactionCount = 0;
let secretVisible = true;
let attemptCount = 0;
let foundCorrect = false;

giftBox.addEventListener("click", () => {
  if (!giftBox.classList.contains("disabled")) {
    popup.style.display = "block";
    resetButtons();
  }
});

noBtn.addEventListener("click", () => {
  popup.style.display = "none";
  resetButtons();
});

function resetButtons() {
  yesBtn.textContent = "yessss";
  noBtn.textContent = "naur";
  positionYesRandomly();
}

function positionYesRandomly() {
  const maxX = 400;
  const maxY = 400;
  const safeX = Math.random() * maxX;
  const safeY = Math.random() * maxY;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = `${safeX}px`;
  yesBtn.style.top = `${safeY}px`;

  if (interactionCount >= 5) {
    const randomYes = yesVariants[Math.floor(Math.random() * yesVariants.length)];
    const randomNo = noVariants[Math.floor(Math.random() * noVariants.length)];
    yesBtn.textContent = randomYes;
    noBtn.textContent = randomNo;
  }

  interactionCount++;

  // Check if need to reveal the secret mark again
  if (!secretVisible && interactionCount % 10 === 0) {
    questionMark.style.display = "block";
    secretVisible = true;
  }
}

// Make the yes button dodge clicks
yesBtn.addEventListener("mouseenter", positionYesRandomly);
yesBtn.addEventListener("touchstart", positionYesRandomly);

// Show minigame when clicking the question mark
questionMark.addEventListener("click", () => {
  questionMark.style.display = "none";
  secretVisible = false;
  generateNumberGrid();
  gamePanel.style.display = "block";
});

function generateNumberGrid() {
  numberGrid.innerHTML = "";
  const numbers = [];
  while (numbers.length < 30) {
    const rand = Math.floor(Math.random() * 999) + 1;
    if (!numbers.includes(rand)) {
      numbers.push(rand);
    }
  }

  numbers.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.className = "number-btn";
    btn.addEventListener("click", () => checkNumber(num, btn));
    numberGrid.appendChild(btn);
  });
}

function checkNumber(num, btn) {
  attemptCount++;
  if (num === 143) {
    btn.classList.add("correct");
    showSuccess();
  } else {
    btn.classList.add("wrong");
    numberGrid.querySelectorAll("button").forEach(b => b.disabled = true);
    setTimeout(() => {
      gamePanel.style.display = "none";
    }, 1000);

    // Ẩn dấu ? và đợi 10 lần mới hiện lại
    questionMark.style.display = "none";
    secretVisible = false;
  }
}

function showSuccess() {
  gamePanel.style.display = "none";
  popup.style.display = "none";
  giftBox.classList.add("disabled");
  giftBox.style.opacity = "0.5";
  giftBox.style.pointerEvents = "none";

  // Chạy hiệu ứng hoa rơi 🎉
  loadPetalScript();
}

function loadPetalScript() {
  const script = document.createElement("script");
  script.src = "js/petals.js";
  document.body.appendChild(script);
}
