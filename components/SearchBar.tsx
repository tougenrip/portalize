import React, { useState } from "react";
import Image from "next/image";


interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    onSearch(searchText);
  };

  return (
    <div className="bg-[#282828] flex flex-row justify-between w-full h-auto items-center pl-6 pr-4 rounded-lg">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="text-xl font-Gilroy font-light text-white/35 w-full bg-transparent outline-none py-3"
      />
      <button onClick={handleSearch} className="min-h-0 min-w-0 w-6 mr-2">
    
        <Image
          src="https://file.rendit.io/n/GcJTinFkXKSA8dPj5vAl.svg"
          alt="Search Icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default SearchBar;