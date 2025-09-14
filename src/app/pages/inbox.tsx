"use client";

import { faDollarSign, faBagShopping, faGraduationCap, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailSummary from "../components/emailSummary";
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

export default function Inbox() {
  const [emailData, setEmailData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      // Transform the data to match our interface
      const transformedData = data.map((item: Record<string, any>) => {
        let category = item.category?.S || "none";
        // Map "shopping" to "shopify" for consistency
        if (category === "shopping") {
          category = "shopify";
        }
        return {
          category: category as "school" | "finance" | "shopify" | "work" | "personal" | "none",
          sender: item.sender?.S || "",
          subject: item.subject?.S || "",
          summary: item.summary?.S || "",
          duedate: item.duedate?.S,
          money: item.money?.N ? parseFloat(item.money.N) : undefined,
          priority: item.priority?.S,
          participants: item.participants?.N ? parseInt(item.participants.N) : undefined,
          location: item.location?.S,
        };
      });
      setEmailData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);


  if (loading) {
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-600">Loading emails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  const groupedEmails = emailData.reduce((acc, email) => {
    if (!acc[email.category]) {
      acc[email.category] = [];
    }
    acc[email.category].push(email);
    return acc;
  }, {} as Record<string, EmailData[]>);

  // Define all categories with their display info
  const categories = [
    { key: "finance", name: "Finance", icon: faDollarSign, color: "text-blue-500" },
    { key: "shopify", name: "Shopify", icon: faBagShopping, color: "text-green-500" },
    { key: "school", name: "School", icon: faGraduationCap, color: "text-purple-500" },
    { key: "work", name: "Work", icon: faBriefcase, color: "text-orange-500" },
    { key: "personal", name: "Personal", icon: faBagShopping, color: "text-pink-500" },
    { key: "none", name: "Other", icon: faBagShopping, color: "text-gray-500" },
  ];

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">AI-Powered Inbox Categories</h1>
        <p className="text-gray-600 text-lg">
          Your emails are automatically categorized and converted into actionable tasks across finance, shopping, school, work, and development workflows
        </p>

        <div className="space-y-4">
          {/* First row - Main categories */}
          <div className="grid grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => {
              const emails = groupedEmails[category.key] || [];
              return (
                <div key={category.key} className="bg-white border border-gray-300 rounded-md flex flex-col h-96">
                  <div className="flex items-center ml-4 mr-2 mt-4">
                    <FontAwesomeIcon icon={category.icon} className={category.color} />
                    <p className="ml-2">{category.name}</p>
                  </div>
                  <div className="space-y-0.5 flex-1 overflow-y-auto px-2 pb-2">
                    {emails.length > 0 ? (
                      emails.map((email, index) => (
                        <EmailSummary
                          key={`${email.subject}-${index}`}
                          title={email.subject}
                          from={email.sender}
                          tag={email.priority || "medium"}
                          icon={<FontAwesomeIcon icon={category.icon} />}
                          note={email.summary}
                          dueDate={email.duedate}
                          amount={email.money?.toString()}
                        />
                      ))
                    ) : (
                      <div className="p-4 text-gray-500 text-center">
                        No emails in this category
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Second row - Additional categories */}
          <div className="grid grid-cols-4 gap-4">
            {categories.slice(4).map((category) => {
              const emails = groupedEmails[category.key] || [];
              return (
                <div key={category.key} className="bg-white border border-gray-300 rounded-md flex flex-col h-96">
                  <div className="flex items-center ml-4 mr-2 mt-4">
                    <FontAwesomeIcon icon={category.icon} className={category.color} />
                    <p className="ml-2">{category.name}</p>
                  </div>
                  <div className="space-y-0.5 flex-1 overflow-y-auto px-2 pb-2">
                    {emails.length > 0 ? (
                      emails.map((email, index) => (
                        <EmailSummary
                          key={`${email.subject}-${index}`}
                          title={email.subject}
                          from={email.sender}
                          tag={email.priority || "medium"}
                          icon={<FontAwesomeIcon icon={category.icon} />}
                          note={email.summary}
                          dueDate={email.duedate}
                          amount={email.money?.toString()}
                        />
                      ))
                    ) : (
                      <div className="p-4 text-gray-500 text-center">
                        No emails in this category
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Empty divs to maintain grid alignment */}
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
  