import { useMemo } from "react";
import { CalendarEvent } from "./calendarGrid";

type DayDetailsProps = {
  selectedDate: Date | null;
  events?: CalendarEvent[];
};

export default function DayDetails({ selectedDate, events = [] }: DayDetailsProps) {
  const dayEvents = useMemo(() => {
    if (!selectedDate) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  }, [selectedDate, events]);

  const formatDate = useMemo(() => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }, [selectedDate]);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!selectedDate) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select a Date</h2>
        <p className="text-gray-500 text-sm">Click on a date in the calendar to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Deadlines for {formatDate}
      </h2>
      
      {dayEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No events scheduled for this date</p>
      ) : (
        <div className="space-y-3">
          {dayEvents.map((event) => (
            <div key={event.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-800">{event.title}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(event.priority)}`}>
                  {event.priority === 'high' ? 'Action Required' : 'Scheduled'}
                </span>
              </div>
              {event.description && (
                <p className="text-xs text-gray-600 mb-1">{event.description}</p>
              )}
              {event.time && (
                <p className="text-xs text-gray-500">at {event.time}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
