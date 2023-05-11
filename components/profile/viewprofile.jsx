import useSWR from "swr";

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });

export default function Viewdata({ user }) {
  let url =
    process.env.NEXT_PUBLIC_HOST + "/api/users/" + user.id + "?populate=*";
  let token = process.env.NEXT_PUBLIC_TOKEN;

  const { data, error, isLoading } = useSWR([url, token], fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>Field to load</div>;
  if (isLoading) return <div>Loading...</div>;

  if (data.anggota == null) {
    return (
      <div className="w-full md:w-9/12 mx-2 h-64">
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">View About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Keret</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Jenis Kelamin</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Current Address</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                <div className="px-4 py-2"></div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email.</div>
                <div className="px-4 py-2">
                  <a
                    className="text-blue-800"
                    href="mailto:jane@example.com"
                  ></a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Birthday</div>
                <div className="px-4 py-2"></div>
              </div>
            </div>
          </div>
          <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
            Show Full Information
          </button>
        </div>

        <div className="my-4"></div>

        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Experience</span>
              </div>
              <ul className="list-inside space-y-2">
                {data.riwayat_pekerjaans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.instansi}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{item.star_date}</div>
                        <div>{item.finish_date}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Education</span>
              </div>
              <ul className="list-inside space-y-2">
                {data.riwayat_pendidikans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.nama}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{item.star_date}</div>
                        <div>{item.finish_date}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full md:w-9/12 mx-2 h-64">
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">View About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">{data.anggota.nama}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Keret</div>
                <div className="px-4 py-2">{data.anggota.keret}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Jenis Kelamin</div>
                <div className="px-4 py-2">{data.anggota.jenis_kelamin}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2">{data.anggota.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Current Address</div>
                <div className="px-4 py-2">{data.anggota.alamat}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email.</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href="mailto:jane@example.com">
                    {data.anggota.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Birthday</div>
                <div className="px-4 py-2">{data.anggota.tanggal_lahir}</div>
              </div>
            </div>
          </div>
          <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
            Show Full Information
          </button>
        </div>

        <div className="my-4"></div>

        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Experience</span>
              </div>
              <ul className="list-inside space-y-2">
                {data.riwayat_pekerjaans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.instansi}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{item.star_date}</div>
                        <div>{item.finish_date}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Education</span>
              </div>
              <ul className="list-inside space-y-2">
                {data.riwayat_pendidikans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.nama}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{item.star_date}</div>
                        <div>{item.finish_date}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
