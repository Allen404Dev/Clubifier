import MemberCard from "./MemberCard";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import AddMemberButton from "./AddMemberButton";
import MemberPopup from "./MemberPopup";
import Loader from "./Loader";
import type { Member } from "@/types/typeMember";
import { delay } from "../helpers/animationHelper";

const MemberList = () => {
  const [searchText, setSearchText] = useState("");
  const [isMemberPopupVisible, setIsMemberPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Member[]>([]);

  const getMembersApiAsync = async () => {
    const startTime = Date.now();
    try {
      const response = await fetch(
        "https://nsuyehsdcrayskivmlgr.supabase.co/rest/v1/members",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zdXllaHNkY3JheXNraXZtbGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5Njk5MDAsImV4cCI6MjA2NDU0NTkwMH0.f6nQHi-L19MRMSVSuHBqnrCYW28vWy88U6haukFDOPI",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error beim laden der Daten! ${response.statusText}`);
      }

      const data = await response.json();

      const timeElapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 1500 - timeElapsed);
      if (remainingDelay > 0) {
        await delay(remainingDelay);
      }

      setData(data);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      console.log("error: ", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMembersApiAsync();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto my-10">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto my-10">
        <div className="text-red-500 font-bold text-xl">Error loading data</div>
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
        <div className="my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((e) => (
            <MemberCard member={e} key={e.id} searchText={searchText} />
          ))}
        </div>
      </div>
      <MemberPopup
        title="Füge Mitglied hinzu"
        isVisible={isMemberPopupVisible}
        onIsPopupOpen={setIsMemberPopupVisible}
        getMembersApiAsync={getMembersApiAsync}
      />
    </>
  );
};

export default MemberList;
