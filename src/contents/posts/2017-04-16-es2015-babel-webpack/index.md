---
title: ES2015 + Babel + Webpack + ESLint な開発環境をつくった
date: 2017-04-16T23:00:00+09:00
path: /es2015-babel-webpack
---

ナウなヤングに人気な React のチュートリアルを自分もやりたくなったんだが、まあまずは環境構築だよね…ということで、サクッとやってみた。
ついでに Docker 上で動くようにこまかい工夫を加えてみた。

# つくったもの

[http://github.com/cheezenaan/js-boilerplate:embed]

# How to Use

```
$ dbin/yarn install
$ docker-compose up
```

# ディレクトリ構成

```sh
$ tree
.
├── .babelrc
├── .dockerignore
├── .eslintignore
├── .eslintrc.json
├── .git
├── .gitignore
├── Dockerfile.dev
├── dbin
│     ├── console
│     └── yarn
├── dist
│     └── index.html
├── docker-compose.yml
├── node_modules
├── package.json
├── src
│     ├── components
│     │     ├── hello.jsx
│     │     └── world.jsx
│     └── index.js
├── webpack.config.js
└── yarn.lock
```

# つくりかた

## Docker

公式の node イメージを使った。
alpine ベースだからサイズも小さい。yarn も導入済み。

### Dockerfile

```Dockerfile
FROM node:7.8.0-alpine

WORKDIR /myapp
```

### docker-compose.yml

```yaml
version: '2'

services:
  main:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - 4000:4000
    volumes:
      - .:/myapp:cached
    command: 'yarn start'
```

`docker-compose run ~` と毎回入力するのがだるいので、こんなスクリプトを用意して `dbin/console` として呼び出すことにした。

```sh
#!/bin/bash
set -eux

readonly APP_CONTAINER="your_conitainer_name"
readonly COMMAND="/bin/sh"

docker-compose run --rm $APP_CONTAINER $COMMAND $@
```

## Babel

トランスパイラ。

```
$ yarn add --dev babel-core babel-loader babel-preset-2015  babel-preset-react
```

## Webpack

ビルドしてくれたりファイル変更を監視してオートリロードしてくれるすげーやつ。

```
$ yarn add --dev webpack webpack-dev-server
```

### 注意点

Docker 環境上で動作させる際には以下留意すること。

- host: '0.0.0.0'
- `watchOptions` でポーリング時間を定義

```javascript
// webpack.config.js

{
  devServer: {
    contentBase: './dist',
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    hot: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
(略)
}
```

## ESLint

めちゃくちゃカスタマイズできる文法チェックツール。
とりあえず airbnb のルールを当ててみる。

```
$ npm info eslint-config-airbnb@latest peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev eslint-config-airbnb@lates
```

```json
// eslint.json

{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {}
}
```

## React

みんなだいすきビューライブラリ。

```
$ yarn add react react-dom
```

とりあえずそれっぽくコンポーネントつくってみる。

```javascript
// src/components/hello.jsx

import React from 'react';

const Hello = () => <h1>Hello</h1>;
export default Hello;
```

```javascript
// src/components/world.jsx

import React from 'react';

const World = () => <h1>World</h1>;
export default World;
```

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/hello';
import World from './components/world';

ReactDOM.render(
  <div>
    <Hello />
    <World />
  </div>,
  document.getElementById('app')
);
```

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>JavaScript Boilerplate</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

あとは、`http://localhost:4000/` にアクセスすれば変更内容を確認できる。
コンポーネントを修正するとブラウザに内容がリアルタイムで反映される。すごい時代だ。

# 感想

とりあえずトランスパイラとビルドツールの準備が整い、ES2015 の世界へ飛び込めるようになったので、当初の目的は達成。細かい作法や文法は、ESLint で怒られながら気軽に学べるしなんとかなるでしょ。あと webpack-dev-server はやはり便利だ。

つぎはいよいよ React チュートリアルかな。

# 参考リンク

- [verekia/JavaScript Stack from Scratch](https://github.com/verekia/js-stack-from-scratch)
- [webpack-dev-server の基本的な使い方とポイント - dackdive's blog](http://dackdive.hateblo.jp/entry/2016/05/07/183335)
- [今から React 始める人は ESLint 使おう - Qiita](http://qiita.com/KeitaMoromizato/items/ca5c3fdce2a2450f1e3d)
- [React の Helloworld を docker-compose を使って webpack + babel , express, webpack-dev-server を試したメモ - Qiita](http://qiita.com/hibohiboo/items/79525672be38368ca09e#webpack-dev-server%E3%81%AE%E4%BD%BF%E7%94%A8)
- [Webpack + React + ES6 の最小構成を考えてみる。 - TOEIC940 点の文系プログラマー](http://uraway.hatenablog.com/entry/2015/12/25/Webpack_%2B_React_%2B_ES6%E3%81%AE%E6%9C%80%E5%B0%8F%E6%A7%8B%E6%88%90%E3%82%92%E8%80%83%E3%81%88%E3%81%A6%E3%81%BF%E3%82%8B%E3%80%82)
