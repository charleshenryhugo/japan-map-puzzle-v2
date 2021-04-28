# Japan Map Puzzle

https://japan-map-puzzle-v2-zhuyue.netlify.app/

Drag 47 puzzle pieces to match the original map!

Developed in ES6, SASS, and HTML

Bundled and polyfilled with Parcel@1

## install modules
```
npm install
```

## start to dev (output to ./dist)
```
npm run dev
```

## build (output to ./dist)
```
npm run build
```

## Previous Version
Access version1 here: https://japanmappuzzle-zhuyue.netlify.app/

## Improvements since Version1
### dev
- Use parcel@1 to bundle and polyfill modern javascript
- Use mvc architecture to organize javascript
- Use npm scripts to run or build site
- Use sass(scss) to organize css

### features
- Add "expert" game mode
- Avoid puzzle pieces from overlapping each other
- Make responsive button elements


## linters
prettier
stylelint

.vscode/setting.json
```{json}
{
    "files.autoSave": "onFocusChange",
    "editor.tabSize": 2,
    "editor.detectIndentation": false,
    "editor.defaultFormatter": null,

    "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": true,
    },
    "prettier.resolveGlobalModules": false,
    "prettier.configPath": ".prettierrc",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnType": false,
        "editor.formatOnSave": true,
        "editor.tabSize": 2
    },
}
```