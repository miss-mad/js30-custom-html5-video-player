const allCustomControls = document.querySelector(".player");
const video = allCustomControls.querySelector(".viewer");
const progressBar = allCustomControls.querySelector(".progress");
const progressBarFilled = allCustomControls.querySelector(".progress__filled");
const playButton = allCustomControls.querySelector(".toggle");
const sliders = allCustomControls.querySelectorAll(".player__slider");
const skipButtons = allCustomControls.querySelectorAll("[data-skip]");

// function to play video
function playVideoWithClick() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// updates the play/pause button icon when the video is played/paused
function updatePlayPauseButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = icon;
}

// operates the two skip buttons to skip forward or backward in comparison with the current timestamp in the video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// handles the two input ranges: volume + playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// lets us set the yellow progress bar to skip to any point in the video
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBarFilled.style.flexBasis = `${percent}%`;
}

// lets us scrub the video
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", playVideoWithClick);
video.addEventListener("play", updatePlayPauseButton);
video.addEventListener("pause", updatePlayPauseButton);
video.addEventListener("timeupdate", handleProgress);
playButton.addEventListener("click", playVideoWithClick);
skipButtons.forEach((button) => button.addEventListener("click", skip));
sliders.forEach((range) => range.addEventListener("change", handleRangeUpdate));
progressBar.addEventListener("click", scrub);

let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
