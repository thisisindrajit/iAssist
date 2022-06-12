import Image from "next/image";

const CustomInput = ({
  title,
  placeholder,
  info,
  isTextArea,
  maxLen,
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-medium-purple-1 text-base font-bold">{title}</div>
      {isTextArea ? (
        <textarea
          className="p-2 w-full text-sm outline-none border-2 border-gray-200 rounded-md"
          placeholder={placeholder}
          value={value}
          rows={8}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLen}
        ></textarea>
      ) : (
        <input
          type="text"
          className="p-2 w-full text-sm outline-none border-2 border-gray-200 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLen}
          required
        />
      )}
      {
        <div className="text-xs flex gap-1 items-center text-medium-grey">
          <Image src="/svg/info.svg" height="20" width="20" />
          {info}
        </div>
      }
    </div>
  );
};

export default CustomInput;
