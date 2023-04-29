import Head from "next/head";
export default function Seo({ judul, descriptions, image }) {
  return (
    <Head>
      <title>{judul}</title>
      <meta property="og:title" content={judul} />
      <meta name="twitter:title" content={judul} />
      <meta name="whatsup:title" content={judul} />
      <meta name="facebook:title" content={judul} />
      <meta name="description" content={descriptions} />
      <meta property="og:description" content={descriptions} />
      <meta name="twitter:description" content={descriptions} />
      <meta name="whatsup:description" content={descriptions} />
      <meta name="facebook:description" content={descriptions} />
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />
      <meta name="whatsup:image" content={image} />
      <meta name="facebook:image" content={image} />
      <meta name="image" content={image} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="whatsup:card" content="summary_large_image" />
      <meta name="facebook:card" content="summary_large_image" />
    </Head>
  );
}
