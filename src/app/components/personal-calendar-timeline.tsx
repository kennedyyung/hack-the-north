import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faMapPin, faUsers, faUtensils, faUserMd, faCoffee, faBook } from "@fortawesome/free-solid-svg-icons";

interface PersonalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  description: string;
  source: string;
  status: 'tentative' | 'confirmed';
  type: 'coffee' | 'appointment' | 'study' | 'dinner';
}

const mockPersonalEvents: PersonalEvent[] = [
  {
    id: 'pe1',
    title: 'Coffee with Emma',
    date: '2025-09-11',
    time: '11:00 AM',
    location: 'Second Cup, College Street',
    attendees: 2,
    description: 'Catch up session! Let me know if you can still make it.',
    source: 'emma.wilson@gmail.com',
    status: 'tentative',
    type: 'coffee'
  },
  {
    id: 'pe2',
    title: 'Dentist Appointment',
    date: '2025-09-11',
    time: '2:30 PM',
    location: 'Downtown Dental Clinic',
    description: 'Routine cleaning and checkup. Please arrive 15 minutes early.',
    source: 'appointments@downtowndental.ca',
    status: 'confirmed',
    type: 'appointment'
  },
  {
    id: 'pe3',
    title: 'Study Group - CS334',
    date: '2025-09-12',
    time: '4:00 PM',
    location: 'Robarts Library Room 302',
    attendees: 6,
    description: 'Preparing for midterm exam. Bring textbook and notes.',
    source: 'mike.chen@mail.utoronto.ca',
    status: 'confirmed',
    type: 'study'
  },
  {
    id: 'pe4',
    title: 'Dinner at Canoe Restaurant',
    date: '2025-09-13',
    time: '8:00 PM',
    location: 'Canoe Restaurant, CN Tower',
    attendees: 4,
    description: 'Table for 4, anniversary celebration. Smart casual dress code.',
    source: 'reservations@canoerestaurant.com',
    status: 'confirmed',
    type: 'dinner'
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'coffee': return faCoffee;
    case 'appointment': return faUserMd;
    case 'study': return faBook;
    case 'dinner': return faUtensils;
    default: return faCalendar;
  }
};

const getEventIconColor = (type: string) => {
  switch (type) {
    case 'coffee': return 'bg-purple-100 text-purple-600';
    case 'appointment': return 'bg-blue-100 text-blue-600';
    case 'study': return 'bg-green-100 text-green-600';
    case 'dinner': return 'bg-orange-100 text-orange-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'tentative': return 'bg-orange-100 text-orange-800';
    case 'confirmed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const groupEventsByDate = (events: PersonalEvent[]) => {
  return events.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, PersonalEvent[]>);
};

export default function PersonalCalendarTimeline() {
  const groupedEvents = groupEventsByDate(mockPersonalEvents);
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FontAwesomeIcon icon={faCalendar} className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-purple-600">
          Your Personal Calendar Timeline
        </h2>
      </div>

      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {formatDate(date)}
            </h3>

            <div className="space-y-3">
              {groupedEvents[date].map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  {/* Event Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventIconColor(
                      event.type
                    )}`}
                  >
                    <FontAwesomeIcon icon={getEventIcon(event.type)} className="h-5 w-5" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faMapPin} className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                          <span>{event.attendees} people</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-500">
                      Detected from: {event.source}
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>

                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors">
                        Add to Calendar
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <div className="text-center py-12">
          <FontAwesomeIcon
            icon={faCalendar}
            className="h-16 w-16 text-gray-300 mx-auto mb-4"
          />
          <p className="text-gray-500 text-lg">No personal events detected</p>
          <p className="text-gray-400 text-sm mt-2">
            Personal events will appear here when detected from your emails
          </p>
        </div>
      )}
    </div>
  );
}