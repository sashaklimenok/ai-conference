import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 flex justify-center items-center">
      <Image
        src={
          "https://d3373sevsv1jc.cloudfront.net/css/event/37003/images/EPAM-AI-conference-logo.svg"
        }
        width={155}
        height={36}
        alt={"logo"}
      />
    </footer>
  );
};
