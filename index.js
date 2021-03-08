const stopAudio = new Audio('./stop.wav');
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const circle = document.querySelector('circle');
const title = document.querySelector('.title');
let inputVal = durationInput.getAttribute('value');

const circumference = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', circumference);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, resetButton, {
	onStart(totalDuration) {
		stopAudio.pause();
		title.innerHTML = `<h2 class="title">Timer Started</h2>`;
		duration = totalDuration;
	},
	onTick(remaingTime) {
		circle.setAttribute('stroke-dashoffset', (circumference * remaingTime) / duration - circumference);
	},
	onComplete() {
		title.innerHTML = `<h2 class="title">Timer done</h2>`;
		stopAudio.play();
	},
	onReset() {
		title.innerHTML = `<h2 class="title">Set Time</h2>`;
		durationInput.value = "0"
		circle.setAttribute('stroke-dashoffset', 0);
	},
	onPause() {
		title.innerHTML = `<h2 class="title">Timer Paused</h2>`;
	}
});