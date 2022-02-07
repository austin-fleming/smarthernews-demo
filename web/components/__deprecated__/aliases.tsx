import { getAllQuickquotes } from '@cms/getQuickquotes';
import { getAllQuickreads } from '@cms/getQuickreads';
import { getAllVideoposts } from '@cms/getVideoposts';

export const getStaticProps = async () => {
  // TODO: [future] simplify these to only the needed information
  const quickquotes = await getAllQuickquotes();
  const quickreads = await getAllQuickreads();
  const videos = await getAllVideoposts();

  const createRedirects = (posts: typeof quickquotes | typeof quickreads | typeof videos) =>
    posts
      .map((post) => {
        if (!post.aliases || !post.aliases[0]) return null;

        const { aliases } = post;
        const type = post._type;
        const slug = post.slug.current;

        const newPath = `/${type}/${slug}`;

        const prepAlias = (aliasString: string) => {
          const absoluteStripped = aliasString.split('https://smarthernews.com/').join('');
          const absoluteWWWStripped = aliasString.split('https://www.smarthernews.com/').join('');
          const frontSlash =
            absoluteStripped[0] === '/' ? absoluteWWWStripped : `/${absoluteWWWStripped}`;

          return frontSlash;
        };

        return aliases.map((alias) =>
          Object({
            destination: newPath,
            permanent: true,
            source: prepAlias(alias),
          }),
        );
      })
      .filter((item) => !!item)
      .reduce((acc, current) => [...acc, ...current], []);

  const redirects = [quickquotes, quickreads, videos]
    .map(createRedirects)
    .reduce((acc, current) => [...acc, ...current], []);

  return {
    props: {
      redirects,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Aliases = ({ redirects }: Props) => <code>{JSON.stringify(redirects, null, '\t')}</code>;

export default Aliases;
