import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faStore, faDollarSign, faTruck, faShoppingCart, faClock, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import OverviewBox from "../components/overviewBox";

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
          iconBackgroundColour="bg-yellow-100"
          icon={<FontAwesomeIcon icon={faTruck} />}
        />
        <OverviewBox
          title="Total Sales"
          value="$460.48"
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
          We've detected order confirmations from 4 different stores in your inbox. Connect these stores to your Shopify merchant dashboard for unified order management and analytics.
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

          {[
            {
              store: "TechGear Pro",
              status: "shipped",
              statusColor: "green",
              amount: "$189.89",
              order: "#1004",
              package: "TECH23456M",
              date: "09/04/2023 11:04 AM",
              email: "techgearpro@store.com",
            },
            {
              store: "Campus Clothing",
              status: "processing",
              statusColor: "yellow",
              amount: "$140.50",
              order: "#1003",
              package: "CAMP34567N",
              date: "09/04/2023 10:45 AM",
              email: "campusclothing@store.com",
            },
          ].map((order, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-800">{order.store}</h4>
                <span
                  className={`ml-auto bg-${order.statusColor}-100 text-${order.statusColor}-700 text-xs px-2 py-1 rounded-md`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Order {order.order} — {order.amount}
              </p>
              <p className="text-sm text-gray-600">Student Package: {order.package}</p>
              <p className="text-xs text-gray-400">
                {order.date} — {order.email}
              </p>
            </div>
          ))}
        </div>

        {/* Store Integrations Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <FontAwesomeIcon icon={faStore} className="text-green-600 w-5 h-5" />
            <h2 className="text-green-700 font-semibold text-lg">Store Integrations</h2>
          </div>

          {[
            {
              name: "TechGear Pro",
              url: "techgearpro.myshopify.com",
              orders: 15,
              revenue: "$2840.50",
              connected: true,
            },
            {
              name: "Campus Clothing",
              url: "campus-clothing.myshopify.com",
              orders: 8,
              revenue: "$640.00",
              connected: false,
            }
          ].map((store, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.url}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{store.orders}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">{store.revenue}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span
                  className={`text-sm font-medium ${
                    store.connected ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {store.connected ? "Connected" : "Not Connected"}
                </span>
                {store.connected ? (
                  <button className="px-4 py-2 text-sm rounded-md border border-green-600 text-green-600 hover:bg-green-100">
                    View Dashboard
                  </button>
                ) : (
                  <a href = "https://accounts.shopify.com/signup"> 
                    <button className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600">
                      Connect Store
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}