import type { MemberBase } from "@/types/typeMember";
import closeIcon from "../assets/close-circle-svgrepo-com.svg";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  isVisible: boolean;
  onClose: (isVisible: boolean) => void;
  title: string;
};

const MemberPopup = ({ isVisible, onClose, title }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MemberBase>();

  const onSubmit: SubmitHandler<MemberBase> = (data) => {
    console.log("formData:", data);
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-[550px] flex flex-col gap-10 border border-blue-500 ">
        <div className="flex justify-between items-center">
          <div>{title}</div>
          <div>
            <button
              onClick={() => {
                reset();
                onClose(false);
              }}
            >
              <img src={closeIcon} className="w-10" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="border-2 border-blue-500 rounded-md px-4 py-2"
            type="text"
            placeholder="type in firstname..."
            {...register("firstname")}
          />
          <input
            className="border-2 border-blue-500 rounded-md px-4 py-2"
            type="text"
            placeholder="type in lastname..."
            {...register("lastname")}
          />
          <input
            className="border-2 border-blue-500 rounded-md px-4 py-2 placeholder:text-blue-500"
            type="date"
            {...register("birthdate")}
          />
          <input
            className="border-2 border-blue-500 rounded-md px-4 py-2"
            type="email"
            placeholder="type in email..."
            {...register("email")}
          />
          <input
            className="border-2 border-blue-500 rounded-md px-4 py-2"
            type="tel"
            placeholder="type in tel..."
            {...register("phone")}
          />
          <button
            className="border-2 border-blue-500 rounded-md px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-500"
            type="submit"
          >
            speichern
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberPopup;
