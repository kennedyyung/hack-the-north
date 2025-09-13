import { faEnvelope, faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup, faClipboardList, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OverviewBox from "../components/overviewBox";

export default function Inbox() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Personal Calendar Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Social events, appointments, and reservations detected from your emails.
        AI-powered personal calendar management for your social life.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        <div className="p-4">
          <OverviewBox
            title="Total Events Detected"
            value="8"
            valueColour="text-purple-500"
            note="From email analysis"
            noteColour="text-purple-500"
            iconColour="text-purple-500"
            iconBackgroundColour="bg-purple-100"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
          />
        </div>

        <div className="p-4">
          <OverviewBox
            title="Upcoming Events"
            value="6"
            valueColour="text-red-500"
            note="From email analysis"
            noteColour="text-red-500"
            iconColour="text-red-500"
            iconBackgroundColour="bg-red-100"
            icon={<FontAwesomeIcon icon={faClock} />}
          />
        </div>

        <div className="p-4">
          <OverviewBox
            title="Confirmed Events"
            value="7"
            valueColour="text-green-500"
            note="From email analysis"
            noteColour="text-green-500"
            iconColour="text-green-500"
            iconBackgroundColour="bg-green-100"
            icon={<FontAwesomeIcon icon={faCalendar} />}
          />
        </div>
      </div>


      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faCalendar} className="text-purple-600 w-5 h-5" />
          <h2 className="text-purple-700 font-semibold text-lg">
            Smart Email Event Detection
          </h2>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faUserGroup} className="text-pink-500 w-5 h-5" />
              <h3 className="font-semibold text-gray-800">Social Events</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              We detect invitations, parties, study groups, and social gatherings from your emails.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Party invitations & RSVPs</li>
              <li>✓ Study group meetups</li>
              <li>✓ Social gatherings & events</li>
            </ul>
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faClipboardList} className="text-blue-500 w-5 h-5" />
              <h3 className="font-semibold text-gray-800">Appointments</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Medical appointments, consultations, and personal services automatically detected.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Medical & dental appointments</li>
              <li>✓ Personal service bookings</li>
              <li>✓ Consultation reminders</li>
            </ul>
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faUtensils} className="text-green-600 w-5 h-5" />
              <h3 className="font-semibold text-gray-800">Reservations</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Restaurant bookings, hotel stays, and travel reservations tracked automatically.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Restaurant reservations</li>
              <li>✓ Hotel & accommodation</li>
              <li>✓ Travel & booking confirmations</li>
            </ul>
          </div>
        </div>


        <div className="bg-purple-600 text-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
            <span className="font-semibold text-base">
              Never Miss Another Important Event
            </span>
          </div>
          <p className="text-sm opacity-90">
            Our AI automatically extracts dates, times, locations, and details from your emails,
            creating a comprehensive personal calendar you can trust.
          </p>
          <div className="flex space-x-2">
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
              Sync to Google Calendar
            </button>
            <button className="bg-purple-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-900 transition">
              Set smart reminders
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
