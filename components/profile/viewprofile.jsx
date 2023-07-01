import { useRecoilState } from "recoil";
import useSWR from "swr";
import { viewState } from "../../store";

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });

export default function Viewdata({ user }) {
  const [IsView, setIsView] = useRecoilState(viewState);
  let url =
    process.env.NEXT_PUBLIC_HOST + "/api/users/" + user.id + "?populate=*";
  let token = process.env.NEXT_PUBLIC_TOKEN;

  const { data, error, isLoading } = useSWR([url, token], fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>Field to load</div>;
  if (isLoading) return <div>Loading...</div>;

  if (data.anggota === null) {
    return setIsView(false);
  }

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
      <div className="w-full md:w-9/12 mx-2 h-64">
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
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
            <span className="tracking-wide">Tentang Saya</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Nama Lengkap</div>
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
                <div className="px-4 py-2 font-semibold">Nomor Kontak</div>
                <div className="px-4 py-2">{data.anggota.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Alamat</div>
                <div className="px-4 py-2">{data.anggota.alamat}</div>
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
                <div className="px-4 py-2">
                  {formatDate(data.anggota.tanggal_lahir)}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Agama</div>
                <div className="px-4 py-2">{data.anggota.agama}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gol Darah</div>
                <div className="px-4 py-2">{data.anggota.golongan_darah}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Jabatan</div>
                <div className="px-4 py-2">{data.anggota.jabatan}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Jabatan Kerukunan</div>
                <div className="px-4 py-2">
                  {data.anggota.jabatan_kerukunan}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Nomor KTP</div>
                <div className="px-4 py-2">{data.anggota.nik}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">
                  Nomor Kartu Keluarga
                </div>
                <div className="px-4 py-2">{data.anggota.nkk}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Pekerjaan</div>
                <div className="px-4 py-2">
                  {data.anggota.pekerjaan_sekarang}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">
                  Pendidikan Terakhir
                </div>
                <div className="px-4 py-2">{data.anggota.pendidikan}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Status perkawinan</div>
                <div className="px-4 py-2">
                  {data.anggota.status_perkawinan}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Templat Lahir</div>
                <div className="px-4 py-2">{data.anggota.tempat_lahir}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4"></div>
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
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
            <span className="tracking-wide">Tentang Saya</span>
          </div>
          <div className="text-gray-700">
            <div className="px-4 py-2">{data.anggota.desc}</div>
          </div>
        </div>

        <div className="my-4"></div>

        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="grid grid-cols-2">
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
                <span className="tracking-wide">Pendidikan Formal</span>
              </div>
              <ul className="list-inside space-y-2 pb-5">
                {data.riwayat_pendidikans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.nama}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{formatDate(item.star_date)}</div>
                        <div>{formatDate(item.finish_date)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                <span className="tracking-wide">Pendidikan Non Formal</span>
              </div>
              <ul className="list-inside space-y-2 pb-5">
                {data.pendidikannonformals.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.nama}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{formatDate(item.star_date)}</div>
                        <div>{formatDate(item.finish_date)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                <span className="tracking-wide">Pengalaman Bekerja</span>
              </div>
              <ul className="list-inside space-y-2 pb-5">
                {data.riwayat_pekerjaans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.nama}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{formatDate(item.star_date)}</div>
                        <div>{formatDate(item.finish_date)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                <span className="tracking-wide">Penghargaan di Terimah</span>
              </div>
              <ul className="list-inside space-y-2 pb-5">
                {data.penghargaans.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="text-teal-600">{item.desc}</div>
                      <div className="text-gray-500 text-xs flex space-x-3">
                        <div>{item.nama}, </div>
                        <div>{formatDate(item.tgl_terima)}</div>
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
