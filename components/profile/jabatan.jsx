import { anggotaState } from "../../store";
import { useRecoilValue } from "recoil";

export default function Jabatan({ handleChange, jabatan, kerukunan }) {
  const anggota = useRecoilValue(anggotaState);

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
        <span className="tracking-wide">
          Pendidikan, Pekerjaan dan Jabatan Sekarang
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <select
            value={anggota.pendidikan}
            required
            name="pendidikan"
            onChange={handleChange}
            id="pendidikan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pendidikan Terakhir</option>
            <option value="SD">Sekolah Dasar (SD)</option>
            <option value="SMP">Sekolah Menengah (SMP)</option>
            <option value="SMA">Sekolah Menengah Atas (SMA/SMK)</option>
            <option value="D3">Diploma (D3)</option>
            <option value="S1">Strata Satu (S1)</option>
            <option value="S2">Magister (S2) </option>
            <option value="S3">Doctor (S3)</option>
          </select>
        </div>
        <div>
          <select
            required
            value={anggota.pekerjaan_sekarang}
            onChange={handleChange}
            name="pekerjaan_sekarang"
            id="pekerjaan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pekerjaan Sekarang</option>
            <option value="PNS">PNS</option>
            <option value="WIRAUSAHA">WIRAUSAHA</option>
            <option value="GURUH">GURUH</option>
            <option value="DOSEN">DOSEN</option>
            <option value="NELAYAN">NELAYAN </option>
            <option value="PETANI">PETANI </option>
            <option value="BURUH">BURUH </option>
            <option value="TIDAK BEKERJA">TIDAK BEKERJA</option>
          </select>
        </div>
        <div>
          <select
            required
            value={anggota.jabatan}
            name="jabatan"
            onChange={handleChange}
            id="jabatan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Jabatan Dalam Pekerjaan</option>
            {jabatan.map((item, index) => (
              <option key={index} value={item.attributes.nama_jabatan}>
                {item.attributes.nama_jabatan}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            required
            value={anggota.jabatan_kerukunan}
            name="jabatan_kerukunan"
            onChange={handleChange}
            id="pendidikan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Jabatan Dalam Kerukunan</option>
            {kerukunan.map((item, index) => (
              <option key={index} value={item.attributes.jabatan}>
                {item.attributes.jabatan}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
