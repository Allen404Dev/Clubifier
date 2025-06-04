import type { Member } from "@/types/typeMember";
import img from "../assets/employee.jpg";
import badgePayed from "../assets/badge-dollar-svgrepo-com.svg";
import badgeActive from "../assets/badge-check-svgrepo-com.svg";
import emailImg from "../assets/email-svgrepo-com.svg";
import mobileImg from "../assets/mobile-alt-2-svgrepo-com.svg";

type Props = {
  searchText: String;
  member: Member;
};

const MemberCard = ({ searchText, member }: Props) => {
  console.log("searchText: ", searchText);

  return (
    <>
      <div className="flex flex-row border border-gray-200 rounded-md p-2 shadow-md">
        <div className="w-[50%] flex items-center">
          <img
            src={img}
            alt={member.firstname}
            className="max-h-48 w-full object-cover"
          />
        </div>
        <div className=" flex flex-col justify-between p-4 w-[50%]">
          <p className="text-sm text-gray-500">{member.birthdate}</p>
          <h2 className="text-xl font-semibold">{member.firstname}</h2>
          <h2 className="text-xl font-semibold mb-4">{member.lastname}</h2>
          <div className="flex flex-row items-center gap-2">
            <img src={emailImg} className="w-6" />
            <p className="break-words w-full pr-4 text-sm">{member.email}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <img src={mobileImg} className="w-6 text-sm" />
            <p>{member.phone}</p>
          </div>

          <div className="flex flex-row justify-between items-center pt-4">
            {member.payedMemberShip ? (
              <img
                src={badgePayed}
                className="w-8"
                title="Bezahlstatus: bezahlt"
              />
            ) : (
              <div className="w-8 h-8" />
            )}
            {member.activ ? (
              <img
                src={badgeActive}
                className="w-8"
                title="Mitgliedstatus: aktiver Mitglied"
              />
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
