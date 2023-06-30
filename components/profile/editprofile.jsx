import About from "./about";
import Alamat from "./alamat";
import Jabatan from "./jabatan";
import Ktp from "./ktp";
import PendidikanFormal from "./pendidikanformal";
import PendidikanNonFormal from "./pendidikannonformal";
import RiwayatPekerjaan from "./riwayatpekerjaan";
import { anggotaState, successState, viewState } from "../../store";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import Penghargaan from "./penghargaan";

export default function Editdata({
  user,
  profile,
  jabatan,
  kerukunan,
  distrik,
}) {
  const [kelurahan, setKelurahan] = useState([]);
  const [anggota, setAnggota] = useRecoilState(anggotaState);
  const [success, setSuccess] = useRecoilState(successState);
  const [isView, setIsView] = useRecoilState(viewState);

  useEffect(() => {
    if (anggota.distrik !== "") {
      getKelurahan(anggota.distrik);
    }
  }, []);

  async function getKelurahan(code) {
    // get the data from the api
    const req = await fetch(
      "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" +
        code
    );
    // convert the data to json
    const { kelurahan } = await req.json();
    // set state with the result
    setKelurahan(kelurahan);
  }

  const handleChange = (e) => {
    if (e.target.id === "distrik") {
      // setKelurahan(e.target.value);
      getKelurahan(e.target.value);
    }
    setAnggota((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  async function handleSave(e) {
    e.preventDefault();

    const req = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/anggotas", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          nama: anggota.nama,
          tempat_lahir: anggota.tempat_lahir,
          tanggal_lahir: anggota.tanggal_lahir,
          jenis_kelamin: anggota.jenis_kelamin,
          alamat: anggota.alamat,
          rt_rw: anggota.rt_rw,
          nik: anggota.nik,
          nkk: anggota.nkk,
          email: anggota.email,
          jabatan: anggota.jabatan,
          status_perkawinan: anggota.status_perkawinan,
          kelurahan: anggota.kelurahan,
          agama: anggota.agama,
          photo_profile: anggota.photo_profile,
          distrik: anggota.distrik,
          pendidikan: anggota.pendidikan,
          keret: anggota.keret,
          pekerjaan_sekarang: anggota.pekerjaan_sekarang,
          jabatan_kerukunan: anggota.jabatan_kerukunan,
          users_permissions_user: user.id,
          phone: anggota.phone,
          golongan_darah: anggota.golongan_darah,
          desc: anggota.desc,
        },
      }),
    });

    const res = await req.json();
    if (res.data != null) {
      setSuccess(true);
      setIsView(true);
    }
    // console.log(anggota);
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const req = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/anggotas/" + profile.anggota.id,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            nama: anggota.nama,
            tempat_lahir: anggota.tempat_lahir,
            tanggal_lahir: anggota.tanggal_lahir,
            jenis_kelamin: anggota.jenis_kelamin,
            alamat: anggota.alamat,
            rt_rw: anggota.rt_rw,
            nik: anggota.nik,
            nkk: anggota.nkk,
            email: anggota.email,
            jabatan: anggota.jabatan,
            status_perkawinan: anggota.status_perkawinan,
            kelurahan: anggota.kelurahan,
            agama: anggota.agama,
            distrik: anggota.distrik,
            pendidikan: anggota.pendidikan,
            keret: anggota.keret,
            pekerjaan_sekarang: anggota.pekerjaan_sekarang,
            jabatan_kerukunan: anggota.jabatan_kerukunan,
            users_permissions_user: user.id,
            phone: anggota.phone,
            golongan_darah: anggota.golongan_darah,
            desc: anggota.desc,
          },
        }),
      }
    );

    const res = await req.json();
    if (res.data != null) {
      setSuccess(true);
      setIsView(true);
    }
  }

  return (
    <>
      <div className="w-full md:w-9/12 mx-2 h-64">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-6">
          <form
            onSubmit={profile.anggota == null ? handleSave : handleUpdate}
            className="space-y-4"
          >
            <About handleChange={handleChange} />
            <Ktp handleChange={handleChange} />
            <Alamat
              handleChange={handleChange}
              distrik={distrik}
              kelurahan={kelurahan}
            />
            <Jabatan
              handleChange={handleChange}
              jabatan={jabatan}
              kerukunan={kerukunan}
            />
            <div className="pt-5 pb-5">
              {profile.anggota == null ? (
                <button
                  type="submit"
                  className="bg-green-400  pr-10 pl-10 p-2 rounded-full text-white text-sm"
                >
                  Simpan
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-400  pr-10 pl-10 p-2 rounded-full text-white text-sm"
                >
                  Update
                </button>
              )}
            </div>
          </form>
          <hr />

          <PendidikanFormal user={user} />
          <PendidikanNonFormal user={user} />
          <RiwayatPekerjaan user={user} />
          <Penghargaan user={user} />
        </div>

        <div className="my-4"></div>
      </div>
    </>
  );
}
