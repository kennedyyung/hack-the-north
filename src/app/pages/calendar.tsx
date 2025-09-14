import { useState, useMemo } from "react";
import UrgentDeadlines from "../components/urgentDeadline";
import UpcomingDeadlines from "../components/upcomingDeadlines";
import CalendarGrid, { CalendarEvent } from "../components/calendarGrid";
import DayDetails from "../components/dayDetails";
import Legend from "../components/legend";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample data pull from an API
  // Dates use zero based months so jan will be 0, oct will be 9
  const events: CalendarEvent[] = useMemo(() => [
    {
      id: '1',
      title: 'CS Assignment Due',
      type: 'school',
      date: new Date(2025, 9, 15), 
      time: '16:00',
      description: 'Review authentication system',
      priority: 'high'
    },
    {
      id: '2',
      title: 'PR Review Due',
      type: 'work',
      date: new Date(2025, 9, 14), 
      time: '14:00',
      description: 'Code review for new feature',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Job Interview',
      type: 'work',
      date: new Date(2025, 8, 14),
      time: '10:00',
      description: 'Software Engineer position at TechCorp',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Math Midterm',
      type: 'school',
      date: new Date(2025, 8, 17),
      time: '09:00',
      description: 'Calculus II midterm exam',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Scholarship Application',
      type: 'school',
      date: new Date(2025, 11, 20), 
      time: '23:59',
      description: 'Merit-based scholarship application',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Shopping Trip',
      type: 'shopping',
      date: new Date(2025, 8, 15), 
      time: '15:00',
      description: 'Airpods delivery',
      priority: 'low'
    },
    {
      id: '7',
      title: 'Family Dinner',
      type: 'family',
      date: new Date(2025, 8, 21), 
      time: '18:00',
      description: 'Holiday family gathering',
      priority: 'low'
    }
  ], []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Smart Shopping Dashboard</h1>
      <p className="text-gray-600 mb-6">
        We bridge inbox + commerce, turning email receipts into a smart shopping dashboard. Track orders, deliveries, and connect to Shopify merchant dashboards automatically.
      </p>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Urgent and Upcoming Deadlines */}
          <div className="lg:col-span-1 space-y-6">
            <UrgentDeadlines events={events} />
            <UpcomingDeadlines events={events} />
          </div>

          {/* Middle Column - Calendar */}
          <div className="lg:col-span-2">
            <CalendarGrid 
              events={events} 
              onDateSelect={setSelectedDate} 
              selectedDate={selectedDate}
            />
          </div>

          {/* Right Column - Day Details and Legend */}
          <div className="lg:col-span-1 space-y-6">
            <DayDetails selectedDate={selectedDate} events={events} />
            <Legend />
          </div>
        </div>
      </div>
    </>
  );
}