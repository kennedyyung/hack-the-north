import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

export default function Financial() {
    return (
        <>
      <h1 className="text-2xl font-bold mb-2">Financial Clarity Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Track your income, expenses, and get smart investment suggestions based on your email insights. Turn email chaos into financial opportunity with RBC InvestEase.
      </p>

      <div className="bg-blue-50 border border-blue-600 rounded-2xl p-6 space-y-6 w-3/4">
        {/* Header */}
        <div className="grid grid-rows-3 grid-cols-2">
            <div className="items-center col-span-2 flex">          
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 w-5 h-5" />
                <h2 className="text-blue-600 font-semibold text-lg ml-4">Suggested Round-Up Investment</h2>
            </div>

          <p className="font-semibold">Recent Email Invouces Detected:</p>
        </div>
        </div>


              </>
    )
}