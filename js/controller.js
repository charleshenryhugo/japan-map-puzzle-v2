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

import mapContainerView from './views/mapContainerView.js';

const mapContainer = document.querySelector('.map-container');
const whiteMap = mapContainer.querySelector('svg');
const whiteMapInnerFrame = whiteMap.getElementById('inner-frame');
const whiteMapOuterFrame = whiteMap.getElementById('outer-frame');
const puzzlePiecesBox = document.querySelector('.puzzle-pieces');

const timer = document.querySelector('.timer');
const timerText = timer.querySelector('.timer--text');
const btnGiveUp = timer.querySelector('.btn--give-up');

const controlBox = document.querySelector('.control-box');
const btnStart = controlBox.querySelector('.btn--start');

// switch game mode on click
controlBox.addEventListener('click', e => {
  const target = e.target.closest('.btn[data-mode]');
  if (!target) return;

  controlBox
    .querySelector(`.btn[data-mode="${state.gameMode}"]`)
    .classList.remove('btn--selected');
  target.classList.add('btn--selected');
  state.gameMode = +target.dataset.mode;
});

/**
 * get target bounding client rect in the map frame
 * @param prefecture
 * @returns {DOMRect}
 * @private
 */
const getTargetClientRect = function (prefecture) {
  return whiteMap.getElementById(prefecture).getBoundingClientRect();
};

/**
 * create a puzzle piece element with the expected width
 * @param prefecture prefecture name, e.g "hokkaido"
 * @param prefectureNameHints whether to display prefecture name
 * @returns {HTMLImageElement}
 */
const makePuzzlePiece = function (prefecture, prefectureNameHints = true) {
  const targetRect = getTargetClientRect(prefecture);
  const srcFileNameSuffix = prefectureNameHints ? '-jp' : '';

  const piece = document.createElement('img');
  piece.dataset.prefecture = prefecture;
  piece.src = prefectureSvgs[`${prefecture}${srcFileNameSuffix}`];

  piece.style.width = Number.parseFloat(targetRect.width) + 'px';

  // position the piece center to [clientX, clientY]
  piece.moveTo = function (clientX, clientY) {
    const clientRect = this.getBoundingClientRect();
    this.style.left =
      clientX - clientRect.width / 2 + window.pageXOffset + 'px';
    this.style.top =
      clientY - clientRect.height / 2 + window.pageYOffset + 'px';
  };

  // check whether a piece has arrived its expected position
  piece.arrived = function (sensitivity = 30) {
    const clientRect = this.getBoundingClientRect();
    const targetRect = getTargetClientRect(prefecture);
    return (
      clientRect.x >= targetRect.x - sensitivity &&
      clientRect.x <= targetRect.x + sensitivity &&
      clientRect.y <= targetRect.y + sensitivity &&
      clientRect.y >= targetRect.y - sensitivity
    );
  };

  // directly match a piece to its expected position
  piece.matchToTarget = function () {
    piece.style.top =
      Number.parseFloat(targetRect.y) + mapContainer.scrollTop + 'px';
    piece.style.left =
      Number.parseFloat(targetRect.x) + mapContainer.scrollLeft + 'px';

    piece.className = 'puzzle-piece--matched';
  };

  return piece;
};

const makePuzzlePiecesDraggable = function () {
  puzzlePiecesBox.onmousedown = function (e) {
    e.preventDefault();

    const piece = e.target.closest('.puzzle-piece--initial');
    if (!piece) return;

    const clientRect = piece.getBoundingClientRect();
    const shiftX = e.clientX - clientRect.left - clientRect.width / 2;
    const shiftY = e.clientY - clientRect.top - clientRect.height / 2;

    const pieceClone = makePuzzlePiece(
      piece.dataset.prefecture,
      state.gameMode === EASY
    );
    pieceClone.className = 'puzzle-piece--dragged';
    pieceClone.style.left = Number.parseFloat(clientRect.x) + 'px';
    pieceClone.style.top = Number.parseFloat(clientRect.y) + 'px';
    mapContainer.append(pieceClone);
    piece.classList.add('transparent');

    pieceClone.moveTo(e.clientX - shiftX, e.clientY - shiftY);
    const onMouseMove = function (e) {
      pieceClone.moveTo(e.clientX - shiftX, e.clientY - shiftY);
    };
    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;

      if (pieceClone.arrived(30)) {
        pieceClone.matchToTarget();
        piece.remove();
        state.matchedPieces++;
      } else {
        pieceClone.remove();
        piece.classList.remove('transparent');
      }

      if (state.matchedPieces >= prefectures.length) {
        document.querySelector('.timer--text').textContent += ' 🥳COMPLETED!';
      }
    };
  };
};

/**
 * init map container
 * clean existing puzzle pieces and set inner frame
 */
const initMapContainer = function () {
  mapContainer
    .querySelectorAll('[data-prefecture]')
    .forEach(piece => piece.remove());

  if (state.gameMode === HARD) {
    whiteMapInnerFrame.style.opacity = 0;
    return;
  }

  if (state.gameMode === EXPERT) {
    whiteMapInnerFrame.style.opacity = 0;
    whiteMapOuterFrame.style.opacity = 0;
  }
};

/**
 * create and randomly place all puzzle pieces as child elements inside the puzzlePiecesBox
 * @param prefectureNameHints
 */
const initPuzzlePieces = function (
  prefectureNameHints = state.gameMode === EASY
) {
  while (puzzlePiecesBox.firstElementChild)
    puzzlePiecesBox.lastElementChild.remove();

  prefectures
    .sort(() => 0.5 - Math.random())
    .forEach(prefecture => {
      const piece = makePuzzlePiece(prefecture, prefectureNameHints);
      piece.className = 'puzzle-piece--initial';
      puzzlePiecesBox.append(piece);
    });
};

/**
 * match all puzzle pieces to the map container
 */
const matchAllPuzzlePieces = function () {
  prefectures.forEach(prefecture => {
    const piece = makePuzzlePiece(prefecture, true);
    mapContainer.append(piece);
    piece.matchToTarget();
  });
};

const initGame = function () {
  timer.classList.add('hidden');
  puzzlePiecesBox.classList.add('hidden');
  controlBox.classList.remove('hidden');

  whiteMapInnerFrame.style.opacity = 1;
  whiteMapOuterFrame.style.opacity = 1;

  state.matchedPieces = 0;

  matchAllPuzzlePieces();
  makePuzzlePiecesDraggable();
};

const startGame = function () {
  timer.classList.remove('hidden');
  puzzlePiecesBox.classList.remove('hidden');
  controlBox.classList.add('hidden');

  initMapContainer();
  initPuzzlePieces();
};

initGame();

btnStart.addEventListener('click', startGame);
btnGiveUp.addEventListener('click', initGame);
