---
title: 'Ruby で bit 全探索する際にハマったポイント'
path: '/bit-bluteforce-in-ruby'
date: '2020-04-09T09:14:20.000Z'
---

タイトルの通り。

## Tl;dr

整数 N の i ビット目にフラグが立っているか判定する際は以下のように書く。

- `bit[i] == 1`
- `bit & (1<<i) != 0`

Boolean として判定しようというだけの話だった。

refs.

- https://docs.ruby-lang.org/ja/2.3.0/class/Fixnum.html#I_--5B--5D
- https://docs.ruby-lang.org/ja/2.3.0/class/Fixnum.html#I_--3C--3C

## なぜハマったか

ABC128-C を解説ブログを読み漁りつつ Ruby で実装していたところ、ビット判定がうまく動かなかった。

ref. https://atcoder.jp/contests/abc128/tasks/abc128_c

```ruby

# 標準入力部分は省略

ans = 0

(1 << n).times do |bit|
  valid = true

  m.times do |i|
    count = 0

    ss[i].each do |s|
      count += 1 if bit & (1 << s - 1) # ココ
    end
    next if count % 2 == ps[i]

    valid = false
  end

  ans += 1 if valid
end

puts ans
```

ちなみに `Integer#[]` を使って以下のように書いてもダメだった。

```diff
- count += 1 if bit & (1 << (s - 1))
+ count += 1 if bit[s - 1]
```

## 基本に戻る

bit 全探索の例題としてよく出てくる `{ 0, 1, ..., n - 1 }` の部分集合を求めるコードを書きながら試してみる。

ref. https://qiita.com/drken/items/7c6ff2aa4d8fce1c9361#6-bit-%E5%85%A8%E6%8E%A2%E7%B4%A2

### 実験コード

```ruby
def bit_bruteforce(n)
  (1 << n).times do |bit|
    s = n.times.select do |i|
      bit & (1 << i)
    end

    puts "#{bit}: {#{s.join(' ')}}"
  end
end

bit_bruteforce(3)
```

実行してみるとビットの判定ができてないっぽい。
`(bit & (1 << i))` の部分を `bit[i]` に書き換えてもダメ。

```shell
~/src/github.com/cheezenaan/procon master*
❯ ruby lib/bruteforce.rb
0: {0 1 2}
1: {0 1 2}
2: {0 1 2}
3: {0 1 2}
4: {0 1 2}
5: {0 1 2}
6: {0 1 2}
7: {0 1 2}
```

### デバッグコードを仕込む

`(bit & (1 << i))` や `bit[i]` は何を返してるのだろう……とふと思ったので print デバッグを仕込んでみる。

```diff
+ puts(b: bit[i], s: bit & (1 << i))
(bit & (1 << i))
```

```shell
~/src/github.com/cheezenaan/procon master*
❯ ruby lib/bruteforce.rb
{:b=>0, :s=>0}
{:b=>0, :s=>0}
{:b=>0, :s=>0}
0: {0 1 2}
{:b=>1, :s=>1}
{:b=>0, :s=>0}
{:b=>0, :s=>0}
1: {0 1 2}
{:b=>0, :s=>0}
{:b=>1, :s=>2}
{:b=>0, :s=>0}
2: {0 1 2}
{:b=>1, :s=>1}
{:b=>1, :s=>2}
{:b=>0, :s=>0}
3: {0 1 2}
{:b=>0, :s=>0}
{:b=>0, :s=>0}
{:b=>1, :s=>4}
4: {0 1 2}
{:b=>1, :s=>1}
{:b=>0, :s=>0}
{:b=>1, :s=>4}
5: {0 1 2}
{:b=>0, :s=>0}
{:b=>1, :s=>2}
{:b=>1, :s=>4}
6: {0 1 2}
{:b=>1, :s=>1}
{:b=>1, :s=>2}
{:b=>1, :s=>4}
7: {0 1 2}
```

どうやら `bit[i]` を用いる場合は `1` かどうか、`(bit & (1 << i))` を用いる場合は non-zero かどうかで判定すれば良さそう。

### 最終的なコード

```ruby
def bit_bruteforce(n)
  (1 << n).times do |bit|
    s = n.times.reject do |i|
      (bit & (1 << i)) == 0
    end

    puts "#{bit}: {#{s.join(' ')}}"
  end
end

bit_bruteforce(3)
```

```shell
~/src/github.com/cheezenaan/procon master *
❯ ruby lib/bruteforce.rb

0: {}
1: {0}
2: {1}
3: {0 1}
4: {2}
5: {0 2}
6: {1 2}
7: {0 1 2}
```

冒頭の ABC128-C の AC コードは以下から。

https://atcoder.jp/contests/abc128/submissions/11669697

## 参考: 他言語の場合

手元でシュッと試せる言語だと JavaScript は `if (bit & (1 << i ))` でよしなに判定してくれた。

```js
const func = (n) => {
  for (let bit = 0; bit < 1 << n; bit++) {
    const arr = [];

    for (let i = 0; i < n; i++) {
      if (bit & (1 << i)) {
        arr.push(i);
      }
    }
    console.log(`${bit}: {${arr.join(' ')}}`);
  }
};

func(3);
```

```javascript
> func(3)
0: {}
1: {0}
2: {1}
3: {0 1}
4: {2}
5: {0 2}
6: {1 2}
7: {0 1 2}
undefined
```
