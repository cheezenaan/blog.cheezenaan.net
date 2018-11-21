---
title: Markdown エディタとして Atom を使えるようにするまでにやったこと
date: 2017-01-22T10:30:00+09:00
path: /atom-as-markdown-editor
---

標題の通り。Atom を導入するまでにやったことの備忘録。

# 事前準備

すでにインストールしていた場合は、いちど消しておく。

```sh
rm -rf ~/.atom
rm /usr/local/bin/atom
rm /usr/local/bin/apm
rm ~/Library/Preferences/com.github.atom.plist
rm ~/Library/Application Support/com.github.atom.ShipIt
rm -rf ~/Library/Application Support/Atom/
```

# Homebrew からインストール

```sh
brew cask install atom
```

# パッケージインストール

ターミナル上から

```sh
apm install [packege-name]
```

と入力するとインストールできる。

さらに、パッケージ名の一覧が書かれたテキストファイル(package_hoge.txt)を指定して

```sh
apm install --package-file package_hoge.txt
```

で一括インストールができて非常にラク。

## sync-settings 導入

Atom の設定(パッケージやキーマップ等)を gist にアップロードして他の PC と同期できる。
GitHub のアクセストークンと gist id が必要なので別途取得すること。

## カラースキーマ

Vim や tmux でも使えるカラースキーマ、Nord 一択。かっこよさは正義。
[https://github.com/arcticicestudio/nord:embed]

```sh
apm install nord-atom-ui
apm install nord-atom-syntax
```

## フォント

Ricty かわいいよ Ricty。

## 全般

- atom-beautify
- project-manager
- vim-mode
- terminal-plus
- file-icons
- minimap
- advanced-open-file

advanced-open-file は、`cmd + opt + o` でファイル名指定して開ける。ファイルが存在しない場合は指定した名前で新規作成してくれるのが便利。よくある「 `cmd + n` して `cmd + s` してファイル名入れて保存…」という 3 ステップが 1 ステップに短縮。

## Markdown 支援

- markdown-writer
- markdown-scroll-sync
- markdown-preview-opener
- tool-bar-markdown-writer
- tool-bar

[markdown-writer](https://atom.io/packages/markdown-writer) は Markdown 記法の入力支援パッケージ。
便利なキーバインドをよしなに追加してくれる機能があるので、以下の手順で有効化する。

1. `cmd + shift + p` で コマンドパレット開いて、
2. `Markdown Writer: Create Default Keymaps` を選択
3. `keymap.cson` にキーバインドが追加される

[https://atom.io/packages/markdown-writer:embed]

## おまけ: インストールしたパッケージの一覧を出力する

前述したパッケージの一括インストール(`apm install --package-file [package-file.txt]`)に使える形式で出力できる。

```sh
\$ apm list -ib
advanced-open-file@0.16.5
atom-beautify@0.29.16
file-icons@2.0.7
markdown-preview-opener@0.1.1
markdown-scroll-sync@2.1.2
markdown-writer@2.6.3
minimap@4.25.7
nord-atom-syntax@0.4.0
nord-atom-ui@0.9.0
project-manager@3.3.3
sync-settings@0.8.1
terminal-plus@0.14.5
tool-bar@1.0.1
tool-bar-markdown-writer@0.2.0
vim-mode@0.65.2
```
