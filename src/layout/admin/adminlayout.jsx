import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import SideBar from "./sidebar";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function AdminLayout({ children }) {
  return (
    <>
      <Head>
        <title>Admin Layout</title>
      </Head>
      {/* <SideBar /> */}
      {children}
    </>
  );
}
