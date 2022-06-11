import Document from "next/document";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="iAssist is a real-time chat support system for clearing students' doubts."
        />
        <meta
          name="keywords"
          content="iAssist, chat support, realtime, doubt clearance"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
