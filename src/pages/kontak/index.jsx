import Head from "next/head";
import nookies from "nookies";

export default function Kontak({ data }) {
  return (
    <>
      <Head>
        <title> {data.attributes.title}</title>
      </Head>
      <main>
        <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {data.attributes.title}
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
                {data.attributes.desc}
              </p>
            </div>

            <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
              <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                <div className="overflow-hidden bg-white rounded-xl">
                  <div className="p-6">
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p className="mt-6 text-lg font-medium text-gray-900">
                      {data.attributes.phone}
                    </p>
                    {/* <p className="mt-1 text-lg font-medium text-gray-900">
                      +1-446-526-0117
                    </p> */}
                  </div>
                </div>

                <div className="overflow-hidden bg-white rounded-xl">
                  <div className="p-6">
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-6 text-lg font-medium text-gray-900">
                      {data.attributes.email}
                    </p>
                    {/* <p className="mt-1 text-lg font-medium text-gray-900">
                      hr@example.com
                    </p> */}
                  </div>
                </div>

                <div className="overflow-hidden bg-white rounded-xl">
                  <div className="p-6">
                    <svg
                      className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                      {data.attributes.alamat}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden bg-white rounded-xl">
                <div className="px-6 py-12 sm:p-12">
                  <iframe
                    src={data.attributes.map}
                    width="930"
                    height="550"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const req = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/kontak?populate=*",
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
