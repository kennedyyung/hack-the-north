import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons"
export default function Shopping() {
    return (
        <>
        <h1 className="text-2xl font-bold mb-2">Smart Shopping Dashboard</h1>
        <p>
          We bridge inbox + commerce, turning email receipts into a smart shopping dashboard. Track orders, deliveries, and connect to Shopify merchant dashbaords automatically.
        </p>

        <div className="p-4 rounded-2xl shadow bg-white grid grid-rows-2 w-76 mx-4">
            <h1>Total Orders</h1>
            <div className="flex">
            <p>4</p>
            <FontAwesomeIcon icon={faBoxOpen}/>
            </div>
        </div>

      <div className="bg-green-50 border border-green-600 rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
          <h2 className="text-green-600 font-semibold text-lg">
            Smart Commerce Integration
          </h2>
        </div>
        </div>
                </>
    )
}