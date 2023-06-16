import React, { useEffect, useRef } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Seo from "../../../../components/seo";
import { useRouter } from "next/router";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

export default function Slug({ data }) {
  const { asPath } = useRouter();

  const judul = data[0].attributes.judul;
  const konten = data[0].attributes.konten;
  const descriptions = data[0].attributes.descriptions;

  // const author =
  // data[0].attributes.users_permissions_user.data.attributes.username;
  const thumnailUrl = data[0].attributes.featured.data.attributes.url;
  const thumnailName =
    data[0].attributes.featured.data.attributes.formats.thumbnail.name;
  const seoImage = process.env.NEXT_PUBLIC_HOST + thumnailUrl;

  const tgl_berita = data[0].attributes.tanggal_berita;

  function formatDate() {
    const d = new Date(tgl_berita);
    const tahun = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const mString = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const dateString = date + " " + mString[month - 1] + " " + tahun;
    return dateString;
  }

  console.log(formatDate());

  return (
    <>
      <Seo judul={judul} descriptions={descriptions} image={seoImage} />

      <div className="max-w-screen-lg mx-auto">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                {judul}
              </h2>
              <a
                href="#"
                className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
              >
                {formatDate()}
              </a>
            </div>

            <Image
              src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
              alt={thumnailName}
              width={1000}
              height={1000}
              className="w-full h-60 sm:h-96 dark:bg-gray-500"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12 pb-10">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              {parse(konten)}
            </div>

            <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
              <div className="p-4 border-t border-b md:border md:rounded">
                <div className="flex py-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/97.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">
                      {" "}
                      Mike Sullivan{" "}
                    </p>
                    <p className="font-semibold text-gray-600 text-xs">
                      {" "}
                      Editor{" "}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 py-3">
                  Mike writes about technology Yourself required no at thoughts
                  delicate landlord it be. Branched dashwood do is whatever it.
                </p>
                <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                  Follow
                  <i className="bx bx-user-plus ml-2"></i>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="pb-5 lg:pl-0 pl-3">
            <p className="text-lg font-bold">Bagikan</p>
          </div>
          <div className="flex space-x-8 pb-10 lg:pl-0 pl-3">
            <div>
              <FacebookShareButton
                url={process.env.NEXT_PUBLIC_HOSTNAME + asPath}
                quote={judul}
                hashtag={"#IKKAN"}
              >
                <FacebookIcon size={35} round />
              </FacebookShareButton>
            </div>
            <div>
              <WhatsappShareButton
                url={process.env.NEXT_PUBLIC_HOSTNAME + asPath}
                quote={judul}
                hashtag={"#IKKAN"}
              >
                <WhatsappIcon size={35} round />
              </WhatsappShareButton>
            </div>
            <div>
              <TwitterShareButton
                url={process.env.NEXT_PUBLIC_HOSTNAME + asPath}
                quote={judul}
                hashtag={"#IKKAN"}
              >
                <TwitterIcon size={35} round />
              </TwitterShareButton>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const qs = require("qs");
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/posts?" + query,
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
