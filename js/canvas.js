
const can = document.getElementById("canvas");
const ctx = can.getContext("2d");
const activeText = document.getElementById('activeText');
const checkbox = document.querySelector('sl-switch');
const menu = document.querySelector('sl-menu');
const cursor = document.querySelector(".cursor");
const currentPhoto = document.querySelector("#currentPhoto");

let selectedPhoto = 0;

let img;

function init(imageIndex = 0) {
  const canvasOverlay = document.querySelector("#canvas_container");
  const canvasOverlayWidth = canvasOverlay.offsetWidth;
  const canvasOverlayHeight = canvasOverlay.offsetHeight;

  // change the image randomly after 5 seconds choose from array of images
  img = new Image();
  // array with 5 placekittens images
  const images = [
    "../assets/images/nachtwacht.jpg",
    "../assets/images/nature.jpg",
    "../assets/images/3.jpg",
  ];

  img.src = images[imageIndex];

  // Set canvas dimensions based on the window size

  can.width = canvasOverlayWidth;
  can.height = canvasOverlayHeight;

  // calculate the middle of the canvas
  let middleX = can.width / 2;
  let middleY = can.height / 2;

  redraw({ x: middleX, y: middleY });
}

can.addEventListener(
  "mousemove",
  function (e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    var mouse = getMouse(e, can);
    redraw(mouse);
  },
  false,
);

can.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    let touch = e.touches[0];
    let touchMouse = getMouse(touch, can);
    redraw(touchMouse);
  },
  false,
);

function redraw(mouse) {

  if (!checkbox.checked) {
    return;
  }

  can.width = can.width;
  ctx.drawImage(img, 0, 0, 1920, 1080);
  ctx.beginPath();
  ctx.rect(0, 0, can.width, can.height);

  // calculate a width based on the current window size
  var cursorWidth = 69;

  ctx.arc(mouse.x, mouse.y, cursorWidth, 0, Math.PI * 2, true);

  ctx.clip();
  ctx.fillStyle = "#FFFDF4";

  ctx.fillRect(0, 0, can.width, can.height);
}


function lightsOn() {
  can.width = can.width;
  ctx.drawImage(img, 0, 0, 1920, 1080);
  ctx.beginPath();
  ctx.rect(0, 0, can.width, can.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
}

function getMouse(e, canvas) {
  var element = canvas,
    offsetX = 0,
    offsetY = 0,
    mx,
    my;

  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  return {
    x: mx,
    y: my,
  };
}

// on window resize, update the canvas size
window.addEventListener("resize", function () {
  init(selectedPhoto);
});

document.addEventListener("DOMContentLoaded", function () {
  init();
});


checkbox.addEventListener('sl-change', event => {
  if (event.target.checked) {
    activeText.innerHTML = "aan";
    can.style.cursor = "none";
    init(selectedPhoto);
  } else {
    lightsOn();
    activeText.innerHTML = "uit";
    can.style.cursor = "pointer";
  }
});


menu.addEventListener('sl-select', event => {

  checkbox.checked = true;
  activeText.innerHTML = "aan";
  can.style.cursor = "none";

  if (event.detail.item.value === "nachtwacht") {
    init(0);

    selectedPhoto = 0;
    currentPhoto.innerHTML = "De Nachtwacht";
  } else if (event.detail.item.value === "nature") {
    init(1);
    selectedPhoto = 1;
    currentPhoto.innerHTML = "Natuur";
  } else if (event.detail.item.value === "japan") {
    init(2);
    selectedPhoto = 2;
    currentPhoto.innerHTML = "Japan";
  }

});