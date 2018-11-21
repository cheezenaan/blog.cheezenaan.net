---
title: Tachikoma.io でライブラリ依存関係を自動チェックさせてみた
Category:
  - Bundler
  - Ruby
  - Rails
date: 2018-06-04T09:09:36+09:00
path: /introduce-tachikomaio
---

## はじめに

- [素振り用の Rails 開発環境](https://github.com/cheezenaan-sandbox/sample_app_rev4)で、 Gemfile の脆弱性アラートが出現していた
- とはいえ手動で `bundle update` する仕事つらい
- `tachikoma.io` を使うと自動で依存関係をチェックして差分があれば PR を作成してくれるらしいので入れてみる(イマココ

## Tachikoma.io を入れてみる

[http://tachikoma.io/:embed]

> Tachikoma.io がライブラリ依存地獄を取り除いてくれます。あなたがやりたいのは依存のアップデートですか?アプリケーションを書くことですか?

> Tachikoma.io のできることは Tachikoma.io に任せて、あなたはあなたのやりたいことをやろう。

なにこれ素敵…！ということで即導入。GitHub 連携して、適用したいリポジトリにチェックを入れるだけ。3 分クッキングよりもかんたん。

## 設定ファイルを追加する

[Configuration - Tachikoma.io](http://tachikoma.io/configuration.html)

Rails アプリケーションに Tachikoma.io を使用したい場合は、明示的にストラテジーを `bundler` にしてやる必要がある。

ルートディレクトリに `.tachikoma.yml` を置いて、

```yaml
# .tachikoma.yml
strategy: 'bundler'
```

あるいはターミナル上から ↓ の command を叩く。

```bash
# Download setting about strategy for bundler
$ curl -O http://tachikoma.io/example/bundler/.tachikoma.yml
```

## 使用例

[https://github.com/cheezenaan-sandbox/sample_app_rev4/pull/38:embed]

こんなぐあいに PR を作成してくれる。CI が通っていれば即 master にマージ。所要時間 n 分。優しい世界。
