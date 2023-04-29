import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { viewState } from "../../../../../store";
import { useState } from "react";

export default function Leftbar({ handleEdit, pp, user }) {
  const [isView, setIsView] = useRecoilState(viewState);
  const [localView, setLocalView] = useState(false);
  const [image, setImage] = useState(null);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);
  const PhotoDefault =
    "http://kerukunanambainabire.com:1337/uploads/Untitled_5f2cc72ef0.png";

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
          users_permissions_user: user.id,
        },
      }),
    });
  }
  console.log(pp);

  // const photoProfile = pp.formats.thumbnail.url;
  // console.log(photoProfile);

  return (
    <>
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
                src={process.env.NEXT_PUBLIC_HOST + pp}
                width={500}
                height={500}
                alt=""
              />
            )}

            {isView == false ? (
              <form onSubmit={uploadImage}>
                <div className="flex bg-blue-500">
                  <input
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
            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
            deserunt
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
    </>
  );
}
