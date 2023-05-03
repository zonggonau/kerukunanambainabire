import nookies from "nookies";
import Head from "next/head";
import { Inter } from "next/font/google";
import Hero from "../../components/hero";
import Blog from "../../components/publikasi";
import Team from "../../components/team";

const inter = Inter({ subsets: ["latin"] });

export default function Home(data) {
  const hero = data.attributes;

  return (
    <>
      <Head>
        <title>IKKAN</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/ikkan.png" />
      </Head>
      <main>
        <Hero hero={hero} />
        <Blog />
        <Team />
      </main>
    </>
  );
}

export async function getStaticProps(ctx) {
  const cookie = nookies.get(ctx);

  if (cookie.token) {
    return {
      redirect: {
        destination: "/user/profile",
      },
    };
  }

  const req = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/hero-component?populate=*",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  const { data } = await req.json();

  return {
    props: data,
  };
}
