import { faCalendar } from "@fortawesome/free-regular-svg-icons";
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
        <h1 className=" text-lg font-semibold flex items-center mx-4">{title}</h1>
        <div
  className={`col-start-6 flex items-center badge-soft badge
    ${status === "shipped" ? "badge-warning" : ""}
    ${status === "delivered" ? "badge-success" : ""}
    ${status === "processing" ? "badge-info" : ""}`}
>
  {status}
    </div>          </div>
        <p className="text-semibold">${amount}</p>
        </div>

        </div>
        
        <div className="test-sm text-gray-500 row-start-2 flex items-center mx-4">Order #{orderNo}</div>
        <p className='mx-4 test-sm text-gray-500'>Items:</p>
        <div className="row-start-3 mx-4">{items}</div>
        <div className="test-sm text-gray-500 row-start-4 flex justify-between items-center ml-4">


            <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendar}/>
                <p>Ordered: {ordered}</p>
            </div>
            <p>Expected: {expected}</p>

            </div>

        </div>


    );
  }