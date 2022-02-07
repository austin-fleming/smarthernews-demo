import { getSinglePost, singlePostQueryReducer } from '@cms/getPosts';
import { usePreviewSubscription } from '@cms/utils/getPreviewSubscription';
import { QuickQuoteHero, QuickreadHero, VideopostHero } from '@components/articles';
import { JsonLdArticle, JsonLdBreadCrumbs, Loading } from '@components/common';
import { PostBody, PostFooter } from '@components/sections';
import { SocialShare } from '@components/ui';
import { defaultSeo } from '@config/preval';
import type { GetStaticPaths } from 'next';
import {
  NextSeo, ArticleJsonLd, NewsArticleJsonLd,
} from 'next-seo';
import Error from 'next/error';
import { useRouter } from 'next/router';

// TODO: fallback:'blocking' is better for seo. prebuild first MAX_POSTS_PER_PAGE so home is good. Keep for 'search' and 'typologies'
export const getStaticPaths: GetStaticPaths = async () => ({ fallback: 'blocking', paths: [] });

type StaticProps = {
  params: {
    pid: string;
    postType: string;
  };
  preview: boolean;
};

export const getStaticProps = async ({ params, preview = false }: StaticProps) => {
  const { postType, pid } = params;

  const initialData = await getSinglePost( postType, pid, preview);
  const previewQuery = singlePostQueryReducer(postType);

  return {
    props: {
      initialData,
      preview,
      previewQuery,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

/*
TODO: use following schema functions:
- Seo
- JsonLdNews | JsonLdArticle | JsonLdBlogPost
- JsonLdBreadCrumbs
*/

const Post = ({ preview, initialData, previewQuery }: Props) => {
  const router = useRouter();

  const { data: post } = usePreviewSubscription(previewQuery || '', {
    enabled: preview,
    initialData,
    params: { slug: initialData?.slug?.current || '' },
  });

  if (!router.isFallback && (!post || !initialData)) return <Error statusCode={404} />;
  if (router.isFallback || !post || !initialData) return <Loading />;

  const {fallbackAuthor} = defaultSeo

  return (
    <>
      {/* <NextSeo
        openGraph={{
          article: {
            authors: post.author && [
              `https://www.smarthernews.com/author/${post.author?.slug.current}`,
            ],
            modifiedTime: post._updatedAt,
            publishedTime: post.datePublished || post._createdAt,
            TODO: add series to tags
            tags: post.tags && [...post.tags.map((tag) => tag.value)],
          },
          description: '',
          title: `${post.title} | SmartHER News`,
          type: 'article',
          url: `https://www.smarthernews.com/${post._type}/${post.slug.current}`,
          TODO: add images
        }}
      /> */
      <JsonLdArticle authors={{ name: post.author?.title || fallbackAuthor.name, profileUrl: post.author }}/>
      {/* <ArticleJsonLd
        authorName={post.author ? [post.author.title] : ['SmartHER News']}
        dateModified={post._updatedAt}
       TODO: add images
        datePublished={post.datePublished || post._createdAt}
        description=""
        publisherName="SmartHER News"
        title={post.title}
       TODO: add publisher logo
       TODO: description builder. use 'blockContentToPlainText' from react-portable-text
        url={`https://www.smarthernews.com/${post._type}/${post.slug.current}`}
      /> */}
      <JsonLdBreadCrumbs breadCrumbs={[{
        itemUrl: `https://www.smarthernews.com/${post._type}`,
        name: post._type,
      }, {
        itemUrl: `https://www.smarthernews.com/${post._type}/${post.slug.current}`,
        name: post.title,
      }]}
      />
      {/* <NewsArticleJsonLd
        url={`https://www.smarthernews.com/${post._type}/${post.slug.current}`}
        title={post.title}
        images: {[]}
        section={}
      /> */}
      {/* <BreadcrumbJsonLd
        itemListElements={[
          {
            item: `https://www.smarthernews.com/${post._type}`,
            name: post._type,
            position: 1,
          },
          {
            item: `https://www.smarthernews.com/${post._type}/${post.slug.current}`,
            name: post.title,
            position: 2,
          },
        ]}
      /> */}
      {post._type === 'quickreads' && <QuickreadHero data={post} preview={preview} />}
      {post._type === 'videoposts' && <VideopostHero data={post} />}
      {post._type === 'quickquotes' && <QuickQuoteHero data={post} />}

      {post.body && <PostBody blockContent={post.body} />}
      <SocialShare />
      {post.author && <PostFooter author={post.author} />}
    </>
  );
};

export default Post;
