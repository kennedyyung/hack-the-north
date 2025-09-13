import { faEnvelope, faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup, faClipboardList, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverviewBox from "../components/overviewBox";

export default function Developer() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Personal Calendar Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Social events, appointments, and reservations detected from your emails.
        AI-powered personal calendar management for your social life.
      </p>

        

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
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
        <OverviewBox
          title="Upcoming Events"
          value="6"
          valueColour="text-red-500"
          note="Next 2 weeks"
          noteColour="text-red-500"
          iconColour="text-red-500"
          iconBackgroundColour="bg-red-100"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <OverviewBox
          title="Confirmed Events"
          value="7"
          valueColour="text-green-500"
          note="RSVPd"
          noteColour="text-green-500"
          iconColour="text-green-500"
          iconBackgroundColour="bg-green-100"
          icon={<FontAwesomeIcon icon={faCalendar} />}
        />
      </div>

      {/* Overview Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 space-y-6 mb-8">
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
      </div>

        {/* Timeline Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
            <FontAwesomeIcon icon={faCalendar} className="text-purple-600 w-5 h-5" />
            <h2 className="text-purple-700 font-semibold text-lg">
                Your Personal Calendar Timeline
            </h2>
            </div>

            <h3 className="text-gray-700 font-semibold mb-3">Thursday, September 11, 2025</h3>

            {/* Event 1 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUserGroup} className="text-purple-500 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">Coffee with Emma</h4>
                <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-md">
                tentative
                </span>
            </div>

            <div className="text-sm text-gray-600 mt-1">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
                11:00 AM @ Second Cup, College Street — 2 people
            </div>

            <p className="text-sm text-gray-700 mt-2">
                Catch up session! Let me know if you can still make it.
            </p>

            <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">
                Detected from: emma.wilson@gmail.com
                </p>
            <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                    Add to Calendar
                </button>
                <button className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                    Set Reminder
                </button>
            </div>
        </div>
    </div>


        {/* Event 2 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faClipboardList} className="text-blue-500 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">Dentist Appointment</h4>
                <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                confirmed
                </span>
            </div>

            <div className="text-sm text-gray-600 mt-1">
                <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
                2:30 PM @ Downtown Dental Clinic
            </div>

            <p className="text-sm text-gray-700 mt-2">
                Routine cleaning and checkup. Please arrive 15 minutes early.
            </p>

            <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">
                Detected from: appointments@downtowndental.ca
                </p>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Add to Calendar
                    </button>
                    <button className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Set Reminder
                    </button>
                </div>
            </div>
        </div>
    </div>



      {/* The Bottom Banner footnote area */}
    <div className="bg-purple-600 text-white rounded-2xl p-6 mt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        {/* Left Section */}
        <div className="flex items-center justify-center md:justify-start space-x-2">
            <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
            <span className="font-semibold text-base">
            Never Miss Another Important Event
            </span>
        </div>
        <p className="text-sm opacity-90 max-w-lg">
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
    </>
  );
}
