---
title: 'TypeScript に期待しすぎる前に胸に手を当てて考えること'
path: '/think-before-migrating-typescript'
date: '2019-01-10T01:30:00.000Z'
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">テストコードを書いたからと言って即プロダクトの品質が上がるわけないのと同様に、 JavaScript で書かれたコードベースを TypeScript に移行しただけで即品質が上がるかというとまぁそうじゃないので、それ以前のところからシュクシュクとやっていこうね…という気持ちです。</p>&mdash; 北宇治高校の壁のシミ (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/1083001561435930624?ref_src=twsrc%5Etfw">2019年1月9日</a></blockquote>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">自動テストも静的型付けによるチェックも、ｶﾞ−ｯと書いたコードのフィードバックを手っ取り早く得るための効率的な手段という側面では共通していると思ってて、それが実際にプロダクトコードの設計改善につながっていくと、ちょっとだけだけど気分がよくなってしまうアレです</p>&mdash; 北宇治高校の壁のシミ (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/1083004335338868737?ref_src=twsrc%5Etfw">2019年1月9日</a></blockquote>

意識高い系なことをﾂｲｰﾖした勢いで、最近思うことを深夜のノリで書きなぐってみる。

## おことわり

- TypeScript の仕様に関する話とか、JavaScript から TypeScript への移行話とか、具体的なサンプルコードは一切出てきません

## Tl;dr

- TypeScript をはじめとした静的型付け言語は自動テストと同じで「導入すれば即プロダクトの品質が上がる」というものではない
- 「プロダクトの品質を上げる = プロダクトコードの設計を改善する」ことは型のあるなし関係なく、世に出回っている原理原則に基づいて行える
- オブジェクトの構造や振る舞いに型をつけていく過程で、よりよい設計にしていくためのリトマス紙として活用する…くらいのスタンスで TypeScript に接していきたい

## たとえばこういう話

※この物語はフィクションです

- とある JavaScript プロジェクトの `*.js` ファイルの拡張子を `*.ts` に変えて型をつけはじめていくと、なんだか型をつけづらいオブジェクトが発生した
- コードベースを追っていくと、とある処理をする際に複数オブジェクト間で互いのことを参照していたりで、依存関係が必要以上に絡みあっていた
  - イメージとしては[この図](https://speakerdeck.com/joker1007/number-ginzarb?slide=14)みたいなやつ
- 単体テストのコードも存在していたが、テストを回すためのダミーオブジェクトがちょくちょく出てきて、怪しそうな雰囲気が出ていた
- オブジェクト間の依存関係がなるべく単方向になるように、それぞれの責務を意識しながら分割しなおして、テストコードも都度修正した
- 型をつけづらかったオブジェクトもスッキリしてテストしやすくなったし、最終的により具体的で洗練された型をつけられるようになった

## 参考

- [Real world es201x and future - Speaker Deck](https://speakerdeck.com/mizchi/real-world-es201x-and-future)
- [動的型とか静的型の話の前に「作者の気持ち」を考えろ - mizchi log](http://d.hatena.ne.jp/mizchi/20130303/1362286050)
- [なぜ TypeScript に失望してしまうのか - Islands in the byte stream](https://gfx.hatenablog.com/entry/2019/01/05/092311)
- [組織にテストを書く文化を根付かせる戦略と戦術 / Strategy and Tactics of Building Automated Testing Culture into Organization - Speaker Deck](https://speakerdeck.com/twada/strategy-and-tactics-of-building-automated-testing-culture-into-organization?slide=36)
- [変更に強いアーキテクチャについて IT 業界 19 年目の僕が超ザックリ説明する - Qiita](https://qiita.com/lobin-z0x50/items/39131a4f47ed7c5df443)
