import { formatTime } from '../helpers';

class TimerView {
  constructor() {
    this._parentElement = document.querySelector('.timer');
    this._timerText = this._parentElement.querySelector('.timer--text');
    this._btnGiveUp = this._parentElement.querySelector('.btn--give-up');
    this._timer = null;
  }

  displayCheerMessage() {
    this._timerText.textContent += ' 🎉Completed!';
    this._btnGiveUp.textContent = '🏠back';

    return this;
  }

  init() {
    this.stopTimer();
    this._timerText.textContent = '00:00:00';
    this._btnGiveUp.textContent = '😓️give up';

    return this;
  }

  startTimer() {
    let seconds = 0;
    this._timer = setInterval(() => {
      seconds += 1;
      this._timerText.textContent = formatTime(seconds);
    }, 1000);

    return this;
  }

  stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
    }

    return this;
  }

  addGiveUpHandler(handler) {
    this._btnGiveUp.addEventListener('click', handler);
  }

  show() {
    this._parentElement.classList.remove('hidden');
  }

  hide() {
    this._parentElement.classList.add('hidden');
  }
}

export default new TimerView();
