import Head from 'next/head';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';
import { getFeaturedPosts } from '../helper/posts-util';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Phoenix Blog</title>
        <meta
          name="description"
          content="Posts about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.featuredPosts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { featuredPosts },
    revalidate: 1500,
  };
}
