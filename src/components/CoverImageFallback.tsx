import Image from "next/image";

const CoverImageFallback = ({
  imageURL,
  title,
}: {
  imageURL: string;
  title: string;
}) => {
  return (
    <>
      {imageURL && <Image fill src={imageURL} alt={title} />}
      <div className="flex h-full w-full items-center justify-center p-4 text-lg">
        {title}
      </div>
    </>
  );
};

export default CoverImageFallback;
