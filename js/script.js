const giftBox = document.getElementById("giftBox");
const popup = document.getElementById("popup");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionMark = document.getElementById("questionMark");
const minigame = document.getElementById("minigame");
const numberGrid = document.getElementById("numberGrid");
const resultText = document.getElementById("resultText");
const closeMinigame = document.getElementById("closeMinigame");
const minigameHeader = document.getElementById("minigameHeader");

let attempts = 0;
let phrasesYes = ["yessss", "deal", "say less", "bet", "chắc lun", "smash that", "open up", "send it", "aye go!", "no cap", "do ittt"];
let phrasesNo = ["naur", "bruh", "nah fam", "outtt", "noooo", "miss me", "hard pass", "not today", "keep dreamin", "in ur dreamz", "nahhh"];
let targetNumber = 143;
let wrongAttempts = 0;
let gameSolved = false;

// 🎁 Click hộp quà
giftBox.addEventListener("click", () => {
  popup.classList.remove("hidden");
  popup.classList.add("popup");

  if (!gameSolved && attempts < 10) {
    yesBtn.textContent = "yessss";
    noBtn.textContent = "naur";
    yesBtn.style.position = "static";
    yesBtn.style.left = "";
    yesBtn.style.top = "";
  }

  resultText.textContent = "";
  resultText.style.fontSize = "16px";
});

// ❌ Nhấn nút No
noBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  // Reset yes/no text & position mỗi lần mở lại hộp
  attempts = 0;
  yesBtn.textContent = getRandomPhrase(phrasesYes);
  noBtn.textContent = getRandomPhrase(phrasesNo);
  yesBtn.style.position = "static";
  yesBtn.style.left = "";
  yesBtn.style.top = "";
});

yesBtn.addEventListener("mouseenter", () => {
  if (gameSolved) return;
  moveYesButton();
});
yesBtn.addEventListener("touchstart", () => {
  if (gameSolved) return;
  moveYesButton();
});

function moveYesButton() {
  attempts++;

  // Di chuyển nút yes trong toàn màn hình (trừ kích thước nút)
  const maxX = window.innerWidth - yesBtn.offsetWidth - 20;
  const maxY = window.innerHeight - yesBtn.offsetHeight - 20;

  const safeX = Math.random() * maxX;
  const safeY = Math.random() * maxY;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = `${safeX}px`;
  yesBtn.style.top = `${safeY}px`;

  updateButtonText();

  // Hiện nút ? nếu đủ 10 lần di chuyển sau khi bị ẩn
  if (attempts >= 10 && questionMark.classList.contains("hidden")) {
    questionMark.classList.remove("hidden");
  }
}

function updateButtonText() {
  yesBtn.textContent = getRandomPhrase(phrasesYes);
  noBtn.textContent = getRandomPhrase(phrasesNo);
}

function getRandomPhrase(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ❓ Mở minigame
questionMark.addEventListener("click", () => {
  minigame.classList.remove("hidden");
  renderMinigameNumbers(); // random lại
});

function renderMinigameNumbers() {
  const numbers = new Set();
  numbers.add(targetNumber);
  while (numbers.size < 30) {
    numbers.add(Math.floor(Math.random() * 999) + 1);
  }

  const nums = Array.from(numbers).sort(() => Math.random() - 0.5);
  numberGrid.innerHTML = "";
  resultText.textContent = "";

  nums.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.onclick = () => {
      if (num === targetNumber) {
        handleCorrect();
      } else {
        handleWrong();
      }
    };
    numberGrid.appendChild(btn);
  });
}

function handleCorrect() {
  resultText.textContent = "🎉 Bạn đã chọn đúng số 143!";
  resultText.style.color = "green";

  yesBtn.textContent = "yessss";
  noBtn.textContent = "yessss";
  yesBtn.style.position = "static";
  noBtn.style.position = "static";
  gameSolved = true;

  [yesBtn, noBtn].forEach(btn => {
    btn.onclick = () => {
      popup.classList.add("hidden");
      minigame.classList.add("hidden");
      showBirthdayMessage();
    };
  });

  closeMinigame.classList.remove("hidden");
}

function handleWrong() {
  resultText.textContent = "Sai rùi 😢";
  resultText.style.color = "red";
  minigame.classList.add("hidden");

  // Nếu đã hiện dấu ? thì ẩn và reset attempts
  if (!questionMark.classList.contains("hidden")) {
    questionMark.classList.add("hidden");
    attempts = 0;
  }

  setTimeout(() => {
    popup.classList.add("hidden");
    yesBtn.style.position = "static";
    updateButtonText();
  }, 1000);
}

// 🔽 Thu nhỏ/hiện lại minigame
closeMinigame.addEventListener("click", () => {
  const isHidden = minigame.classList.contains("hidden");

  if (isHidden) {
    minigame.classList.remove("hidden");
    renderMinigameNumbers(); // random lại số
  } else {
    minigame.classList.add("hidden");
  }
});

// 🎉 Lời chúc
function showBirthdayMessage() {
  const msg = document.createElement("div");
  msg.textContent = "Chúc mừng sinh nhật! Mong bạn luôn hạnh phúc 🎂🎈";
  msg.style.position = "absolute";
  msg.style.top = "55%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.background = "#fff0f5";
  msg.style.padding = "30px";
  msg.style.borderRadius = "20px";
  msg.style.fontSize = "1.4rem";
  msg.style.maxWidth = "80vw";
  msg.style.wordBreak = "break-word";
  msg.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
  msg.style.zIndex = 999;
  document.body.appendChild(msg);
}

// 🖱️ Drag minigame (PC)
let isDragging = false;
let offsetX = 0, offsetY = 0;

minigameHeader.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - minigame.offsetLeft;
  offsetY = e.clientY - minigame.offsetTop;
  minigame.style.transition = "none";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  minigame.style.transition = "transform 0.2s ease";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    minigame.style.left = `${e.clientX - offsetX}px`;
    minigame.style.top = `${e.clientY - offsetY}px`;
    minigame.style.position = "absolute";
  }
});
