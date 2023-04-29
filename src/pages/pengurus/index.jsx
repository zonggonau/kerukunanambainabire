import Head from "next/head";
import Image from "next/image";
import person from "../../../public/assets/img/person.jpg";
import Bidang from "../../../components/pengurus/bidang";

export default function Organisasi({ data }) {
  return (
    <>
      <Head>
        <title>Organisasi</title>
      </Head>
      <main>
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-5xl">
                DEWAN PENASIHAT DAN PENGURUS HARIAN
              </h2>
              {/* <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p> */}
            </div>
            <div>
              <div className="max-w-2xl mx-auto text-center pt-14">
                <h2 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-3xl">
                  DEWAN PENASIHAT
                </h2>
                <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis.
                </p>
              </div>
              <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
                {data.map((item, index) => {
                  // const keret = item.attributes.Keret;
                  // const photo =
                  //   item.attributes.photo_profile.data.attributes.formats
                  //     .thumbnail.url;

                  // const nama = item.attributes.Nama;
                  const slug = item;
                  // const jabatan =
                  //   item.attributes.jabatan_kerukunan.data.attributes.jabatan;
                  // console.log(slug);
                  if (
                    slug === "penasehat-organisasi" ||
                    slug === "penasehat-urusan-adat" ||
                    slug === "penasehat-urusan-hukum" ||
                    slug === "penasehat-kerohanian"
                  ) {
                    return (
                      <>
                        <div key={index}>
                          <Image
                            className="object-cover mx-auto rounded-lg w-28 h-28"
                            src={`http://kerukunanambainabire.com:1337${photo}`}
                            width={100}
                            height={100}
                            alt=""
                          />
                          <p className="mt-8 text-lg font-semibold leading-tight text-black">
                            {nama}
                          </p>
                          <p className="mt-1 text-base leading-tight text-gray-600">
                            {jabatan}
                          </p>
                        </div>
                        <div className="hidden lg:block"></div>
                      </>
                    );
                  }
                })}
              </div>
              <div className="max-w-2xl mx-auto text-center pt-14">
                <h2 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-3xl">
                  BADAN PENGURUS HARIAN
                </h2>
                <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis.
                </p>
              </div>
              <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
                {data.map((item, index) => {
                  // const keret = item.attributes.Keret;
                  // const photo =
                  //   item.attributes.photo_profile.data.attributes.formats
                  //     .thumbnail.url;
                  // const nama = item.attributes.Nama;
                  const slug = item;
                  // const jabatan =
                  //   item.attributes.jabatan_kerukunan.data.attributes.jabatan;

                  if (
                    slug === "ketua-umum" ||
                    slug === "wakil-ketua-i" ||
                    slug === "wakil-ketua-ii" ||
                    slug === "sekretaris-umum" ||
                    slug === "wakil-sekretaris-i" ||
                    slug === "wakil-sekretaris-ii" ||
                    slug === "bendahara-umum" ||
                    slug === "wakil-bendahara"
                  ) {
                    return (
                      <>
                        <div key={index}>
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
                            {jabatan}
                          </p>
                        </div>
                        <div className="hidden lg:block"></div>
                      </>
                    );
                  }
                })}
              </div>
              <div className="max-w-2xl mx-auto text-center pt-14">
                <h2 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-3xl">
                  BIDANG - BIDANG
                </h2>
                <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis.
                </p>
              </div>
              <Bidang data={data} title={"Kerohanian"} slugs={"kerohanian"} />
              <Bidang
                data={data}
                title={"Kepemudaan dan Ekonomi Kreatif"}
                slugs={"kepemudaan-dan-ekonomi-kreatif"}
              />
              <Bidang
                data={data}
                title={"Pemberdayaan Perempuan"}
                slugs={"pemberdayaan-perempuan"}
              />
              <Bidang
                data={data}
                title={"Pelayanan Diakonia"}
                slugs={"pelayanan-diakonia"}
              />
              <Bidang
                data={data}
                title={"Pelayanan Kedudukan"}
                slugs={"pelayanan-kedudukan"}
              />
              <Bidang data={data} title={"Urusan Adat"} slugs={"urusan-adat"} />
              <Bidang data={data} title={"Humas"} slugs={"humas"} />
              <Bidang
                data={data}
                title={"Pengembangan SDM"}
                slugs={"Pengembangan-sdm"}
              />
              <Bidang
                data={data}
                title={"Pelayanan Kesehatan"}
                slugs={"pelayanan-kesehatan"}
              />
              <Bidang
                data={data}
                title={"Seni dan Kebudayaan"}
                slugs={"seni-dan-kebudayaan"}
              />
              <Bidang data={data} title={"Keamanan"} slugs={"keamanan"} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      sort: ["id"],
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
