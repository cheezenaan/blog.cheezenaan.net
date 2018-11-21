---
title: Docker上にRails5×MySQLな新規プロジェクトを爆速で構築する
date: 2017-03-05T13:21:24+09:00
path: /rails-on-docker-with-application-template
---

# 概要

Docker Compose を使って、ローカル環境を(ほぼ)汚さずに Rails5 と MySQL が動く環境を作ったので公開してみる。キモは、`rails new` で新しく Rails プロジェクト作成後に行う、便利 Gem のインストールやめんどうくさい設定もろもろを、Rails Application Template で自動化した点。

# Rails on Docker

[https://github.com/cheezenaan/rails-on-docker:embed]
README.md 書いてない適当ぷりではあるけれどそこは勘弁。

# 動作環境(2017/3/5 時点)

## ホスト

- MacOS Sierra
- Docker for mac

## コンテナ

- Ruby 2.4.0
- Rails 5.0.1
- MySQL 5.6

# 構成

```
$ tree
.
├── Dockerfile.dev
├── Gemfile
├── Gemfile.lock
├── docker-compose.yml
└── templates
    ├── Gemfiles.rb
    └── settings.rb

1 directory, 6 files.
```

# How to use

```
mkdir your_rails_app && cd your_own_app
git clone git@github.com:cheezenaan/rails-on-docker.git . && rm -rf .git
docker-compose run --rm webapp rails new . --database=mysql --force -BT -m ./templates/Gemfiles.rb
docker-compose run --rm webapp bundle e rails app:template LOCATION=./templates/settings.rb
docker-compose up -d webapp
```

Rails アプリには http://localhost:3000 からアクセスできる。

# 補足

## Rails Application Templates

今回の開発環境構築にあたり苦労した箇所。
Application template の場合は Gem のインストールやアプリケーションの設定をまとめて行えるのだが、今回 Docker 上 で行う場合は

```
Could not find gem 'pry-coolline' in any of the gem sources listed in your Gemfile.
```

とエラーが表示されて進まなくなる。Gem のインストールまでで作業を区切った後、再度 `docker-compose run ~` することでなんとかなった。

# こういうときはどうする？

## Gem を新しく追加したい

ホスト側の Gemfile を編集してから、

```
docker-compose exec webapp bundle install
```

で OK.

## rubocop でコードスタイルをチェックしたい

ホスト環境にインストールすればいいのでは。

```
gem install rubocop
```

## もっさりして重い

Docker for Mac 特有の問題らしい。docker-sync 使うとわりとマシになる。

## いちいち `docker-compose exec [container-name] ~~~` 打つのだるい

わかる。自分はコマンドライン補完に頼ってるからまだ耐えられるけれどどうにかしたい。
下の参考記事でも紹介されている[ラッパースクリプト](http://qiita.com/wakaba260/items/0a00c6c3aa7183a1cb99#%E3%83%A9%E3%83%83%E3%83%91%E3%83%BC%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%82%92%E6%9B%B8%E3%81%8F)を用意するのがよさそう。

## ぐちゃぐちゃになったから環境作り直したい

```
docker-compose down --volumes --remove-orphans --rmi all
```

でコンテナ破棄した後、`docker-compose up` なりすればいい。

# 参考記事

- [Docker で快適な Rails 開発環境を手に入れるためにやった 6 つのこと - Qiita](http://qiita.com/wakaba260/items/0a00c6c3aa7183a1cb99)
- [Rails template て ゙ 開発の初速を上け ゙ よう](http://www.slideshare.net/chariderpato/rails-template-27829933)
- [#12 Rails の面倒な初期設定を自動化する Application Templates - KAYAC engineers' blog](http://techblog.kayac.com/adventcalendar2014_12.html)
