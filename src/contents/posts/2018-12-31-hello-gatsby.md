---
title: '個人ブログをはてなブログから Gatsby + Firebase Hosting に移行した'
path: '/hello-gatsby'
date: '2018-12-31T20:00:20.000Z'
---

はてなブログで書き続けていた個人ブログを Gatsby に移行して、Google Domain で取得した独自ドメインを使って Firebase Hosting 上で配信している。移行そのものは 11 月には完了していたが、肝心のブログ更新が止まってしまった。せっかくなので、ブログを移行するに至ったモチベーションや、移行に際して考えたことや実行したもろもろをまとめてみようと思う。

## Tl;dr

- 静的サイトジェネレーターには PRPL パターンを採用した爆速表示がウリの Gatsby を採用した
- ブログサイトの配信・運用には、メンテナンスの手間とパフォーマンス面を鑑みて Firebase Hosting および Netlify を採用した
- Netlify の GitHub 連携を利用した記事のプレビューを行い、Circle CI から Firebase Hosting へデプロイしている

## モチベーション

はてなブログをそのまま使い続けるという選択肢もあった。はてな記法という便利フォーマットがあるし、デザインのテンプレートも多いし。ではなぜはてなブログを捨てたかというと、ちょっとしたマンネリ感とか、個人的なアウトプットのネタとして…みたいな些細なものだ。syntax highlight がイマイチなところとか、サイトの表示がなんとなく重いとか、イマイチだった点を挙げようと思えば出てくるけれど、本筋ではないのでここでは省略する。

## 実現したいこと

- ブログ記事の編集に集中できるよう、それ以外の部分のメンテナンスコストをなるべくゼロに近づけること
- 今っぽい技術スタックに触れられること

他社のブログサービスを使わず、わざわざ自分でサイトを作って運用していく以上、配信するサーバのライブラリアップデートとかスケール対応とかセキュリティ対策や HTTPS 対応とか、余計なところで消耗したくなかった。また日々自分がさわっていくプロダクトであるので、使用する技術スタックに愛着を持てるかという点もモチベーション的な意味で前者と同じかそれ以上に重要と考えた。

## 技術スタック

冒頭の通り Gatsby でサイトを生成し、Firebase Hosting 上にデプロイしてサイトを配信しているのだが、Netlify を利用して本番公開前のサイトを事前にチェックしている。ここからは、これらの技術選定に至った背景や実際の運用フローをまとめてみる。

### Gatsby

// TODO: ここに gatsbyjs のキャプチャを貼る

[gatsbyjs/gatsby: Build blazing fast, modern apps and websites with React](https://github.com/gatsbyjs/gatsby)

いわゆる静的サイトジェネレーターのひとつ。 GraphQL を利用して Markdown で書かれたプレーンテキストや WordPress や Drupal など外部の CMS といったデータソースにアクセスし、取得したデータをもとにサイト全体をひとつの React アプリケーションとして生成する。 [PRPL パターン](https://developers.google.com/web/fundamentals/performance/prpl-pattern)を踏襲した設計思想を採用しており、特別なことをしなくても爆速なサイトが容易に作れるのが大きな特徴。

Gatsby のほかにも同じ静的サイトジェネレーターの Hugo や Hexo も候補に入れていたが採用を見送った。所感は以下の通り。

- Hugo
  - Go 製の静的サイトジェネレーター
  - ビルドが鬼のように速く、デザインテンプレートも豊富
  - まわりでも導入している事例をたまに聞く
  - `{{ hogehoge }}` みたいなテンプレートの記法がなじめず導入をやめた
- Hexo
  - Node.js 製の静的サイトジェネレーター
  - Gatsby の使い勝手がよかったのでたいして試さずに導入をやめた

### Firebase Hosting

[Firebase Hosting | 高速で安全なウェブ ホスティング  |  Firebase](https://firebase.google.com/products/hosting/)

// TODO: ここに Firebase Hosting トップページのキャプチャを貼る

Google が提供する mBaaS である Firebase で利用できるフルマネージドホスティングサービス。 HTTPS 対応や CDN 経由による静的アセットの配信がデフォルト対応。もちろん独自ドメインの利用も OK だし、任意のデプロイ時点へのロールバックだってできる。しかも配信するアセットの容量が増えないかぎり基本無料なのもうれしい。

### Netlify

// TODO: Netlify のスクショを貼る

Netlify も Firebase Hosting と同様にフルマネージドホスティングサービスの一種。GitHub リポジトリへの push などをトリガーにした Netlify 上でのビルドおよびデプロイ、ホスティングがほぼ全自動で行えるのが特徴で、さらに特筆すべきはブランチごとにサイトをデプロイしてくれる機能が用意されていて、たとえば「Pull Request を作成したらレビュー環境が立ち上がって、よしなにブラウザで確認できる」という一連の体験がシュッとできあがるのが最高にすばらしい。このブログも Firebase Hosting と Netlify を組み合わせて運用しているが詳細は後述。

## 実際にやったこと

## 所感とまとめ

## 参考 URL

### Gatsby

- React ベースの静的サイトジェネレータ Gatsby の作者、Kyle Mathews 氏との Q&A - https://www.infoq.com/jp/news/2017/07/gatsby-kyle-mathews-interview
- React.js 製の静的サイトジェネレーター Gatsby に移行した - Qiita - https://qiita.com/jaxx2104/items/5f28915355a85d36e38a
- Full React な静的サイトジェネレーターの Gatsby を触ってみた | tmnm.tech - https://tmnm.tech/2017/09/09/try-gatsbyjs
- PRPL パターン実装の具体例調査と比較 - Qiita - https://qiita.com/kimamula/items/4e25b8d2caca314f9dd2
- PRPL Pattern | GatsbyJS - https://www.gatsbyjs.org/docs/prpl-pattern/

### Firebase / Netlify

- Firebase Hosting | Firebase - https://firebase.google.com/docs/hosting/
- ブログのホスティングを Netlify から Firebase Hosting に変更した | 9m のパソコン日記 - https://blog.kksg.net/posts/netlify-to-firebase/

### その他

- 静的サイトを公開するならどこがいいの？ #技術書典 - フロントエンドの地獄 - https://blog.nabettu.com/entry/staticsite
- Serverless Architecture を採用した MF KESSAI Tech Blog について | MF KESSAI TECH BLOG - https://tech.mfkessai.co.jp/2018/05/1/
- 記事作成から公開までを GitHub で完結できる技術ブログ基盤作り - BizReach Tech Blog - https://tech.bizreach.co.jp/posts/49/process-to-build-tech-blog/
- ブログを Gatsby に移行しました - FIVETEESIXONE - https://fiveteesixone.lackland.io/2018/03/31/rebuild-blog-using-gatsby/
- ブログを Gatsby に移行しました - とりあえず動かすところまで | tmnm.tech - https://tmnm.tech/2017/09/10/migrate-to-gatsby/
- React Helmet を使って OGP 対応した - akameco Blog - https://akameco.github.io/blog/react-helmet/
- Google が新たに提唱する Progressive Web Apps の新たな開発パターン「PRPL」とは？ | HTML5Experts.jp - https://html5experts.jp/komasshu/19704/
