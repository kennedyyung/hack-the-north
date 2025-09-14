import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type StoreIntegrationProps = {
    title: string;
    orders: string;
    website: string;
    revenue: string;
    connected: string;
  };

  export default function StoreIntegration({ title, orders, website, revenue, connected }: StoreIntegrationProps) {
    return (
        <div className="rounded-2xl shadow bg-white p-4 mt-4 grid grid-cols-2"> 
        <div className="col-span-2 flex items- justify-between">
            <div className="flex">
                <div className="rounded-lg w-10 h-10 bg-green-400">
                    <div className="flex justify-center items-center mt-2">
                    <FontAwesomeIcon icon={faStore} className="text-white text-xl"/>
                    </div>
                </div>
                <div className="ml-2">
                    <p>{title}</p>
                    <p className="text-sm txt-gray-500">{website}</p>
                </div>
            </div>
            
            <div
            className={`col-start-6 flex items-center badge-soft badge
            ${connected === "connected" ? "badge-success" : "badge-info"}`}>
                {connected}
            </div> 

        </div>
        <div className="rounded-md outline outline-gray-300 bg-gray-100 flex flex-col items-center justify-center mx-4 mt-4">
            <p className="text-green-500 font-bold text-lg">{orders}</p>
            <p className="text-md font-semibold">Orders</p>
        </div>
        <div className="rounded-md outline outline-gray-300 bg-gray-100 flex flex-col items-center justify-center mx-4 mt-4">
            <p className="text-green-500 font-bold text-lg">${revenue}</p>
            <p className="text-md font-semibold">Revenue</p>
        </div>
        <div className="col-span-2 flex justify-center items-center mt-4">
        <button className="bg-green-400 text-white rounded-md px-8">
  {connected === "connected" ? "Connect Store" : "View Dashboard"}
</button>        </div>


        </div>


    );
  }