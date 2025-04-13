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
let yesBtnMoves = 0;
let showQuestionMark = false;
let lastX = 0;
let lastY = 0;

// Click hộp quà
giftBox.addEventListener("click", () => {
  if (!gameSolved) {
    popup.classList.remove("hidden");
    popup.classList.add("popup");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";

    if (attempts < 10) {
      yesBtn.textContent = "yessss";
      noBtn.textContent = "naur";
      yesBtn.style.position = "static";
      yesBtn.style.left = "";
      yesBtn.style.top = "";
    }

    resultText.textContent = "";
    resultText.style.fontSize = "16px";
  }
});

// Nhấn nút No
noBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  attempts = 0;
  yesBtn.textContent = getRandomPhrase(phrasesYes);
  noBtn.textContent = getRandomPhrase(phrasesNo);
  yesBtn.style.position = "static";
  yesBtn.style.left = "";
  yesBtn.style.top = "";
  questionMark.classList.add("hidden");
  yesBtnMoves = 0;
  showQuestionMark = false;

  let retryChecker = setInterval(() => {
    if (yesBtnMoves >= 10) {
      popup.classList.remove("hidden");
      clearInterval(retryChecker);
    }
  }, 500);
});

// Né chuột
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

  if (!showQuestionMark) {
    yesBtnMoves++;
    if (yesBtnMoves >= 10) {
      questionMark.classList.remove("hidden");
      showQuestionMark = true;
    }
  }

  const popupRect = popup.getBoundingClientRect();
  const btnWidth = yesBtn.offsetWidth;
  const btnHeight = yesBtn.offsetHeight;

  const limit = 250;

  const maxX = Math.min(limit, popupRect.width - btnWidth);
  const maxY = Math.min(limit, popupRect.height - btnHeight);

  let newX, newY;
  const minDistance = 50; // khoảng cách tối thiểu giữa lần trước và lần mới

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
  } while (
    Math.abs(newX - lastX) < minDistance &&
    Math.abs(newY - lastY) < minDistance
  );

  lastX = newX;
  lastY = newY;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = `${newX}px`;
  yesBtn.style.top = `${newY}px`;

  updateButtonText();
}

function updateButtonText() {
  yesBtn.textContent = getRandomPhrase(phrasesYes);
  noBtn.textContent = getRandomPhrase(phrasesNo);
}

function getRandomPhrase(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Click dấu ?
questionMark.addEventListener("click", () => {
  minigame.classList.remove("hidden");
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

  questionMark.classList.add("hidden");
  showQuestionMark = false;

  [yesBtn, noBtn].forEach(btn => {
    btn.onclick = () => {
      popup.classList.add("hidden");
      minigame.classList.add("hidden");
      showBirthdayMessage();
      showFlowerEffect();
    };
  });

  closeMinigame.classList.remove("hidden");

  setTimeout(() => {
    minigame.classList.add("hidden");
  }, 5000);
}

function handleWrong() {
  resultText.textContent = "Sai rùi 😢";
  resultText.style.color = "red";
  minigame.classList.add("hidden");
  wrongAttempts++;

  questionMark.classList.add("hidden");
  showQuestionMark = false;
  yesBtnMoves = 0;

  setTimeout(() => {
    popup.classList.add("hidden");
    yesBtn.style.position = "static";
    updateButtonText();
  }, 1000);
}

// Đóng/mở minigame
closeMinigame.addEventListener("click", () => {
  const isHidden = minigame.classList.contains("hidden");
  if (isHidden) {
    minigame.classList.remove("hidden");
    renderMinigameNumbers();
  } else {
    minigame.classList.add("hidden");
  }
});

// Lời chúc sinh nhật
function showBirthdayMessage() {
  const msg = document.createElement("div");
  msg.textContent = "Chúc mừng sinh nhật b nhaaaa, chúc bạn tuổi mới đạt được nhiều thành công trong cuộc sống này và năm nay là b đã 18 tuổi r đấy, có thể làm những điều mình thích mà không phải lo gì hết nè. Năm nay phải cố gắng đậu NV1 nha b, rồi tìm được eboy của mình nữa 🎂🎉";

  msg.style.position = "fixed";
  msg.style.top = "50%";
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
  msg.classList.add("floating-msg");

  document.body.appendChild(msg);
  giftBox.classList.add("hidden");

  const gallery = document.createElement("div");
  gallery.className = "gallery";

  const images = [
    "images/photo1.webp",
    "images/photo2.webp",
    "images/photo3.webp"
  ];

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "gallery-thumb";
    img.onclick = () => openImageViewer(src);
    gallery.appendChild(img);
  });

  document.body.appendChild(gallery);
}

// Viewer mở ảnh
function openImageViewer(src) {
  const viewer = document.getElementById("imageViewer");
  const viewerImg = document.getElementById("viewerImg");
  const downloadBtn = document.getElementById("downloadBtn");

  viewer.classList.add("active");
  viewerImg.src = src;
  downloadBtn.href = src;
}

document.getElementById("closeViewer").onclick = () => {
  document.getElementById("imageViewer").classList.remove("active");
};

// Drag minigame
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
