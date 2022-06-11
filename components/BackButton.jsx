import Image from "next/image";

const BackButton = ({ router }) => {
  return (
    <div
      className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer h-fit w-fit flex items-center justify-center"
      onClick={router.back}
    >
      <Image src="/svg/back.svg" height="18" width="18" />
    </div>
  );
};

export default BackButton;
