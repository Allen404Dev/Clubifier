import MemberCard from "./MemberCard";
import { members } from "../types/daten";

const MemberList = () => {
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {members.map((e) => (
        <MemberCard member={e} key={e.mitgliedsnummer} />
      ))}
    </div>
  );
};

export default MemberList;
