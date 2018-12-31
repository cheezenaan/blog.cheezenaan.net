---
title: '個人ブログをはてなブログから Gatsby + Firebase Hosting に移行した'
path: '/hello-gatsby'
date: '2018-12-31T20:00:20.000Z'
---

はてなブログで書き続けていた個人ブログを Gatsby + Firebase Hosting に移行した。移行そのものは 11 月には完了していたがそれっきりで、肝心のブログ更新が止まってしまった。せっかくなので、ブログを移行するに至ったモチベーションや、移行に際して考えたことや実行したもろもろをまとめてみようと思う。

## Tl;dr

- 静的サイトジェネレーターには PRPL パターンを採用した爆速表示がウリの Gatsby を採用した
- ブログサイトの配信・運用には、メンテナンスの手間とパフォーマンス面を鑑みて Firebase Hosting および Netlify を採用した
- Netlify の GitHub 連携を利用した記事のプレビューを行い、Circle CI を使って Firebase Hosting へのプロダクションデプロイを行っている

## モチベーション

はてなブログをそのまま使い続けるという選択肢もあった。はてな記法という便利フォーマットがあるし、デザインのテンプレートも多いし。ではなぜはてなブログを捨てたかというと、ちょっとしたマンネリ感とか、個人的なアウトプットのネタとして…みたいな些細なものだ。syntax highlight がイマイチなところとか、サイトの表示がなんとなく重いとか、イマイチだった点を挙げようと思えば出てくるけれど、本筋ではないのでここでは省略する。

## 技術スタック

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
