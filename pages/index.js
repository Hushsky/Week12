// Home page that lists blog posts
import Head from 'next/head'; // Modify the document <head> (e.g., set <title>)
import Layout, { siteTitle } from '../components/layout'; // Shared layout and exported site title
import utilStyles from '../styles/utils.module.css'; // CSS Modules with utility classes
import { getSortedPostsData } from '../lib/posts-json'; // Helper to read and sort posts at build time
import Link from 'next/link'; // Client-side navigation between routes
import Date from '../components/date'; // Formats a date string into a readable date
 
// Build-time data fetching: runs only during the build
export async function getStaticProps() {
  // Read metadata for all posts and sort them (e.g., by date)
  const allPostsData = await getSortedPostsData();
  // Provide the data to the component as props
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }) {
  return (
    // The Layout receives a special `home` prop to adjust its header rendering
    <Layout home>
      <Head>
        {/* Set the page title using the shared siteTitle */}
        <title>{siteTitle}</title>
      </Head>
      {/* Introductory section */}
      <section className={utilStyles.headingMd}>
        <p>Hi, my name is Hoang Cao. I am a <strong>Vietnamese </strong>who is wanting to become a <strong>Full-Stack-Developer</strong>.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Blog list section */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* Render each post as a list item with a link and formatted date */}
          {allPostsData.map(({ id, date, title }) => (
           <li className={utilStyles.listItem} key={id}>
           {/* Link to the dynamic route /posts/[id] */}
           <Link href={`/posts/${id}`}>{title}</Link>
           <br />
           <small className={utilStyles.lightText}>
             <Date dateString={date} />
           </small>
         </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}