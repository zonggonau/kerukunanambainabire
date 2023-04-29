import { useRecoilValue } from "recoil";
import { anggotaState } from "../../../../../store";

export default function About({ handleChange, profile }) {
  const anggota = useRecoilValue(anggotaState);
  return (
    <>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            required
            name="nama"
            value={anggota.nama}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nama Lengkap"
            type="text"
            id="name"
          />
        </div>
        <div>
          <select
            required
            value={anggota.keret}
            onChange={handleChange}
            name="keret"
            id="keret"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Keret atau Marga</option>
            <option value="Karubaba">Karubaba</option>
            <option value="Maniani">Maniani</option>
            <option value="Fonataba">Fonataba</option>
            <option value="Waromi">Waromi</option>
            <option value="Kareni">Kareni</option>
            <option value="Numberi">Numberi</option>
            <option value="Marani">Marani</option>
            <option value="Muabuay">Muabuay</option>
            <option value="Wainggai">Wainggai</option>
            <option value="Waroi">Waroi</option>
            <option value="Rewang">Rewang</option>
            <option value="Wona">Wona</option>
            <option value="Oraopa">Oraopa</option>
            <option value="Woru">Woru</option>
            <option value="Aiwoi">Aiwoi</option>
            <option value="Imbiri">Imbiri</option>
            <option value="Yowei">Yowei</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <input
            required
            onChange={handleChange}
            value={anggota.tempat_lahir}
            name="tempat_lahir"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Tempat Kelahiran"
            type="text"
            id="tempatlahir"
          />
        </div>
        <div>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
              Tanggal,
            </div>
            <input
              required
              value={anggota.tanggal_lahir}
              onChange={handleChange}
              name="tanggal_lahir"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tahun Masuk"
            />
          </div>
        </div>
        <div>
          <select
            required
            value={anggota.jenis_kelamin}
            onChange={handleChange}
            name="jenis_kelamin"
            id="jenis_kelamin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <select
            required
            value={anggota.status_perkawinan}
            onChange={handleChange}
            name="status_perkawinan"
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Status Perkawinan</option>
            <option value="Menikah">Menikah</option>
            <option value="Belum Menika">Belum Menikah</option>
            <option value="Janda">Janda</option>
            <option value="Duda">Duda </option>
          </select>
        </div>
        <div>
          <select
            required
            name="agama"
            value={anggota.agama}
            onChange={handleChange}
            id="agama"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Agama</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
            <option value="Kristen katholik">Kristen Katholik</option>
            <option value="Islam">Islam</option>
            <option value="Hindu">Hindu </option>
            <option value="Budah">Budah </option>
          </select>
        </div>
        <div>
          <select
            required
            name="golongan_darah"
            value={anggota.golongan_darah}
            onChange={handleChange}
            id="golongan_dara"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Golongan Darah</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            required
            value={anggota.email}
            onChange={handleChange}
            name="email"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="email"
            type="email"
            id="email"
          />
        </div>
        <div>
          <input
            required
            value={anggota.phone}
            onChange={handleChange}
            name="phone"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nomor Tlpn / HP"
            type="number"
            id="number"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <textarea
          value={anggota.desc}
          onChange={handleChange}
          name="desc"
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Ceritakana tentang diri anda !"
          rows="5"
          id="message"
        ></textarea>
      </div>
    </>
  );
}
