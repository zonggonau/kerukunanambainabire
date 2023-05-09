import { useRecoilValue } from "recoil";
import { anggotaState } from "../../store";

export default function Ktp({ handleChange, data }) {
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
        <span className="tracking-wide">Kartu Keluarga dan KTP</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            required
            name="nkk"
            value={anggota.nkk}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nomor Kartu Keluarga"
            type="number"
            id="name"
          />
        </div>
        <div>
          <input
            required
            value={anggota.nik}
            onChange={handleChange}
            name="nik"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Nomor Induk KTP"
            type="number"
            id="nik"
          />
        </div>
      </div>
    </>
  );
}
