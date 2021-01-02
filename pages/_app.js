import { Provider } from "next-auth/client";
import React from "react";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || React.Fragment;
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
