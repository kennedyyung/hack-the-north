
import { useState } from "react";

type MenuBarProps = {
  onSelectPage: (page: string) => void;
};

export default function MenuBar({ onSelectPage }: MenuBarProps) {
  const [selectedPage, setSelectedPage] = useState("Inbox");

  const pages = ["Inbox", "Calendar", "Financial", "Personal", "Shopping", "Developer"];

  const handleClick = (page: string) => {
    setSelectedPage(page);
    onSelectPage(page);
  };

  return (
    <nav className="mt-4 px-4 flex bg-gray-100 rounded-full justify-evenly w-3/4 ">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-10 py-2 rounded-full transition-colors ${
            selectedPage === page ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
