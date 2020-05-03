---
title: 'ABC 165 にバーチャル参戦した'
path: '/abc165-virtual'
date: '2020-05-03T12:45:20.000Z'
---

当日参加できなかったので。ネタバレは踏んでないしたぶん大丈夫だろう。

## Tl;dr

https://atcoder.jp/contests/abc165/submissions?f.User=cheezenaan

- 84:50 ABCD 4 完(1 WA)
- B が一番むずかしかった
- ひさしぶりに D 解けてうれしい
- バチャ初めて挑戦したけど、時間配分の感覚を養うとか 100 分集中する訓練としてもよさそう

## A

A - We Love Golf - https://atcoder.jp/contests/abc165/tasks/abc165_a

倍数判定して終わり。

## B

B - 1% - https://atcoder.jp/contests/abc165/tasks/abc165_b

入力例 2 と入力例 3 の計算結果が合わず、15 分くらい延々とハマる。さすがにまずいと思い、後回しにして D まで解いてからリベンジ。

- 考えたこと
  - ただの複利計算だし順にループしていけばよいだろう(フラグ)
- 実装
  - 元金と利子の計算がなんか間違ってるのか計算結果がやはり合わない
  - なんだこれと問題文を読み irb で計算し直してを繰り返す
  - こういうときは floor のタイミングが怪しいのよなと感づいて、floor の範囲を狭めたら通った
- 提出コード
  - https://atcoder.jp/contests/abc165/submissions/12680762

80 min かかって B が解けた。時間も溶けた。

## C

C - Many Requirements - https://atcoder.jp/contests/abc165/tasks/abc165_c

- 考えたこと
  - 「A[bi] - A[ai] = c[i] を満たすような i についての d[i] の総和」ってなんだ呪文か？
  - それにしても d[i] だけ最大値の数が大きい(10^5)のはなんだろう
  - A[1] から A[N] に何が入るかわかればよさそうではある
  - とりあえず手元で樹形図を書きながら「1 ~ M から N コ重複ありで選んだ組み合わせ」を列挙すればよさそうと思いつく
- 実装
  - たしか `Array#repeated_combination` があったなと試しに使って提出
  - あっさり通って真顔になる
- 提出コード
  - [https://atcoder.jp/contests/abc165/submissions/12679948](https://atcoder.jp/contests/abc165/submissions/12679948)

ここまで 38 min.

### 参考

```ruby
irb(main):017:0> [*1..10].repeated_combination(10).count
=> 92378
```

思ったより組み合わせの数が多くなかった。

```ruby
irb(main):018:-> factorial = ->(num) { 1.upto(num).inject(:*) }
irb(main):019:0> factorial.call(10+10-1) / (factorial.call(10-1) * factorial.call(10))
=> 92378
```

## D

D - Floor Function - https://atcoder.jp/contests/abc165/tasks/abc165_d

- 考えたこと
  - 「floor(A \* X / B) - A \* floor(X / B)」の最大値ってどういうことだろう
  - それにしても B, N <= 10^12 はでかい。いいやり方を考えないと単純なループでも間に合わない
  - 割り算の話だし mod とか算数的な考察でラクにできないか
  - 手元で適当にサンプル試しながら式を眺める
    - X < B を満たしつつ A \* X / B が最大になるときが答えになりそうな雰囲気
    - X は整数だし X = B - 1 で決め打ちすれば通りそう
- 実装
  - シュッとコードを書くもサンプル試したところ入力例 1 が通らず
  - N と B - 1 の比較が必要だと気づきコードを修正。サンプルが通ることを確認して提出
- 提出コード
  - [https://atcoder.jp/contests/abc165/submissions/12680252](https://atcoder.jp/contests/abc165/submissions/12680252)

ここまで 55 min.

# E

E - Rotation Matching - https://atcoder.jp/contests/abc165/tasks/abc165_e

サンプルをもとに問題文を咀嚼してたら時間切れ。editorial の PDF を読んでもいまいちよくわからんので Youtube の解説動画を見よう。
