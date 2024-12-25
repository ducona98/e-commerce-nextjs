import Image from "next/image";

const Loading = () => {
  return (
    <div className="loader-wrapper">
      <Image
        className="loader-logo"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        width={47}
        height={40}
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
