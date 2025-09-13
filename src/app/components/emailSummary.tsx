import { ReactNode } from "react";


type EmailSummaryProps = {
    title: string;
    value: string | number;
    note: string;
    noteColour?: string;
    icon?: ReactNode;

  };

  export default function EmailSummary({ title, value, note, noteColour, icon }: EmailSummaryProps) {
    return (
      <div className="rounded-2xl shadow bg-white grid grid-cols-7 ">
        {icon && (
            <div className="mr-4 justify-self-end self-center w-12 h-12 flex rounded-full text-2xl ">
                {icon}
            </div>
        )}

        <h3 className="col-start-2 cols-span-5 text-sm font-medium text-gray-500">{title}</h3>
        <p className="col-start-7 text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-xs ${noteColour}`}>{note}</p>
        </div>
        



    );
  }