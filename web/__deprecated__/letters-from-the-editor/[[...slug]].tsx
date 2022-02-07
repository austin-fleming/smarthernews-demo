import {
  getCursoredEditorBlogPosts,
  getEditorBlogQuantity,
  getSingleEditorBlogPost,
  getSomeEditorBlogPosts,
} from '@cms/getEditorBlog';
import { EditorsBlog } from '@cms/types/sanityTypes';
import { usePreviewSubscription } from '@cms/utils/getPreviewSubscription';
import { Loading, Seo } from '@components/common';
import { CardSection } from '@components/layout';
import { DetailedCard, Paginate } from '@components/ui';
import { defaultSettings } from '@config/preval';
import { isoToShortDate } from '@lib/dates';
import { stringToInteger } from '@lib/strings';
import { isFalsy, isStrictFalsy, isTruthy } from '@lib/valueChecks';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

/* CONSTANTS */

const BASE_ROUTE = '/letters-from-the-editor';

/* TYPES */

type EmptyObject = Record<string, never>;

/* HELPERS */

const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

const isNumber = (val: unknown) => !Number.isNaN(+val);

const stringIsInteger = (val: string) => Number.isInteger(+val);

/* MAIN */

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: true,
  paths: [{ params: { slug: [] } }],
});

export const getStaticProps = async ({
  preview,
  params,
}: GetStaticPropsContext<EmptyObject | { slug: string[] }>) => {
  const totalPosts = await getEditorBlogQuantity(preview);
  // TODO: [future] should this be server error instead?
  if (!params || !totalPosts) {
    return {
      notFound: true,
    };
  }
  const resultsPerPage = defaultSettings.generalSettings.postsPerPage;
  const totalPages = Math.ceil(totalPosts / resultsPerPage);

  const isEmptySlugList = !params.slug;
  if (isEmptySlugList) {
    const startCursor = 0;
    const posts = await getCursoredEditorBlogPosts(startCursor, resultsPerPage);

    if (!posts)
      return {
        notFound: true,
      };

    return {
      props: {
        pageNumber: 1,
        posts,
        totalPages,
      },
    };
  }

  const slugList = params.slug;

  const isResultsPage = stringIsInteger(slugList[0]);
  if (isResultsPage) {
    const pageNumber = stringToInteger(slugList[0]);

    const isRootPage = pageNumber === 1;
    if (isRootPage)
      return {
        redirect: {
          destination: BASE_ROUTE,
          permanent: true,
        },
      };

    const hasUnnecessarySuffixPath = params.slug.length > 1;
    if (hasUnnecessarySuffixPath)
      return {
        redirect: {
          destination: `${BASE_ROUTE}/${pageNumber}`,
          permanent: true,
        },
      };

    const pageNumberIsOutOfBounds = pageNumber < 1 || pageNumber > totalPages;
    if (pageNumberIsOutOfBounds) {
      return {
        notFound: true,
      };
    }

    const cursor = resultsPerPage * pageNumber;
    const posts = await getCursoredEditorBlogPosts(cursor, resultsPerPage);

    return {
      props: {
        pageNumber,
        posts,
        totalPages,
      },
    };
  }

  const postSlug = slugList[0];
  const hasUnnecessarySuffixPath = slugList.length > 1;
  if (hasUnnecessarySuffixPath) {
    return {
      redirect: {
        destination: `${BASE_ROUTE}/${postSlug}`,
        permanent: true,
      },
    };
  }

  const postData = await getSingleEditorBlogPost(postSlug, preview);
  return postData
    ? {
        props: {
          postData,
        },
      }
    : { notFound: true };
};

const LetterToEditor = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (router.isFallback) return <Loading label='Loading posts...' />;

  const { pageNumber, posts: postsData, totalPages, postData } = props;

  const posts = postsData as EditorsBlog[];

  /* eslint-disable react/no-unstable-nested-components */
  const PostPage = () => (
    <>
      <Seo canonicalUrl={defaultSettings.seo.siteUrl + router.asPath} />
      <h1>Post page</h1>
    </>
  );

  const ArchivePage = () => (
    <>
      <Seo canonicalUrl={defaultSettings.seo.siteUrl + router.asPath} />
      <div>
        <h1>Letters from the Editor</h1>
        <p>
          Letters to our readers. Not everything is a news story, sometimes we simply want you to
          know what&apos;s happening in our lives.
        </p>
      </div>
      <CardSection title='Letters'>
        {posts.map((post) => (
          <DetailedCard
            key={post._id}
            date={isoToShortDate(post.datePublished)}
            image={post.mainimage}
            link={`${BASE_ROUTE}/${post.slug.current}`}
            title={post.title}
          />
        ))}
      </CardSection>
      <Paginate currentPage={pageNumber} pathRoot={BASE_ROUTE} totalPages={totalPages} />
    </>
  );

  return (postData && <PostPage />) || (posts && <ArchivePage />);
};

export default LetterToEditor;
