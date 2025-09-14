import { useMemo } from "react";
import { CalendarEvent } from "./calendarGrid";

type UpcomingDeadlinesProps = {
  events?: CalendarEvent[];
};

export default function UpcomingDeadlines({ events = [] }: UpcomingDeadlinesProps) {
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 2 && diffDays <= 7; // 3-7 days from now
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5); // Limit to 5 upcoming events
  }, [events]);

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      work: "bg-orange-500",
      school: "bg-blue-500",
      personal: "bg-pink-500",
      deadline: "bg-red-500",
      shopping: "bg-green-500",
      family: "bg-yellow-500",
    };
    return colorMap[type] || "bg-gray-500";
  };

  const getDueText = (eventDate: Date) => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 3) return '3 days';
    if (diffDays === 4) return '4 days';
    if (diffDays === 5) return '5 days';
    if (diffDays === 6) return '6 days';
    if (diffDays === 7) return '7 days';
    return `${diffDays} days`;
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-orange-600 font-semibold text-lg">Upcoming Deadlines</h2>
      </div>
      
      {upcomingEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming deadlines</p>
      ) : (
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${getTypeColor(event.type)}`}></div>
                <span className="text-sm font-medium text-gray-800">{event.title}</span>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {getDueText(event.date)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
