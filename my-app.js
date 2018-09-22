let scores;
let roundScore;
let activePlayer;
let gamePlayingState;

const msgContainer = document.createElement('p');

StartGame();

document.querySelector('.btn-new').addEventListener('click', StartGame);


document.querySelector('.btn-roll').addEventListener('click', () => {

	if (gamePlayingState) {

		//    random number
		var dice = Math.floor(Math.random() * 6) + 1;
		//		console.log(dice);

		//    display dice img
		const diceUI = document.querySelector('.dice');
		diceUI.style.display = 'block';
		diceUI.src = `dice-${dice}.png`;

		//    update the round score if rolled number is not 1
		if (dice !== 1) {

			//    add roundScore, dispaly it in current
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {

			//     next player turn
			nextPlayerRoll();

		}

	}

});


document.querySelector('.btn-hold').addEventListener('click', () => {

	if (gamePlayingState) {

		//    add current score to global score
		scores[activePlayer] += roundScore;

		//    update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//    check if player won the game
		if (scores[activePlayer] >= 100) {

			const winnner = document.querySelector('#name-' + activePlayer).textContent;
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer).classList.remove('active');
			msgContainer.classList.add('winner');
			msgContainer.textContent = `The winner is ${winnner} with score ${scores[activePlayer]} points.`
			document.querySelector('.dice-container').appendChild(msgContainer);
			gamePlayingState = false;

		} else {

			//    next player turn
			nextPlayerRoll();

		}
	}


});

function nextPlayerRoll() {

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('.player-0').classList.toggle('active');
	document.querySelector('.player-1').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';

}

function StartGame() {

	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlayingState = true;

	document.querySelector('.dice').style.display = 'none';

	if (msgContainer) {
		msgContainer.remove();
	}

	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0').classList.remove('active');
	document.querySelector('.player-1').classList.remove('active');
	document.querySelector('.player-0').classList.add('active');

}

//	show/hide game rules
const rules = document.querySelector('.rules');
const rulesBtn = document.querySelector('.rules-trigger');

rulesBtn.addEventListener('click', () => {
	
	rules.classList.toggle('show-rules');
	
	if (rulesBtn.textContent === 'Show rules') {
		rulesBtn.textContent = 'Hide rules';
	} else {	
		rulesBtn.textContent = 'Show rules';
	}
	
});
