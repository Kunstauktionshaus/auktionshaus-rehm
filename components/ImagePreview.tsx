import { ObjectSchemaValues } from "@schemas/item";
import Image from "next/image";

interface ImagePreviewProps {
  item: ObjectSchemaValues;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ item }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  const imageUrl = `${BASE_URL}/${item.auction}/preview/${item.catalogNumber}.jpg`;

  return (
    <>
      <Image
        src={imageUrl}
        fill
        alt={item.catalogNumber.toString()}
        className="object-contain object-center z-0 "
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={50}
        priority
      />
    </>
  );
};

export default ImagePreview;
