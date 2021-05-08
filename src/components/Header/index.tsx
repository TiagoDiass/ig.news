import Link from 'next/link';
import SignInButton from 'components/SignInButton';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <img src='/images/logo.svg' alt='ig.news' />
        </Link>

        <nav>
          <Link href='/'>
            <a href='/' className={styles.active}>
              Home
            </a>
          </Link>

          <Link href='/posts'>
            <a href='/posts'>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
