---
title: TypeScript + Webpack4 な素振り環境を作った
Category:
  - JavaScript
  - TypeScript
  - Webpack
  - Docker
date: 2018-06-11T07:08:43+09:00
path: /typescript-webpack4
---

今さらながら TypeScript で静的型付けに入門したくなったので、サクッと素振り環境を作ってみた。

## Tl;dr

[https://github.com/cheezenaan-sandbox/frontend_boilerplate:embed]

```zsh
docker-compose run --rm yarn install
docker-compose up
```

## ゴール

- ローカル PC に依存せずに TypeScript を書いてコンパイルできる環境を作る
  - node のバージョン違いで `yarn install` 落ちたりつらい
  - `yarn` コマンドも Docker コンテナ上で叩く(Mac 上で Docker 動かすと I/O 遅くてつらいけど)

## Webpack 4

```sh
docker-compose run --rm node yarn add -D webpack webpack-cli webpack-serve
```

`webpack-dev-server` の後継らしい `webpack-serve` を導入してみた。

TypeScript さえビルドできればいいので余計な Loader とかプラグインを入れてないからかもしれないけど [`webpack.config.js`](https://github.com/cheezenaan-sandbox/frontend_boilerplate/blob/master/config/webpack.config.js) がわりとスッキリしていてよい。

## Introduce TypeScript

```sh
docker-compose run --rm node yarn add -D typescript ts-loader
docker-compose run --rm yarn tsc --init
```

生成された `tsconfig.json` で `Strict Type-Checking Options` と `Additional Checks` をすべて有効にしておく。

## Introduce Linter / Formatter

TSLint を使うか ESLint に TypeScript のパーサーを突っ込んで使うか選択肢があるらしいんだけど、 ESLint のほうが設定できるルールが多いらしいので後者を採用(要調査)。

Vue.js 向けの ESLint プラグインを公式が用意しているのも、なにげに評価高い。

[https://github.com/vuejs/roadmap#eslint-plugin-vue:embed]

### ESLint

```sh
docker run --rm node add -D eslint eslint-conifig-airbnb-base eslint-plugin-import typescript-eslint-parser eslint-plugin-typescript
```

React(JSX) 抜きで普遍的に使える構成にしたかったので `eslint-config-airbnb` ではなく `eslint-config-airbnb-base` を導入した。
`eslint-plugin-typescript` はおまけ。

### Prettier

```sh
docker run --rm node add -D prettier eslint-config-prettier eslint-plugin-prettier
```

問答無用で入れる。 ESLint と併存させるとより幸せになれる。

- `eslint-config-prettier` は ESLint 上で Prettier と競合するフォーマット関連のルールを無効にしてくれる
- `eslint-plugin-prettier` は Prettier のルールを ESLint が読み込んで、 ESLint 上で Prettier を実行してくれる

### .eslintrc

```json
// .eslintrc
{
  "env": {
    "browser": true
  },
  "extends": ["airbnb-base", "plugin:prettier/recommended"],
  "parser": "typescript-eslint-parser",
  "plugins": ["typescript", "prettier"],
  "rules": {
    "no-undef": "off",
    "no-unused-vars": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": "error"
  }
}
```

`prettier` 以外に `rules` に追加しているのは以下:

- `"no-undef"`: `typescript-eslint-parser` で未対応なので無効化
- `"import/extensions"`, `"import/no-unresolved"`: `import` するときに `.ts` および `.tsx` を解釈してくれないので無効化
- `"import/prefer-default-export"`: 1 ファイルで 1 つだけ `export const` するときに不便なので消した

## 参考

- [TypeScript の型入門 - Qiita](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)
- [TypeScript の Lint - hokaccha hamalog v3](https://hokaccha.hatenablog.com/entry/2018/01/23/232625)
- [ESLint(あるいは TSLint)と Prettier を併用する - ひと夏の技術](http://tech-1natsu.hatenablog.com/entry/2018/01/07/154941)
- [ESLint 導入環境に prettier を追加して運用する - Kenta Katoh's Blog](https://www.kken.io/posts/prettier-eslint/)
- [Prettier 入門 ～ ESLint との違いを理解して併用する～ - Qiita](https://qiita.com/soarflat/items/06377f3b96964964a65d)
- [Prettier vs. Linters · Prettier](https://prettier.io/docs/en/comparison.html)
