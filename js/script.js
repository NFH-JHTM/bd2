function moveYesButton() {
  attempts++;

  // Cập nhật margin để tạo một khoảng cách an toàn từ biên màn hình
  const margin = 50; // Khoảng cách giữa nút và viền màn hình
  const maxX = window.innerWidth - yesBtn.offsetWidth - margin; // Giới hạn chiều rộng
  const maxY = window.innerHeight - yesBtn.offsetHeight - margin; // Giới hạn chiều cao

  // Đảm bảo nút "yes" luôn nằm trong phạm vi màn hình
  const safeX = Math.random() * maxX;
  const safeY = Math.random() * maxY;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = `${safeX}px`;
  yesBtn.style.top = `${safeY}px`;

  updateButtonText();

  // Sau khi 6 lần, đổi text của nút `yes` thành "noooo"
  if (attempts >= 6) {
    yesBtn.textContent = "noooo";
    questionMark.classList.remove("hidden");
  }
}

function updateButtonText() {
  if (attempts < phrasesYes.length) {
    yesBtn.textContent = phrasesYes[attempts % phrasesYes.length];
    noBtn.textContent = phrasesNo[attempts % phrasesNo.length];
  }
}
