import { useRecoilValue } from "recoil";
import { anggotaState } from "../../store";
import { useEffect, useState } from "react";

export default function Alamat({ handleChange, distrik }) {
  const anggota = useRecoilValue(anggotaState);
  const [kelurahan, setKelurahan] = useState([]);
  useEffect(() => {
    const getKelurahan = async () => {
      // get the data from the api
      const req = await fetch(
        `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${anggota.distrik}.json`
      );
      // convert the data to json
      const res = await req.json();

      // set state with the result
      setKelurahan(res);
    };
    getKelurahan().catch(console.error);
  }, [kelurahan]);

  return (
    <>
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
        <span className="tracking-wide">Alamat Domisili</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <select
            required
            value={anggota.distrik}
            name="distrik"
            id="distrik"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Distrik/Kecamatan</option>
            {distrik.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            required
            name="kelurahan"
            value={anggota.kelurahan}
            onChange={handleChange}
            id="kelurahan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Kelurahan/Kampung</option>

            {kelurahan.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            required
            value={anggota.rt_rw}
            onChange={handleChange}
            name="rt_rw"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="RT/RW"
            type="text"
            id="rtrw"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <div>
          <input
            value={anggota.alamat}
            required
            onChange={handleChange}
            name="alamat"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Alamat Domisili"
            type="text"
            id="alamat"
          />
        </div>
      </div>
    </>
  );
}
