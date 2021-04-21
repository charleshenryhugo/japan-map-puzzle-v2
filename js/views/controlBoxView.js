import { state } from '../model';

class ControlBoxView {
  constructor() {
    this._parentElement = document.querySelector('.control-box');
    this._btnStart = this._parentElement.querySelector('.btn--start');
  }

  init() {
    this.show();
    return this;
  }

  addClickHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const target = e.target.closest('.btn[data-mode]');
      if (!target) return;

      this._parentElement
        .querySelector(`.btn[data-mode="${state.gameMode}"]`)
        .classList.remove('btn--selected');
      target.classList.add('btn--selected');

      handler(target.dataset.mode);
    });

    return this;
  }

  addStartHandler(handler) {
    this._btnStart.addEventListener('click', handler);
    return this;
  }

  show() {
    this._parentElement.classList.remove('hidden');
  }

  hide() {
    this._parentElement.classList.add('hidden');
  }
}

export default new ControlBoxView();
