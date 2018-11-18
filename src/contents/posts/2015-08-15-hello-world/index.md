---
title: 'Hello, my First Gatsby post'
path: '/hello-world'
date: '2015-08-15T17:12:33.962Z'
---

## Hello World

親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）

## Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## リンクを貼るよ

[『リズと青い鳥』公式サイト](http://liz-bluebird.com/)

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">…ますか…聞こえていますか…のぞみぞ難民たちよ…味ついてておいしいです…いまあなたの心に直接語りかけています…京アニショップの『リズと青い鳥』 Blu-ray 予約受付は11月7日までです…購入特典「山田尚子監督イラストサイン色紙」を逃してはいけません…ハッピーアイスクリーム… <a href="https://twitter.com/hashtag/%E3%83%AA%E3%82%BA%E3%81%A8%E9%9D%92%E3%81%84%E9%B3%A5?src=hash&amp;ref_src=twsrc%5Etfw">#リズと青い鳥</a></p>&mdash; やがて cheezenaan になる (@cheezenaan) <a href="https://twitter.com/cheezenaan/status/1060147637750353921?ref_src=twsrc%5Etfw">2018年11月7日</a></blockquote>

## 画像を貼るよ

![コンビニのゆでたまごです](egg_yudetamago.png)

味ついてておいしいです。

## Code Syntax

`const sound = 'euphonium'; console.log({ sound }); // => { sound: 'euphonium' }`

```tsx{1-8,12}:title=src/templates/BlogPost.tsx
interface Post {
  frontmatter: {
    date: string;
    path: string;
    title: string;
  };
  html: string;
}

interface Props {
  data: {
    markdownRemark: Post;
  };
}
export const BlogPost: React.SFC<Props> = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
};
export default BlogPost;
```

## どんどんドーナツどーんといこー
