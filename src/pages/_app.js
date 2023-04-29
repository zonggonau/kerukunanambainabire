import "@/styles/globals.css";
import Layout from "@/layout/frontend/layout";
import AuthLayout from "@/layout/auth/authlayout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/layout/admin/adminlayout";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function App({ Component, pageProps, session }) {
  const Router = useRouter();
  const admin = Router.pathname.startsWith("/admin");
  const auth = Router.pathname.startsWith("/auth");
  const user = Router.pathname.startsWith("/user");
  if (admin) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
      <SessionProvider session={session}>
        <RecoilRoot>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </RecoilRoot>
      </SessionProvider>
    );
  }
  if (user) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
      <SessionProvider session={session}>
        <RecoilRoot>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </RecoilRoot>
      </SessionProvider>
    );
  }
  if (auth) {
    return (
      <RecoilRoot>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </RecoilRoot>
    );
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}