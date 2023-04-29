import Nav from "./nav";
import Footer from "./footer";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
