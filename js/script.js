const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");
const openBoxBtn = document.getElementById("giftBox");
const mysteryBtn = document.getElementById("mysteryBtn");
const minigamePanel = document.getElementById("minigamePanel");
const numberButtons = document.getElementById("numberButtons");
const card = document.querySelector(".card");
const petalCanvas = document.createElement("canvas");
petalCanvas.classList.add("petalCanvas");
card.appendChild(petalCanvas);

const yesVariants = ["yessss", "yezzz", "yappp", "okieee", "gogogo", "sureeee"];
const noVariants = ["naur", "nopeee", "nevaa", "uh-uh", "nuuuu", "nahhh"];

let attemptCount = 0;
let wrongGuessCount = 0;
let moveCountSinceLastReveal = 0;
let currentYesIndex = 0;
let currentNoIndex = 0;

function moveYesButton() {
  const maxX = 400;
  const maxY = 400;
  const safeX = Math.random() * maxX;
  const safeY = Math.random() * maxY;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = safeX + "px";
  yesBtn.style.top = safeY + "px";

  attemptCount++;
  moveCountSinceLastReveal++;

  currentYesIndex = (currentYesIndex + 1) % yesVariants.length;
  currentNoIndex = (currentNoIndex + 1) % noVariants.length;
  yesBtn.textContent = yesVariants[currentYesIndex];
  noBtn.textContent = noVariants[currentNoIndex];

  if (moveCountSinceLastReveal >= 10) {
    mysteryBtn.style.display = "block";
    moveCountSinceLastReveal = 0;
  }
}

yesBtn.addEventListener("mouseover", moveYesButton);
yesBtn.addEventListener("touchstart", moveYesButton);

noBtn.addEventListener("click", () => {
  popup.style.display = "none";
  // Reset buttons
  yesBtn.textContent = "yessss";
  noBtn.textContent = "naur";
  yesBtn.style.left = "";
  yesBtn.style.top = "";
  moveCountSinceLastReveal = 0;
  mysteryBtn.style.display = "none";
});

openBoxBtn.addEventListener("click", () => {
  popup.style.display = "block";
});

mysteryBtn.addEventListener("click", () => {
  minigamePanel.style.display = "block";
  numberButtons.innerHTML = "";

  const numbers = [];
  while (numbers.length < 30) {
    const rand = Math.floor(Math.random() * 999) + 1;
    if (!numbers.includes(rand)) numbers.push(rand);
  }

  numbers.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.classList.add("num-btn");
    btn.addEventListener("click", () => handleGuess(num));
    numberButtons.appendChild(btn);
  });
});

function handleGuess(num) {
  if (num === 143) {
    minigamePanel.innerHTML = "<h2>Bạn đã mở được hộp quà thành công 🎉</h2>";
    openBoxBtn.classList.add("disabled");
    openBoxBtn.style.pointerEvents = "none";

    startPetalEffect();
  } else {
    wrongGuessCount++;
    if (wrongGuessCount >= 1) {
      mysteryBtn.style.display = "none";
      moveCountSinceLastReveal = 0;
    }

    noBtn.style.fontSize = parseInt(window.getComputedStyle(noBtn).fontSize) + 4 + "px";
  }
}

function startPetalEffect() {
  const canvas = document.querySelector(".petalCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = card.clientWidth;
  canvas.height = card.clientHeight;

  let petals = [];
  const maxPetals = 10;
  let animationFrame;

  class Petal {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.y += this.speedY;
      if (this.y > canvas.height) {
        this.y = -10;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createPetals() {
    petals = [];
    for (let i = 0; i < maxPetals; i++) {
      petals.push(new Petal());
    }
  }

  function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    animationFrame = requestAnimationFrame(animatePetals);
  }

  function startAnimation() {
    if (!animationFrame) {
      animatePetals();
    }
  }

  function stopAnimation() {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  createPetals();
  startAnimation();
}
