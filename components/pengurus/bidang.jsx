import Image from "next/image";
export default function Bidang({ data, title, slugs }) {
  return (
    <>
      <div className="max-w-2xl mx-auto text-center pt-14">
        <h4 className="text-xl font-bold leading-tight text-black sm:text-xl lg:text-2xl mt-10">
          {title}
        </h4>
      </div>
      <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-9 gap-x-0">
        {data.map((item, index) => {
          // const keret = item.attributes.Keret;
          // const photo =
          //   item.attributes.photo_profile.data.attributes.formats.thumbnail.url;
          // const nama = item.attributes.Nama;
          const slug = item;
          // const jabatan =
          //   item.attributes.jabatan_kerukunan.data.attributes.jabatan;

          if (slug === slugs) {
            return (
              <>
                <div key={index}>
                  <Image
                    className="object-cover mx-auto rounded-lg w-28 h-28"
                    src={`http://kerukunanambainabire.com:1337${photo}`}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <p className="mt-8 text-lg font-semibold leading-tight text-black">
                    {nama}
                  </p>
                  <p className="mt-1 text-base leading-tight text-gray-600">
                    {jabatan}
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
