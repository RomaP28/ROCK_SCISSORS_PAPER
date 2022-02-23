window.onload = init;

function init() {
  document.querySelectorAll('button').forEach((item) => item.addEventListener('click', (e) => processGame.getWinner(e.target.value)));
  processGame.getRandomNum();
}

const processGame = {
  round: 1,
  userScores: 0,
  computerScores: 0,
  getRandomNum() {
    return this.random = Math.floor(Math.random() * 3);
  },
  getWinner(userChoise) {
    if (this.random === +userChoise) {
      this.value = 'DRAW!'
    } else if (this.random === +userChoise - 1 || this.random === 2 && +userChoise === 0) {
      this.value = 'You have WON!';
      this.userScores++;
    } else if (userChoise === 'reset') {
      this.round = 1;
      this.resetScores();
      this.getRandomNum();
      return displayLog.hideResult();
    } else {
      this.value = 'You have LOST!';
      this.computerScores++;
    }
    this.checkWinner(userChoise);
    this.round++;
    this.getRandomNum();
    displayLog.showResult(this.result);
  },
  getName(value) {
    switch (value) {
      case 0: value = 'Rock';
        break;
      case 1: value = 'Paper';
        break;
      case 2: value = 'Scissors';
        break;
    }
    return value;
  },
  checkWinner(userChoise) {
    if (this.computerScores === 3) {
      this.result = 'Computer Win';
      this.resetScores();
    } else if (this.userScores === 3) {
      this.result = 'Congratulations! You Win!';
      this.resetScores();
    } else {
      this.result = `Round ${this.round}, ${this.getName(this.random)} vs. ${this.getName(+userChoise)}, ${this.value}`;
    }
  },
  resetScores() {
    this.computerScores = 0;
    this.userScores = 0;
  }
};

const displayLog = {
  showResult(str) {
    const log = document.getElementById('log');
    const p = document.createElement('p');
    log.appendChild(p);
    p.innerHTML = str;
    log.scrollTop = 9999;
  },
  hideResult() {
    while (log.firstChild) {
      log.removeChild(log.firstChild);
    }
  }
};