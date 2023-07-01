import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Keret({ data }) {
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
      <Head>
        <title>Ketua-Ketua Keret</title>
      </Head>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              KETUA - KETUA KERET
            </h2>
            <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
            {data.map((item, index) => {
              return (
                <>
                  <div key={index}>
                    <Image
                      className="object-cover mx-auto rounded-lg w-44 h-44 lg:rounded-full lg:h-auto"
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
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      filters: {
        jabatan_kerukunan: {
          $eq: "Ketua Keret",
        },
      },
      populate: "*",
    },

    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/anggotas?" + query,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return {
    props: data,
  };
}
