---
title: Rails on Docker な開発環境からモダン JavaScript のビルド環境をコンテナごと独立させてみた
path: /rails-with-webpack-on-docker
date: 2018-01-22T21:45:20+09:00
tags:
  ['ぼくがかんがえたさいきょうの Rails チュートリアル', 'Docker', 'JavaScript']
---

Rails チュートリアルのサンプルアプリを題材に自分だけの Rails on Docker な開発環境を作ることが、最近のマイブームになりつつある。

[cheezenaan-sandbox/sample_app_rev4: Sample application forked from https://railstutorial.jp/](https://github.com/cheezenaan-sandbox/sample_app_rev4)

もともと Rails チュートリアル自体はこの 1〜2 年で 3 周前後していたのだけど、ただ繰り返すだけなのもまぁ飽きるので、自分なりに工夫を入れることが多くなった。書きはじめると長くなるけど、例えばこんなかんじ:

- 実行環境を Docker Compose で作成して、 `docker-compose up` のコマンド一発で開発環境が整うようにした
- [現行チュートリアルの最新第 4 版](https://railstutorial.jp/)ではテスティングフレームワークに minitest を使用しているところを、自分なりに RSpec で書き直した
  - E2E テストで使用する Headless Chrome の動作環境は Rails アプリ用のコンテナには追加せず、[専用の selenium コンテナ](https://hub.docker.com/r/selenium/standalone-chrome-debug/)で管理するようにした
- [Travis CI](https://travis-ci.org/cheezenaan-sandbox/sample_app_rev4) を導入して、プルリクエストが走るごとに自動ビルドをさせるようにした
  - (完全に余談だけどあのバッジが GitHub のリポジトリに出ているとちょっと嬉しい)
- フロントエンドのビルドに専用の node コンテナを構築して、 webpack(≠ webpacker) で生成したファイルを Rails 側で読み込めるようにした ← イマココ

今回は、最後の項目について少しだけまとめることにしてみる。

## Tl;dr

[Build JavaScripts assets through webpack by cheezenaan · Pull Request #17 · cheezenaan-sandbox/sample_app_rev4](https://github.com/cheezenaan-sandbox/sample_app_rev4/pull/17)

↑ の URL からコミットを追っていくのがいいと思う。ハイライトは以下の通り。

- Rails 5.1 系から標準搭載された webpacker は未採用
- webpack(with babel-loader) を使用して ES2015 をトランスパイル & ビルド
- webpack-manifest-plugin で生成した manifest ファイルを `javascript_include_tag` で読み込めるよう専用のヘルパーを用意

## 構成

`frontend` ディレクトリをルートに掘ってまとめて管理している。

```bash
$ tree frontend -I node_modules
frontend
├── config
│   └── webpack.config.js
├── package.json
├── src
│   ├── images
│   ├── javascripts
│   │   └── application
│   │       ├── Hello.js
│   │       └── index.js
│   └── stylesheets
└── yarn.lock

6 directories, 5 files
```

## webpack による JavaScript のビルド

ビルドした生成物は `./public/assets` 以下に配置する。なお開発環境では `webpack-dev-server` を使用するので具体的な生成物がないことに注意。

```js
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglify-js-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const fileName = isProduction ? '[name]_[hash]' : '[name]';
const pathForAssets = path.resolve(__dirname, '../../public/assets');

const Manifest = new ManifestPlugin({ fileName: 'webpack-manifest.json' });
const UglifyJS = new UglifyJSPlugin({
  parallel: 4,
  sourceMap: !isProduction,
  warnings: false,
});

const plugins = [Manifest];
const pluginsForProudction = plugins.concat(UglifyJS);

module.exports = {
  entry: {
    'frontend/application': ['./src/javascripts/application/index.js'],
  },
  output: {
    filename: `${fileName}.js`,
    path: pathForAssets,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: isProduction ? pluginsForProudction : plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: isProduction ? {} : { contentBase: pathForAssets },
  devtool: isProduction ? 'eval' : 'cheap-module-source-map',
};
```

ちなみに package.json の `scripts` はこんな具合。

```json
{
  // ...
  "scripts": {
    "build": "webpack --config ./config/webpack.config.js",
    "clean": "rimraf '../public/assets/frontend/**/*.{js,css}'",
    "format": "prettier --write 'src/**/*.{js,css}'",
    "lint": "eslint src",
    "publish": "yarn clean && NODE_ENV=production yarn build",
    "watch": "webpack-dev-server --config ./config/webpack.config.js --host 0.0.0.0 --port 4000 --colors --inline --progress"
  }
}
```

## ビルドした JavaScript を Rails で読み込む

webpack-manifest-plugin を導入することで、 webpack でビルドした生成物のマッピングが記された manifest ファイルを作成してくれる。

[danethurber/webpack-manifest-plugin: webpack plugin for generating asset manifests](https://github.com/danethurber/webpack-manifest-plugin)

このファイルを用いて Rails に JavaScript を読み込ませる。やることは 2 つ。

- manifest ファイルを Rails に読み込ませる
- 読み込ませた manifest ファイルを使って JavaScript のパス解決を行う

### manifest ファイルを Rails に読み込ませる

`config/initializers/assets.rb` なるファイルがデフォルトで存在しているので、こちらに追記する。

```ruby
# config/initializers/assets.rb

manifest = Rails.root.join("public", "assets", "webpack-manifest.json")
Rails.application.config.assets_manifest = JSON.parse(File.read(manifest)) if File.exist?(manifest)
```

### manifest ファイルをもとに JavaScript のパス解決を行う

`Rails.application.config.assets_manifest` を呼ぶことで manifest ファイルの情報を JSON 形式で読み込めるので、あとはいいかんじにヘルパーを書いてやればいい。

```ruby
module ApplicationHelper

  # ...

  def frontend_asset_path(path)
    return "http://0.0.0.0:4000/#{path}" if Rails.env.development?

    routes = Rails.application.routes.url_helpers
    host = Rails.application.config.action_controller.asset_host || routes.root_path
    manifest = Rails.application.config.assets_manifest
    return unless manifest.fetch(path, false)

    Pathname.new(host).join("assets", manifest[path])
  end
end
```

先述の通り開発環境では webpack-dev-server を使いたいので、ちょっとかっこ悪いけど分岐を入れている。

あとは View のファイル内で

```
<%= javascript_include_tag 'application', frontend_asset_path("frontend/application.js") %>
```

のように呼べば終了。`rake assets:precompile` のない世界線へようこそ。

## E2E テストの対応

躓いたのが RSpec などのテスティングフレームワークによる E2E テストの実施。デフォルトでは `RAILS_ENV=TEST` で実行されるため、 webpack でビルドした生成物が存在しない場合ファイル不在で落ちてしまう。いまはテスト実行前に手動で `yarn build` してからテストを回すようにしているけれど、なかなかに面倒なので早くこの手間をなくしたい。

## How to Dockerize

ここでやっとタイトルを回収するわけなんだけど、今回は Rails アプリを動かす `app` コンテナから独立して webpack によるビルドを実行する `node` コンテナを用意した。たしかに `Procfile` を使えば 1 コンテナ内で複数のプロセスを管理できるみたいだけど、まずは「1 コンテナ 1 プロセス」という基本(出所不明)に沿ってやることにした。

```/bin/sh
$ tree docker
docker
├── node
│   └── Dockerfile.dev
└── rails
    ├── Dockerfile.dev
    └── Dockerfile.test
```

Dockerfile はサービスごとにディレクトリを掘った。補足をしておくと Rails アプリの開発時は `bundle install` するたびに `docker build` したくないので、 `.dev` ではボリュームをマウントするだけにして `docker-compose exec app bundle install -j4` と叩んでコンテナにつど反映させている。

```yaml
# docker-compose.yml
version: '3'
volumes:
  app_data:
  db_data:
  node_modules:
services:
  # ...
  app: &app_base # ...


  node:
    container_name: node
    build:
      context: .
      dockerfile: ./docker/node/Dockerfile.dev
    command: yarn watch
    ports:
      - 4000:4000
    volumes:
      - ./frontend/:/app/frontend:cached
      - ./frontend/node_modules:/app/frontend/node_modules:cached
      - ./public/assets/:/app/public/assets:cached
  # ...
```

Rails アプリが動く app コンテナの `public/assets` にビルド結果の生成物を置きたいので `./public/assets/:/app/public/assets` のようにボリュームをマウントしてやる。

## 次にやりたい

ここまでで JavaScript の管理は Webpack でできるようになったので、次は順当にスタイルシート(scss, css)でも webpack で管理できるようにしていきたい。まずはチュートリアル 5 章までで作成したスタイルシートを `frontend/src/stylesheets` に移すところから。

## 参考

- [Sprockets 再考 モダンな JS のエコシステムと Rails のより良い関係を探す - Qiita](https://qiita.com/joker1007/items/9068e223744b3ac8c6dd)
- [webpack で作る Sprockets 無しのフロントエンド開発 - クラウドワークス エンジニアブログ](http://engineer.crowdworks.jp/entry/2016/05/24/174511)
- [webpack を使った Rails 上での React 開発 - クックパッド開発者ブログ](http://techlife.cookpad.com/entry/2016/07/27/101015)
- [webpack で Rails アプリのアセットをビルドする | Money Forward Engineers' Blog](https://moneyforward.com/engineers_blog/2017/03/28/webpack-rails/)
- [Webpacker を使わずに webpack で頑張る - Qiita](https://qiita.com/yszk0123/items/95f4f08a255cf029fca8)
- [Rails フロントエンド技術の今とこれから - Hack Your Design!](http://blog.toshimaru.net/rails-frontend/)
