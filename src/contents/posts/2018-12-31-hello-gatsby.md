---
title: '個人ブログをはてなブログから Gatsby + Firebase Hosting に移行した'
path: '/hello-gatsby'
date: '2018-12-31T20:00:20.000Z'
---

はてなブログで書き続けていた個人ブログを Gatsby に移行して、Google Domains で取得した独自ドメインを使って Firebase Hosting 上で配信している。移行そのものは 11 月には完了していたが、肝心のブログ更新が止まってしまった。せっかくなので、ブログを移行するに至ったモチベーションや、移行に際して考えたことや実行したもろもろをまとめてみようと思う。

## Tl;dr

- 静的サイトジェネレーターには PRPL パターンを採用した爆速表示がウリの Gatsby を採用した
- ブログサイトの配信・運用には、メンテナンスの手間とパフォーマンス面を鑑みて Firebase Hosting および Netlify を採用した
- はてなブログから Markdown 形式でブログ記事をエクスポートしたいときは motemen/blogsync がおすすめ
- Netlify の GitHub 連携を利用した記事のプレビューを行い、CircleCI から Firebase Hosting へデプロイしている

## モチベーション

はてなブログをそのまま使い続けるという選択肢もあった。はてな記法という便利フォーマットがあるし、デザインのテンプレートも多いし。ではなぜはてなブログを捨てたかというと、ちょっとしたマンネリ感とか、個人的なアウトプットのネタとして…みたいな些細なものだ。syntax highlight がイマイチなところとか、サイトの表示がなんとなく重いとか、イマイチだった点を挙げようと思えば出てくるけれど、本筋ではないのでここでは省略する。

## 実現したいこと

- ブログ記事の編集に集中できるよう、それ以外の部分のメンテナンスコストをなるべくゼロに近づけること
- 今っぽい技術スタックに触れられること

他社のブログサービスを使わず、わざわざ自分でサイトを作って運用していく以上、配信するサーバのライブラリアップデートとかスケール対応とかセキュリティ対策や HTTPS 対応とか、余計なところで消耗したくなかった。また日々自分がさわっていくプロダクトであるので、使用する技術スタックに愛着を持てるかという点もモチベーション的な意味で前者と同じかそれ以上に重要と考えた。

## 技術スタック

冒頭の通り Gatsby でサイトを生成し、Firebase Hosting 上にデプロイしてサイトを配信しているのだが、Netlify を利用して本番公開前のサイトを事前にチェックしている。ここからは、これらの技術選定に至った背景や調べたことをまとめてみる。

### Gatsby

// TODO: ここに gatsbyjs のキャプチャを貼る

[gatsbyjs/gatsby: Build blazing fast, modern apps and websites with React](https://github.com/gatsbyjs/gatsby)

いわゆる静的サイトジェネレーターのひとつ。 GraphQL を利用して Markdown で書かれたプレーンテキストや WordPress や Drupal など外部の CMS といったデータソースにアクセスし、取得したデータをもとにサイト全体をひとつの React アプリケーションとして生成する。 [PRPL パターン](https://developers.google.com/web/fundamentals/performance/prpl-pattern)を踏襲した設計思想を採用しており、特別なことをしなくても爆速なサイトが容易に作れるのが大きな特徴。

Gatsby のほかにも同じ静的サイトジェネレーターの Hugo や Hexo も候補に入れていたが採用を見送った。所感は以下の通り。

- Hugo
  - Go 製の静的サイトジェネレーター
  - ビルドが鬼のように速く、デザインテンプレートも豊富
  - まわりでも導入している事例をたまに聞く
  - `{{ hogehoge }}` みたいなテンプレートの記法がなじめず導入をやめた
- Hexo
  - Node.js 製の静的サイトジェネレーター
  - Gatsby の使い勝手がよかったのでたいして試さずに導入をやめた

### Firebase Hosting

[Firebase Hosting | 高速で安全なウェブ ホスティング  |  Firebase](https://firebase.google.com/products/hosting/)

// TODO: ここに Firebase Hosting トップページのキャプチャを貼る

Google が提供する mBaaS である Firebase で利用できるフルマネージドホスティングサービス。 HTTPS 対応や CDN 経由による静的アセットの配信がデフォルト対応。もちろん独自ドメインの利用も OK だし、任意のデプロイ時点へのロールバックだってできる。しかも配信するアセットの容量が増えないかぎり基本無料なのもうれしい。

### Netlify

// TODO: Netlify のスクショを貼る

Netlify も Firebase Hosting と同様にフルマネージドホスティングサービスの一種。GitHub リポジトリへの push などをトリガーにした Netlify 上でのビルドおよびデプロイ、ホスティングがほぼ全自動で行えるのが特徴で、さらに特筆すべきはブランチごとにサイトをデプロイしてくれる機能が用意されていて、たとえば「Pull Request を作成したらレビュー環境が立ち上がって、よしなにブラウザで確認できる」という一連の体験がシュッとできあがるのが最高にすばらしい。このブログも Firebase Hosting と Netlify を組み合わせて運用しているが詳細は後述。

## 移行にあたりやったこと

実際にブランチ切って作業した内容はもう少しあった気がするけれど、だいたいこんなことをやってたらブログサイトができた。

- サイトデザインの調整
- はてなブログの過去記事インポート
- デプロイ体制の構築
- OGP / SNS 対応

### サイトデザインの調整

ブログ用のスターターキットも用意されていたけど、まずはミニマムな構成ではじめたかったので、`gatsby new` を叩いて [gatsby-starter-default](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-default/) で生成される素朴なテンプレートを使用した。先述の通りテンプレートエンジンに React を使用しているのだけど吐き出されたファイルが JavaScript(ES2015) だったので「React 使うのに TypeScript で書かない理由があるだろうか…」と思い、サクッと TypeScript 化。[Gatsby 公式で型定義ファイルを用意してくれていて](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/index.d.ts)非常に助かる。

デザインは CSS フレームワークの [Bulma](https://bulma.io/) および [Bloomer](https://bloomer.js.org/) を採用した。Bulma を使えばなにもしなくてもレスポンシブ対応が完了するのと、Bulma をもとに作成された Bloomer は Atomic Design でいう Atom や Molecule といった粒度で使えるコンポーネントが用意されているので、これらを自分たちで組み合わせていくとそれっぽいデザインが手間なく完成する。実際に Bloomer で組み合わせたコンポーネントは Organism くらいの粒度で管理している(たとえばヘッダーやフッター、あとは後述する OGP 部分とか)。

### はてなブログの過去記事インポート

わりと頭を悩ませたのがここ。まず、はてなブログの管理画面から行えるブログのエクスポート機能では出力時のフォーマットが Movable Type 形式のテキストファイルに固定される。自分がほしいのは Markdown 形式のテキストファイルなのにこれは困った。なにか手段はあるはずだと探してみると、はてなブログは[開発者向けに AtomPub API が提供されている](http://developer.hatena.ne.jp/ja/documents/blog/apis/atom)のだが、いまいち使い勝手がよいとは言い難かった。これは万策尽きたか…と思いかけたが、[motemen/blogsync](https://github.com/motemen/blogsync) というはてなブログ用の CLI ツールですべてが解決した。ブログ記事の本文が Markdown 形式でエクスポートできるのはもちろん、記事のタイトルや投稿日時、記事に付与したタグやカテゴリといったメタデータもまとめて取得できる。とにかく便利なので、気になったら[作者の記事](https://motemen.hatenablog.com/entry/2014/12/22/blogsync)を参照してもらうといいはず。

### デプロイ体制の構築

先述の通り本番への公開前は GitHub と連携した Netlify に自動デプロイされたプレビュー環境上でサイトの見た目を確認できるので説明は割愛して、ここでは [CircleCI](https://circleci.com/) による CI 環境の構築および Firebase Hosting へのデプロイについて触れていく。

…と書いてみたものの、だんだんと説明が面倒くさくなったので、実際に CircleCI で使用している `config.yml` をそのまま貼り付けてみる。

ポイントは以下の通り。

- [CircleCI Workflows](https://circleci.com/docs/2.0/workflows-overview/) を利用して、Firebase Hosting へのデプロイは master ブランチでのビルドが成功したときのみ実行されるようにする
- `persist_to_workspace` および `attach_workspace` を利用して、`build` ステップで生成した `public/` 以下のファイルを `deploy` ステップに横流しして、そのままデプロイできるようにしている

```yaml
version: 2
default_settings: &default_settings
  docker:
    - image: circleci/node:10.15.0-stretch
  working_directory: ~/repo
jobs:
  build:
    <<: *default_settings
    steps:
      - checkout
      - restore_cache:
          keys:
            - yarn-packages-v1-{{ .Branch }}-{{ checksum "yarn.lock" }}
            - yarn-packages-v1-{{ .Branch }}-
            - yarn-packages-v1-
      - run: yarn install
      - save_cache:
          key: yarn-packages-v1-{{ .Branch }}-{{ checksum "yarn.lock" }}
          paths:
            - ~/.cache/yarn
      - run: yarn lint
      - run: yarn typecheck
      - run: yarn build
      - persist_to_workspace:
          root: ~/repo
          paths:
            - public/
            - node_modules/
            - package.json
            - firebase.json
  deploy:
    <<: *default_settings
    steps:
      - attach_workspace:
          at: ~/repo
      - run:
          name: deploy to firebase
          command: $(yarn bin)/firebase deploy --only hosting --token $FIREBASE_DEPLOY_TOKEN --project $FIREBASE_PROJECT

workflows:
  version: 2
  build_and_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
```

### OGP / SNS 対応

ここまでやればブログサイトの公開に必要な準備はひととおり済んだことになるが、公開した記事を SNS でシェアする際には [OGP 対応](https://ferret-plus.com/610)をしておくと見た目が少しだけよくなるので、あわせてやってみた。とはいえ [React Helmet](https://github.com/nfl/react-helmet) を使ってメタタグを生成するだけなのだが、強いて言うなら個々のブログ記事ページと一覧ページや 404 ページとで微妙に内容を出し分ける工夫を加えたのがポイントで、先述の `Ogp` コンポーネントを用意して、個々のページで読み込ませている。

やはり説明が面倒くさくなってきたのでコードを雑に貼り付ける。

```tsx
// src/components/organisms/ogp.tsx

import * as React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../../gatsby-config';

const defaultProps = {
  isRoot: false,
  title: '',
  path: '',
  description: '',
};

type Props = Partial<typeof defaultProps>;

export const Ogp: React.SFC<Props> = ({ isRoot, title, path, description }) => {
  const { title: siteTitle, siteUrl } = siteMetadata;

  return (
    <Helmet
      title={title}
      meta={[
        {
          property: 'description',
          content: description || 'something awesome',
        },
        {
          property: 'og:title',
          content: title ? `${title} - ${siteTitle}` : siteTitle,
        },
        { property: 'og:type', content: isRoot ? 'website' : 'article' },
        {
          property: 'og:url',
          content: `${path ? `${siteUrl.concat(path)}` : siteUrl}`,
        },
        {
          property: 'og:image',
          content:
            'https://www.gravatar.com/avatar/544edf5a0f3541a800f0b2911a3176df.jpg?size=400',
        },
        {
          property: 'og:description',
          content: description || 'something awesome',
        },
        { property: 'twitter:card', content: 'summary' },
        { property: 'twitter:site', content: '@cheezenaan' },
      ]}
    />
  );
};
```

```tsx
// src/pages/index.tsx

import { Box, Container, Content, Heading, Section, Subtitle } from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { Ogp } from '../components/organisms/ogp';
import { Layout } from '../components/templates/layout';

// (snip)

const IndexPage: React.SFC<Props> = ({ data }) => {
  const { posts } = data.allMarkdownRemark;
  const filteredPosts = posts.filter(
    ({ post }) => post.frontmatter.title.length > 0
  );

  return (
    <Layout isRoot>
      <Ogp isRoot />
      <Section>{/* snip */}</Section>
    </Layout>
  );
};
export default IndexPage;

// (snip)
```

```tsx
// src/components/pages/blog-post.tsx

import { Container, Content, Heading, Section, Title } from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { Ogp } from '../organisms/ogp';
import { Layout } from '../templates/layout';

// (snip)

export const BlogPost: React.SFC<Props> = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const { prev, next } = pageContext;

  return (
    <Layout>
      <Ogp
        title={post.frontmatter.title}
        path={post.frontmatter.path}
        description={post.excerpt}
      />
      <Section>{/* snip */}</Section>
    </Layout>
  );
};
export default BlogPost;

// (snip)
```

## 所感とまとめ

日常業務の合間を縫いながらかれこれ 1 ヶ月弱でブログ移行を進めてきたけど、おおむね満足できるものができたんじゃないかと思っている。

Gatsby は React や Webpack など Node.js ベースのライブラリを多く採用しているので比較的キャッチアップしやすく、プラグインも豊富に用意されていたのでやりたいことはだいたいすべてラクに実現できた。サイト配信に使用した Firebase Hosting や Netlify もこうした静的サイトジェネレーターとの相性がだいぶよく、こちらで何かしら設定をすることなくシュッと環境が立ち上がるのでとても体験がよかった。

また先に触れた OGP 対応のほかにも、前後記事へのナビゲーション追加などサイトへの細かいカスタマイズも入れているが、記事の検索やタグ・カテゴリの追加、あとは通称 About me ページの追加など手付かずな部分が多く残っている。まぁこの先に向けてのお楽しみとして残しておくのも悪くない。まだまだ書き足りないこともありそうだけど、いったんこのあたりで区切ることにしよう。

## 参考 URL

### Gatsby

- React ベースの静的サイトジェネレータ Gatsby の作者、Kyle Mathews 氏との Q&A - https://www.infoq.com/jp/news/2017/07/gatsby-kyle-mathews-interview
- React.js 製の静的サイトジェネレーター Gatsby に移行した - Qiita - https://qiita.com/jaxx2104/items/5f28915355a85d36e38a
- Full React な静的サイトジェネレーターの Gatsby を触ってみた | tmnm.tech - https://tmnm.tech/2017/09/09/try-gatsbyjs
- PRPL パターン実装の具体例調査と比較 - Qiita - https://qiita.com/kimamula/items/4e25b8d2caca314f9dd2
- PRPL Pattern | GatsbyJS - https://www.gatsbyjs.org/docs/prpl-pattern/

### Firebase / Netlify

- Firebase Hosting | Firebase - https://firebase.google.com/docs/hosting/
- ブログのホスティングを Netlify から Firebase Hosting に変更した | 9m のパソコン日記 - https://blog.kksg.net/posts/netlify-to-firebase/

### CircleCI

- CircleCI2.0 の Workflows を試す – timakin – Medium - https://medium.com/@timakin/circleci2-0%E3%81%AEworkflows%E3%82%92%E8%A9%A6%E3%81%99-1329042122fd
- CircleCI 2.0 の「ワークフロー機能」を学べる公式デモ用リポジトリ circleci-demo-workflows - kakakakakku blog - https://kakakakakku.hatenablog.com/entry/2018/03/22/030358

### その他

- 静的サイトを公開するならどこがいいの？ #技術書典 - フロントエンドの地獄 - https://blog.nabettu.com/entry/staticsite
- Serverless Architecture を採用した MF KESSAI Tech Blog について | MF KESSAI TECH BLOG - https://tech.mfkessai.co.jp/2018/05/1/
- 記事作成から公開までを GitHub で完結できる技術ブログ基盤作り - BizReach Tech Blog - https://tech.bizreach.co.jp/posts/49/process-to-build-tech-blog/
- ブログを Gatsby に移行しました - FIVETEESIXONE - https://fiveteesixone.lackland.io/2018/03/31/rebuild-blog-using-gatsby/
- React Helmet を使って OGP 対応した - akameco Blog - https://akameco.github.io/blog/react-helmet/
- Google が新たに提唱する Progressive Web Apps の新たな開発パターン「PRPL」とは？ | HTML5Experts.jp - https://html5experts.jp/komasshu/19704/

### Atomic Design

- [Vue.js からみた AtomicDesign – Takanori Sugawara – Medium](https://medium.com/@t_sugawara/vue-js-%E3%81%8B%E3%82%89%E3%81%BF%E3%81%9F-atomicdesign-e90517842801)
- [Atomic design デザインと実装の狭間 - Speaker Deck](https://speakerdeck.com/ts020/vuefes)
