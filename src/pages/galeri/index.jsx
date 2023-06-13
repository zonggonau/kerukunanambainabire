import Head from "next/head";
import Link from "next/link";
import nookies from "nookies";

export default function Galeri({ data }) {
  return (
    <>
      <Head>
        <title>Galeri Kerukunan</title>
      </Head>
      <main>
        <section class="py-10 bg-white sm:py-16 lg:py-24">
          <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="max-w-2xl mx-auto text-center">
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Latest from blog
              </h2>
              <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {data.map((item, index) => {
                const urlImg = item.attributes.kategori.data[0].attributes.url;
                console.log(item.attributes);
                return (
                  <div key={index}>
                    <Link href={`/galeri/${item.attributes.slug}`}>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src={process.env.NEXT_PUBLIC_HOST + urlImg}
                        alt=""
                      />
                      <div>{item.attributes.nama_album}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
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
    process.env.NEXT_PUBLIC_HOST + "/api/galeris?populate=*",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  const { data } = await req.json();

  return {
    props: { data },
  };
}
