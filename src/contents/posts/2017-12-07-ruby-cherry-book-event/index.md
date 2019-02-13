---
title: 『プロを目指す人のための Ruby 入門』出版記念イベント&リファクタリングコンテストに行ってきた
date: '2017-12-07T00:31:09+09:00'
path: /ruby-cherry-book-event
---

まぁタイトルのとおりなんですが、行ってよかったです(KONAMI

[【Rails Developers Meetup 特別編】『プロを目指す人のための Ruby 入門』出版記念イベント&リファクタリングコンテスト｜ IT 勉強会なら TECH PLAY［テックプレイ］](https://techplay.jp/event/647072)

今日のイベントはざっくり、

- 書籍『プロを目指す人のための Ruby 入門』(通称「チェリー本」)の紹介
- jnchito 氏による講演: 「わかりやすい技術記事を書くための心構えとテクニック」
- 公開リファクタリングコンテスト

の 3 本立て。当日のやりとりは twitter のハッシュタグ [#railsdm](https://twitter.com/hashtag/railsdm) を追いかけるのがよいかと。

## 『プロを目指す人のための Ruby 入門』

パラパラとまえがきと目次を読み、本文をつまみ食いしながら読んでみて、「1 年前に出会いたかった！！！！！！111」というのが率直な感想。自分はサーバサイド言語を PHP ではじめて、Ruby をさわるようになったのは今の会社に移ってから。これまでどうやって Ruby を習得してきたんだっけと振り返ってみると、

- ドットインストールをなめて雰囲気を掴んで、
- Rails チュートリアルを 2 周くらいやりきって、
- 業務で Ruby を触るようになってからは、Qiita の記事や技術ブログから雑多で断片的な知識を吸収しつつ、
- 『パーフェクト Ruby』を読んで体系的に知識を整理しようとするも、メタプログラミングの章で挫折する
- あとは日々のコードレビューで指摘をもらいながら 1 つずつ少しずつ自分のものにしていった
  - 振り返るとこれが大きいかなあ

「『パーフェクト Ruby』や『Effective Ruby』よりももう少し敷居が低くて、ふだんの Rails 開発に活かせるな本があればなあ」と頭を抱えていた自分にまさにベストマッチで、ありがたや…という言葉しかない。

[プロを目指す人のための Ruby 入門 言語仕様からテスト駆動開発・デバッグ技法まで：書籍案内｜技術評論社](http://gihyo.jp/book/2017/978-4-7741-9397-7)

## 「わかりやすい技術記事を書くための心構えとテクニック」

もともとは`「ぼくのかんがえたさいきょうのRubyにゅうもんしょ」～初心者のスキルアップのために技術書は何ができるか～`というテーマだったが、`「わかりやすい技術記事を書くための心構えとテクニック」` に変更。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">「わかりやすい技術記事を書くための心構えとテクニック」、これアドベントカレンダーを書く前に知りたかったやつや… <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a></p>&mdash; cheezenaan🍺 (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/938361401436913665?ref_src=twsrc%5Etfw">2017年12月6日</a></blockquote>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">わかりやすい記事のコツ　1.読者の視点に立つ 2.自分の言葉で書く　3. メリットを提示する 4. 具体例を出す  <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a></p>&mdash; 🦇 (@mikiso) <a href="https://twitter.com/mikiso/status/938361664566583298?ref_src=twsrc%5Etfw">2017年12月6日</a></blockquote>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">技術の「おいしさ」(=おもしろさ、楽しさ、すごさ、便利さ)を読み手に伝える、利用シーンをイメージしてもらう。圧倒的&quot;&quot;それな&quot;&quot;感しかない <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a></p>&mdash; cheezenaan🍺 (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/938362827395366912?ref_src=twsrc%5Etfw">2017年12月6日</a></blockquote>

あとは今の時代における技術書のあり方論、みたいな話もちらほら。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">【体系だった知識】ネットの情報=つまみ食いの繰り返し / 技術書=一流レストランのフルコース　著者の膨大な経験と知識(5年くらいの）を3000 円はやすい。ググっても出て来ない情報が多いほど本の価値は高い <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a></p>&mdash; 🦇 (@mikiso) <a href="https://twitter.com/mikiso/status/938364904435679232?ref_src=twsrc%5Etfw">2017年12月6日</a></blockquote>

## リファクタリングコンテスト

[JunichiIto/ruby-problem-201712: A small Ruby problem for Rails developers meetup December 2017.](https://github.com/JunichiIto/ruby-problem-201712)

[前にも同様の試みをやっていた](http://blog.jnito.com/entry/2017/08/26/090024)のは twitter のタイムラインで追って知っていたけど、実際に参加するのは今回がはじめて。

とりあえずお題のプロダクションコードとテストコードを初見で読んだ際のメモがこれ。

```
## テストコード

- minitest さわるの、Railsチュートリアル以来だなあ(小声
- にしてもテストケース読みづらい
- 「ドキュメントとしてのテスト」として書く視点を持つといいかもしれない
  - ex. メソッドを使う側の人間が `\n` とか意識するか？
- たとえば
  - 1 2 3
    4 5 6
    7 8 9
  - を Ruby で書けないか？と考える
    - たしか <~~ でいけたような

## プロダクションコード

- Ruby 本来が持っている仕様を調べるクセをもつといい
  - 誰かがやりたいと思っていることは、きっと他の誰かも考えている
  - それが例えば gem で実現されていることもあれば、 Ruby 標準のライブラリで実現していることもある
```

メモをもとに自分が出したプルリクエストはこれ。

[Refactor `transport` method by @cheezenaan by cheezenaan · Pull Request #22 · JunichiIto/ruby-problem-201712](https://github.com/JunichiIto/ruby-problem-201712/pull/22)

ふだん業務で交わしてるやりとりを思い出しつつやってみたものの、どこまで前提条件に踏み込んでいいのかとかコメントのレベル感どうするか？とか、実際のコードリファクタリング以外で考えるポイントが多かった…[^1]。
[^1]: たとえば「そもそもなんで転置行列なんだ？」とか、「このメソッドはプロジェクト内でどんな役割を果たすのか？」…とか、そのへんの話

## 所感

- 生 jnchito さんは見た目通りに気さくな方だった
- リファクタリングコンテストは社内でもやってみたい。モブプロとかとあわせてワイワイやるのがいいかも
- 会場を提供いただいた Speee さん、ラウンジがおしゃれすぎて息を吸うのも心苦しかった

## 戦果

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の戦果です <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a> <a href="https://t.co/nW6tdETZgs">pic.twitter.com/nW6tdETZgs</a></p>&mdash; cheezenaan🍺 (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/938396723159773184?ref_src=twsrc%5Etfw">2017年12月6日</a></blockquote>
