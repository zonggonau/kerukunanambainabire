import Image from "next/image";
import { useEffect, useState } from "react";
export default function Bidang({ data, title }) {
  const getUserId = data.map((item) => {
    return item.attributes.users_permissions_user.data.id;
  });

  const [imgProfile, setImgProfile] = useState(
    "/uploads/Untitled_5f2cc72ef0.png"
  );
  async function getProfileImage(idPic) {
    if (idPic != null) {
      const req = await fetch(
        process.env.NEXT_PUBLIC_HOST + "/api/upload/files/" + idPic,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
          },
        }
      );
      const res = await req.json();
      const ImgProfile = await res.url;
      setImgProfile(ImgProfile);
    }
  }

  async function userPhoto() {
    let req = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/users/" + getUserId + "?populate=*",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );

    let data = await req.json();
    let id_pic = await data.photo_profile.id_image;
    getProfileImage(id_pic);
  }

  useEffect(() => {
    userPhoto().catch(console.error);
  });

  return (
    <>
      <div className="max-w-2xl mx-auto text-center pt-14">
        <h4 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-2xl mt-10">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
        {data.map((item, index) => {
          if (title == item.attributes.jabatan_kerukunan) {
            return (
              <>
                <div key={index}>
                  <Image
                    className="object-cover mx-auto rounded-lg w-28 h-28"
                    src={process.env.NEXT_PUBLIC_HOST + imgProfile}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <p className="mt-8 text-lg font-semibold leading-tight text-black">
                    {item.attributes.nama}
                  </p>
                  <p className="mt-1 text-base leading-tight text-gray-600">
                    {item.attributes.jabatan_kerukunan}
                  </p>
                </div>
                <div className="hidden lg:block"></div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
