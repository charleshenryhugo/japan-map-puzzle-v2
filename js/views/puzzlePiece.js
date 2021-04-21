import mapContainerView from './mapContainerView';

class PuzzlePiece {
  /**
   * @param {string} prefecture
   * @param {DOMRect} targetBoundingRect
   * @param {string} imgSrc
   */
  constructor(prefecture, targetBoundingRect, imgSrc) {
    this._piece = document.createElement('img');
    this._piece.dataset.prefecture = prefecture;
    this._piece.style.width = targetBoundingRect.width + 'px';
    this._piece.src = imgSrc;

    this._targetBoundingRect = targetBoundingRect;
    this._piece.className = 'puzzle-piece--initial';
  }

  /**
   * manually destroy a piece object
   */
  destroy() {
    this._piece.remove();
    this._targetBoundingRect = null;
  }

  /**
   * position the piece center to [clientX, clientY]
   * @param {number} clientX
   * @param {number} clientY
   * @return {HTMLImageElement}
   */
  moveTo(clientX, clientY) {
    const clientRect = this._piece.getBoundingClientRect();
    this._piece.style.left =
      clientX - clientRect.width / 2 + window.pageXOffset + 'px';
    this._piece.style.top =
      clientY - clientRect.height / 2 + window.pageYOffset + 'px';

    return this._piece;
  }

  /**
   * check whether the puzzle piece matches the targetRect
   * error margin less than a given sensitivity
   * @param {DOMRect} targetRect
   * @param {number} sensitivity
   * @returns {boolean}
   */
  matched(targetRect, sensitivity = 30) {
    const clientRect = this._piece.getBoundingClientRect();
    return (
      clientRect.x >= targetRect.x - sensitivity &&
      clientRect.x <= targetRect.x + sensitivity &&
      clientRect.y <= targetRect.y + sensitivity &&
      clientRect.y >= targetRect.y - sensitivity
    );
  }

  /**
   * match piece to its target bounding rect
   * add scrollTop and scrollLeft if the target parent element is scrolled
   * @param {number=0} scrollTop
   * @param {number=0} scrollLeft
   * @return {HTMLImageElement}
   */
  matchToTarget(scrollTop = 0, scrollLeft = 0) {
    this._piece.style.top = this._targetBoundingRect.y + scrollTop + 'px';
    this._piece.style.left = this._targetBoundingRect.x + scrollLeft + 'px';
    this._piece.className = 'puzzle-piece--matched';

    return this._piece;
  }

  /**
   * @param {string} className
   * @return {HTMLImageElement}
   */
  setClass(className) {
    this._piece.className = className;
    return this._piece;
  }
}

export default PuzzlePiece;
