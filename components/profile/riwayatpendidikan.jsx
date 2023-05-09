import useSWR from "swr";
import { useRecoilState } from "recoil";
import { riwayatPendidikanState } from "../../store";

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });

export default function RiwayatPendidikan({ user }) {
  const [rpendidikan, setRPendidikan] = useRecoilState(riwayatPendidikanState);

  let url = process.env.NEXT_PUBLIC_HOST + "/api/riwayat-pendidikans/";
  let token = process.env.NEXT_PUBLIC_TOKEN;

  const { data, error, isLoading } = useSWR([url, token], fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>Field to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleChangePendidikan = (e) => {
    setRPendidikan((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  function formatDate(date) {
    var newDate = date.split("/").reverse().join("-");
    return newDate;
  }

  async function handleSavePendidikan(e) {
    e.preventDefault();
    const req = await fetch(
      process.env.NEXT_PUBLIC_HOST +
        "/api/riwayat-pendidikans?populate=users_permisions_user",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            nama: rpendidikan.nama,
            star_date: formatDate(rpendidikan.star_date),
            finish_date: formatDate(rpendidikan.finish_date),
            users_permissions_user: [user.id],
            desc: rpendidikan.desc,
          },
        }),
      }
    );

    const res = await req.json();
  }

  return (
    <>
      <div>
        <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 pt-10">
            <span className="text-green-500">
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
            <span className="tracking-wide">Riwayat Pendidikan</span>
          </div>
          <form onSubmit={handleSavePendidikan} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div>
                <input
                  onChange={handleChangePendidikan}
                  name="nama"
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Masukan Nama Sekolah"
                  type="text"
                  id="nama"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
                    Mulai,
                  </div>
                  <input
                    onChange={handleChangePendidikan}
                    name="star_date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tahun Masuk"
                  />
                </div>
              </div>
              <div>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
                    Selesai,
                  </div>
                  <input
                    onChange={handleChangePendidikan}
                    name="finish_date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          {" "}
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span className="text-green-500">
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
            {data.data.map((item, index) => (
              <li key={index}>
                <div className="text-teal-600">{item.attributes.nama}</div>
                <div className="text-gray-500 text-xs">
                  {item.attributes.star_date} {item.attributes.finish_date}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
