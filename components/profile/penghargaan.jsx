import useSWR from "swr";
import React from "react";
import { useRecoilState } from "recoil";
import { penghargaanState } from "../../store";

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
export default function Penghargaan({ user }) {
  const [penghargaan, setPenghargaan] = useRecoilState(penghargaanState);

  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: {
        penghargaans: {
          sort: ["tgl_terima:DESC"],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  let url =
    process.env.NEXT_PUBLIC_HOST + "/api/users/" + user.id + "?" + query;
  let token = process.env.NEXT_PUBLIC_TOKEN;

  const { data, error, isLoading } = useSWR([url, token], fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>Field to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleChangePenghargaan = (e) => {
    setPenghargaan((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  function formatDate(date) {
    var newDate = date.split("/").reverse().join("-");
    return newDate;
  }

  async function handleSavePenghargaan(e) {
    e.preventDefault();

    await fetch(
      process.env.NEXT_PUBLIC_HOST +
        "/api/penghargaans?populate=users_permisions_user",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            nama: penghargaan.nama,
            kota: penghargaan.kota,
            tgl_terima: formatDate(penghargaan.tgl_terima),
            desc: penghargaan.desc,
            users_permissions_user: [user.id],
          },
        }),
      }
    );
    setPenghargaan({
      nama: "",
      kota: "",
      tgl_terima: "",
      desc: "",
    });
  }

  const delItem = async (id) => {
    await fetch(process.env.NEXT_PUBLIC_HOST + "/api/penghargaans/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
        "Content-Type": "application/json",
      },
    });
  };

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
            <span className="tracking-wide">Penghargaan Diterima</span>
          </div>
          <form onSubmit={handleSavePenghargaan} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <input
                  onChange={handleChangePenghargaan}
                  value={penghargaan.nama}
                  required
                  name="nama"
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Instansi Pemberi Penghargaan"
                  type="text"
                  id="nama"
                />
              </div>
              <div>
                <input
                  onChange={handleChangePenghargaan}
                  value={penghargaan.kota}
                  name="kota"
                  required
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="kota Penghargaan"
                  type="text"
                  id="kota"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <textarea
                value={penghargaan.desc}
                onChange={handleChangePenghargaan}
                name="desc"
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Keterangan..."
                rows="2"
                id="message"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
                    Tanggal Terima,
                  </div>
                  <input
                    onChange={handleChangePenghargaan}
                    value={penghargaan.tgl_terima}
                    name="tgl_terima"
                    required
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <span className="tracking-wide">Experience</span>
          </div>
          <ul className="list-inside space-y-2">
            {data.penghargaans.map((item, index) => (
              <div className="flex" key={index}>
                <div>
                  <li>
                    <div className="text-teal-600">{item.nama}</div>
                    <div className="text-gray-500 text-xs space-x-5">
                      <span className="text-black">{item.kota},</span>{" "}
                      {item.tgl_terima}
                      <span
                        className="cursor-pointer bg-red-500 text-white  rounded-md pl-2 pr-2"
                        onClick={() => delItem(item.id)}
                      >
                        Hapus
                      </span>
                    </div>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
