import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    return (
        <div className="p-4 flex items-center gap-4 bg-gray-100">
        <h1 className="text-xl font-bold">Klarity</h1>


        <div className="flex-grow flex justify-center">
        <label className="input flex items-center w-2/4 max-w-2xl">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className="grow flex justify-center" placeholder="Search emails, tasks, or financial data..." />

</label>
</div>

<div className="flex items-center gap-4 ml-auto">

<FontAwesomeIcon icon={faBell} className='fa-s' />
<FontAwesomeIcon icon={faGear} className='fa-s' />
</div>
        </div>
    );
}