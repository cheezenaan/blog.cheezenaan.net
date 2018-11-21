---
title: Docker for Mac と Dinghy のパフォーマンスを比較してみた
Category:
  - Docker
  - Ruby
  - Rails
  - ぼくがかんがえたさいきょうの Rails チュートリアル
date: 2018-06-18T14:21:56+09:00
path: /compare-docker-for-mac-with-dinghy
---

## はじめに

Mac x Docker 環境下で Rails アプリを開発している際にどれくらい性能差が出ているのか、n 番煎じであることは承知の上で実際に試してみた。

## 検証環境(ホスト)

- MacBook Pro(Retina 13-inch, Early 2015)
- OSX 10.13.5 High Sierra
- CPU: 2.7 GHz Intel Core i5
- Memory: 16 GB

## 検証環境(Docker)

Docker for Mac も Dinghy も共通して、 VM には CPU 2 コア、メモリーを 8GB 割り当てる。

### For Mac

```sh
$ docker -v
Docker version 18.03.1-ce, build 9ee9f40

$ docker-compose -v
docker-compose version 1.21.1, build 5a3f1a3
```

stable 版だとディスクイメージのフォーマットに `qcow2` を使用しているけど、今回の検証では `raw` に変更する。

```sh
vim ~/Library/Group\ Containers/group.com.docker/settings.json
```

`diskpPath` の拡張子 `qcow2` を `raw` に変更したら Docker.app を再起動する。
手っ取り早く変えるには ↓ のワンライナーを叩く。

```sh
sed -i -e 's/qcow2/raw/g' ~/Library/Group\ Containers/group.com.docker/settings.json
```

`Preferences` の `Disk > Disk image location` に記載されたパスの拡張子が `raw` になっていれば OK。

### Dinghy

```sh
$ docker -v
Docker version 18.05.0-ce, build f150324

$ docker-compose -v
docker-compose version 1.21.2, build unknown

$ docker-machine -v
docker-machine version 0.14.0, build 89b8332

$ docker-machine inspect dinghy
{
    "ConfigVersion": 3,
    "Driver": {
        "IPAddress": "192.168.99.100",
        "MachineName": "dinghy",
        "SSHUser": "docker",
        # ...
        "CPU": 2,
        "Memory": 8192,
        "DiskSize": 20000,
        # ...
    },
  # ...
}
```

## 検証方法

Rails チュートリアルで作成していたサンプルアプリの RSpec を回す。
[cheezenaan-sandbox/sample_app_rev4: Sample application forked from https://railstutorial.jp/](https://github.com/cheezenaan-sandbox/sample_app_rev4)

```sh
$ bundle exec rake stats --all
+----------------------+--------+--------+---------+---------+-----+-------+
| Name                 |  Lines |    LOC | Classes | Methods | M/C | LOC/M |
+----------------------+--------+--------+---------+---------+-----+-------+
| Controllers          |    291 |    218 |      10 |      34 |   3 |     4 |
| Helpers              |     81 |     63 |       0 |      12 |   0 |     3 |
| Jobs                 |      4 |      2 |       1 |       0 |   0 |     0 |
| Models               |    135 |     94 |       4 |      14 |   3 |     4 |
| Mailers              |     21 |     14 |       2 |       2 |   1 |     5 |
| Channels             |     12 |      8 |       2 |       0 |   0 |     0 |
| Libraries            |      0 |      0 |       0 |       0 |   0 |     0 |
+----------------------+--------+--------+---------+---------+-----+-------+
| Total                |    544 |    399 |      19 |      62 |   3 |     4 |
+----------------------+--------+--------+---------+---------+-----+-------+
  Code LOC: 399     Test LOC: 0     Code to Test Ratio: 1:0.0

```

```sh
$ docker-compose run --rm --service-port spring sh
```

して Docker コンテナに入ってから

```sh
$ bundle exec rails db:create db:migrate
$ for i in $(seq 1 10); do time bundle exec rspec --profile --format progress; done;
```

を実行した。とりあえず 10 回くらい回せばええやろ。

## 結果

数値の単位はいずれも秒(sec) です 。

### for Mac

| Dinghy | time - real | RSpec - Finished in | RSpec - files took to load |
| ------ | ----------- | ------------------- | -------------------------- |
| Ave    | 39.86       | 34.44               | 4.58                       |
| Min    | 35.34       | 31.31               | 2.99                       |
| Max    | 51.09       | 40.98               | 12.98                      |

### Dinghy

| Dinghy | time - real | RSpec - Finished in | RSpec - files took to load |
| ------ | ----------- | ------------------- | -------------------------- |
| Ave    | 39.84       | 34.99               | 3.96                       |
| Min    | 35.55       | 29.73               | 3.47                       |
| Max    | 45.55       | 40.93               | 4.62                       |

## 考察とまとめ

`rspec` コマンドの呼び出しから終了までにかかった実時間(`time - real` の項目)も RSpec の実行時間(`RSpec - Finished in` の項目)も、 Docker for Mac と Dinghy とで目に見えた差が生じなかった。

今回使用した Rails チュートリアルくらいの規模のアプリケーションであれば、 Docker for Mac は `raw` フォーマットを使用してボリュームマウントで `cached` オプションを指定してやれば、 Dinghy と同じくらいのパフォーマンスを発揮してくれる…と言ってよさそうなのかな。

実際にプロダクションで 5 年とかのスパンで運用しているようなそれなりに大きい規模の Web アプリケーションでどれくらいパフォーマンスに差が生じるかは今後の課題ということで、どなたかお願いします(他力本願

## 参考資料

- [Rails の RSpec にとって Docker for Mac はどれぐらい遅いのか？ - Qiita](https://qiita.com/ledsun/items/a48a3ee939bd5f7d79a8)
- [Docker for Mac のディスクスループットを約 2 倍にする - Qiita](https://qiita.com/shinespark/items/51b6b145da4772764dfb)
- [time コマンドでプログラムの実行時間を知る - Qiita](https://qiita.com/tossh/items/659e5934e52b38183200)
- [Cannot get the raw support working (Hi-Sierra/SSD) on APFS · Issue #2241 · docker/for-mac](https://github.com/docker/for-mac/issues/2241)
