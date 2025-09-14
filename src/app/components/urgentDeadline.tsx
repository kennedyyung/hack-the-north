import { useMemo } from "react";
import { CalendarEvent } from "./calendarGrid";

type UrgentDeadlinesProps = {
  events?: CalendarEvent[];
};

export default function UrgentDeadlines({ events = [] }: UrgentDeadlinesProps) {
  const urgentEvents = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 2; // Next 2 days
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5); // Limit to 5 most urgent
  }, [events]);

  const getUrgencyText = (eventDate: Date) => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getUrgencyColor = (eventDate: Date) => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'text-red-600';
    if (diffDays === 1) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        <h2 className="text-red-600 font-semibold text-lg">Urgent Deadlines</h2>
      </div>
      
      {urgentEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No urgent deadlines</p>
      ) : (
        <div className="space-y-2">
          {urgentEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-800">{event.title}</span>
              </div>
              <span className={`text-xs font-medium ${getUrgencyColor(event.date)}`}>
                {getUrgencyText(event.date)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  