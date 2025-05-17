import type { Member } from "@/types/typeMember";
import img from "../assets/employee.jpg";
import payedImg from "../assets/euro_banknote_gruen.svg";
import notPayedImg from "../assets/euro_banknote_rot.svg";
import activeImg from "../assets/active.svg";

type Props = {
  member: Member;
};

const MemberCard = ({ member }: Props) => {
  return (
    <>
      <div className="flex flex-row border border-gray-200 rounded-md p-2 shadow-md">
        <div className="flex-1/2">
          <img
            src={img}
            alt={member.vorname}
            className="max-h-48 w-full object-cover"
          />
        </div>
        <div className="flex-1/2 flex flex-col justify-center items-start p-4">
          <p className="text-sm text-gray-500"> {member.alter}</p>
          <h2 className="text-xl font-semibold">{member.vorname}</h2>
          <h2 className="text-xl font-semibold">{member.nachname}</h2>
          <div className="flex flex-row justify-between w-full items-center">
            <img
              src={member.bezahlt ? payedImg : notPayedImg}
              className="w-12"
            />
            {member.aktiv && (
              <div className="bg-green-600 text-center py-2 px-4 rounded-full text-white ">
                aktiv
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
