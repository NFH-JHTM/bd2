document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    document.getElementById("gate").style.opacity = 1;
  }, 1000);

  setTimeout(() => {
    document.getElementById("robot").style.opacity = 1;
  }, 3000);

  setTimeout(() => {
    document.getElementById("chatBubble").textContent = "Chào bạn... Mình đã ở đây rất lâu rồi... Một mình... Rất cô đơn. Không ai đến thăm mình cả. Mình cứ tự giữ mình bận rộn... nhưng mà vẫn nhớ có ai đó để trò chuyện. Và giờ... cuối cùng bạn đã đến.";
    document.getElementById("chatBubble").style.opacity = 1;
  }, 5000);

  document.getElementById("gate").addEventListener("click", function() {
    openGate();
  });
});

function openGate() {
  let gate = document.getElementById("gate");
  gate.style.animation = "gateOpen 2s forwards";
  gate.addEventListener("animationend", () => {
    document.getElementById("robot").style.animation = "robotEnter 3s forwards";
  });
}

@keyframes gateOpen {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(0); }
}

@keyframes robotEnter {
  0% { transform: translate(-50%, 50%); opacity: 0; }
  100% { transform: translate(-50%, -50%); opacity: 1; }
}
