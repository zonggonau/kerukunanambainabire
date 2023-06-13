import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" class="flex items-center space-x-5">
            <Image
              className="relative w-14 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src="/assets/img/ikkan.png"
              width={1000}
              height={1000}
              alt=""
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              IKKAN
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open main menu</span>
            {open ? (
              ""
            ) : (
              <svg
                class="w-6 h-6"
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
            class={`${open ? "" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/news"
                  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/kegiatan"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link
                  href="/kegiatan"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Program Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="/keret"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Keret
                </Link>
              </li>
              <li>
                <Link
                  href="/pengurus"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pengurus
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <header
        aria-label="Site Header"
        className="border-b border-gray-200 p-5 bg-blue-900"
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button type="button" className="p-2 lg:hidden">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link href="/" className="flex space-x-2 items-center">
              <span className="sr-only">Logo</span>
              <Image
                className="relative w-14 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                src="/assets/img/ikkan.png"
                width={1000}
                height={1000}
                alt=""
              />
              <span className="inline-block h-10 w-32 rounded-lg text-4xl font-extrabold text-rose-700">
                IKKAN
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-8">
            <nav
              aria-label="Site Nav"
              className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-50 space-x-8"
            >
              <Link
                href="/news"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                News
              </Link>
              <Link
                href="/kegiatan"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Kegiatan
              </Link>
              <Link
                href="/kegiatan"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Program Kerja
              </Link>
              <Link
                href="/keret"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Keret
              </Link>

              <Link
                href="/pengurus"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Susunan Pengurus
              </Link>
              <Link
                href="/galeri"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Galeri
              </Link>
              <Link
                href="/kontak"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
              >
                Kontak
              </Link>
            </nav>

            <div className="flex items-center">
              <div className="flex items-center divide-x divide-gray-100  border-gray-100">
                <span>
                  <Link
                    href="/cart"
                    className="block border-b-4 border-transparent p-6 hover:border-red-700"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>

                    <span className="sr-only">Cart</span>
                  </Link>
                </span>

                <span className="hidden sm:block">
                  <Link
                    href="/auth/login"
                    className="block border-b-4 border-transparent p-6 hover:border-red-700"
                  >
                    <svg
                      className="h-5 w-5 text-white"
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

                    <span className="sr-only"> Account </span>
                  </Link>
                </span>

                <span className="hidden sm:block">
                  <Link
                    href="/search"
                    className="block border-b-4 border-transparent p-6 hover:border-red-700"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>

                    <span className="sr-only"> Search </span>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header> */}
    </>
  );
}
