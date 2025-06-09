import { memberBaseSchema, type MemberBase } from "../types/typeMember";
import closeIcon from "../assets/close-circle-svgrepo-com.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { delay } from "../helpers/animationHelper";
import { zodResolver } from "@hookform/resolvers/zod";

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
    formState: { errors },
  } = useForm<MemberBase>({
    resolver: zodResolver(memberBaseSchema),
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit: SubmitHandler<MemberBase> = async (formData) => {
    const payload = { ...formData };

    console.log("payload:", payload);
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
          body: JSON.stringify(payload),
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
      <div className="bg-white rounded-xl p-6 shadow-lg w-full md:w-[550px] flex flex-col gap-10 border border-blue-500 ">
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
          <div>
            <input
              className={`border-2 rounded-md px-4 py-2 w-full ${errors.firstname ? "border-red-500" : "border-blue-500"}`}
              type="text"
              placeholder="vorname..."
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div>
            <input
              className={`border-2 rounded-md px-4 py-2 w-full ${errors.lastname ? "border-red-500" : "border-blue-500"}`}
              type="text"
              placeholder="nachname..."
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>

          <div>
            <input
              className={`border-2 rounded-md px-4 py-2 w-full ${errors.lastname ? "border-red-500" : "border-blue-500"}`}
              type="date"
              {...register("birthdate", {
                setValueAs: (value) => {
                  if (typeof value === "string") return value;

                  if (typeof value === "number") {
                    const date = new Date(value);
                    return date.toISOString().split("T")[0]; // YYYY-MM-DD
                  }

                  return value;
                },
              })}
            />
            {errors.birthdate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthdate.message}
              </p>
            )}
          </div>

          <div>
            <input
              className={`border-2 rounded-md px-4 py-2 w-full ${errors.email ? "border-red-500" : "border-blue-500"}`}
              type="email"
              placeholder="email..."
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              className={`border-2 rounded-md px-4 py-2 w-full ${errors.phone ? "border-red-500" : "border-blue-500"}`}
              type="tel"
              placeholder="telefon..."
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            className="border-2 border-blue-700 bg-blue-700 rounded-md px-4 py-2 text-white hover:bg-white hover:text-blue-700 transition-all duration-500 flex flex-row"
            type="submit"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin w-10" />
                wird gespeichert...
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
