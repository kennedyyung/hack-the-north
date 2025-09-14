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
        <div className="rounded-2xl bg-white m-2 border border-gray-200 shadow-none p-3 space-y-1"> 
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {icon && (
                <div className="flex items-center">
                  {icon}
                </div>
              )}
              <h1 className="text-md font-semibold ml-2">{title}</h1>
            </div>
            <div
              className={`badge-soft badge
                ${tag === "high" ? "badge-error" : ""}
                ${tag === "medium" ? "badge-warning" : ""}
                ${tag === "low" ? "badge-success" : ""}`}
            >
              {tag}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">From: {from}</div>
          <div className="text-sm">{note}</div>
          
          {(dueDate || amount) && (
            <div className="flex justify-between items-center text-sm">
              {dueDate && (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} />
                  <p>Due: {dueDate}</p>
                </div>
              )}
              {amount && <p>${amount}</p>}
            </div>
          )}
        </div>
    );
  }