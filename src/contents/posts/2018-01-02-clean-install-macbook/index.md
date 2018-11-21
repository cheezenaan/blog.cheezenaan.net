---
title: 2018年を迎えたので MacBook Pro のクリーンインストールをした(homebrew + Brewfile + mackup)
path: /clean-install-macbook-rev2018
date: 2018-01-02T11:20:22+09:00
---

<figure class="figure-image figure-image-fotolife" title="毎年毎年、最初からはじめられる。それは素晴らしいことだと思いますよ ― 「響け！ユーフォニアム2 第13話『はるさきエピローグ』」">[f:id:cheezenaan:20180102111010j:plain]<figcaption>毎年毎年、最初からはじめられる。それは素晴らしいことだと思いますよ ― 「響け！ユーフォニアム2 第13話『はるさきエピローグ』」</figcaption></figure>

ここ数年は年末年始を使って、自宅 PC のクリーンインストールと開発環境構築をしているのだけど、2018 年も例に漏れずやってみた。

## Tl;dr

homebrew + Brewfile + mackup を使って、らくらく環境構築。

## クリーンインストール前にやること

### SSH 鍵のバックアップ

[[SSH] 秘密鍵を Dropbox にバックアップしつつ、シンボリックリンクを張って使えるようにする設定 | CodeNote](http://codenote.net/ssh/1166.html) を参考に、Dropbox 上に SSH 鍵を移してシンボリックリンクを貼った。

```/bin/zsh
cp .ssh/* ~/Dropbox/ssh/
chmod 755 ~/Dropbox/ssh
chmod 600 ~/Dropbox/ssh/id_rsa
rm -rf .ssh/
ln -s ~/Dropbox/ssh/ .ssh

~/.ssh » la ~/.ssh
lrwxr-xr-x  1 cheezenaan  staff    29B 12 31 12:18 /Users/cheezenaan/.ssh -> /Users/cheezenaan/Dropbox/ssh

~/Dropbox » la ssh
total 24
-rw-------@ 1 cheezenaan  staff   3.2K 12 31 12:16 id_rsa
-rw-r--r--@ 1 cheezenaan  staff   766B 12 31 12:16 id_rsa.pub
-rw-r--r--@ 1 cheezenaan  staff   189B 12 31 12:25 known_hosts
homebrew
```

こうなっていれば OK.

ref. [お前らの SSH Keys の作り方は間違っている - Qiita](https://qiita.com/suthio/items/2760e4cff0e185fe2db9)

### Brewfile の作成

[Homebrew/homebrew-bundle: Bundler for non-Ruby dependencies from Homebrew](https://github.com/Homebrew/homebrew-bundle)

homebrew でインストールしたパッケージの一覧を Gemfile 風にまとめたファイルを生成する。 Brewfile は Git 管理するのがいいかもしれない。

```/bin/zsh
brew bundle dump -f --file=~/Dropbox/backup/Brewfile
```

### mackup で設定ファイルを Dropbox に待避

[lra/mackup: Keep your application settings in sync (OS X/Linux)](https://github.com/lra/mackup)

デフォルトだと `~/Dropbox/Mackup` にディレクトリを掘って、dotfiles をはじめとする設定ファイルをバックアップし、シンボリックリンクで読み込むようにしてくれる。

```/bin/bash
mackup backup
```

## クリーンインストール後にやること

### Xcode と追加コンポーネントのインストール

High Sierra 以降からなのか homebrew インストール時には Xcode が不要になっていた。とはいえ macvim を homebrew で導入する際に Xcode が必要になるので、このタイミングでインストールする。

### homebrew + Brewfile を用いたパッケージ管理

なにはなくとも homebrew をインストール。

```/bin/bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
brew tap caskroom/cask
```

Brewfile や mackup を使いたい都合上、先に Dropbox だけインストールして認証を済ませておく。

```/bin/bash
brew cask install dropbox
```

homebrew 経由で `peco` をインストールする際に GitHub 上の `peco/peco` から `git clone` しているっぽく、 Dropbox に保管していた ssh 鍵の同期をあらかじめ行う。 `id_rsa` のパーミッションが 600 以外になっていたらよしなに直す。

```/bin/zsh
ln -s ~/Dropbox/ssh/ .ssh
```

あとは

```/bin/bash
brew bundle --file=~/Dropbox/backup/Brewfile
```

を実行。[Amazon ビデオで SHIROBAKO でも視聴していれば](https://www.amazon.co.jp/SHIROBAKO/dp/B06Y5T19L2)、もろもろのインストールが終了する。

### mackup で dotfiles など設定ファイルを同期する

```/bin/bash
mackup restore
```

コマンド一発で設定ファイルの同期が終わる。控えめに言って最高。

あとはターミナル環境(iTerm2 + zsh + tmux + vim)と開発言語(Ruby, JavaScript)等の整備があるけれど、長くなりそうなのでいったん区切る。
