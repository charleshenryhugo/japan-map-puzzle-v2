import prefectures from './prefectures.js';
import prefectureSvgs from '../mapResources/*.svg';

export { prefectures, prefectureSvgs };

export const levels = Object.freeze({
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
  EXPERT: 3,
});

const state = {
  gameMode: levels.EASY,
  matchedPieces: 0,
};

/**
 * @param {number} mode
 */
export const setGameMode = function (mode) {
  state.gameMode = +mode;
};

/**
 * @returns {number}
 */
export const getGameMode = function () {
  return state.gameMode;
};

/**
 * @param {Array.<number>} modes
 * @returns {boolean}
 */
export const isGameMode = function (...modes) {
  for (const mode of modes) {
    if (state.gameMode === mode) return true;
  }
  return false;
};

/**
 * @returns {number}
 */
export const addOneMatch = function () {
  return (state.matchedPieces += 1);
};

export const initMatches = function () {
  state.matchedPieces = 0;
};

/**
 * check whether all pieces are matched already
 * @returns {boolean}
 */
export const allPiecesMatched = function () {
  return state.matchedPieces >= prefectures.length;
};
