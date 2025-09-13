import { ReactNode } from "react";


type OverviewBoxProps = {
    title: string;
    value: string | number;
    note: string;
    noteColour?: string;
    icon?: ReactNode;
    iconColour?: string;
    iconBackgroundColour: string;
  };

  export default function OverviewBox({ title, value, note, noteColour, icon, iconColour, iconBackgroundColour }: OverviewBoxProps) {
    return (
      <div className="p-4 rounded-2xl shadow bg-white grid grid-cols-2 w-76 mx-4">
        <div className='col-start-1 ml-4'>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-xs ${noteColour}`}>{note}</p>
        </div>
        {icon && (
  <div   
  className={`mr-4 justify-self-end self-center w-12 h-12 flex items-center justify-center rounded-full text-2xl ${iconColour} ${iconBackgroundColour}`}
  >
    {icon}
  </div>
)}


      </div>
    );
  }