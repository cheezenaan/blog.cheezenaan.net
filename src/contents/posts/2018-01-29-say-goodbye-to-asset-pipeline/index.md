---
title: JavaScript だけでなくスタイルシートと画像ファイルも webpack 管理下に置いて、 Asset Pipeline から完全にサヨナラした
tags:
  [
    'ぼくがかんがえたさいきょうの Rails チュートリアル',
    'JavaScript',
    'Docker',
    'Heroku',
  ]

date: 2018-01-29T10:15:04+09:00
path: /say-boodbye-to-asset-pipeline
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Rails チュートリアルのサンプルアプリから app/assets/ 以下を完全に葬り去ることに成功した</p>&mdash; cheezenaan🍺🙅 (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/957509562902364161?ref_src=twsrc%5Etfw">2018年1月28日</a></blockquote>

よくある Rails アプリケーションから JavaScript のビルドを webpack に移譲した前回に続いて、今回はスタイルシートや画像ファイルといった静的アセットもすべて webpack の管理下に置くことにした。これによりフロントエンド管理を Rails が提供する Asset Pipeline のしくみから webpack に完全移行できた(と思っている)。

これまでのあらすじは以下のリンクから。

[https://blog.cheezenaan.net/rails-with-webpack-on-docker]

## Tl;dr

[Build stylesheets through webpack by cheezenaan · Pull Request #18 · cheezenaan-sandbox/sample_app_rev4](https://github.com/cheezenaan-sandbox/sample_app_rev4/pull/18)

例に漏れず Pull Request を作成しているので、物好きな人はコミットを追ってたらいいと思う。

## 構成

```
~/s/g/c/c/sample_app_rev4 » tree frontend -I node_modules
frontend
├── config
│   └── webpack.config.js
├── package.json
├── postcss.config.js
├── src
│   ├── images
│   │   └── rails.png
│   ├── javascripts
│   │   └── application
│   │       ├── Hello.js
│   │       └── index.js
│   └── stylesheets
│       ├── _common.scss
│       ├── _footer.scss
│       ├── _header.scss
│       ├── _mixin.scss
│       └── application.scss
├── yarn-error.log
└── yarn.lock

6 directories, 13 files
```

## スタイルシートのバンドル

```
$ docker-compose exec node yarn add -D node-sass style-loader css-loader sass-loader postcss-loader autoprefixer extract-text-webpack-plugin
```

webpack で sass を扱えるようにした。スタイルシート関連の loader が乱立しており当初は混乱したけど、以下の URL が理解の助けに役立った。

[Webpack って CSS 周りの Loader がいっぱいあって分かりにくいので整理してみる - Qiita](https://qiita.com/shuntksh/items/bb5cbea40a343e2e791a)

css-loader は CSS 間の依存関係解決、 sass-loader や postcss-loader は CSS へのコンパイルを行っている。style-loader はバンドル時に CSS の内容を style タグとして出力するのだけど、extract-text-webpack-plugin を使うと style タグに出力する内容を別途 CSS ファイルとして生成できる。あと autoprefixer がコンパイル時にベンダープレフィックスを自動で追加してくれるので控えめに言って最高。

## bootstrap-sass を webpack で管理する

```
$ docker-compose exec node yarn add bootstrap-sass
```

bootstrap-sass を webpack で管理する。

```sass
// frontend/src/stylesheets/index.scss
@charset "utf-8";

// ...
@import './_mixin.scss';

// ...
```

```sass
// frontend/src/stylesheets/_mixin.scss
@charset "utf-8";

@import '~bootstrap-sass/assets/stylesheets/bootstrap-sprockets';
@import '~bootstrap-sass/assets/stylesheets/bootstrap';

$gray-medium-light: #eaeaea;
```

`bootstrap-sprockets` からにじみ出てくる投げやり感。。

## 画像ファイルのバンドル

```
$ docker-compose exec node yarn add -D file-loader
```

file-loader 導入にあたりファイルの出力場所や 読み込み先の設定で躓いたのだが、以下のページが大変参考になった。

[file-loader で画像を扱うときのパス指定 - Qiita](https://qiita.com/tomi_shinwatec/items/ef66a60950939618c449)

## エントリーポイントの整理

Rails 側で使用するテンプレートファイルの構造とバンドルファイルの関係を揃えてみた。たとえば、`app/views/static_pages/home` で使用するアセット群は、`public/assets/frontend/static_pages/home` という名前のエントリーポイントでバンドルして、

```app/views/layouts/application.html.erb
# app/views/layouts/application.html.erb
<%= stylesheet_link_tag frontend_asset_path("layouts/application.css"), media: 'all' %>
```

```app/views/static_pages/home.html.erb
# app/views/static_pages/home.html.erb
<%= javascript_include_tag frontend_asset_path("static_pages/home.js) %>
```

という具合で呼び出す。画像ファイルを Rails の `image_tag` で読み込むためだけに `javascript_include_tag` しているのが残念ポイントではある。

## Asset Pipeline とサヨナラする

[アセットパイプライン | Rails ガイド](https://railsguides.jp/asset_pipeline.html) を参考に、 sass-rails と uglifer, coffee-rails を Gemfile から消し去る。ここまでの作業で `app/assets` 以下は完全に不要になるので、

```
$ rm -rf app/assets
```

で削除。これで Asset Pipeline のない世界線に到達できた。

## 参考: webpack.config.js

<script src="https://gist.github.com/cheezenaan/29ecd3d21ddc8be478b11f6b7a0f5aa9.js"></script>

そこまでごちゃごちゃカオスになっていない…はず。

## おまけ: Heroku デプロイ時に node でフロントエンドビルドを走らせる

[sprockets ではなく nodejs を使う Rails アプリを Heroku にデプロイする方法 - Qiita](https://qiita.com/yuku_t/items/8fd7551dc0418bf59aae)

以下 2(+1) つの準備が必要。

- Heroku Buildpack for Node.js を導入する
- ルートディレクトリにある `package.json` を編集する
- `bin/yarn` を削除する

### Heroku Buildpack for Node.js を導入する

`package.json` に記載されてる `devDependencies` のパッケージ群もインストールしてほしいので、`NPM_CONFIG_PRODUCTION` の環境変数をいじる。

```
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku config:set NPM_CONFIG_PRODUCTION=false
```

### ルートディレクトリにある `package.json` を編集する

Heroku はルートディレクトリの `package.json` を認識して自動でビルドを走らせてくれるので、最低限必要な設定を追記する。

まずは `engines` に node と yarn のバージョンを記載する(記載しないとエラーで落ちる)。

```javascript
// package.json
{
  "engines": {
    "yarn": "1.3.2",
    "node": "9.4.0"
  },
}
```

`scripts` の `postinstall` に定義した内容を Heroku が実行してくれる。`--prefix` オプションをつけることでビルド時の起点となるディレクトリを設定できる。意外と地味に便利。

```javascript
// package.json
{
  "scripts": {
    "postinstall":
      "npm install --prefix frontend && npm run release --prefix frontend"
  },
}
```

### `bin/yarn` を削除して `assets:precompile` へのフックを消す

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">例の 5.1.x 系からなのか rake assets:precompile にフックして yarn:install 的な何かが毎回走ってうざかったのだけど bin/yarn を抹消したら解決した(これでいいのか…？</p>&mdash; cheezenaan🍺🙅 (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/957761916625043456?ref_src=twsrc%5Etfw">2018年1月28日</a></blockquote>

いつからか Rails で `rake assets:precompile` を叩く際に `rake yarn:install` もセットで走るようになった。 Heroku デプロイ時に node 側でビルド → Rails の
`assets:precompile` と 2 回ビルドが走るようになってしまい完全に「余計なお世話」である。`bin/yarn` を消し去ることで `assets:precompile` へのフックもなくなった。

ref. https://github.com/rails/rails/blob/master/railties/lib/rails/tasks/yarn.rake#L3-L8

## 所感

「手段の目的化」が若干否めなかったが、多少なりとも webpack とは仲良くなれたと思っている。世間やネットの情報が言うほど設定ファイルがカオスになるわけではなかったし、あの膨大なプラグインや設定にも意味があることが理解できたのが収穫。なによりフロントエンドの依存管理を Rails(Asset Pipeline)から切り離せたので、もし仮にこの先 webpack に次ぐ新たなツールが現れたとしても Rails 側への影響を抑えて乗り換えられるようになったし、もっというとサーバサイドの開発言語を Rails 以外にスイッチしたり API / クライアントの分離…という選択肢も見えてきた。

webpacker は…機会があったらまた別にさわろう。
