import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { prefectures, prefectureSvgs, levels } from './model.js';
import * as model from './model.js';

import controlBoxView from './views/controlBoxView.js';
import mapContainerView from './views/mapContainerView.js';
import puzzlePiecesView from './views/puzzlePiecesView.js';
import PuzzlePiece from './views/puzzlePiece.js';
import timerView from './views/timerView.js';

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
    timerView.stopTimer().displayCheerMessage();
  }
};

const startGame = function () {
  timerView.init().startTimer().show();

  controlBoxView.hide();

  mapContainerView.init(
    model.isGameMode(levels.EASY, levels.MEDIUM),
    !model.isGameMode(levels.EXPERT)
  );

  puzzlePiecesView
    .init(prefectures, prefectureSvgs, model.isGameMode(levels.EASY))
    .show();
};

const initGame = function () {
  timerView.init().hide();

  model.initMatches();

  controlBoxView
    .init()
    .addClickHandler(model.setGameMode)
    .addStartHandler(startGame);

  mapContainerView
    .init(true, true)
    .matchAllPuzzlePieces(prefectures, prefectureSvgs, true);

  puzzlePiecesView.makePuzzlePiecesDraggable(controlPuzzlePieces).hide();
};

timerView.addGiveUpHandler(initGame);
initGame();
