import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faStore, faDollarSign, faTruck, faShoppingCart, faClock, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import OverviewBox from "../components/overviewBox";
import ShopifySummary from "../components/shopifySummary";
import StoreIntegration from "../components/storeIntegration";

export default function Shopping() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Smart Shopping Dashboard</h1>
      <p className="text-gray-600 mb-6">
        We bridge inbox + commerce, turning email receipts into a smart shopping dashboard. Track orders, deliveries, and connect to Shopify merchant dashboards automatically.
      </p>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <OverviewBox
          title="Total Orders"
          value="4"
          valueColour="text-blue-500"
          note="From inbox receipts"
          noteColour="text-blue-500"
          iconColour="text-blue-500"
          iconBackgroundColour="bg-blue-100"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
        />
        <OverviewBox
          title="Active Orders"
          value="3"
          valueColour="text-yellow-500"
          note="Processing or shipped"
          noteColour="text-yellow-500"
          iconColour="text-yellow-500"
          iconBackgroundColour="bg-yellow-200"
          icon={<FontAwesomeIcon icon={faTruck} />}
        />
        <OverviewBox
          title="Total Sales"
          value="$25,655"
          valueColour="text-green-500"
          note="Across all stores"
          noteColour="text-green-500"
          iconColour="text-green-500"
          iconBackgroundColour="bg-green-100"
          icon={<FontAwesomeIcon icon={faDollarSign} />}
        />
        <OverviewBox
          title="Store Connections"
          value="2 / 4"
          valueColour="text-purple-500"
          note="Shopify integrated"
          noteColour="text-purple-500"
          iconColour="text-purple-500"
          iconBackgroundColour="bg-purple-100"
          icon={<FontAwesomeIcon icon={faStore} />}
        />
      </div>

      {/* Integration Section */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-6 mb-8">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
          <h2 className="text-green-700 font-semibold text-lg">
            Bridge Inbox + Commerce with Shopify
          </h2>
        </div>
        <p className="text-sm text-gray-700">
          We&apos;ve detected order confirmations from 4 different stores in your inbox. Connect these stores to your Shopify merchant dashboard for unified order management and analytics.
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700">
            Connect All Stores
          </button>
          <button className="px-4 py-2 text-sm rounded-md border border-green-600 text-green-600 hover:bg-green-100">
            View Shopify Benefits
          </button>
        </div>
      </div>

      {/* Recent Orders and Store Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <FontAwesomeIcon icon={faShoppingCart} className="text-green-600 w-5 h-5" />
            <h2 className="text-green-700 font-semibold text-lg">Recent Orders</h2>
          </div>
          <ShopifySummary 
  title="Wireless Headphones" 
  status="processing" 
  orderNo="12027" 
  items="Wireless Headphones" 
  ordered="2025-08-23" 
  expected="2025-09-15" 
  amount="246.05"
/>

<ShopifySummary 
  title="Desk Accessories" 
  status="shipped" 
  orderNo="29325" 
  items="Keychain, Keyholder" 
  ordered="2025-01-23" 
  expected="2025-02-05" 
  amount="39.99"
/>

<ShopifySummary 
  title="Socks Bundle" 
  status="processing" 
  orderNo="143102" 
  items="Crew Socks, Elite Socks" 
  ordered="2025-03-12" 
  expected="2025-03-20" 
  amount="29.50"
/>

<ShopifySummary 
  title="Summer Outfit" 
  status="delivered" 
  orderNo="98025" 
  items="Skirt, Shorts, Hat, Jeans" 
  ordered="2025-04-05" 
  expected="2025-04-15" 
  amount="154.75"
/>


        </div>

        {/* Store Integrations Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
            <h2 className="text-green-700 font-semibold text-lg">Store Integrations</h2>
          </div>
          <StoreIntegration 
  title="Urban Outfitters" 
  orders="120" 
  website="urbanoutfitters.com" 
  revenue="12500.75" 
  connected="connected" 
/>

<StoreIntegration 
  title="Tech Haven" 
  orders="45" 
  website="techhaven.io" 
  revenue="8650.40" 
  connected="connected" 
/>

<StoreIntegration 
  title="Fashion Finds" 
  orders="12" 
  website="fashionfinds.net" 
  revenue="1520.10" 
  connected="not connected" 
/>

<StoreIntegration 
  title="Home Essentials" 
  orders="30" 
  website="homeessentials.store" 
  revenue="2985.50" 
  connected="not connected" 
/>

         

        </div>
      </div>
    </>
  );
}