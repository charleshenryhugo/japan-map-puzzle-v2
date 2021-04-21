class TimerView {
  constructor() {
    this._parentElement = document.querySelector('.timer');
    this._timerText = this._parentElement.querySelector('.timer--text');
    this._btnGiveUp = this._parentElement.querySelector('.btn--give-up');
  }

  init() {
    this.show();
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
