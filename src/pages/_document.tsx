import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,900&display=swap'
            rel='stylesheet'
          />

          <link rel='icon' href='/favicon.png' type='image/png' />

          <meta property='og:image' content='/thumbnail.png' />

          {/*
          <meta
            name="description"
            content="Podcastr | Os melhores podcasts de tecnologia para você ouvir!"
          />

          <meta
            property="og:title"
            content="Podcastr | Os melhores podcasts de tecnologia para você ouvir!"
          />

          <meta
            property="og:description"
            content="Podcastr é um website onde você pode ouvir os melhores e mais diversos podcasts sobre tecnologia."
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
