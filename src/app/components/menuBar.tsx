
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
    <nav className="mt-6 mb-10 w-full flex justify-center">
      <div className="flex w-full max-w-4xl bg-gray-100 rounded-full p-1 shadow-sm justify-between">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-6 py-2 flex-1 rounded-full transition-colors text-sm font-medium text-center
              ${selectedPage === page ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700"}`}
          >
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
}