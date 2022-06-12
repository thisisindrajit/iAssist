import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GoogleAuthUserProvider } from "../context/GoogleAuthContext";
import "../styles/globals.css";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <Layout>
      <GoogleAuthUserProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleAuthUserProvider>
    </Layout>
  );
}

export default MyApp;
