import { atom } from "recoil";

const successState = atom({
  key: "successState",
  default: false,
});

const errorState = atom({
  key: "errorState",
  default: false,
});

const userState = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
  },
});

const viewState = atom({
  key: "viewState",
  default: true,
});

const codeDistrikState = atom({
  key: "codeDistrikState",
  default: "",
});

const anggotaState = atom({
  key: "anggotaState",
  default: {
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    rt_rw: "",
    nik: "",
    nkk: "",
    jabatan: "",
    status_perkawinan: "",
    kelurahan: "",
    agama: "",
    photo_profile: "",
    distrik: "",
    pendidikan: "",
    keret: "",
    email: "",
    pekerjaan_sekarang: "",
    jabatan_kerukunan: "",
    users_permissions_user: "",
    phone: "",
    golongan_darah: "",
    desc: "",
  },
});

const registerState = atom({
  key: "registerState",
  default: {
    username: "",
    email: "",
    password: "",
  },
});

const riwayatPendidikanState = atom({
  key: "riwayatPendidikanState",
  default: {
    nama: "",
    star_date: "",
    finish_date: "",
    desc: "",
    users_permissions_user: "",
    kota: "",
  },
});

const PendidikanNonFormalState = atom({
  key: "PendidikanNonFormalState",
  default: {
    nama: "",
    star_date: "",
    finish_date: "",
    desc: "",
    users_permissions_user: "",
    penyelenggara: "",
  },
});

const riwayatPekerjaanState = atom({
  key: "riwayatPekerjaanState",
  default: {
    instansi: "",
    star_date: "",
    finish_date: "",
    desc: "",
    users_permissions_user: "",
  },
});

export {
  userState,
  viewState,
  anggotaState,
  registerState,
  riwayatPekerjaanState,
  riwayatPendidikanState,
  successState,
  errorState,
  codeDistrikState,
  PendidikanNonFormalState,
};
