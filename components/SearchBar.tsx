import React, { useState } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";


interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    onSearch(searchText);
  };

  return (
    <div className="bg-[#282828] flex flex-row justify-between w-full h-auto items-center pl-4 pr-0  !my-auto rounded-lg border border-gray-800">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="text-sm  font-Gilroy font-light text-white/35 w-full bg-transparent outline-none py-[6.5px]"
      />
      <button onClick={handleSearch} className="min-h-0 min-w-0 w-6 mr-2">
    
        <BiSearch className="h-5 w-5 text-gray-600"/>   
      </button>
    </div>
  );
};

export default SearchBar;