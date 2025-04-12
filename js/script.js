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
let flashClickable = false;

// 🎁 Khi nhấn hộp quà
giftBox.addEventListener("click", () => {
  popup.classList.remove("hidden");
  popup.classList.add("popup");

  // ✅ Reset nội dung popup nếu chưa troll đủ
  if (attempts < 6) {
    yesBtn.textContent = "yessss";
    noBtn.textContent = "naur";
    yesBtn.style.position = "static";
    yesBtn.style.left = "";
    yesBtn.style.top = "";
  }

  resultText.textContent = "";
  resultText.style.fontSize = "16px";
});

// ❌ Nhấn nút no chỉ đóng popup (không reset troll state)
noBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// 🎯 Nút yessss né chuột/tay
yesBtn.addEventListener("mouseenter", moveYesButton);
yesBtn.addEventListener("touchstart", moveYesButton);

function moveYesButton() {
  attempts++;

  const maxX = window.innerWidth - 150;
  const maxY = window.innerHeight - 100;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  yesBtn.style.position = "absolute";
  yesBtn.style.left = x + "px";
  yesBtn.style.top = y + "px";

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

  const numbers = new Set();
  numbers.add(targetNumber);
  while (numbers.size < 30) {
    numbers.add(Math.floor(Math.random() * 999) + 1);
  }

  const nums = Array.from(numbers).sort(() => Math.random() - 0.5);
  numberGrid.innerHTML = "";

  nums.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.onclick = () => {
      if (num === targetNumber) {
        resultText.textContent = "🎉 Bạn đã chọn đúng số 143!";
        resultText.style.color = "green";
        showResult();
      } else {
        resultText.textContent = "nooo";
        resultText.style.color = "red";
        resultText.style.fontSize = (parseInt(resultText.style.fontSize || 16) + 4) + "px";
      }
    };
    numberGrid.appendChild(btn);
  });
});

// ✅ Nếu chọn đúng
function showResult() {
  yesBtn.textContent = "yessss";
  yesBtn.style.position = "static";
  closeMinigame.classList.remove("hidden");

  yesBtn.onclick = () => {
    popup.classList.add("hidden");
    minigame.classList.add("hidden");
    showBirthdayMessage();
  };
}

// 🎉 Hiện lời chúc + hoa rơi
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

// 🔽 Nút thu nhỏ minigame
closeMinigame.addEventListener("click", () => {
  minigame.classList.add("hidden");
});


// 🖱️ Drag minigame panel
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
