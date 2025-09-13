import { ReactNode } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ShopifySummaryProps = {
    title: string;
    status: string;
    orderNo: string;
    items: string;
    ordered: string;
    expected: string;
    amount: string | number;
  };

  export default function ShopifySummary({ title, status, orderNo, items, ordered, expected, amount }: ShopifySummaryProps) {
    return (
        <div className="rounded-2xl shadow bg-white p-4 mt-4"> 
      <div >
        <div className="flex justify-between">
        <div className="flex">
        <h1 className=" text-lg font-medium text-gray-500 flex items-center mx-4">{title}</h1>
        <p className="text-gray-900 flex items-center mx-4">{status}</p>
        </div>
        <p className="text-semibold">${amount}</p>
        </div>

        </div>
        
        <div className="row-start-2 flex items-center mx-4">Order #{orderNo}</div>
        <p className='mx-4'>Items:</p>
        <div className="row-start-3 mx-4">{items}</div>
        <div className="row-start-4 flex justify-between items-center mx-4">



            <p>Ordered: {ordered}</p>
            <p>Expected: {expected}</p>

            </div>

        </div>


    );
  }