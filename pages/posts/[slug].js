import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/PostContent';
import { getPostData } from '../../helper/posts-util';

export default function DetailPost(props) {
  if (!props.postData) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={props.postData.excerpt} />
      </Head>
      <PostContent post={props.postData} />
    </>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;

  const postData = getPostData(slug);

  return {
    props: { postData },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
