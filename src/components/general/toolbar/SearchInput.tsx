import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-secondary p-3">
      <SearchIcon size={16} className="text-neutral-500" />
      <input
        type="text"
        placeholder="Search within sheet"
        className="font-normal text-sm outline-none border-0 bg-transparent leading-4"
      />
    </div>
  );
};

export default SearchInput;
