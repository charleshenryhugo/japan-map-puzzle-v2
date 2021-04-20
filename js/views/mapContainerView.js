class MapContainerView {
  constructor() {
    this._parentElement = document.querySelector('.map-container');
    this._whiteMap = this._parentElement.querySelector('svg');
    this._whiteMapInnerFrame = this._whiteMap.getElementById('inner-frame');
    this._whiteMapOuterFrame = this._whiteMap.getElementById('outer-frame');
  }
}

export default new MapContainerView();
