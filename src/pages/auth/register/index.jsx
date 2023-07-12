import Link from "next/link";
import { useRecoilState } from "recoil";
import { registerState, successState } from "../../../../store";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const [success, setSuccess] = useRecoilState(successState);
  const handleChange = (e) => {
    setRegister((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const registerNewUser = () => {
    const HOST = process.env.NEXT_PUBLIC_HOST;
    axios
      .post(
        HOST + "/api/auth/local/register",
        {
          username: register.username,
          email: register.email,
          password: register.password,
          confirmed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        let user = response.data.user;
        let jwt = response.data.jwt;
        // Handle success.
        if (user && jwt) {
          setSuccess(true);
          router.replace("/auth/login");
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-32 h-32 mr-2"
              src="http://kerukunanambainabire.com:1337/uploads/ikkan_1_bb2ae4ef37.png"
              alt="logo"
            />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Nama Panggilan ?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukan email aktive"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                <button
                  onClick={() => registerNewUser()}
                  // type="submit"
                  className="w-full text-gray-900 border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Buat Akun
                </button>
                <p className="text-sm font-light text-gray-900 dark:text-gray-400">
                  Sudah memiliki akun?{" "}
                  <Link
                    href="/auth/login"
                    className="font-bold text-blue-900 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
                <p className="text-sm font-light dark:text-gray-400 justify-center">
                  <Link
                    href="/"
                    className="font-bold text-gray-400 hover:underline dark:text-primary-500"
                  >
                    Back
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
