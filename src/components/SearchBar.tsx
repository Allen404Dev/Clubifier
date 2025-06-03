import searchIcon from "../assets/search-svgrepo-com (1).svg";

type Props = {
  searchText: string;
  onSearchTyped: (value: string) => void;
};

const SearchBar = ({ searchText, onSearchTyped }: Props) => {
  return (
    <div className="flex gap-4 py-2 px-2 w-[100%] rounded-md shadow-md border-2 border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
      <img src={searchIcon} className="w-8" />
      <input
        value={searchText}
        className="outline-none w-full"
        type="text"
        placeholder="Suche Mitglieder..."
        onChange={(e) => {
          onSearchTyped(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
