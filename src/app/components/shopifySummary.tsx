import { ReactNode } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EmailSummaryProps = {
    title: string;
    status: string | number;
    orderNo: string;
    note: string;
    dueDate: string;
    amount: string | number;
  };

  export default function EmailSummary({ title, status, orderNo, note, dueDate, amount }: EmailSummaryProps) {
    return (
        <div className="grid grid-rows-4 rounded-2xl shadow bg-white m-4"> 
      <div className=" grid grid-cols-7 mx-4">

        <h1 className="col-start-2 col-span-5 text-md font-medium text-gray-500 flex items-center mx-4">{title}</h1>
        <p className="col-start-7 text-gray-900 flex items-center mx-4">{status}</p>
        </div>
        
        <div className="row-start-2 flex items-center mx-4">From: {orderNo}</div>
        <div className="row-start-3 mx-4">{note}</div>
        <div className="row-start-4 flex justify-between items-center mx-4">
        {dueDate && (
  <div className="flex items-center gap-2 ">
    <FontAwesomeIcon icon={faClock} />
    <p>Due: {dueDate}</p>
  </div>
)}


            <p>${amount}</p>
            </div>

        </div>


    );
  }