import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function ProgramKerja(data) {
  function formatDate(tgl) {
    const d = new Date(tgl);
    const tahun = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const mString = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const dateString = date + " " + mString[month - 1] + " " + tahun;
    return dateString;
  }
  return (
    <>
      <Head>
        <title>Program Kerja</title>
      </Head>
      <main>
        <section className="py-10 bg-white sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Program Kerja
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div className="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-10 gap-y-12">
              {data.data.map((item) => {
                const kategori = item.attributes.kategori.data.attributes.slug;
                const slug = item.attributes.slug;

                const thumnailUrl =
                  item.attributes.featured.data.attributes.formats.thumbnail
                    .url;
                const thumnailName =
                  item.attributes.featured.data.attributes.formats.thumbnail
                    .name;
                if (kategori == "program-kerja") {
                  return (
                    <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                      <Link
                        href={`/news/${kategori}/${slug}`}
                        title=""
                        className="block aspect-w-4 aspect-h-3"
                      >
                        <Image
                          className="h-56 w-full object-cover"
                          src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
                          width={500}
                          height={500}
                          alt={thumnailName}
                        />
                      </Link>
                      <div className="bg-white p-4 sm:p-6">
                        <span className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-rose-500 bg-rose-100">
                          {kategori}
                        </span>
                        <p className="mt-6 text-md font-semibold">
                          <Link
                            href="#"
                            title=""
                            className="mt-0.5 text-md text-gray-900"
                          >
                            {item.attributes.judul.substring(0, 100)}
                          </Link>
                        </p>
                        {/* <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                         
                        </p> */}
                        <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                        <span className="block font-bold tracking-widest text-gray-500 uppercase  text-xs ">
                          {formatDate(item.attributes.tanggal_berita)}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
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
    `${process.env.NEXT_PUBLIC_HOST}/api/posts?${query}`,
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
