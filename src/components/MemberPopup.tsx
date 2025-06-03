import closeIcon from "../assets/close-circle-svgrepo-com.svg";

type Props = {
  isVisible: boolean;
  onClose: (isVisible: boolean) => void;
  title: string;
};

const MemberPopup = ({ isVisible, onClose, title }: Props) => {
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
                onClose(false);
              }}
            >
              <img src={closeIcon} className="w-10" />
            </button>
          </div>
        </div>
        <div className="">MemberPopup</div>
      </div>
    </div>
  );
};

export default MemberPopup;
