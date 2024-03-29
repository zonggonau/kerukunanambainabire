import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en" className="bg-gray-200">
      <Head>
        <meta
          name="google-site-verification"
          content="Zmhd3gEk4j_9UVarRyfky44mYED9vDKsbdjzfHnPNr8"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></script>
        {/* <Script
          src="../vendor/flowbit.js"
          id="Flowbite-cdn"
          strategy="afterInteractive"
          defer
        /> */}
      </Head>
      <body class="bg-black-alt font-sans leading-normal tracking-normal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
