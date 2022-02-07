import { useRouter } from 'next/router';
import Error from 'next/error';
import type { GetStaticPropsContext, GetStaticPaths } from 'next';
import NextLink from 'next/link';
import { getAllVideoseries } from 'cms/get-all-videoseries';
import { getAllQuickreadsseries } from 'cms/get-all-quickreadsseries';
import { getPostsForCardseries } from 'cms/get-posts-for-cardseries';
import { getPostsForVideoseries } from 'cms/get-posts-for-videoseries';
import { getSeries } from 'cms/get-series';
import { SeriesType } from 'cms/types/sanityTypes';
import type { ParsedUrlQuery } from 'querystring';

export const getStaticPaths: GetStaticPaths = async (context) => {
  return { fallback: true, paths: [] };
};

interface IParams extends ParsedUrlQuery {
  postType: string;
  seriesSlug: string;
}

export const getStaticProps = async ({ params, preview = false }: GetStaticPropsContext) => {
  if (!params?.postType || !params?.seriesSlug) return { notFound: true };

  const { postType, seriesSlug } = params as IParams;

  const seriesType: SeriesType =
    (postType === 'videoposts' && 'videoseries') ||
    (postType === 'quickreads' && 'cardseries') ||
    null;

  // TODO: currently isn't taking postType into consideration
  const allSeries =
    (postType === 'videoposts' && (await getAllVideoseries())) ||
    (postType === 'quickreads' && (await getAllQuickreadsseries())) ||
    null;

  const currentSeries = await getSeries(preview, seriesType, seriesSlug);

  const postResults =
    (postType === 'quickreads' && (await getPostsForCardseries(preview, currentSeries._id))) ||
    (postType === 'videoposts' && (await getPostsForVideoseries(preview, currentSeries._id))) ||
    null;

  if (!postResults || !allSeries) return { notFound: true };

  return {
    props: {
      allSeries,
      postType,
      currentSeries,
      seriesType,
      postResults,
      preview,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Page = (props: Props) => {
  const router = useRouter();
  if (!router.isFallback && !props) return <Error statusCode={404} />;
  if (router.isFallback) return <p>Loading...</p>; // TODO: fallback loading component

  const { allSeries, postType, seriesType, postResults, currentSeries } = props!; // HACK: why is it expecting props to be possibly undefined?

  return (
    <div>
      <h1>Series for: {postType}</h1>
      <h2>Series Type: {seriesType}</h2>
      <h3>Current Series: {currentSeries.title}</h3>
      <ul key='allSeries'>
        {allSeries.map((series) => (
          <li key={series._id}>
            <NextLink href={`/${postType}/series/${series.slug.current}`}>
              {currentSeries._id === series._id ? (
                <a>!!! {series.title} !!!</a>
              ) : (
                <a>{series.title}</a>
              )}
            </NextLink>
          </li>
        ))}
      </ul>
      <h2>Results:</h2>
      <ul key='articleResults'>
        {postResults?.map((post) => (
          <li key={post._id}>
            <NextLink href={`/${post._type}/${post.slug.current}`} passHref>
              <a>{post.title}</a>
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
