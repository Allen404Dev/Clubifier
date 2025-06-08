import type { MemberBase } from "@/types/typeMember";
import closeIcon from "../assets/close-circle-svgrepo-com.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { delay } from "../helpers/animationHelper";

type Props = {
  isVisible: boolean;
  onIsPopupOpen: (isOpen: boolean) => void;
  title: string;
  getMembersApiAsync: () => Promise<void>;
};

const MemberPopup = ({
  isVisible,
  onIsPopupOpen,
  title,
  getMembersApiAsync,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    //formState: { errors },
  } = useForm<MemberBase>();

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit: SubmitHandler<MemberBase> = async (formData) => {
    console.log("formData:", formData);

    try {
      const startTime = Date.now();
      setIsSaving(true);

      const response = await fetch(
        "https://nsuyehsdcrayskivmlgr.supabase.co/rest/v1/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zdXllaHNkY3JheXNraXZtbGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5Njk5MDAsImV4cCI6MjA2NDU0NTkwMH0.f6nQHi-L19MRMSVSuHBqnrCYW28vWy88U6haukFDOPI",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error beim speichern des Mitglieds! ${response.statusText}`
        );
      }

      reset();
      onIsPopupOpen(false);

      const timeElapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 1500 - timeElapsed);

      if (remainingDelay > 0) {
        await delay(remainingDelay);
      }

      await getMembersApiAsync();
      setIsSaving(false);

      console.log("response", response);
    } catch (error) {
      console.error("Fehler:", error);
      setIsSaving(false);
    }
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
                onIsPopupOpen(false);
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
            className="border-2 border-blue-500 rounded-md px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-500 flex flex-row"
            type="submit"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin w-10" />
                wird gespeichert...{" "}
              </>
            ) : (
              <>
                <div className="w-10"></div>
                speichern
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberPopup;
