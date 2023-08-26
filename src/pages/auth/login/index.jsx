import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import nookies from "nookies";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import { successState } from "../../../../store";

export default function LoginPage(token) {
  const router = useRouter();

  const [success, setSuccess] = useRecoilState(successState);

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsValid(false);
      setSuccess(false);
    }, 5000);
  });

  const [authState, setAuthState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAuthState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleAuth = async () => {
    const req = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/auth/local", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: authState.username,
        password: authState.password,
      }),
    });

    const { jwt, user } = await req.json();

    if (jwt && user) {
      Cookies.set("token", jwt);
      Cookies.set("id", user.id);
      Cookies.set("name", user.username);
      Cookies.set("email", user.email);
      Cookies.set("admin", user.admin);
      router.replace("/admin/dashbord");
    } else {
      setIsValid(true);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-32 h-32 mr-2"
            src={`${process.env.NEXT_PUBLIC_HOST}/uploads/ikkan_1_bb2ae4ef37.png`}
            width={250}
            height={250}
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign in to your account
            </h1>
            {isValid ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Email atau Password Salah !</span>
              </div>
            ) : (
              ""
            )}

            {success ? (
              <div
                className="p-4 mb-4 text-sm text-white rounded-lg bg-green-400 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">
                  Register Berhasil, Silakan Login
                </span>
              </div>
            ) : (
              ""
            )}

            <div className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  // for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  value={authState.username}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="youremail@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  // for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  value={authState.password}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        // for="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              <button
                onClick={handleAuth}
                className="w-full border text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Masuk
              </button>
              <p className="text-sm font-light text-gray-900 dark:text-gray-400">
                Belum Memiliki Akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-bold text-blue-700 hover:underline dark:text-blue-900"
                >
                  Daftar Segera
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);
  const token = cookie.token;
  const name = cookie.id;
  if (token) {
    return {
      redirect: {
        destination: "/user/profile/" + name,
      },
    };
  }
  return {
    props: {},
  };
}
