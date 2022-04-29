import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;800&display=swap" rel="stylesheet"/>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
