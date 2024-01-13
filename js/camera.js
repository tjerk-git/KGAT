async function initCamera() {
  const button = document.getElementById("activateCamera");
  const container = document.getElementById("camera-container");
  const text = document.getElementById("hidden-text");

  if (button && container && text) {
    button.style.display = "none";
    container.style.display = "block";
    text.style.display = "block";
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
      },
    });
    const videoElement = document.getElementById("camera-view");
    if (!videoElement) {
      console.error("Video element not found");
    } else {
      videoElement.srcObject = stream;
    }
  } catch (error) {
    console.error("Error accessing the camera:", error);
  }
}
let activateCameraButton = document.getElementById("activateCamera");

if (activateCameraButton) {
  activateCameraButton.addEventListener("click", initCamera);
}