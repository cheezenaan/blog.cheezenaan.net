---
title: 2018年を迎えたので開発環境を見直した(iTerm2 + zsh + prezto + peco + anyframe + vim + VSCode)
date: 2018-01-02T13:08:09+09:00
path: /renew-development-enviroinment
---

MacBook Pro をクリーンインストールして homebrew で必要なアプリ群を導入したあとにやることをまとめた。アプリごとの細かい設定は mackup で Dropbox に退避していたのでほぼノータイムで復旧できて大変よろしい。

[2018 年を迎えたので MacBook Pro のクリーンインストールをした(homebrew + Brewfile + mackup) - blog.cheezenaan.net](https://blog.cheezenaan.net/clean-install-macbook-rev2018)
こちらの記事の続きとなる。

## Ricty を捨てて Myrica に乗り換える

もともと Ritcy を使っていたんだけど、もろもろのビルドが面倒なので、この機に Myrica へ乗り換えることにした。

[プログラミングフォント Myrica / Estable | Myrica （ミリカ）は、フリーなプログラミング用 TrueType フォントです。](https://myrica.estable.jp/)

```/bin/bash
brew tap caskroom/fonts
brew cask install font-myrica font-myricam
```

VSCode で使うときは `"editor.fontFamily": "Myrica M"` で OK. あとは powerline 用にパッチを当てる。

```/bin/bash
ghq get Lokaltog/powerline-fontpatcher
cd -- ~/src/github.com/Lokaltog/powerline-fontpatcher
fontforge -lang=py -script ./scripts/powerline-fontpatcher ~/Library/Fonts/MyricaM.TTC
```

作業ディレクトリに `MyricaM Monoscape for Powerline.otf` なるファイルができているので、Finder からファイルをダブルクリックしてインストールすれば OK.

## ターミナル環境

iTerm2 + zsh + prezto + peco + anyframe の環境を整えていく。

### iTerm2

iTerm2 の設定ファイルは `mackup` で Dropbox に移しているので、`Preference > General > Preferences` の `Load preferences from a custom folder or URL:` に設定ファイルのパスを指定すればよい。

なお vim-powerline では文字化けするので、iTerm2 の `Profiles > Text > Non-ASCII Font` に [https://github.com/powerline/fonts](https://github.com/powerline/fonts) から `Space Mono for Powerline` をインストールして指定する。

### zsh + prezto + peco + anyframe

zsh の見た目をかっこよくしてくれる prezto を導入。さらに peco + anyframe でらくらくコマンドライン環境を整える。

まずは homebrew でインストールした zsh をデフォルトシェルに設定する。

```/bin/bash
sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"
chsh -s /usr/local/bin/zsh
```

つぎは prezto.

[sorin-ionescu/prezto: The configuration framework for Zsh](https://github.com/sorin-ionescu/prezto)

```/bin/bash
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

anyframe は作者の Qiita の記事を読みながら導入。

[zsh で peco と連携するための anyframe というプラグインを作った - Qiita](https://qiita.com/mollifier/items/81b18c012d7841ab33c3)

```/bin/bash
ghq get mollifier/anyframe
```

`~/.zshrc` へ以下追記してやる。

```/bin/bash
function exists { which $1 &> /dev/null }
if exists peco; then
  fpath=($HOME/src/github.com/mollifier/anyframe(N-/) $fpath)
  autoload -Uz anyframe-init
  anyframe-init

  # 最近使用したのコマンドを叩いたりディレクトリに移動したり
  bindkey '^]' anyframe-widget-cdr
  bindkey '^r' anyframe-widget-put-history

  # ghq list のディレクトリに移動する
  bindkey '^g' anyframe-widget-cd-ghq-repository

  # kill process
  bindkey '^x^k' anyframe-widget-kill

fi
```

## vim(macvim)

vim のパッケージ管理には dein を使用する。プラグイン管理は .vimrc から切り離して toml ファイルにまとめているので、例に漏れずシンボリックリンクを貼ってやる。

[Shougo/dein.vim: Dark powered Vim/Neovim plugin manager](https://github.com/Shougo/dein.vim)

```/bin/bash
brew install macvim --with-lua --with-override-system-vim

# dein のインストール
sh ~/Dropbox/Mackup/.vim/installer.sh ~/.vim/dein

ln -s ~/Dropbox/Mackup/.vim/.dein.toml ~/.vim/dein/.dein.toml
ln -s ~/Dropbox/Mackup/.vim/.dein_lazy.toml ~/.vim/dein/.dein_lazy.toml
```

あとは vim を起動して、`call dein#install()`, `call dein#update()`, `call dein#clear_state()` すれば動くはず。

vim に導入している設定はだいたい以下の URL を参考にしている。

[【詳解】モテたい Vimmer 必見　快適にコーディングするための vimrc 解説 - Qiita](https://qiita.com/ahiruman5/items/4f3c845500c172a02935)

### tmux + powerline

http://powerline.readthedocs.io/en/latest/installation/osx.html をもとに、ｼｭｯと powerline をインストール。

```/bin/bash
pip3 install powerline-status
```

tmux のバージョンが 2.6 以降だとコピー機能がうまく動かなかったので、公式の issue を見ながら `.tmux.conf` を修正する。

ref. https://github.com/tmux/tmux/issues/754#issuecomment-297452143

```bin/bash
# ~/.tmux.conf
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"
bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"
```

## VSCode

これまで Atom や IDE(RubyMine)を使用していたが、2017 年から VSCode を本格導入して以来もうこれなしには開発できない。

```/bin/bash
code --list-extensions > ~/Dropbox/backup/vscode/vscode-extensions.txt
```

クリーンインストール前に拡張機能の一覧を出力しておいて、

```/bin/bash
cd ~/Dropbox/backup/vscode
cat ./vscode-extensions.txt | while read line
do
  code --install-extension $line
done
```

で一括インストール。あとは `Setting sync` で gist にアップロードした設定を読み込めば終了。

[Settings Sync - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemname=shan.code-settings-sync)

## 開発言語のバージョン管理

Rails や JavaScript 開発は Docker 上で完結させたいのだけど、ちょっと irb やコンソール上から動かしたいこともあるので、最低限の実行環境を入れることにした。

### Ruby(rbenv + ruby-build)

```/bin/bash
brew install rbenv ruby-build

# ~/.zshrc に追加
export PATH=$HOME/.rbenv/bin:$PATH
eval "$(rbenv init - zsh)"

# 変更を反映させておく
source ~/.zshrc

rbenv install 2.4.0
rbenv global 2.4.0

which ruby # => /Users/cheezenaan/.rbenv/shims/ruby
ruby -v # => ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin17]
```

### JavaScript(nodebrew + yarn)

公式のとおり `curl` を用いて nodebrew をインストールする。

[hokaccha/nodebrew: Node.js version manager](https://github.com/hokaccha/nodebrew)

```/bin/bash
curl -L git.io/nodebrew | perl - setup
export NODEBREW_ROOT=/path/to/.nodebrew
```

homebrew で nodebrew をインストールした場合、以下のエラーが表示されてコケる。

```/bin/bash
nodebrew install-binary latest

Fetching: https://nodejs.org/dist/v9.3.0/node-v9.3.0-darwin-x64.tar.gz
Warning: Failed to create the file
Warning: /Users/cheezenaan/.nodebrew/src/v9.3.0/node-v9.3.0-darwin-x64.tar.gz:
Warning: No such file or directory
                                                                           0.0%
curl: (23) Failed writing body (0 != 1124)
download failed: https://nodejs.org/dist/v9.3.0/node-v9.3.0-darwin-x64.tar.gz
```

```/bin/bash
brew install yarn --without-node
```

## 落穂ひろい

- logicool options のインストール
- Google 日本語入力を IME のデフォルトにする

### Karabiner-Elements

https://pqrs.org/osx/karabiner/complex_modifications/ から `For Japanese` の設定を `Import` しておく。

### 残課題

- SSH パスフレーズを毎回聞かれるのウザいのでどうにかする
  - ref. [ssh agent をパスフレーズ省略に応用する方法まとめ - Qiita](https://qiita.com/onokatio/items/397a5899a0ec16c7e60a)
