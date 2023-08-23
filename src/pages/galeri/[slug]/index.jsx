import Head from "next/head";
import Image from "next/image";

export default function GaleriDetails({ data: dt }) {
  const { attributes } = dt[0];
  const { data } = attributes.kategori;
  return (
    <>
      <Head>
        <title>Detail Galeri</title>
      </Head>
      <main>
        <section className="py-10 bg-white sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                {attributes.nama_album}
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div classNameName="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 space-x-5">
              {data.map((item, index) => {
                const urlImg = item.attributes.url;
                return (
                  <div key={index} classNameName="shadow-lg">
                    <Image
                      classNameName="max-w-full rounded-lg h-auto"
                      src={process.env.NEXT_PUBLIC_HOST + urlImg}
                      width={500}
                      height={500}
                      alt=""
                    />
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

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { slug: "/galeri/[]" } }],
//     fallback: true,
//   };
// }

export async function getServerSideProps(ctx) {
  const slug = ctx.params.slug;
  const req = await fetch(
    process.env.NEXT_PUBLIC_HOST +
      "/api/galeris?filters[slug][$eq]=" +
      slug +
      "&populate=*",
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
