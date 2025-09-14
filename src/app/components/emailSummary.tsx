import { ReactNode } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EmailSummaryProps = {
    title: string;
    tag: string | number;
    from: string;
    icon?: ReactNode;
    note: string;
    dueDate?: string;
    amount?: string | number;
  };

  export default function EmailSummary({ title, tag, from, icon, note, dueDate, amount }: EmailSummaryProps) {
    return (
        <div className="grid rounded-2xl bg-white m-4 border border-gray-200 shadow-none "> 
      <div className=" grid grid-cols-7 m-4 items-center">
        <div className="flex col-span-5">
        {icon && (
            <div className=" flex items-center ">
                {icon}
            </div>
        )}

        <h1 className=" text-md font-semibold flex items-center ml-2 ">{title}</h1>
        </div>
        <div
  className={`col-start-6 flex items-center badge-soft badge
    ${tag === "high" ? "badge-error" : ""}
    ${tag === "medium" ? "badge-warning" : ""}
    ${tag === "low" ? "badge-success" : ""}`}
>
  {tag}
    </div>        </div>
            
            <div className="row-start-2 flex items-center mx-4">From: {from}</div>
            <div className="row-start-3 m-4 text-sm text-gray-500">{note}</div>
            <div className="row-start-4 flex justify-between items-center mx-4">
            {dueDate && (
      <div className="flex items-center gap-2 ">
        <FontAwesomeIcon icon={faClock} />
        <p>Due: {dueDate}</p>
      </div>
    )}


            {amount && <p>${amount}</p>}

            </div>

        </div>


    );
  }