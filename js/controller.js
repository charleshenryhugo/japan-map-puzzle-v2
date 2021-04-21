import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { prefectures, prefectureSvgs, levels } from './model.js';
import * as model from './model.js';

import controlBoxView from './views/controlBoxView.js';
import timerView from './views/timerView.js';
import mapContainerView from './views/mapContainerView.js';
import puzzlePiecesView from './views/puzzlePiecesView.js';
import PuzzlePiece from './views/puzzlePiece.js';

const setGameMode = function (mode) {
  model.setGameMode(+mode);
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
    model.addOneMatch();
  } else {
    puzzlePieceClone.destroy();
    piece.classList.remove('transparent');
  }

  if (model.allPiecesMatched()) {
    document.querySelector('.timer--text').textContent = ' 🥳COMPLETED!';
  }
};

const startGame = function () {
  timerView.init();

  controlBoxView.hide();

  mapContainerView.init(
    model.isGameMode(levels.EASY) || model.isGameMode(levels.MEDIUM),
    !model.isGameMode(levels.EXPERT)
  );
  puzzlePiecesView.init(
    prefectures,
    prefectureSvgs,
    model.isGameMode(levels.EASY)
  );
};

const initGame = function () {
  timerView.hide();

  model.initMatches();

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
