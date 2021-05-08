import Head from 'next/head';
import styles from './posts.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.postsContainer}>
        <ul className={styles.postsList}>
          <li>
            <a href='#' className={styles.postLink}>
              <time>12 de março de 2021</time>
              <strong>Creating a Monorepo with Yarn workspaces</strong>
              <p>In this guide, you will learn how to create a Monorepo with Yarn workspaces.</p>
            </a>
          </li>

          <li>
            <a href='#' className={styles.postLink}>
              <time>12 de março de 2021</time>
              <strong>Creating a Monorepo with Yarn workspaces</strong>
              <p>In this guide, you will learn how to create a Monorepo with Yarn workspaces.</p>
            </a>
          </li>

          <li>
            <a href='#' className={styles.postLink}>
              <time>12 de março de 2021</time>
              <strong>Creating a Monorepo with Yarn workspaces</strong>
              <p>In this guide, you will learn how to create a Monorepo with Yarn workspaces.</p>
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
