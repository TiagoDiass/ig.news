import { SubscribeButton } from 'components';
import { stripe } from 'services/stripe';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './home.module.scss';

type HomeProps = {
  product: {
    priceId: string;
    amount: string;
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      {/* <Head>
        <title>Home | ig.news</title>
      </Head> */}

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Opa, seja bem vindo</span>
          <h1>
            Notícias sobre o <br /> mundo <span>React</span>.
          </h1>

          <p>
            Se inscreva para obter acesso a todas publicações <br />
            por <span>{product.amount}</span> ao mês
          </p>

          <SubscribeButton />
        </section>

        <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1InDHjHwUwrrdHuml0Qg8DuW');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },

    revalidate: 60 * 60 * 36, // 36 horas
  };
};
