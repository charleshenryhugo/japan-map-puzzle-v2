import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  prefectures,
  prefectureSvgs,
  state,
  EASY,
  MEDIUM,
  EXPERT,
  HARD,
} from './model.js';

import controlBoxView from './views/controlBoxView.js';
import timerView from './views/timerView.js';
import mapContainerView from './views/mapContainerView.js';
import puzzlePiecesView from './views/puzzlePiecesView.js';
import PuzzlePiece from './views/puzzlePiece.js';

const setGameMode = function (mode) {
  state.gameMode = +mode;
};

/**
 *
 * @param {PuzzlePiece} puzzlePieceClone
 * @param {HTMLImageElement} piece
 */
const controlPuzzlePieces = function (puzzlePieceClone, piece) {
  if (
    puzzlePieceClone.matched(
      mapContainerView.getTargetClientRect(piece.dataset.prefecture),
      30
    )
  ) {
    puzzlePieceClone.matchToTarget(
      mapContainerView.scrollTop(),
      mapContainerView.scrollLeft()
    );
    piece.remove();
    state.matchedPieces++;
  } else {
    puzzlePieceClone.destroy();
    piece.classList.remove('transparent');
  }

  if (state.matchedPieces >= prefectures.length) {
    document.querySelector('.timer--text').textContent = ' 🥳COMPLETED!';
  }
};

const startGame = function () {
  timerView.init();

  controlBoxView.hide();

  mapContainerView.init(
    state.gameMode === EASY || state.gameMode === MEDIUM,
    state.gameMode !== EXPERT
  );
  puzzlePiecesView.init(prefectures, prefectureSvgs, state.gameMode === EASY);
};

const initGame = function () {
  timerView.hide();

  state.matchedPieces = 0;

  // prettier-ignore
  controlBoxView
    .init()
    .addClickHandler(setGameMode)
    .addStartHandler(startGame);

  mapContainerView
    .init(true, true)
    .matchAllPuzzlePieces(prefectures, prefectureSvgs, true);

  puzzlePiecesView.makePuzzlePiecesDraggable(controlPuzzlePieces);
};

timerView.addGiveUpHandler(initGame);
initGame();
