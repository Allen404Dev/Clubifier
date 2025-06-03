import MemberCard from "./MemberCard";
import { members } from "../types/daten";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import AddMemberButton from "./AddMemberButton";
import MemberPopup from "./MemberPopup";
import { Loader2Icon, LoaderCircle, LoaderPinwheelIcon } from "lucide-react";

const MemberList = () => {
  const [searchText, setSearchText] = useState("");
  const [isMemberPopupVisible, setIsMemberPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("hi");
    fetch("https://nsuyehsdcrayskivmlgr.supabase.co/rest/v1/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zdXllaHNkY3JheXNraXZtbGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5Njk5MDAsImV4cCI6MjA2NDU0NTkwMH0.f6nQHi-L19MRMSVSuHBqnrCYW28vWy88U6haukFDOPI",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fehler: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log("data from supabase:", data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="inset-0 bg-black/60 fixed flex flex-col justify-center items-center text-blue-500 font-bold text-xl">
        <LoaderCircle className="animate-spin w-20 h-20" />
        ladet..
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="flex gap-8">
          <AddMemberButton onOpenClicked={setIsMemberPopupVisible} />
          <SearchBar searchText={searchText} onSearchTyped={setSearchText} />
        </div>

        <div className="my-10 grid gap-4 grid-cols-1  sm:grid-cols-2 md:grid-cols-3">
          {members.map((e) => (
            <MemberCard
              member={e}
              key={e.mitgliedsnummer}
              searchText={searchText}
            />
          ))}
        </div>
      </div>
      <MemberPopup
        title="Füge Mitglied hinzu"
        isVisible={isMemberPopupVisible}
        onClose={setIsMemberPopupVisible}
      />
    </>
  );
};

export default MemberList;
