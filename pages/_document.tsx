import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  public render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/static/styles/reboot.css" />
          <link rel="stylesheet" href="/static/styles/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
