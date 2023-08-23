import Head from "next/head";
import Link from "next/link";
import nookies from "nookies";
import Image from "next/image";

export default function Galeri({ data }) {
  return (
    <>
      <Head>
        <title>Galeri Kerukunan</title>
      </Head>
      <main>
        <section className="py-10 bg-white sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                GALERI
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div classNameName="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 space-x-5">
              {data.map((item, index) => {
                const urlImg = item.attributes.kategori.data[0].attributes.url;
                return (
                  <div
                    key={index}
                    classNameName="px-2 py-1 border-gray-400 shadow-lg"
                  >
                    <Link href={`/galeri/${item.attributes.slug}`}>
                      <Image
                        classNameName="max-w-full rounded-lg h-56 "
                        src={process.env.NEXT_PUBLIC_HOST + urlImg}
                        width={500}
                        height={500}
                        alt=""
                      />
                      <div>
                        <p classNameName="text-sm text-gray-500 pt-2 pb-2 italic font-bold">
                          {item.attributes.nama_album}
                        </p>
                      </div>
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
