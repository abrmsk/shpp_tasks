// BUTTON
const btn = document.querySelector('.button');

btn.addEventListener('mousemove', (e) => {
  const { left, top } = btn.getBoundingClientRect();
  btn.style.setProperty('--x', `${e.pageX - left}px`);
  btn.style.setProperty('--y', `${e.pageY - top}px`);
})

// INFO
const infoOffset = document.querySelector('.offset');
const infoScreen = document.querySelector('.screen');
const pageXY = document.querySelector('.pageXY');
const infoXY = document.querySelector('.xy');

document.addEventListener('mousemove', (e) => {
  infoOffset.innerText = `${e.offsetX}-${e.offsetY}`;
  infoScreen.innerText = `${e.screenX}-${e.screenY}`;
  pageXY.innerText = `${e.pageX}-${e.pageY}`;
  infoXY.innerText = `${e.x}-${e.y}`;
})  


