class Timer {
	//This constructor is called immediately an instance of this class is created.
	constructor(durationInput, startButton, pauseButton, resetButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		this.resetButton = resetButton

		//Check to see if there callbacks
		if (callbacks) {
			//store references to the instance of this class
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
			this.onReset = callbacks.onReset;
			this.onPause = callbacks.onPause;
		}

		//start the timer on the click of the start button.
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
		this.resetButton.addEventListener('click', this.reset)
	}

	start = () => {
		console.log('start timer')
		if (this.onStart) this.onStart(this.timeRemaining);
		this.tick();
		//assign the timer to an instance of the class for it to be accessible to other
		// instances(eg other methods[pause method],etc)
		this.timerID = setInterval(() => {
			this.tick();
		}, 10);
	};

	tick = () => {
		console.log('tick timer')
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) this.onComplete();
		} else {
			const timeRemaining = this.timeRemaining;
			//because of the 'this.timeRemaining' settor, we are literally calling the settor with the thing
			//on the right hand side of the eqn i.e 'timeRemaining - 1' behind the scenees.
			this.timeRemaining = timeRemaining - 0.01;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
			//condensed form of what is at the top
			//In doing this, basically, we are calling the settor to set the time and calling the gettor
			//to retrieve the remaining time.
			// this.timeRemaining = this.timeRemaining-1;
		}
	};

	pause = () => {
		this.onPause()
		clearInterval(this.timerID);
	};

	reset = () => {
		//reset timer
		this.onReset()

	}

	//create a gettor method to get the value of the time remaining
	get timeRemaining() {
		return parseFloat(this.durationInput.value); //because it is a string
	}

	//create a settor method to set the time to the input value
	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}