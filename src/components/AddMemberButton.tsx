import addIcon from "../assets/add-circle-svgrepo-com.svg";

type Props = {
  onOpenClicked: (isVisible: boolean) => void;
};

const AddMemberButton = ({ onOpenClicked }: Props) => {
  return (
    <button onClick={() => onOpenClicked(true)}>
      <div className="flex border-2 border-blue-500 rounded-md py-2 px-2 hover:bg-blue-200 transition-colors duration-300">
        <img src={addIcon} className="w-10" />{" "}
      </div>
    </button>
  );
};

export default AddMemberButton;
