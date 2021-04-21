import PuzzlePiece from './puzzlePiece';
import mapContainerView from './mapContainerView';

class PuzzlePiecesView {
  constructor() {
    this._parentElement = document.querySelector('.puzzle-pieces');
  }

  /**
   * init all puzzle pieces under the puzzlePiecesView
   * @param {Array.<string>} prefectures
   * @param {Object.<string, string>} prefectureSvgs
   * @param {boolean} prefectureNameHints
   */
  init(prefectures, prefectureSvgs, prefectureNameHints = true) {
    this._clearAllPuzzlePieces();
    const srcFileNameSuffix = prefectureNameHints ? '-jp' : '';

    const _this = this;
    prefectures
      .sort(() => 0.5 - Math.random())
      .forEach(prefecture => {
        const piece = new PuzzlePiece(
          prefecture,
          mapContainerView.getTargetClientRect(prefecture),
          prefectureSvgs[`${prefecture}${srcFileNameSuffix}`]
        ).setClass('puzzle-piece--initial');

        _this.append(piece);
      });

    return this;
  }

  _clearAllPuzzlePieces() {
    while (this._parentElement.firstElementChild)
      this._parentElement.lastElementChild.remove();
  }

  append(piece) {
    this._parentElement.append(piece);
  }

  /**
   *
   * @param {function} mouseupHandler
   */
  makePuzzlePiecesDraggable(mouseupHandler) {
    if (this._parentElement.onmousedown) return this;

    this._parentElement.onmousedown = function (e) {
      e.preventDefault();

      const piece = e.target.closest('.puzzle-piece--initial');
      if (!piece) return;
      piece.classList.add('transparent');

      const clientRect = piece.getBoundingClientRect();
      const shiftX = e.clientX - clientRect.left - clientRect.width / 2;
      const shiftY = e.clientY - clientRect.top - clientRect.height / 2;

      const prefecture = piece.dataset.prefecture;
      const puzzlePieceClone = new PuzzlePiece(
        prefecture,
        mapContainerView.getTargetClientRect(prefecture),
        piece.src
      );
      const pieceClone = puzzlePieceClone.setClass('puzzle-piece--dragged');
      mapContainerView.append(pieceClone);

      const onMouseMove = function (e) {
        puzzlePieceClone.moveTo(e.clientX - shiftX, e.clientY - shiftY);
      };
      puzzlePieceClone.moveTo(e.clientX - shiftX, e.clientY - shiftY);

      document.addEventListener('mousemove', onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
        mouseupHandler(puzzlePieceClone, piece);
      };
    };

    return this;
  }

  hide() {
    this._parentElement.classList.add('hidden');
  }

  show() {
    this._parentElement.classList.remove('hidden');
  }
}

export default new PuzzlePiecesView();
