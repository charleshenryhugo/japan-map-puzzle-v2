import prefectures from './prefectures.js';
import prefectureSvgs from '../mapResources/*.svg';

export { prefectures, prefectureSvgs };

export const [EASY, MEDIUM, HARD, EXPERT] = [0, 1, 2, 3];

export const state = {
  gameMode: EASY,
  matchedPieces: 0,
};
