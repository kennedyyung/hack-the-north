"use client";

import { useState, useMemo, useEffect } from "react";
import UrgentDeadlines from "../components/urgentDeadline";
import UpcomingDeadlines from "../components/upcomingDeadlines";
import CalendarGrid, { CalendarEvent } from "../components/calendarGrid";
import DayDetails from "../components/dayDetails";
import Legend from "../components/legend";
import EmailSummary from "../components/emailSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faBagShopping, faGraduationCap, faBriefcase } from "@fortawesome/free-solid-svg-icons";

interface EmailData {
  category: "school" | "finance" | "shopify" | "work" | "personal" | "none";
  sender: string;
  subject: string;
  summary: string;
  duedate?: string;
  money?: number;
  priority?: "low" | "medium" | "high";
  participants?: number;
  location?: string;
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [emailData, setEmailData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupData, setPopupData] = useState<{ event: CalendarEvent; position: { x: number; y: number } } | null>(null);

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      const transformedData = data.map((item: Record<string, { S?: string; N?: string }>) => ({
        category: item.category?.S || "none",
        sender: item.sender?.S || "",
        subject: item.subject?.S || "",
        summary: item.summary?.S || "",
        duedate: item.duedate?.S,
        money: item.money?.N ? parseFloat(item.money.N) : undefined,
        priority: item.priority?.S,
        participants: item.participants?.N ? parseInt(item.participants.N) : undefined,
        location: item.location?.S,
      }));
      setEmailData(transformedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);


  // Transform email data with due dates into calendar events
  const events: CalendarEvent[] = useMemo(() => {
    return emailData
      .filter(email => email.duedate)
      .map((email, index) => {
        const dueDate = new Date(email.duedate!);
        return {
          id: `email-${index}`,
          title: email.subject,
          type: email.category as any,
          date: dueDate,
          time: dueDate.toTimeString().slice(0, 5),
          description: email.summary,
          priority: email.priority || "medium",
          emailData: email // Store original email data for popup
        };
      });
  }, [emailData]);

  const handleEventClick = (event: CalendarEvent, mouseEvent: React.MouseEvent) => {
    setPopupData({
      event,
      position: { x: mouseEvent.clientX, y: mouseEvent.clientY }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "finance": return faDollarSign;
      case "shopify": return faBagShopping;
      case "school": return faGraduationCap;
      case "work": return faBriefcase;
      default: return faBagShopping;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "finance": return "text-blue-500";
      case "shopify": return "text-green-500";
      case "school": return "text-purple-500";
      case "work": return "text-orange-500";
      case "personal": return "text-pink-500";
      default: return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading calendar...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Calendar Dashboard</h1>
      <p className="text-gray-600 mb-6">
      All your deadlines in one place - from tuition payments to PR reviews. Smart insights help you prioritize and plan across all aspects of student life.
      </p>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
            <UrgentDeadlines events={events} />
            <UpcomingDeadlines events={events} />
        </div>

        {/* Middle Column - Calendar */}
        <div className="lg:col-span-6">
            <CalendarGrid 
            events={events} 
            onDateSelect={setSelectedDate} 
            selectedDate={selectedDate}
            onEventClick={handleEventClick}
            />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
            <DayDetails selectedDate={selectedDate} events={events} />
            <Legend />
        </div>
      </div>

      {/* Popup Modal */}
      {popupData && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
          style={{
            left: Math.min(popupData.position.x, window.innerWidth - 400),
            top: Math.min(popupData.position.y, window.innerHeight - 300),
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{popupData.event.title}</h3>
            <button 
              onClick={() => setPopupData(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          {popupData.event.emailData && (
            <EmailSummary
              title={popupData.event.emailData.subject}
              from={popupData.event.emailData.sender}
              tag={popupData.event.emailData.priority || "medium"}
              icon={
                <FontAwesomeIcon 
                  icon={getCategoryIcon(popupData.event.emailData.category)}
                  className={getCategoryColor(popupData.event.emailData.category)}
                />
              }
              note={popupData.event.emailData.summary}
              dueDate={popupData.event.emailData.duedate}
              amount={popupData.event.emailData.money?.toString()}
            />
          )}
        </div>
      )}

      {/* Backdrop to close popup */}
      {popupData && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setPopupData(null)}
        />
      )}
    </>
  );
}