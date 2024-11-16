// Snow effect
let container = document.getElementById('container');
let count = 50;
for (var i = 0; i < 50; i++) {
  let leftSnow = Math.floor(Math.random() * container.clientWidth);
  let topSnow = Math.floor(Math.random() * container.clientHeight);
  let widthSnow = Math.floor(Math.random() * 50);
  let timeSnow = Math.floor((Math.random() * 5) + 5);
  let blurSnow = Math.floor(Math.random() * 10);
  console.log(leftSnow);
  
  let div = document.createElement('div');
  div.classList.add('snow');
  div.style.left = leftSnow + 'px';
  div.style.top = topSnow + 'px';
  div.style.width = widthSnow + 'px';
  div.style.height = widthSnow + 'px';
  div.style.animationDuration = timeSnow + 's';
  div.style.filter = "blur(" + blurSnow + "px)";
  container.appendChild(div);
}

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  const flipCards = document.querySelectorAll('.flip-card-inner'); // Select all flip-card-inner elements
  let currentIndex = 0;
  const flipInterval = 3000; // Time in milliseconds (3000ms = 3 seconds)

  function flipCard() {
      // Remove flip effect from all cards
      flipCards.forEach(card => {
          card.style.transform = 'rotateY(0deg)';
      });

      // Add flip effect to the current card
      flipCards[currentIndex].style.transform = 'rotateY(180deg)';

      // Update the index to the next card, loop back to 0 when reaching the end
      currentIndex = (currentIndex + 1) % flipCards.length;
  }

  // Start the automatic flipping of the cards
  setInterval(flipCard, flipInterval);
});


// Get references to both carousels and the navigation buttons
const carousel3DContainer = document.getElementById('carousel-3d-container');
const flippingCarouselContainer = document.getElementById('flipping-carousel-container');
const show3DCarouselBtn = document.getElementById('show-3d-carousel');
const showFlippingCarouselBtn = document.getElementById('show-flipping-carousel');

const flipCards = document.querySelectorAll('.flip-card');
let currentFlipIndex = 0;

// Function to switch to the 3D carousel
show3DCarouselBtn.addEventListener('click', () => {
    flippingCarouselContainer.style.display = 'none';
    carousel3DContainer.style.display = 'block';
});

// Function to switch to the flipping carousel
showFlippingCarouselBtn.addEventListener('click', () => {
    carousel3DContainer.style.display = 'none';
    flippingCarouselContainer.style.display = 'block';
});

// Function to show a specific flip card
function showFlipCard(index) {
    flipCards.forEach((card, i) => {
        card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)'; // Reset flip
        if (i === index) {
            card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)'; // Flip the active card
        }
    });
}



// Show the first flip card initially
showFlipCard(currentFlipIndex);


// 3D carousel setup
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you don't want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

// ===================== start =======================
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};

