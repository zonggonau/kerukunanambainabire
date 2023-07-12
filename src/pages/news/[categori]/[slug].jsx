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

  const author =
    data[0].attributes.users_permissions_user.data.attributes.username;
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

      <div class="container mx-auto py-8 bg-gray-50 px-3">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-3xl font-bold mb-4">{judul}</h1>
          <p class="text-gray-600 mb-4">
            Tanggal: {formatDate()}, Editor: {author || "admin"}, View: 1000
          </p>

          <Image
            src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
            alt={thumnailName}
            width={1000}
            height={1000}
            class="mb-4"
          />

          <div class="text-gray-800 leading-relaxed mb-8"> {parse(konten)}</div>

          <div class="flex items-center mb-8 space-x-5">
            <span class="mr-4 text-gray-600">Bagikan:</span>

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

          <h2 class="text-xl font-semibold mb-4">Posting Terkait</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-lg shadow-md p-4">
              <Image
                src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
                alt={thumnailName}
                height={1000}
                width={1000}
                class="mb-4"
              />
              <h3 class="text-lg font-semibold mb-2">
                Judul Posting Terkait 1
              </h3>
              <p class="text-gray-600">Tanggal Posting Terkait 1</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-4">
              <Image
                src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
                alt={thumnailName}
                height={1000}
                width={1000}
                class="mb-4"
              />
              <h3 class="text-lg font-semibold mb-2">
                Judul Posting Terkait 2
              </h3>
              <p class="text-gray-600">Tanggal Posting Terkait 2</p>
            </div>
          </div>
        </div>
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
