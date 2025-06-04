import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div
      className="container mx-auto flex flex-col h-[100vh] justify-center items-center text-blue-500 font-bold text-xl"
      style={{ height: "calc(100vh - var(--menu-height) - 1px)" }}
    >
      <span className="bg-linear-to-b from-blue-400 to-blue-800 rounded-full w-44 h-44 flex flex-col justify-center items-center">
        <span className="bg-white rounded-full w-20 h-20 flex justify-center items-center relative">
          <LoaderCircle className="animate-spin w-16 h-16" />
          <span className="absolute top-20 text-white">ladet...</span>
        </span>
      </span>
    </div>
  );
};

export default Loader;
