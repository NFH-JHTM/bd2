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
let phrasesYes = ["yessss", "deal", "say less", "bet", "chắc lun"];
let phrasesNo = ["naur", "bruh", "nah fam", "outtt", "noooo"];
let targetNumber = 143;
let wrongAttempts = 0;
let gameSolved = false;

// 🎁 Click hộp quà
giftBox.addEventListener("click", () => {
  popup.classList.remove("hidden");
  popup.classList.add("popup");

  if (!gameSolved && attempts < 6) {
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
});

// ✅ Nút Yes né chuột
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

  // Giới hạn phạm vi di chuyển của nút `yes` nhỏ hơn một chút
  const margin = 50;  // Cách cạnh màn hình một khoảng nhỏ
  const maxX = window.innerWidth - yesBtn.offsetWidth - margin;
  const maxY = window.innerHeight - yesBtn.offsetHeight - margin;

  const safeX = Math.min(maxX, Math.max(margin, Math.random() * maxX));
  const safeY = Math.min(maxY, Math.max(margin, Math.random() * maxY));

  yesBtn.style.position = "absolute";
  yesBtn.style.left = `${safeX}px`;
  yesBtn.style.top = `${safeY}px`;

  updateButtonText();

  if (attempts >= 6) {
    yesBtn.textContent = "noooo";
    noBtn.textContent = "noooo";
    questionMark.classList.remove("hidden");
  }
}


function updateButtonText() {
  if (attempts < phrasesYes.length) {
    yesBtn.textContent = phrasesYes[attempts % phrasesYes.length];
    noBtn.textContent = phrasesNo[attempts % phrasesNo.length];
  }
}

// ❓ Mở minigame
questionMark.addEventListener("click", () => {
  minigame.classList.remove("hidden");
  questionMark.classList.add("hidden");

  renderMinigameNumbers();
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

  // Gắn click mở quà
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

  wrongAttempts++;
  if (wrongAttempts >= 5) {
    questionMark.classList.remove("hidden");
    wrongAttempts = 0;
  }

  // Reset lại popup và trạng thái minigame
  setTimeout(() => {
    popup.classList.add("hidden");
    minigame.classList.add("hidden");
    yesBtn.style.position = "static"; // Đặt lại vị trí nút
    yesBtn.textContent = "yessss"; // Đặt lại text nút
    noBtn.textContent = "naur"; // Đặt lại text nút
    attempts = 0; // Reset lại số lần thử
    resultText.textContent = ""; // Xóa kết quả
  }, 1000); // delay để người chơi nhìn kết quả sai trước khi popup ẩn đi
}

// 🔽 Thu nhỏ/hiện lại minigame + random lại số
closeMinigame.addEventListener("click", () => {
  const isHidden = minigame.classList.contains("hidden");

  if (isHidden) {
    minigame.classList.remove("hidden");
    renderMinigameNumbers();
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

// 🖱️ Drag panel minigame (PC)
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
