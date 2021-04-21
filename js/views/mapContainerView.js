import PuzzlePiece from './puzzlePiece';

class MapContainerView {
  constructor() {
    this._parentElement = document.querySelector('.map-container');
    this._whiteMap = this._parentElement.querySelector('svg');
    this._whiteMapInnerFrame = this._whiteMap.getElementById('inner-frame');
    this._whiteMapOuterFrame = this._whiteMap.getElementById('outer-frame');
  }

  /**
   * init mapContainerView, specify whether to render innerFrame or outerFrame
   * @param {boolean=true} renderInnerFrame
   * @param {boolean=true} renderOuterFrame
   */
  init(renderInnerFrame = true, renderOuterFrame = true) {
    this._clearAllPuzzlePieces();

    renderInnerFrame ? this._showInnerFrame() : this._hideInnerFrame();
    renderOuterFrame ? this._showOuterFrame() : this._hideOuterFrame();

    return this;
  }

  /**
   * fill mapContainer with all piece puzzles
   * @param {Array.<string>} prefectures
   * @param {Object.<string, string>} prefectureSvgs
   * @param {boolean=true} prefectureNameHints
   */
  matchAllPuzzlePieces(
    prefectures,
    prefectureSvgs,
    prefectureNameHints = true
  ) {
    const srcFileNameSuffix = prefectureNameHints ? '-jp' : '';

    const _this = this;
    prefectures.forEach(prefecture => {
      const piece = new PuzzlePiece(
        prefecture,
        _this.getTargetClientRect(prefecture),
        prefectureSvgs[`${prefecture}${srcFileNameSuffix}`]
      ).matchToTarget(_this.scrollTop(), _this.scrollLeft());

      _this.append(piece);
    });

    return this;
  }

  /**
   * get target bounding client rect(relative to viewport) in the map frame
   * @param prefecture
   * @returns {DOMRect}
   */
  getTargetClientRect(prefecture) {
    return this._whiteMap.getElementById(prefecture).getBoundingClientRect();
  }

  /**
   * clear all puzzle pieces existing under the map controller
   */
  _clearAllPuzzlePieces() {
    this._parentElement
      .querySelectorAll('[data-prefecture]')
      .forEach(piece => piece.remove());
  }

  _hideInnerFrame() {
    this._whiteMapInnerFrame.style.opacity = '0';
  }

  _showInnerFrame() {
    this._whiteMapInnerFrame.style.opacity = '1';
  }

  _hideOuterFrame() {
    this._whiteMapOuterFrame.style.opacity = '0';
  }

  _showOuterFrame() {
    this._whiteMapOuterFrame.style.opacity = '1';
  }

  append(piece) {
    this._parentElement.append(piece);
  }

  scrollTop() {
    return this._parentElement.scrollTop;
  }

  scrollLeft() {
    return this._parentElement.scrollLeft;
  }
}

export default new MapContainerView();
