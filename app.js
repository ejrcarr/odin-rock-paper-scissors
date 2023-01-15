const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

function getComputerChoice() {
	let choices = ['Rock', 'Paper', 'Scissors'];
	return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
	if (!playerSelection) {
		return null;
	}
	let lowerPlayerText = playerSelection.toLowerCase().trim();
	let lowerComputerText = computerSelection.toLowerCase().trim();
	if (lowerPlayerText === lowerComputerText) {
		console.log('Tie!');
		return null;
	} else if (lowerPlayerText == 'paper' && lowerComputerText == 'rock') {
		console.log(`You win! Paper beats rock!`);
		return true;
	} else if (lowerPlayerText == 'scissors' && lowerComputerText == 'paper') {
		console.log(`You win! Scissors beats paper!`);
		return true;
	} else if (lowerPlayerText == 'rock' && lowerComputerText == 'scissors') {
		console.log(`You win! Rock beats scissors!`);
		return true;
	} else {
		let computerChoice =
			computerSelection.charAt(0).toUpperCase() +
			computerSelection.substr(1).toLowerCase();
		console.log(`You lose! ${computerChoice} beats ${lowerPlayerText}!`);
		return false;
	}
}

function game() {
	let playerScore = 0;
	let computerScore = 0;
	while (playerScore < 5 && computerScore < 5) {
		let playerSelection = prompt('What would you like to play?');
		let computerSelection = getComputerChoice();
		let result = playRound(playerSelection, computerSelection);
		if (result) {
			playerScore++;
		} else if (result !== null) {
			computerScore++;
		}
	}
	if (playerScore > computerScore) {
		console.log('Congratulations! You win!');
	} else if (playerScore < computerScore) {
		console.log('You lose!');
	} else {
		console.log('It was a tie! Try again!');
	}
}

function handleButtonClicks() {
	rockButton.addEventListener('click', () => {
		console.log('rock');
	});

	paperButton.addEventListener('click', () => {
		console.log('paper');
	});

	scissorsButton.addEventListener('click', () => {
		console.log('scissors');
	});
}

handleButtonClicks();
// game();
