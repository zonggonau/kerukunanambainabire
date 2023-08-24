import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";
export default function Hero({ hero }) {
  const logo = hero.logo.data.attributes.url;
  const bg = hero.bg.data.attributes.url;
  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST + bg})` }}
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="text-center">
            <div className="mt-8 flex flex-wrap gap-4 text-center py-12 justify-center">
              <Image
                className="relative xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110 h-48 w-48"
                src={process.env.NEXT_PUBLIC_HOST + logo}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              <strong className="block font-extrabold text-rose-700">
                {hero.Title}
              </strong>
            </h1>
            <div className="flex flex-wrap gap-4 text-center py-10 justify-center text-xl">
              {parse(hero.desc)}
            </div>
            <div>
              <Link
                href="/auth/register"
                className="px-10 py-3 rounded-full mt-10 bg-red-600 text-white font-bold hover:bg-red-500"
              >
                GABUNG SEKRANG
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
