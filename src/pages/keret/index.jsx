import Head from "next/head";
import Image from "next/image";

export default function Keret({ data }) {
  return (
    <>
      <Head>
        <title>Ketua-Ketua Keret</title>
      </Head>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              KETUA - KETUA KERET
            </h2>
            <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
            {data.map((item) => {
              // const keret = item.attributes.Keret;
              // const photo =
              //   item.attributes.photo_profile.data.attributes.formats.thumbnail
              //     .url;
              // const nama = item.attributes.Nama;
              const jabatan = item.attributes.nama;
              console.log(jabatan);

              if (jabatan == 1) {
                return (
                  <>
                    <div>
                      <Image
                        className="object-cover mx-auto rounded-lg w-28 h-28"
                        src={process.env.NEXT_PUBLIC_HOST + photo}
                        width={100}
                        height={100}
                        alt=""
                      />
                      <p className="mt-8 text-lg font-semibold leading-tight text-black">
                        {nama}
                      </p>
                      <p className="mt-1 text-base leading-tight text-gray-600">
                        {keret}
                      </p>
                    </div>
                    <div className="hidden lg:block"></div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/anggotas?" + query,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return {
    props: data,
  };
}
