---
title: 'ブログサイトの CI ワークフローを整備した'
path: '/improve-ci-workflows'
date: '2020-05-11T20:40:00.000Z'
---

もともと CircleCI 公式のサンプルをもとに circleci.yml を書いてワークフローを作っていたけど、renovate による依存パッケージ更新業の合間でちょっと整備してみた。

## Tl;dr

https://github.com/cheezenaan/blog/pull/516

## caching と workspace を使い分ける

CircleCI 公式のドキュメントを参考に両者を使い分けるようにした。

[Persisting Data in Workflows: When to Use Caching, Artifacts, and Workspaces - CircleCI](https://circleci.com/blog/persisting-data-in-workflows-when-to-use-caching-artifacts-and-workspaces/)

npm や bundle など依存パッケージの管理は cache を利用し、ついでに cache 復元用のキーは単純に yarn.lock の checksum だけを見るようにした。また gatsby build して生成した HTML など静的アセットをよしなにワークフロー間で使い回すよう workspace を利用する。

npm のパッケージ更新がなければ爆速でパッケージのインストールが終わるようになった(22s -> 6s)。

## firebase-tools を npx 経由で利用する

CircleCI からのデプロイでしか使っていなし、パッケージインストールせず、都度 npx から使うようにした。firebase-tools がメジャーバージョンアップ等して実行コマンドに変更があったらそのときに直せば問題ないだろう。

先述の caching と workspace の使い分け見直しとあわせて node_modules を workspace 間で共有する必要がなくなったのも大きなポイント。

## executors や references を使って冗長な部分をまとめる

ref. https://circleci.com/docs/2.0/reusing-config/#executors

キャッシュキーの設定なんかを定数化して利用している。地味に typo しやすい箇所なので、、

## 雑感

まず全体のワークフロー、つぎに個々のジョブ定義が続いていく順序で書いたので、読みやすさは高くなったと思いたい。
