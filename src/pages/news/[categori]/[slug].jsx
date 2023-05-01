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
  const thumnailUrl =
    data[0].attributes.featured.data.attributes.formats.thumbnail.url;
  const thumnailName =
    data[0].attributes.featured.data.attributes.formats.thumbnail.name;
  const seoImage = process.env.NEXT_PUBLIC_HOST + thumnailUrl;
  return (
    <>
      <Seo judul={judul} descriptions={descriptions} image={seoImage} />
      <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <Image
            src={process.env.NEXT_PUBLIC_HOST + thumnailUrl}
            alt={thumnailName}
            width={1000}
            height={1000}
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-900">
            <div className="space-y-2">
              <p
                rel="noopener noreferrer"
                href="#"
                className="inline-block text-2xl font-semibold sm:text-3xl"
              >
                {judul}
              </p>
              <div className="flex justify-between items-center">
                <div className="item-center">
                  <p className="text-md dark:text-gray-400">
                    {/* Oleh: {author}, Senin 20 April 2023 */}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="bg-blue-600 pr-3 pl-3 rounded-full">10</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="dark:text-gray-100">{parse(konten)}</div>
            <hr />
            <div>
              <p className="text-md dark:text-gray-400">Share it</p>
            </div>
            <div className="flex space-x-8 items-center">
              <div>
                <FacebookShareButton
                  url={process.env.NEXT_PUBLIC_HOST + asPath}
                  quote={
                    "next-share is a social share buttons for your next React apps."
                  }
                  hashtag={"#nextshare"}
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
              </div>
              <div>
                <WhatsappShareButton
                  url={process.env.NEXT_PUBLIC_HOST + asPath}
                  quote={
                    "next-share is a social share buttons for your next React apps."
                  }
                  hashtag={"#nextshare"}
                >
                  <WhatsappIcon size={50} round />
                </WhatsappShareButton>
              </div>
              <div>
                <TwitterShareButton
                  url={process.env.NEXT_PUBLIC_HOST + asPath}
                  quote={
                    "next-share is a social share buttons for your next React apps."
                  }
                  hashtag={"#nextshare"}
                >
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
              </div>
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
