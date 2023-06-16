import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Nav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-5">
            <Image
              className="relative w-14 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src="/assets/img/ikkan.png"
              width={1000}
              height={1000}
              alt=""
            />
            <span className="font-bold self-center text-2xl  whitespace-nowrap dark:text-white">
              IKKAN
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              ""
            ) : (
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}

            {!open ? "" : <span className="font-extrabold text-2xl">X</span>}
          </button>
          <div
            className={`${open ? "" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/news"
                  className={`font-bold block py-2 pl-3 pr-4 rounded md:bg-transparent ${
                    router.pathname == "/news"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } md:p-0 dark:text-white md:dark:text-blue-500`}
                  aria-current="page"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kerja"
                  className={`font-bold block py-2 pl-3 pr-4 rounded ${
                    router.pathname == "/program-kerja"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Program Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="/kegiatan"
                  className={`font-bold block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                    router.pathname == "/kegiatan"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Kegiatan
                </Link>
              </li>

              <li>
                <Link
                  href="/keret"
                  className={`font-bold block py-2 pl-3 pr-4  rounded ${
                    router.pathname == "/keret"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Keret
                </Link>
              </li>
              <li>
                <Link
                  href="/pengurus"
                  className={`font-bold block py-2 pl-3 pr-4 rounded ${
                    router.pathname == "/pengurus"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Pengurus
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className={`font-bold block py-2 pl-3 pr-4 rounded ${
                    router.pathname == "/galeri"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className={`font-bold block py-2 pl-3 pr-4  rounded ${
                    router.pathname == "/kontak"
                      ? "md:text-blue-700 text-blue-700"
                      : "text-black"
                  } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="font-bold block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
