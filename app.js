const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');

const commentaryPara = document.querySelector('.commentary');

const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');

const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');

const gameOverModal = document.getElementById('game-over-modal');
const gameOverMessage = document.querySelector('.game-over-message');

function getComputerChoice() {
	let choices = ['Rock', 'Paper', 'Scissors'];
	return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
	if (!playerSelection) {
		return null;
	}
	let playerScore = parseInt(playerScoreSpan.textContent);
	let computerScore = parseInt(computerScoreSpan.textContent);
	let lowerPlayerText = playerSelection.toLowerCase().trim();
	let lowerComputerText = computerSelection.toLowerCase().trim();
	updateRoundIcons(lowerPlayerText, lowerComputerText);
	if (lowerPlayerText === lowerComputerText) {
		commentaryPara.textContent = 'Tie!';
		return null;
	} else if (lowerPlayerText == 'paper' && lowerComputerText == 'rock') {
		commentaryPara.textContent = `You win this round! Paper beats rock!`;
		updateScores(playerScore + 1, computerScore);
		return true;
	} else if (lowerPlayerText == 'scissors' && lowerComputerText == 'paper') {
		commentaryPara.textContent = `You win this round! Scissors beats paper!`;
		updateScores(playerScore + 1, computerScore);
		return true;
	} else if (lowerPlayerText == 'rock' && lowerComputerText == 'scissors') {
		commentaryPara.textContent = `You win this round! Rock beats scissors!`;
		updateScores(playerScore + 1, computerScore);
		return true;
	} else {
		let computerChoice =
			computerSelection.charAt(0).toUpperCase() +
			computerSelection.substr(1).toLowerCase();
		commentaryPara.textContent = `You lose this round! ${computerChoice} beats ${lowerPlayerText}!`;
		updateScores(playerScore, computerScore + 1);
		return false;
	}
}

function handleButtonClicks() {
	let restartButton = document.getElementById('restart-button');
	restartButton.addEventListener('click', resetGame);
	rockButton.addEventListener('click', assignRockButton);
	paperButton.addEventListener('click', assignPaperButton);
	scissorsButton.addEventListener('click', assignScissorsButton);
}

function assignRockButton() {
	let result = playRound('rock', getComputerChoice());
	rockButton.classList.add('clicked');
	setTimeout(() => {
		rockButton.classList.remove('clicked');
	}, 200);
}

function assignPaperButton() {
	let result = playRound('paper', getComputerChoice());
	paperButton.classList.add('clicked');
	paperButton.childNodes[0].classList.add('clicked');
	setTimeout(() => {
		paperButton.childNodes[0].classList.remove('clicked');
		paperButton.classList.remove('clicked');
	}, 200);
}

function assignScissorsButton() {
	let result = playRound('scissors', getComputerChoice());
	scissorsButton.classList.add('clicked');
	setTimeout(() => {
		scissorsButton.classList.remove('clicked');
	}, 200);
}

function updateScores(playerPoints, computerPoints) {
	playerScoreSpan.textContent = playerPoints;
	computerScoreSpan.textContent = computerPoints;

	if (playerPoints >= 5 || computerPoints >= 5) {
		if (playerPoints > computerPoints) {
			commentaryPara.textContent = 'Congratulations! You win!';
			gameOverMessage.textContent = 'Congratulations! You win!';
		} else if (playerPoints < computerPoints) {
			commentaryPara.textContent = 'You lose!';
			gameOverMessage.textContent = 'You lose! Try again!';
		} else {
			commentaryPara.textContent = 'It was a tie! Try again!';
			gameOverMessage.textContent = 'It was a tie! Try again!';
		}
		quitGame();
		return;
	}
}

function updateRoundIcons(playerSelection, computerSelection) {
	let playerChoice = 'player-' + playerSelection;
	let computerChoice = 'computer-' + computerSelection;
	let playerIcons = document.querySelectorAll(
		'.current-round .player-selection > i'
	);
	let computerIcons = document.querySelectorAll(
		'.current-round .computer-selection > i'
	);

	playerIcons.forEach((icon) => {
		if (icon.id === playerChoice && !icon.classList.contains('active')) {
			console.log('big here');
			icon.classList.add('active');
		} else if (icon.id !== playerChoice) {
			console.log('here');
			icon.classList.remove('active');
		}
	});

	computerIcons.forEach((icon) => {
		if (icon.id === computerChoice && !icon.classList.contains('active')) {
			icon.classList.add('active');
		} else if (icon.id !== computerChoice) {
			icon.classList.remove('active');
		}
	});
}

function resetGame() {
	handleButtonClicks();
	gameOverModal.classList.remove('open');
	let roundIcons = document.querySelectorAll('.current-round  i');
	roundIcons.forEach((icon) => {
		icon.classList.remove('active');
	});
	playerScoreSpan.textContent = 0;
	computerScoreSpan.textContent = 0;
	commentaryPara.textContent = 'Click a button to get started!';
}

function quitGame() {
	gameOverModal.classList.add('open');
	rockButton.removeEventListener('click', assignRockButton);
	paperButton.removeEventListener('click', assignPaperButton);
	scissorsButton.removeEventListener('click', assignScissorsButton);
}

handleButtonClicks();
// game();
