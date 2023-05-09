import { useState } from "react";

export default function Header({ logout, user }) {
  const [open, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full text-white bg-main-color">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              IKKAN PROFILE
            </a>
            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  clipRule={"evenodd"}
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule={"evenodd"}
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!open)}
                id="dropdownButton"
                className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline"
              >
                <span>{user}</span>
                <img
                  className="inline h-6 rounded-full"
                  src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                />
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="inline w-4 h-4 transition-transform duration-200 transform"
                >
                  <path
                    fillRule="evenodd"
                    clipRule={"evenodd"}
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdownMenu"
                className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
              >
                <div
                  className={`py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm ${
                    open ? "" : "hidden"
                  }`}
                >
                  <a
                    className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Settings
                  </a>
                  <a
                    className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    Help
                  </a>
                  <div className="border-b"></div>
                  <span
                    onClick={logout}
                    className="cursor-pointer block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
