"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface EmailNotification {
  id: string;
  subject: string;
  sender: string;
  category: string;
  action: 'INSERT' | 'MODIFY' | 'REMOVE';
  timestamp: Date;
  visible: boolean;
}

interface WebSocketContextType {
  isConnected: boolean;
  showNotification: (message: string) => void;
  notification: { message: string; visible: boolean } | null;
  emailNotifications: EmailNotification[];
  removeEmailNotification: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: React.ReactNode;
  url?: string;
  enableNotifications?: boolean;
}

export function WebSocketProvider({ 
  children, 
  url = "wss://js2tqi90r5.execute-api.us-east-2.amazonaws.com/dev",
  enableNotifications = true 
}: WebSocketProviderProps) {
  const [notification, setNotification] = useState<{ message: string; visible: boolean } | null>(null);
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>([]);

  const showNotification = useCallback((message: string) => {
    setNotification({ message, visible: true });
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, visible: false } : null);
    }, 5000);
  }, []);

  const addEmailNotification = useCallback((emailData: any, action: 'INSERT' | 'MODIFY' | 'REMOVE') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newNotification: EmailNotification = {
      id,
      subject: emailData.subject || 'No Subject',
      sender: emailData.sender || 'Unknown Sender',
      category: emailData.category || 'none',
      action,
      timestamp: new Date(),
      visible: true,
    };

    setEmailNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only last 5 notifications

    // Auto-hide after 8 seconds
    setTimeout(() => {
      setEmailNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, visible: false } : notif
        )
      );
    }, 8000);
  }, []);

  const removeEmailNotification = useCallback((id: string) => {
    setEmailNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const { readyState } = useWebSocket({
    url,
    onRefresh: (message) => {
      // Extract and unmarshall the actual email data from the nested structure
      const getEmailData = (record: any) => {
        if (record && record.data && typeof record.data === 'object') {
          // Unmarshall DynamoDB attribute values to plain objects
          const unmarshall = (dynamoJson: any) => {
            const result: any = {};
            for (const key in dynamoJson) {
              const value = dynamoJson[key];
              if (value && typeof value === 'object') {
                if (value.S) {
                  result[key] = value.S;
                } else if (value.N) {
                  result[key] = value.N;
                } else if (value.M) {
                  result[key] = unmarshall(value.M);
                }
              }
            }
            return result;
          };
          return unmarshall(record.data);
        }
        return record;
      };
      
      const newData = getEmailData(message.new);
      const oldData = getEmailData(message.old);
      
      // Only show notifications for email records (those with subject field)
      if (message.event === 'INSERT' && newData && newData.subject) {
        addEmailNotification(newData, 'INSERT');
      } else if (message.event === 'MODIFY' && newData && newData.subject) {
        addEmailNotification(newData, 'MODIFY');
      } else if (message.event === 'REMOVE' && oldData && oldData.subject) {
        addEmailNotification(oldData, 'REMOVE');
      }
    },
    enableNotifications: false, // Disable browser notifications, use our custom one
    autoReconnect: true,
  });

  const isConnected = readyState === WebSocket.OPEN;

  const value: WebSocketContextType = {
    isConnected,
    showNotification,
    notification,
    emailNotifications,
    removeEmailNotification,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
      {/* Professional Outlook-style email notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {emailNotifications
          .filter(notif => notif.visible)
          .map((notif) => (
            <div
              key={notif.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 transform transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      notif.action === 'INSERT' ? 'bg-green-500' : 
                      notif.action === 'MODIFY' ? 'bg-blue-500' : 
                      'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {notif.action === 'INSERT' ? 'New Email' : 
                       notif.action === 'MODIFY' ? 'Email Updated' : 
                       'Email Removed'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {notif.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {notif.subject}
                  </h4>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    From: {notif.sender}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      notif.category === 'finance' ? 'bg-blue-100 text-blue-800' :
                      notif.category === 'shopify' ? 'bg-green-100 text-green-800' :
                      notif.category === 'school' ? 'bg-purple-100 text-purple-800' :
                      notif.category === 'work' ? 'bg-orange-100 text-orange-800' :
                      notif.category === 'personal' ? 'bg-pink-100 text-pink-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {notif.category}
                    </span>
                    
                    <button
                      onClick={() => removeEmailNotification(notif.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext(): WebSocketContextType {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}