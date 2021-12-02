import React from "react";
import { Storage } from "aws-amplify";
import { UploadedImage } from "./OrderNew";

export default function Gallery(props) {
  const [allImages, setAllImages] = React.useState([]);

  const fetchAllImages = async () => {
    setAllImages([]);
    try {
      const images = await Storage.list("", { level: "protected" });
      images.forEach(async (img) => {
        const signedUrl = await Storage.get(img.key, { level: "protected" });
        setAllImages((imgs) => [...imgs, { signedUrl, key: img.key }]);
      });
    } catch (e) {
      console.log("failed", e);
      setAllImages([]);
    }
  };

  React.useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div>
      <h3>⛩ Gallery</h3>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: -10, marginRight: -10 }}>
        {allImages?.map &&
          allImages.map((img) => {
            return (
              <UploadedImage
                src={img.signedUrl}
                removeImg={async () => {
                  await Storage.remove(img.key, { level: "protected" });
                  fetchAllImages();
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
