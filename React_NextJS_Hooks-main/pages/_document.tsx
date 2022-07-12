/* eslint-disable @typescript-eslint/no-explicit-any */
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ReactElement, JSXElementConstructor, ReactFragment } from "react";


interface IInitProps { 
  html: string;
  head?: JSX.Element[];
  styles?: ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment;
}


class MyDoc extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<IInitProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDoc;