import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";

const ProfilePDF = dynamic(() => import("../../../../components/pdf/pdf"), {
  ssr: false,
});

const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });

const MyDocument = ({ user }) => {
  const [client, setClient] = useState(false);
  let url = process.env.NEXT_PUBLIC_HOST + "/api/users/" + user + "?populate=*";
  let token = process.env.NEXT_PUBLIC_TOKEN;

  useEffect(() => {
    setClient(true);
  }, []);

  const { data, error, isLoading } = useSWR([url, token], fetcher);

  if (error) return <div>Eror data Load...</div>;
  if (isLoading)
    return (
      <div className="text-center">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return <ProfilePDF data={data} />;
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "id",
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
};

export async function getStaticProps({ params }) {
  return {
    props: {
      user: params.id,
    },
  };
}

export default MyDocument;
