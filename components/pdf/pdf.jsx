import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Doctemplate from "./doctemplate";

const PDF = ({ data, img }) => <Doctemplate data={data} img={img} />;

export default function PDFView({ data }) {
  const [client, setClient] = useState(false);
  const [img, setImg] = useState("/uploads/Untitled_5f2cc72ef0.png");

  async function getImage() {
    const req = await fetch(
      process.env.NEXT_PUBLIC_HOST +
        "/api/upload/files/" +
        data.photo_profile.id_image,
      {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
        },
      }
    );

    const res = await req.json();
    const image = res.url;
    setImg(image);
  }

  useEffect(() => {
    setClient(true);
    getImage();
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg">
      <PDFViewer className="max-w-screen-xl" width={1080} height={890}>
        <PDF data={data} img={img} />
      </PDFViewer>
    </div>
  );
}
