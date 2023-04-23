import Head from 'next/head';
import AllPosts from '../../components/posts/AllPosts';
import { getAllPosts } from '../../helper/posts-util';

export default function Posts(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="List of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.allPosts} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
