import MemberCard from "./MemberCard";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import AddMemberButton from "./AddMemberButton";
import MemberPopup from "./MemberPopup";
import Loader from "./Loader";
import type { Member } from "@/types/typeMember";

const MemberList = () => {
  const [searchText, setSearchText] = useState("");
  const [isMemberPopupVisible, setIsMemberPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Member[]>([]);

  useEffect(() => {
    const startTime = Date.now();

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
        const timeElapsed = Date.now() - startTime;
        const delay = Math.max(0, 1500 - timeElapsed);

        setTimeout(() => {
          setData(data);
          setIsLoading(false);
        }, delay);
        console.log("data from supabase:", data);
        setData(data);
      })
      .catch((err) => {
        setIsError(true);
        console.log("error: ", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-500 font-bold text-xl">Error loading data</div>
    );
  }

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="flex gap-8">
          <AddMemberButton onOpenClicked={setIsMemberPopupVisible} />
          <SearchBar searchText={searchText} onSearchTyped={setSearchText} />
        </div>
        <div className="my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((e) => (
            <MemberCard member={e} key={e.id} searchText={searchText} />
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
