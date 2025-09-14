import { useState, useMemo, useCallback } from "react";

export type CalendarEvent = {
  id: string;
  title: string;
  type: 'work' | 'school' | 'personal' | 'deadline' | 'shopping' | 'family';
  date: Date;
  time?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  emailData?: any; // Store original email data for popup
};

type CalendarDay = {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  fullDate: Date;
};

type CalendarGridProps = {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date | null) => void;
  selectedDate?: Date | null;
  onEventClick?: (event: CalendarEvent, mouseEvent: React.MouseEvent) => void;
};

export default function CalendarGrid({ events = [], onDateSelect, selectedDate, onEventClick }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const colorMap: Record<string, string> = {
    work: "bg-blue-500",
    school: "bg-purple-500",
    personal: "bg-pink-500",
    deadline: "bg-red-500",
    shopping: "bg-green-500",
    family: "bg-yellow-500",
  };

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();

    const days: CalendarDay[] = [];

    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({
        date: day.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        events: [],
        fullDate: day
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const isToday = currentDay.toDateString() === today.toDateString();
      const isSelected = selectedDate ? currentDay.toDateString() === selectedDate.toDateString() : false;
      
      const dayEvents = events.filter(event => 
        event.date.toDateString() === currentDay.toDateString()
      );

      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        events: dayEvents,
        fullDate: currentDay
      });
    }

    // Add next month's leading days to fill the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonthDay = new Date(year, month + 1, day);
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        events: [],
        fullDate: nextMonthDay
      });
    }

    return days;
  }, [events, selectedDate]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const handleDayClick = useCallback((day: CalendarDay) => {
    if (day.isCurrentMonth) {
      onDateSelect?.(day.fullDate);
    }
  }, [onDateSelect]);

  const formatMonthYear = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  const days = useMemo(() => getDaysInMonth(currentDate), [getDaysInMonth, currentDate]);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{formatMonthYear(currentDate)}</h2>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => handleDayClick(day)}
            className={`p-2 rounded-lg text-center text-sm font-medium transition-colors ${
              !day.isCurrentMonth
                ? 'text-gray-300 hover:bg-gray-50'
                : day.isToday
                ? 'bg-blue-500 text-white font-bold'
                : day.isSelected
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {day.date}
            {day.events.length > 0 && (
              <div className="flex justify-center mt-1 space-x-1">
                {day.events.slice(0, 3).map((event, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event, e);
                    }}
                    className={`w-2 h-2 rounded-full ${colorMap[event.type]} hover:scale-125 transition-transform cursor-pointer`}
                    title={event.title}
                  ></button>
                ))}
                {day.events.length > 3 && (
                  <span className="text-xs text-gray-500">+{day.events.length - 3}</span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
  