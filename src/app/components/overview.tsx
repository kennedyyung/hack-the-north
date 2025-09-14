"use client";

import OverviewBox from "./overviewBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faClock, faCalendar } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";

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

export default function Overview() {
  const [emailData, setEmailData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchEmails();
  }, []);

  // Calculate stats from email data
  const totalEmails = emailData.length;
  const urgentTasks = emailData.filter(email => email.priority === "high").length;
  const financialEmails = emailData.filter(email => email.category === "finance").length;
  const activeTracking = emailData.filter(email => email.category === "shopify").length;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="grid grid-cols-4 gap-6 mt-8">
        <OverviewBox 
          title="Emails Processed" 
          value={totalEmails.toString()} 
          valueColour="text-green-500" 
          note="Total emails" 
          noteColour="text-green-500" 
          iconColour="text-green-500" 
          iconBackgroundColour="bg-green-100"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <OverviewBox 
          title="Urgent Tasks" 
          value={urgentTasks.toString()} 
          valueColour="text-red-500" 
          note="High priority" 
          noteColour="text-red-500" 
          iconColour="text-red-500" 
          iconBackgroundColour="bg-red-100"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <OverviewBox 
          title="Financial Insights" 
          value={financialEmails.toString()} 
          valueColour="text-blue-500" 
          note="Finance emails" 
          noteColour="text-blue-500" 
          iconColour="text-blue-500" 
          iconBackgroundColour="bg-blue-100"
          icon={<FontAwesomeIcon icon={faArrowTrendUp} />}
        />
        <OverviewBox 
          title="Active Tracking" 
          value={activeTracking.toString()} 
          valueColour="text-purple-500" 
          note="Shopify orders" 
          noteColour="text-purple-500" 
          iconColour="text-purple-500" 
          iconBackgroundColour="bg-purple-100"
          icon={<FontAwesomeIcon icon={faCalendar} />}
        />
      </div>
    </div>
  )
}  