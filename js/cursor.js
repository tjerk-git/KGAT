const isUserUsingMobile = () => {
  // User agent string method
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  // Screen resolution method
  if (!isMobile) {
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    isMobile = screenWidth < 768 || screenHeight < 768;
  }

  // Touch events method
  if (!isMobile) {
    isMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
  }

  // CSS media queries method
  if (!isMobile) {
    let bodyElement = document.getElementsByTagName("body")[0];
    isMobile =
      window
        .getComputedStyle(bodyElement)
        .getPropertyValue("content")
        .indexOf("mobile") !== -1;
  }

  return isMobile;
};

document.addEventListener("DOMContentLoaded", function () {
  if (!isUserUsingMobile()) {
    const cursor = document.querySelector(".cursor");

    function moveCursor(e) {
      cursor.style.top = e.clientY - cursor.offsetHeight / 2 + "px";
      cursor.style.left = e.clientX - cursor.offsetWidth / 2 + "px";
    }

    window.addEventListener("mousemove", moveCursor);

    window.addEventListener("touchmove", function (e) {
      // Touch events have different properties, so we need to adjust the code
      var touch = e.touches[0];
      moveCursor({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    });

    function hideCursor() {
      cursor.style.opacity = "0";
    }

    function showCursor() {
      cursor.style.opacity = "1";
    }

    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("touchcancel", hideCursor);

    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("touchstart", showCursor);

    document.querySelectorAll(".link").forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        cursor.style.transform = "scale(3.2)";
      });

      link.addEventListener("touchstart", function () {
        cursor.style.transform = "scale(3.2)";
      });

      link.addEventListener("mouseleave", function () {
        cursor.style.transform = "scale(1)";
      });

      link.addEventListener("touchend", function () {
        cursor.style.transform = "scale(1)";
      });
    });

    window.addEventListener("mousedown", function () {
      cursor.style.transform = "scale(0.2)";
    });

    window.addEventListener("touchstart", function () {
      cursor.style.transform = "scale(0.2)";
    });

    window.addEventListener("mouseup", function () {
      cursor.style.transform = "scale(1)";
    });

    window.addEventListener("touchend", function () {
      cursor.style.transform = "scale(1)";
    });
  }
});