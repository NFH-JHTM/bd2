document.addEventListener("DOMContentLoaded", () => {
  const gateLeft = document.querySelector('.gate.left');
  const gateRight = document.querySelector('.gate.right');
  const flashTransition = document.querySelector('.flash-transition');
  const robot = document.querySelector('.robot');
  const chatBubble = document.createElement('div');
  chatBubble.classList.add('chat-bubble');
  chatBubble.innerHTML = 'Chào bạn! Đây là nhà của tôi. Tôi đã ở đây từ rất lâu, chỉ đợi một người đến thôi...';

  document.body.appendChild(chatBubble);

  // Flash transition effect
  setTimeout(() => {
    flashTransition.classList.add('flash-out');
  }, 2000);

  // Gate opens after flash effect
  setTimeout(() => {
    gateLeft.classList.add('open');
    gateRight.classList.add('open');
  }, 4000);

  // Robot appears after gate opens
  setTimeout(() => {
    robot.style.display = 'block';
  }, 6000);

  // Animation for robot and chat bubble
  setTimeout(() => {
    robot.style.animation = 'robotAppearance 3s forwards';
    chatBubble.innerHTML = 'Lâu rồi tôi không gặp ai... tôi cảm thấy rất cô đơn...';
  }, 9000);
});
