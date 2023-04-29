import useSWR from "swr";
import axios from "axios";
import AdminLayout from "@/layout/admin/adminlayout";
import NestedLayout from "@/layout/admin/nestedlayout";
import { useState } from "react";
import { useSession } from "next-auth/react";

const fetcher = async () => {
  const res = await fetch(`http://kerukunanambainabire.com:1337/api/kategoris`);
  const { data } = await res.json();
  return data;
};

export default function Kategori() {
  const { data: session } = useSession({
    required: true,
  });
  const [kategori, setKategori] = useState({
    kategori: "",
    slug: "",
  });

  const [open, setIsOpen] = useState(false);

  const { data, error } = useSWR("kategori", fetcher);

  const handleInputChange = (e) => {
    setKategori((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const postKategori = async () => {
    await axios
      .post("http://kerukunanambainabire.com:1337/api/kategoris", {
        data: {
          kategori: kategori.kategori,
          slug: generateSlug(kategori.kategori),
        },
      })
      .then((response) => {
        console.log(response);
        setKategori({ kategori: "", slug: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function generateSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/\s+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/[^\w\-]+/g, "");
  }

  if (error) return "errr";
  if (!data) return "Loading..";

  return (
    <div className="sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex space-x-6 p-5 border">
          <p
            className="bg-blue-700 pl-5 pr-5 p-1 text-sm text-white rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Lihat Data
          </p>
          <p
            className="bg-blue-700 pl-5 pr-5 p-1 text-sm text-white rounded-full cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Tambah Data
          </p>
        </div>
        <br />
        <div className="grid grid-cols-2 gap-4">
          {open == true ? inputKategori() : viewKategori()}
        </div>
      </div>
    </div>
  );

  function viewKategori() {
    return (
      <div className=" p-4 rounded bg-gray-50  dark:bg-gray-800">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                console.log(item);
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{item.id}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.attributes.kategori}
                    </th>
                    <td className="px-6 py-4"> {item.attributes.slug}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function inputKategori() {
    return (
      <div class="p-4 rounded bg-gray-50  dark:bg-gray-800">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="nama"
            name="kategori"
            onChange={handleInputChange}
            value={kategori.kategori}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Kategori Blog Post
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="slug"
            name="kategori"
            disabled
            onChange={handleInputChange}
            value={generateSlug(kategori.kategori)}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Slug
          </label>
        </div>

        <button
          onClick={postKategori}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    );
  }
}

// export async function getStaticProps() {
//   const res = await fetch(`${process.env.HOST}/api/kategoris`);
//   const data = await res.json();
//   return {
//     props: data,
//   };
// }

Kategori.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <NestedLayout>{page}</NestedLayout>
    </AdminLayout>
  );
};
