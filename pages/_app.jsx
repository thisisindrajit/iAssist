import React from "react";
import { GoogleAuthUserProvider } from "../context/GoogleAuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <Layout>
      <GoogleAuthUserProvider>
        <Component {...pageProps} />
      </GoogleAuthUserProvider>
    </Layout>
  );
}

export default MyApp;
