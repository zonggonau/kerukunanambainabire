import useSWR from "swr";
import About from "./comprofile/about";
import Ktp from "./comprofile/ktp";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  anggotaState,
  errorState,
  riwayatPekerjaanState,
  riwayatPendidikanState,
  successState,
  viewState,
} from "../../../../store";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import {
  getDistrik,
  getJabatan,
  getKerukunan,
  getProfileImage,
} from "../../../../lib/API";
import Header from "./comprofile/header";
import { useEffect, useState } from "react";
import Notif from "./comprofile/notif";

export default function Profile({
  distrik,
  jabatan,
  kerukunan,
  myprofile,
  profileImage,
  user,
}) {
  const router = useRouter();
  const [isView, setIsView] = useRecoilState(viewState);
  const [kelurahan, setKelurahan] = useState([]);
  const [profile, setProfile] = useState(myprofile);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useRecoilState(successState);
  const [error, setError] = useRecoilState(errorState);

  const [rpendidikan, setRPendidikan] = useRecoilState(riwayatPendidikanState);
  const [rpekerjaan, setRPekerjaan] = useRecoilState(riwayatPekerjaanState);
  const [anggota, setAnggota] = useRecoilState(anggotaState);

  const handleChange = (e) => {
    if (e.target.id === "distrik") {
      getKelurahan(e.target.value);
    }
    setAnggota((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  async function getKelurahan(code) {
    let req = await fetch(
      `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${code}.json`
    );

    let data = await req.json();
    setKelurahan(data);
  }

  function formatDate(date) {
    var newDate = date.split("/").reverse().join("-");
    return newDate;
  }

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
    console.log(res);
    // console.log(anggota);
    // setSuccess(true);
    // setIsView(true);
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
      }
    );

    const data = await req.json();
    console.log(data);
  }

  function handleEdit() {
    setIsView(false);
    if (profile.anggota != null) {
      getKelurahan(profile.anggota.distrik);
    }
    var data = profile.anggota == null ? { anggota } : profile.anggota;
    setAnggota(data);
  }

  const renderDistrik = distrik.map((item) => {
    return <option value={item.id}>{item.name}</option>;
  });

  const renderJabatan = jabatan.map((item) => (
    <option value={item.id}>{item.attributes.nama_jabatan}</option>
  ));
  const renderKerukunan = kerukunan.map((item) => (
    <option value={item.id}>{item.attributes.jabatan}</option>
  ));

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

  const handleChangePekerjaan = (e) => {
    setRPekerjaan((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  function formatDate(date) {
    var newDate = date.split("/").reverse().join("-");
    return newDate;
  }

  async function handleSavePekerjaan(e) {
    e.preventDefault();

    const req = await fetch(
      process.env.NEXT_PUBLIC_HOST +
        "/api/riwayat-pekerjaans?populate=users_permisions_user",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            instansi: rpekerjaan.instansi,
            star_date: formatDate(rpekerjaan.star_date),
            finish_date: formatDate(rpekerjaan.finish_date),
            users_permissions_user: [user.id],
            desc: rpekerjaan.desc,
          },
        }),
      }
    );

    const res = await req.json();
  }

  const [imgProfile, setImgProfile] = useState(
    "/uploads/Untitled_5f2cc72ef0.png"
  );

  async function getProfileImage() {
    if (profile.photo_profile != null) {
      const req = await fetch(
        process.env.NEXT_PUBLIC_HOST +
          "/api/upload/files/" +
          profile.photo_profile.id_image,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          },
        }
      );
      const res = await req.json();
      const ImgProfile = await res.formats.thumbnail.url;
      setImgProfile(ImgProfile);
    }
  }
  const [localView, setLocalView] = useState(false);
  const [image, setImage] = useState(null);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);

  function handleImage(e) {
    setLocalView(true);
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);
      setCreateObjectUrl(URL.createObjectURL(i));
    }
  }

  async function uploadImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);

    const req = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
      },
      body: formData,
    });
    const res = await req.json();
    const imageId = res[0].id;
    await fetch(process.env.NEXT_PUBLIC_HOST + "/api/photo-profiles", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          image: imageId,
          id_image: imageId,
          users_permissions_user: user.id,
        },
      }),
    });
  }

  function logout() {
    nookies.destroy(null, "token");
    nookies.destroy(null, "id");
    nookies.destroy(null, "name");
    nookies.destroy(null, "email");
    destroyCookie(null, "token");
    destroyCookie(null, "id");
    destroyCookie(null, "name");
    destroyCookie(null, "email");
    router.replace("/");
  }

  useEffect(() => {
    getProfileImage();
  }, []);

  return (
    <>
      <div className="bg-gray-200">
        <Header logout={logout} user={user.name} />
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2">
            {/* LEFTBAR */}
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="rounded-lg p-3 bg-white  shadow-lg lg:col-span-3 lg:p-3">
                <div className="image overflow-hidden">
                  {localView ? (
                    <img
                      className="h-auto w-full mx-auto"
                      src={createObjectUrl}
                      width={500}
                      height={500}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-auto w-full mx-auto"
                      src={process.env.NEXT_PUBLIC_HOST + imgProfile}
                      width={500}
                      height={500}
                      alt=""
                    />
                  )}

                  {isView == false ? (
                    <form onSubmit={uploadImage}>
                      <div className="flex bg-blue-500">
                        <input
                          required
                          class="block w-full text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          type="file"
                          onChange={handleImage}
                          name="photo_profile"
                        />
                        <button type="submit" className="pl-2 pr-2 text-sm">
                          Upload
                        </button>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  Jane Doe
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  Owner at Her Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {isView ? (
                        <button
                          className="bg-green-500 py-1 px-2 rounded text-white text-sm"
                          onClick={() => handleEdit()}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 py-1 px-2 rounded text-white text-sm"
                          onClick={() => setIsView(true)}
                        >
                          view
                        </button>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
              <div className="my-4"></div>
              <div className="rounded-lg bg-white p-3 shadow-lg lg:col-span-3 lg:p-3">
                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span>Similar Profiles</span>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-center my-2">
                    <img
                      className="h-16 w-16 rounded-full mx-auto"
                      src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                      alt=""
                    />
                    <a href="#" className="text-main-color">
                      Kostantin
                    </a>
                  </div>
                  <div className="text-center my-2">
                    <img
                      className="h-16 w-16 rounded-full mx-auto"
                      src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                      alt=""
                    />
                    <a href="#" className="text-main-color">
                      James
                    </a>
                  </div>
                  <div className="text-center my-2">
                    <img
                      className="h-16 w-16 rounded-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                    <a href="#" className="text-main-color">
                      Natie
                    </a>
                  </div>
                  <div className="text-center my-2">
                    <img
                      className="h-16 w-16 rounded-full mx-auto"
                      src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                      alt=""
                    />
                    <a href="#" className="text-main-color">
                      Casey
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* END LEFTBAR */}
            <div className="my-4"></div>
            {isView ? (
              <>
                <Notif />
                {profile.anggota != null ? (
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
                            <div className="px-4 py-2 font-semibold">
                              First Name
                            </div>
                            <div className="px-4 py-2">
                              {profile.anggota.nama}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Keret</div>
                            <div className="px-4 py-2">
                              {profile.anggota.keret}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Jenis Kelamin
                            </div>
                            <div className="px-4 py-2">
                              {profile.anggota.jenis_kelamin}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Contact No.
                            </div>
                            <div className="px-4 py-2">
                              {profile.anggota.phone}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Current Address
                            </div>
                            <div className="px-4 py-2">
                              {profile.anggota.alamat}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Permanant Address
                            </div>
                            <div className="px-4 py-2">
                              Arlington Heights, IL, Illinois
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Email.
                            </div>
                            <div className="px-4 py-2">
                              <a
                                className="text-blue-800"
                                href="mailto:jane@example.com"
                              >
                                {profile.anggota.email}
                              </a>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Birthday
                            </div>
                            <div className="px-4 py-2">
                              {profile.anggota.tanggal_lahir}
                            </div>
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
                            {profile.riwayat_pekerjaans.map((item, index) => {
                              return (
                                <li key={index}>
                                  <div className="text-teal-600">
                                    {item.instansi}
                                  </div>
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
                            {profile.riwayat_pendidikans.map((item, index) => {
                              return (
                                <li key={index}>
                                  <div className="text-teal-600">
                                    {item.nama}
                                  </div>
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
                ) : (
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
                            <div className="px-4 py-2 font-semibold">
                              First Name
                            </div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Keret</div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Jenis Kelamin
                            </div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Contact No.
                            </div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Current Address
                            </div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Permanant Address
                            </div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Email.
                            </div>
                            <div className="px-4 py-2">
                              <a
                                className="text-blue-800"
                                href="mailto:jane@example.com"
                              ></a>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Birthday
                            </div>
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
                            {profile.riwayat_pekerjaans.map((item, index) => {
                              return (
                                <li key={index}>
                                  <div className="text-teal-600">
                                    {item.instansi}
                                  </div>
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
                            {profile.riwayat_pendidikans.map((item, index) => {
                              return (
                                <li key={index}>
                                  <div className="text-teal-600">
                                    {item.nama}
                                  </div>
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
                )}
              </>
            ) : (
              <>
                <div className="w-full md:w-9/12 mx-2 h-64">
                  <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-6">
                    <form
                      onSubmit={
                        profile.anggota == null ? handleSave : handleUpdate
                      }
                      className="space-y-4"
                    >
                      <About handleChange={handleChange} profile={profile} />
                      <Ktp handleChange={handleChange} />
                      {/* alamat */}
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
                              {renderDistrik}
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
                      {/* and alamat */}
                      {/* jabatan */}
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
                              <option value="SMP">
                                Sekolah Menengah (SMP)
                              </option>
                              <option value="SMA">
                                Sekolah Menengah Atas (SMA/SMK)
                              </option>
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
                              <option value="TIDAK BEKERJA">
                                TIDAK BEKERJA
                              </option>
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
                              {renderJabatan}
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
                              {renderKerukunan}
                            </select>
                          </div>
                        </div>
                      </>
                      {/* and jabatan  */}
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
                    {/* pendidikan  */}
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
                            <span className="tracking-wide">
                              Riwayat Pendidikan
                            </span>
                          </div>
                          <form
                            onSubmit={handleSavePendidikan}
                            className="space-y-5"
                          >
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
                            {profile.riwayat_pendidikans.map((item, index) => (
                              <li key={index}>
                                <div className="text-teal-600">{item.nama}</div>
                                <div className="text-gray-500 text-xs">
                                  {item.star_date} {item.finish_date}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                    {/* end pendidikan  */}
                    {/* pekerjaan  */}
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
                            <span className="tracking-wide">
                              Riwayat Pekerjaan
                            </span>
                          </div>
                          <form
                            onSubmit={handleSavePekerjaan}
                            className="space-y-5"
                          >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                              <div>
                                <input
                                  onChange={handleChangePekerjaan}
                                  name="instansi"
                                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                  placeholder="Instansi Tempat Bekerja"
                                  type="text"
                                  id="pekerjaan"
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
                                    onChange={handleChangePekerjaan}
                                    name="star_date"
                                    type="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="relative max-w-sm">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
                                    Selesai,
                                  </div>
                                  <input
                                    onChange={handleChangePekerjaan}
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
                            {profile.riwayat_pekerjaans.map((item, index) => (
                              <li key={index}>
                                <div className="text-teal-600">
                                  {item.instansi}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {item.star_date} {item.finish_date}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                    {/* end pekerjaan  */}
                  </div>

                  <div className="my-4"></div>
                </div>
              </>
            )}
            {/* <EditProfile /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);
  const user = {
    id: cookie.id,
    name: cookie.name,
    email: cookie.email,
  };

  if (!cookie.token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  async function getProfile() {
    const req = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/users/" + user.id + "?populate=*",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );
    const res = await req.json();
    return res;
  }

  return {
    props: {
      distrik: await getDistrik(),
      jabatan: await getJabatan(),
      kerukunan: await getKerukunan(),
      myprofile: await getProfile(),
      user,
    },
  };
}
