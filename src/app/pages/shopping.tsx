import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStore, faBoxOpen } from "@fortawesome/free-solid-svg-icons"
import ShopifySummary from "../components/shopifySummary"

export default function Shopping() {
    return (
        <>
        <h1 className="text-2xl font-bold mb-2">Smart Shopping Dashboard</h1>
        <p>
          We bridge inbox + commerce, turning email receipts into a smart shopping dashboard. Track orders, deliveries, and connect to Shopify merchant dashbaords automatically.
        </p>



        <div className="grid grid-cols-2">
      <div className="outline-solid outline-grey-50 rounded-md p-4 m-4  ">
        <div className="p-4 rounded-2xl shadow bg-white grid grid-rows-2 w-76 mx-4">
            <h1>Total Orders</h1>
            <div className="flex">
            <p>4</p>
            <FontAwesomeIcon icon={faBoxOpen}/>
            </div>
        </div>

      <div className="bg-green-10 border border-green-600 rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex-col items-center space-x-2">
          <div className="flex items-center">
          <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
          <h2 className="text-green-600 font-semibold text-lg">
            Smart Commerce Integration
          </h2>
            </div>
          <div className="bg-green-50 border border-green-600 rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex-cols items-center space-x-2">
          <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
          <h2 className="text-green-600 font-semibold text-lg">
Bridge Inbox + Commerce with Shopify          </h2>
<p>We&apos;ve detected order confirmations from 4 different stores in your inbox. Connect these stores to your Shopify merchant dashboard for unified order management and analytics.</p>
          
        </div>
        </div>
        </div>
        </div>
        <ShopifySummary title="TechGear Pro" status="shipped" amount="189.99" items="headphones, ipod, test" ordered="2025-12-19" expected="2026-01-12" orderNo="1002"/>
        <ShopifySummary title="TechGear Pro" status="shipped" amount="189.99" items="headphones, ipod, test" ordered="2025-12-19" expected="2026-01-12" orderNo="1002"/>

        <ShopifySummary title="TechGear Pro" status="shipped" amount="189.99" items="headphones, ipod, test" ordered="2025-12-19" expected="2026-01-12" orderNo="1002"/>

        <ShopifySummary title="TechGear Pro" status="shipped" amount="189.99" items="headphones, ipod, test" ordered="2025-12-19" expected="2026-01-12" orderNo="1002"/>

        </div></div>
                </>
    )
}